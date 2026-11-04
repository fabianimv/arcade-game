import React, { useRef, useState } from 'react';
import { C, SCREEN_H, SCREEN_W, clamp, hx, rand, useBest, useFX, useLoop, usePan } from '../utils/kit';
import { burst3d, clear3d, ring3d } from '../utils/engine3d';
import { Game3D, HudPill } from '../utils/ui3d';

const init = () => ({ x: 0, tx: 0, t: 0, spawn: 0.5, score: 0, missed: 0, stars: [], over: false });

export function OrbitCatch3D({ onExit }) {
  const fx = useFX();
  const [best, submitBest] = useBest('orbitcatch');
  const [phase, setPhase] = useState('ready');
  const [res, setRes] = useState({ isNew: false });
  const g = useRef(null);
  if (!g.current) g.current = init();

  const start = () => { fx.clear(); clear3d(); g.current = init(); setPhase('play'); hx.tap(); };
  const finish = s => {
    s.over = true;
    burst3d([s.x, 0.7, 0], [C.amber, C.lime, '#ffffff'], 34, { speed: 7, up: 2, life: 0.9 });
    ring3d([s.x, 0.7, 0], C.amber, 22, { speed: 6, life: 0.7 });
    const score = Math.floor(s.score); setRes({ isNew: submitBest(score), score }); setPhase('over'); hx.die();
  };

  useLoop(phase === 'play', dt => {
    const s = g.current;
    if (s.over) return;
    s.t += dt; s.spawn -= dt; s.x += (s.tx - s.x) * Math.min(1, dt * 12);
    if (s.spawn <= 0) {
      s.stars.push({ id: `${s.t}-${Math.random()}`, x: rand(-3, 3), z: -14, speed: 6 + Math.min(5, s.t * 0.1), bad: Math.random() < 0.17 });
      s.spawn = Math.max(0.25, 0.7 - s.t * 0.006);
    }
    s.stars.forEach(st => { st.z += st.speed * dt; });
    for (let i = s.stars.length - 1; i >= 0; i--) {
      const st = s.stars[i];
      if (st.z > 1.5) { s.stars.splice(i, 1); if (!st.bad) s.missed += 1; if (s.missed >= 5) finish(s); continue; }
      if (Math.abs(st.x - s.x) < 0.72 && Math.abs(st.z) < 0.8) {
        s.stars.splice(i, 1);
        if (st.bad) { hx.bad(); finish(s); return; }
        s.score += 10; s.missed = 0; hx.good(); fx.pop(SCREEN_W / 2, SCREEN_H * 0.58, '+10', C.amber, 16);
        burst3d([st.x, 0.7, st.z], [C.amber, '#ffffff'], 10, { speed: 4, life: 0.5, g: 0 });
      }
    }
  });

  const toX = x => clamp((x / SCREEN_W - 0.5) * 6, -3, 3);
  const pan = usePan(fx, { down: x => { g.current.tx = toX(x); }, move: x => { g.current.tx = toX(x); } });
  const s = g.current;
  const scene = {
    sky: { top: '#080b24', bottom: '#20143a', sun: false, clouds: 0 },
    fog: { c: '#20143a', near: 10, far: 30 },
    light: { dir: [-0.3, 0.8, 0.4], sun: '#fff2c2', i: 2, sky: '#9da7ff', ground: '#17122a', hi: 1.2 },
    cam: { p: [0, 3.1, 8], l: [0, 0.7, -7], fov: 58 },
    statics: [
      { id: 'floor', k: 'pla', p: [0, -0.5, -8], s: [18, 30, 1], c: '#0b0d20', recv: true },
      { id: 'halo', k: 'tor', p: [0, 0.45, -1], n: 1.1, c: C.amber, e: 0.8 },
      ...Array.from({ length: 12 }, (_, i) => ({ inst: 'orbital-line', k: 'box', p: [-5 + i * 0.9, -0.47, -8], s: [0.02, 0.02, 30], c: '#8a72ff', e: 0.7 })),
    ],
    objs: [
      { id: 'collector', k: 'sph', p: [s.x, 0.45, 0], n: 0.7, c: C.lime, e: 0.9, sh: true },
      ...s.stars.map(st => ({ id: st.id, k: st.bad ? 'oct' : 'oct', p: [st.x, 0.7, st.z], n: 0.45, c: st.bad ? C.red : C.amber, e: 0.8, r: [s.t * 2, s.t, 0] })),
    ],
    lights: [{ p: [s.x, 2, 1], c: C.lime, i: 8, d: 10 }, { p: [0, 1, -9], c: C.amber, i: 7, d: 14 }],
  };
  return (
    <Game3D title="ORBIT CATCH" emoji="🌟" accent={C.amber} onExit={onExit} score={Math.floor(s.score)} best={best} fx={fx}
      phase={phase} onStart={start} scene={scene} pan={pan} orbit={{ r: 10, h: 3.5, speed: 0.2, ly: 0.8 }}
      hud={<><HudPill icon="🌟" label="PUNTOS" value={Math.floor(s.score)} color={C.amber} /><HudPill icon="🎯" label="FALLOS" value={`${s.missed}/5`} color={C.red} /></>}
      subtitle="Atrapa las estrellas y evita las rojas"
      lines={['Arrastra para mover el colector', 'Atrapa las estrellas doradas', 'Las rojas terminan la partida']}
      result={{ isNew: res.isNew, title: 'FIN DEL VUELO', emoji: '🌟', subtitle: `${res.score} puntos`, stats: [['PUNTOS', res.score]] }}
    />
  );
}

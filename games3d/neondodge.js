import React, { useRef, useState } from 'react';
import { C, SCREEN_H, SCREEN_W, clamp, hx, rand, useBest, useFX, useLoop, usePan } from '../utils/kit';
import { burst3d, clear3d, ring3d } from '../utils/engine3d';
import { Game3D, HudPill } from '../utils/ui3d';

const init = () => ({ x: 0, tx: 0, t: 0, spawn: 0.8, score: 0, lives: 3, blocks: [], over: false });

export function NeonDodge3D({ onExit }) {
  const fx = useFX();
  const [best, submitBest] = useBest('neondodge');
  const [phase, setPhase] = useState('ready');
  const [res, setRes] = useState({ isNew: false });
  const g = useRef(null);
  if (!g.current) g.current = init();

  const start = () => { fx.clear(); clear3d(); g.current = init(); setPhase('play'); hx.tap(); };
  const finish = s => {
    s.over = true;
    const score = Math.floor(s.score);
    burst3d([s.x, 0.8, 0], [C.pink, C.cyan, '#ffffff'], 36, { speed: 8, up: 2, life: 0.9 });
    ring3d([s.x, 0.8, 0], C.pink, 24, { speed: 7, life: 0.7 });
    fx.shake(10, 0.35); hx.die();
    setRes({ isNew: submitBest(score), score });
    setPhase('over');
  };

  useLoop(phase === 'play', dt => {
    const s = g.current;
    if (s.over) return;
    s.t += dt; s.score += dt * 10; s.spawn -= dt;
    s.x += (s.tx - s.x) * Math.min(1, dt * 14);
    if (s.spawn <= 0) {
      s.blocks.push({ id: `${s.t}-${Math.random()}`, x: rand(-3, 3), z: -16, speed: 8 + Math.min(8, s.t * 0.12), size: rand(0.45, 0.8) });
      s.spawn = Math.max(0.22, 0.75 - s.t * 0.008);
    }
    s.blocks.forEach(b => { b.z += b.speed * dt; });
    for (let i = s.blocks.length - 1; i >= 0; i--) {
      const b = s.blocks[i];
      if (b.z > 2) { s.blocks.splice(i, 1); continue; }
      if (Math.abs(b.x - s.x) < b.size + 0.42 && Math.abs(b.z) < 0.75) {
        s.blocks.splice(i, 1); s.lives -= 1; hx.hit(); fx.shake(5, 0.18);
        if (s.lives <= 0) finish(s);
      }
    }
  });

  const toX = x => clamp((x / SCREEN_W - 0.5) * 6, -3, 3);
  const pan = usePan(fx, { down: x => { g.current.tx = toX(x); }, move: x => { g.current.tx = toX(x); } });
  const s = g.current;
  const scene = {
    sky: { top: '#05051b', bottom: '#180b2f', sun: false, clouds: 0 },
    fog: { c: '#180b2f', near: 10, far: 32 },
    light: { dir: [-0.4, 0.8, 0.3], sun: '#d9d4ff', i: 1.8, sky: '#7f8fff', ground: '#160c28', hi: 1.1 },
    cam: { p: [0, 3.2, 8], l: [0, 0.6, -7], fov: 58 },
    statics: [
      { id: 'floor', k: 'pla', p: [0, -0.5, -8], s: [18, 30, 1], c: '#09091b', recv: true },
      ...Array.from({ length: 14 }, (_, i) => ({ inst: 'lane', k: 'box', p: [-5 + i * 0.8, -0.47, -8], s: [0.025, 0.02, 30], c: C.cyan, e: 0.8 })),
      ...Array.from({ length: 8 }, (_, i) => ({ inst: 'stripe', k: 'box', p: [0, -0.46, -16 + i * 4], s: [6, 0.02, 0.035], c: C.pink, e: 0.8 })),
    ],
    objs: [
      { id: 'player', k: 'sph', p: [s.x, 0.45, 0], n: 0.65, c: C.cyan, e: 0.8, sh: true },
      ...s.blocks.map(b => ({ id: b.id, k: 'ico', p: [b.x, 0.45, b.z], s: [b.size, b.size, b.size], c: C.pink, e: 0.35, r: [s.t, s.t * 0.7, 0] })),
    ],
    lights: [{ p: [s.x, 2, 1], c: C.cyan, i: 8, d: 10 }, { p: [0, 1, -8], c: C.pink, i: 6, d: 14 }],
  };
  return (
    <Game3D title="NEON DODGE" emoji="💠" accent={C.cyan} onExit={onExit} score={Math.floor(s.score)} best={best} fx={fx}
      phase={phase} onStart={start} scene={scene} pan={pan} orbit={{ r: 10, h: 3.5, speed: 0.2, ly: 0.8 }}
      hud={<><HudPill icon="💠" label="PUNTOS" value={Math.floor(s.score)} color={C.cyan} /><HudPill icon="❤️" value={s.lives} color={C.pink} /></>}
      subtitle="Esquiva bloques de neón"
      lines={['Arrastra para moverte de lado a lado', 'Los bloques aceleran con el tiempo', 'Pierdes una vida al chocar']}
      result={{ isNew: res.isNew, title: '¡IMPACTO!', emoji: '💥', subtitle: `${res.score} puntos`, stats: [['PUNTOS', res.score]] }}
    />
  );
}

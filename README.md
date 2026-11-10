# 🕹️ ARCADE HUB

> *Un proyecto casero de tardes y fines de semana — orquestado desde un iPhone 12, sin tocar una PC.* 📱✨

## 🧑‍💻 Sobre este proyecto

Este es un **proyecto personal y casero** hecho enteramente desde mi **iPhone 12**, aprovechando **GitHub Codespaces** como entorno de desarrollo en la nube y los modelos de IA como mis "manos" para escribir el código.

No hay PC. No hay escritorio. Solo yo, mi cel, y los modelos:

| Modelo | Rol |
|--------|-----|
| **Claude Sonnet 4.6** (GitHub Copilot) | Arquitectura, juegos, lógica, haptics, correcciones |
| **Gemini Pro 3.1** | Consultas, ideas, revisión de diseño |

Lo voy orquestando en mis ratos libres — una tarde aquí, un fin de semana allá. Le digo qué quiero, los modelos escriben, yo pruebo en Expo Go y pido ajustes. Así de simple y así de divertido.

> *Prueba de que no necesitas una PC, ni saber programar de memoria, para construir algo cool.* 🚀

---

A fully-featured **multi-game arcade hub** built with **React Native + Expo**, packed with haptic feedback, real-time 3D scenes, and retro neon energy. 56 games, one app, zero excuses to be bored.

Deployed over-the-air via **EAS Update** straight to your iPhone through **Expo Go** — no App Store required.

---

## 🎮 Los juegos (56)

Todo está hecho en **3D de verdad** (three.js sobre `expo-gl`): cada juego es un mundo con cámara en primera o tercera persona, sombras, cielo, partículas y modelos animados, construido sobre un motor común (`utils/engine3d.js`, `utils/prefabs.js`, `utils/ui3d.js`). El **menú** es una sala arcade 3D de neón con una máquina recreativa por juego (`ui/Menu3D.js`): desliza para recorrerla, toca una máquina para verla y JUGAR. Incluye categorías, favoritos, reto del día y **Sorpréndeme** 🎲. Los récords y el perfil se conservan entre versiones.

| Categoría | Juegos |
|-----------|--------|
| 🚀 **Acción** | **Neon Galaxy** (oleadas, jefes y power-ups) · **Cyber Run** (corredor de 3 carriles) · **Galactic Hunt** (galería de tiro con cargador) · **Neon Tunnel** (túnel 3D de anillos) · **Neon Warrior** (plataformas con jefes) · **Asteroid Dodge** (esquiva con bonus *cerca*) · **Invasores** (clásico con escudos y ovni) · **Moto 3D** (autopista en primera persona: tráfico, contramano, roces y nitro) · **Avión 3D** (vuelo en primera persona por un cañón: anillos, rocas y combustible) |
| 🕹️ **Arcade** | **Snake Power** · **Ping Pong** (IA que mejora) · **Breakout** (mejoras y multibola) · **Pong Solo** (bumpers estilo pinball) · **Star Catcher** · **Coin Rush** · **Crossy Road** (calles, ríos y trenes) |
| ⚡ **Reflejos** | **Gravity Flip** · **Wall Jumper** · **Whack-a-Mole** · **Fruit Slash** (corta frutas) · **Ritmo y Color** (Simon) · **Flappy Neon** · **Sky Hop** (rebota hacia el cielo) · **Tower Stack** · **Reflejos** · **Color Rush** (Stroop) · **Dino Run** |
| 🧩 **Puzzle** | **Neon Tetris** (hold, fantasma, gestos) · **2048 Neon** (deshacer) · **15 Puzzle** (3×3, 4×4, 5×5) · **Bubble Shooter** (bombas y arcoíris) · **Memory Match** · **Math Rush** · **Palabras** · **Word Chain** · **Buscaminas** (3 dificultades) · **4 en línea** (IA minimax) |
| 🧙 **Aventura** | **Pixel Quest** (30 mundos) · **Void Crawler** (roguelike con niebla y jefe) · **Monster Duel** (captura, evoluciona, líderes) · **Pixel Craft** (mina, fabrica, zombis y noche) · **Pixel RPG** (mundo procedural, tiendas, hechizos, dragón) · **Mundo 3D** (mundo abierto en primera persona: montañas, lagos, aldeas, ciclo día/noche y lobos) |
| 🌍 **Mundo abierto 3D** | **Isla del Tesoro** (cofres, palmeras y cangrejos) · **Safari Foto** (fotografía animales desde un jeep) · **Granja Libre** (planta, riega, cosecha y vende) · **Rally Abierto** (contrarreloj con aros y rampas) · **Reparto en Moto** (entregas en primera persona por la ciudad) · **Jinete de Dragón** (vuelo libre y torres enemigas) · **Planeta Alien** (baja gravedad, cristales y oxígeno) · **Cazafantasmas** (pueblo de noche, linterna) · **Supervivencia Zombi** (tala, vallas y 4 noches) · **Parkour Urbano** (saltos entre azoteas) · **Lago de Pesca** (lanza, espera y recoge) |

### 🧬 Progreso y extras
- **Sonido** sintetizado para todos los juegos (activable en ⚙️ Ajustes; usa `expo-audio`).
- **Perfil**: nivel y XP, **12 logros** y **reto del día** con racha 🔥 (un juego distinto cada día).
- **Favoritos** ⭐ con su propia pestaña en el menú.
- **Ajustes**: sonido, vibración, **calidad gráfica** (Alta con sombras / Rápida) y borrado de progreso.

---

## ✨ Key Features

### 📳 Haptic Feedback — Everywhere
Every game uses `expo-haptics` to bring the action to life through your phone. Shots, jumps, hits, deaths, powerups — if something happens in the game, your hand knows about it. It's the closest thing to a physical arcade cabinet you'll get on a phone.

### 💾 Save / Load System
Todos los juegos guardan tu **récord** con `@react-native-async-storage/async-storage`, y los de aventura (**Pixel Quest, Pixel RPG, Monster Duel**) guardan además tu progreso. Tu avance de mundos, nivel y vidas se guarda automáticamente so you can pick up your adventure any time.

### 🎨 Emoji Sprites
Who needs a spritesheet when you have Unicode? All game characters and objects are built from emoji — 😎 🤠 👾 🦆 🛸 💎 ⭐ 🚀 — keeping things lightweight, expressive, and delightfully retro.

### 📡 OTA Updates via EAS
The app is deployed with **Expo EAS Update**. That means new game content, bug fixes, and tweaks land on your phone **without** a new App Store submission. Just open Expo Go, and you're already on the latest version.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Core mobile framework |
| **Expo SDK 58** | Managed workflow y herramientas de desarrollo |
| **Three.js 0.166** + **expo-gl** | Escenas 3D y renderizado WebGL |
| **expo-haptics** | Tactile feedback throughout all games |
| **expo-updates** | OTA delivery via EAS Update |
| **@react-native-async-storage/async-storage** | Récords y partidas guardadas |
| **EAS Update** | Over-the-air deployment to Expo Go |

---

## 🚀 How to Run

### Requisitos
- Node.js LTS y npm
- Expo Go en el dispositivo si vas a probar en móvil
- EAS CLI solo para publicar actualizaciones: `npm install -g eas-cli`

### Instalar dependencias
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm start
```

`npm start` abre Expo con túnel (`--tunnel --clear`), que es la opción recomendada desde Codespaces. También puedes usar `npm run web`, `npm run android` o `npm run ios` cuando el entorno lo permita.

### Publicar una actualización OTA
```bash
eas update --branch main --platform ios
```

Después abre **Expo Go** y carga el proyecto actualizado. Las actualizaciones OTA requieren que el runtime nativo instalado sea compatible con la versión de la aplicación.

## 🗂️ Estructura del proyecto

- `App.js`: registro `GAMES`, categorías y navegación del menú.
- `games3d/`: un componente por juego.
- `ui/`: menú 3D y paneles de ajustes, perfil y gráficos.
- `utils/`: motor 3D, mundo WebGL, prefabs, controles, efectos y persistencia.
- `docs/ENGINE3D.md`: contrato de escenas y guía para crear juegos.
- `ai-guide.md`: notas de desarrollo y depuración en Codespaces.

Para añadir un juego, crea `games3d/<id>.js`, expórtalo desde `App.js` y añade una entrada a `GAMES`. Conserva las claves de `useBest()` para no perder récords existentes.

---

## 🤖 Built By AI

This entire app — all 56 games, the hub UI, the haptics, the save system, the animations, and the 3D engine — was architected and coded by an **AI assistant** in collaboration with the user. No third-party game framework. Pure React Native, Three.js, raw creativity, and a lot of emoji.

> *Proof that AI + human > either alone.* 💪

---

## 📄 License

Built for fun. Play for free. Share the joy. 🕹️
# 🤖 Guía para IAs (Claude, Gemini, ChatGPT): Desarrollo con Expo Go en Codespaces

Este documento da contexto a asistentes de IA para configurar, depurar y ejecutar este proyecto Expo SDK 58 desde GitHub Codespaces y probarlo en un iPhone con **Expo Go**.

## 🌍 Contexto del Entorno
- **Entorno de Desarrollo:** GitHub Codespaces (Ubuntu Linux, sin interfaz gráfica local).
- **Dispositivo de Prueba:** iPhone físico con la app **Expo Go** instalada.
- **Red:** El iPhone y el Codespace no están en la misma red local; usa el túnel de Expo.

## 🚨 El Problema: "Runtime is not ready" / "Mismatch" / Pantalla Blanca
Al abrir una actualización en Expo Go, los problemas más habituales son:
1. Error visible: `Runtime is not ready` o `mismatch between JavaScript part and native part`.
2. Error silencioso: La app carga el bundle al 100% pero se queda en una **pantalla blanca** infinita.

### ✅ Diagnóstico recomendado
1. Confirma que las dependencias coinciden con `package.json` y `package-lock.json`.
2. Si cambiaste dependencias o configuración, reinicia Metro con caché limpia:
   ```bash
   npm start
   ```
3. Comprueba que Expo Go y el runtime de la aplicación sean compatibles con Expo SDK 58.
4. Si aparece una pantalla blanca, revisa primero la consola de Metro y el primer error JavaScript; no ocultes el error cambiando aleatoriamente la arquitectura nueva.

## 🚀 Cómo levantar el servidor para el iPhone

Dado que estamos en un Codespace, la IP local (`127.0.0.1` o `192.168.x.x`) no le sirve al iPhone. Hay dos métodos:

### Método 1: Usar un Túnel (Recomendado para Dev)
```bash
npm start
```
*Nota para la IA:* Siempre usa `--clear` después de cambiar dependencias o el `babel.config.js`. El usuario deberá escanear el QR o ingresar la URL `exp://...exp.direct` manualmente en Expo Go.

### Método 2: Publicar vía EAS Update
Si el túnel falla o el usuario quiere ver la app en la pestaña "Projects" de su cuenta en Expo Go:
1. Asegurar que el `app.json` tiene el `projectId` de EAS.
2. Ejecutar el update de forma no interactiva (vital en Codespaces):
```bash
CI=1 npx eas-cli update --branch main --platform ios --message "Update"
```
*Nota:* El usuario luego abre Expo Go, va a su perfil, selecciona el proyecto y cargará la última actualización de la rama `main`.

---
**Resumen para la IA:** Mantén las versiones alineadas con Expo SDK 58, usa `npm start` desde Codespaces y diagnostica el primer error real de Metro antes de modificar la arquitectura o eliminar dependencias.

# Plan de mantenimiento de Expo

Este proyecto debe mantenerse en la versión estable más reciente de Expo compatible con
React Native, Three.js y `expo-gl`.

## Obligatorio al tomar cualquier cambio

1. Consultar la versión estable actual de Expo y compararla con `package.json`.
2. Si existe una versión más nueva, actualizar el SDK antes de implementar el resto del cambio:
   ```bash
   npx expo install --fix
   npm install
   ```
   Si el salto requiere cambiar de SDK, seguir la guía oficial de Expo y actualizar el
   paquete `expo` junto con las dependencias administradas por Expo.
3. Verificar que `app.json`, `package.json` y `package-lock.json` queden alineados.
4. Ejecutar una validación mínima:
   ```bash
   npx expo-doctor
   npm run web
   ```
   `npm run web` debe iniciarse sin errores de bundling; detener el proceso después de
   comprobarlo.
5. Documentar en el commit qué versión de Expo quedó instalada y cualquier migración
   necesaria. Si la actualización no puede hacerse de forma segura, detenerse y explicar
   el bloqueo en lugar de mezclar versiones.

## Estado actual

- Expo SDK 58
- React Native 0.88
- React 19.3
- Three.js 0.166.1

No actualizar solo `expo` de forma aislada: las versiones de los paquetes `expo-*` deben
ser las que recomienda el SDK seleccionado. Después de cada actualización, comprobar
también el funcionamiento de `expo-gl` y del motor 3D descrito en
[`ENGINE3D.md`](ENGINE3D.md).

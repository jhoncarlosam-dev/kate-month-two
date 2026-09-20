# Para ti — 2 meses

Una página estática, personal y mobile-first para celebrar dos meses juntos. Está pensada para mostrarse en el teléfono durante una cita y se puede desplegar directamente en Netlify, sin backend.

El hilo de la experiencia es:

> Después de 2 meses, te sigo eligiendo para compartir mis días.

## 1. Dónde colocar la fotografía

Guarda la foto con este nombre exacto:

```text
assets/foto-juntos.jpg
```

La página la carga desde:

```text
/assets/foto-juntos.jpg
```

Recomendación: usa una imagen liviana (JPG, 1200–1800 px en el lado más largo). No hace falta que sea enorme; se verá bien enmarcada en el teléfono.

Si el archivo todavía no está, la página no se rompe: muestra un recuadro elegante indicando dónde va la foto.

## 2. Dónde colocar el video

Guarda el video con este nombre exacto:

```text
assets/video-farquaad.mp4
```

La página lo carga desde:

```text
/assets/video-farquaad.mp4
```

El archivo **no** va incrustado en el HTML. Se mantiene como recurso independiente.

El video **no se descarga al abrir la portada**. Su ruta se asigna recién cuando ella pulsa **Ver mi elección**, y se usa `preload="metadata"` para pedir lo mínimo posible hasta que lo reproduzca.

Si el archivo todavía no está, aparece un recuadro indicando la ruta esperada.

## 3. Cómo cambiar el nombre

Abre `script.js`. Arriba del todo está este bloque:

```javascript
const CONFIG = {
  herName: "Kate",
  photoSrc: "/assets/foto-juntos.jpg",
  videoSrc: "/assets/video-farquaad.mp4",
};
```

Cambia solo esta línea:

```javascript
herName: "Kate",
```

Ese valor reemplaza `[NOMBRE]` en la carta: **Querida Kate:**

Si también quieres cambiar la foto o el video, actualiza `photoSrc` y `videoSrc` en el mismo objeto.

Los demás textos se pueden editar directamente en `index.html`.

## 4. Cómo ejecutar el proyecto en local

No abras `index.html` haciendo doble clic. Las rutas `/assets/...` necesitan un servidor local.

Desde la carpeta del proyecto:

```bash
npx --yes serve -l 4173
```

O, si tienes Python:

```bash
python -m http.server 4173
```

Luego abre:

```text
http://localhost:4173
```

Flujo para probar:

1. Portada → **Tengo algo que decirte**
2. Foto → **Sigue...**
3. Carta → **Sigue...**
4. **Ver mi elección ❤️** → aparece el video
5. **Continuar**
6. Mensaje final → **Volver al inicio**

## 5. Cómo desplegarlo en Netlify

La forma más simple, sin Git:

1. Entra a [app.netlify.com](https://app.netlify.com)
2. Ve a **Sites** → **Add new site** → **Deploy manually**
3. Arrastra la carpeta completa del proyecto
4. Espera a que termine el deploy
5. Abre la URL que te asigne Netlify

Si prefieres desplegar desde GitHub:

1. Sube este proyecto a un repositorio
2. En Netlify: **Import an existing project**
3. Deja el **publish directory** vacío o como `.`
4. No hay comando de build

Este proyecto ya incluye un `netlify.toml` para publicar la carpeta raíz y servir el MP4 con el tipo correcto.

Recomendación: como es una página íntima, usa una URL discreta. En Netlify puedes cambiar el nombre del sitio, por ejemplo `para-ti-dos-meses`.

## 6. Si el video de 100 MB da problemas

Un MP4 de ~100 MB puede fallar por tres motivos distintos:

| Problema | Qué pasa |
| --- | --- |
| GitHub | Rechaza archivos de 100 MB o más. Aviso desde 50 MB. |
| Carga en el teléfono | Puede tardar mucho o cortarse con datos móviles. |
| Netlify | El archivo puede subirse, pero el primer play sigue siendo pesado. |

### Opción recomendada: comprimir el video

Usa [HandBrake](https://handbrake.fr/) o [VLC](https://www.videolan.org/):

- Formato: MP4
- Códec: H.264
- Resolución: 720p o 1080p
- Calidad: RF 22–24
- Audio: AAC 128 kbps

En la mayoría de los casos puedes bajarlo a **15–40 MB** sin que se note en el teléfono. Sigue llamándose `video-farquaad.mp4` y déjalo en `/assets`.

### Opción B: hospedarlo fuera y solo cambiar la URL

Si no quieres subir el MP4 a Netlify, súbelo a un servicio de archivos o video (Cloudinary, Bunny, Cloudflare R2, etc.) y cambia en `script.js`:

```javascript
videoSrc: "https://tu-dominio.com/video-farquaad.mp4",
```

La página seguirá usando la misma etiqueta `<video>`. No hace falta backend.

Evita Google Drive o Dropbox para esto: sus enlaces suelen bloquear la reproducción directa.

### Opción C: desplegar a mano, no por Git

Si el archivo pesa menos de 100 MB y no quieres pasarlo por GitHub, usa el deploy manual de Netlify (arrastrar la carpeta). Así evitas el límite de GitHub.

## Notas de diseño y uso

- La experiencia no es una página para hacer scroll: avanza por etapas.
- El video no se reproduce solo ni con sonido automático.
- El reproductor nativo permite play, pausa y volumen.
- Si las fuentes de Google no cargan, se usan Georgia y la sans del sistema.
- Si el dispositivo pide menos movimiento (`prefers-reduced-motion`), las animaciones se simplifican.
- La foto y el video se adaptan sin deformarse (`object-fit: contain`).

## Estructura

```text
index.html
style.css
script.js
netlify.toml
README.md
assets/
  COLOCA-AQUI-TUS-ARCHIVOS.txt
  foto-juntos.jpg          ← la agregas tú
  video-farquaad.mp4       ← lo agregas tú
```

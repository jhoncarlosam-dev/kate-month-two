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

## 2. El video (YouTube)

El video ya no se guarda en `/assets`. Se reproduce desde este enlace:

```text
https://youtu.be/6eaF8RT0J0U
```

El iframe de YouTube **no se carga al abrir la portada**. Solo aparece cuando ella pulsa **Ver mi elección**.

Para cambiar el video, edita `videoUrl` en `script.js`. El video de YouTube debe estar en **Público** o **Oculto (unlisted)**. Si está en Privado, el reproductor no podrá mostrarlo.

## 3. Cómo cambiar el nombre

Abre `script.js`. Arriba del todo está este bloque:

```javascript
const CONFIG = {
  herName: "Kate",
  photoSrc: "/assets/foto-juntos.jpg",
  videoUrl: "https://youtu.be/6eaF8RT0J0U",
};
```

Cambia solo esta línea:

```javascript
herName: "Kate",
```

Ese valor reemplaza `[NOMBRE]` en la carta: **Querida Kate:**

Si también quieres cambiar la foto o el video, actualiza `photoSrc` y `videoUrl` en el mismo objeto.

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

Este proyecto ya incluye un `netlify.toml` para publicar la carpeta raíz.

Recomendación: como es una página íntima, usa una URL discreta. En Netlify puedes cambiar el nombre del sitio, por ejemplo `para-ti-dos-meses`.

## 6. Si el video de YouTube no se ve

- Confirma que no esté en **Privado**. Usa **Oculto** si no quieres que aparezca en tu canal.
- En YouTube: el video → **Mostrar más** → revisa que se permita la reproducción en otros sitios.
- Si cambias el enlace, actualiza `videoUrl` en `script.js` y vuelve a desplegar.

## Notas de diseño y uso

- La experiencia no es una página para hacer scroll: avanza por etapas.
- El video no se reproduce solo ni con sonido automático.
- YouTube aporta play, pausa y volumen.
- Si las fuentes de Google no cargan, se usan Georgia y la sans del sistema.
- Si el dispositivo pide menos movimiento (`prefers-reduced-motion`), las animaciones se simplifican.
- La foto se adapta sin deformarse (`object-fit: contain`).

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
```

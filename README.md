# Around The U.S. — Integración de la API

## Descripción del proyecto

Around The U.S. es una página de perfil interactiva inspirada en un explorador viajero.
En esta etapa del proyecto, la aplicación se conecta a un servidor real mediante una API
REST: la información del usuario y las tarjetas de lugares ya no viven en datos locales
estáticos, sino que se cargan, guardan y sincronizan directamente con el backend.

## Funcionalidad

- Carga la información del usuario (nombre, descripción, avatar) desde el servidor.
- Carga las tarjetas iniciales desde el servidor, y solo las renderiza después de
  recibir el id del usuario.
- Permite editar el perfil (nombre y descripción), guardando los cambios en el servidor.
- Permite agregar nuevas tarjetas, que se guardan en el servidor.
- Permite dar y quitar "me gusta" a las tarjetas, sincronizado con el servidor.
- Permite eliminar tarjetas propias, con una ventana de confirmación previa.
- Permite cambiar la foto de perfil, guardándola en el servidor.
- Muestra el texto "Guardando..." en los botones mientras se procesa una solicitud.

## Tecnologías y técnicas utilizadas

- HTML5 semántico y CSS3 (BEM).
- TypeScript con programación orientada a objetos (clases ES6), con herencia:
  `Popup` es la clase padre de `PopupWithForm`, `PopupWithImage` y
  `PopupWithConfirmation`.
- `fetch` API con `async`/`await` para la comunicación con el servidor REST.
- Manejo de errores con `try...catch`, y validación de cada respuesta con `res.ok`.
- `Promise.all` para cargar en paralelo la información del usuario y las tarjetas
  antes de renderizar la página.
- Validación de formularios mediante una clase reutilizable `FormValidator`.
- Compilación con el compilador de TypeScript (`tsc`).

## Autor

Daniel Felipe Silva
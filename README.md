# Tripleten web_project_around_es
# Around The U.S.
 
## Descripción
 
Around The U.S. es una página de perfil interactiva inspirada en un explorador viajero. El proyecto permite visualizar una galería de fotografías de distintos lugares, editar la información del perfil del usuario y agregar nuevas tarjetas de lugares de forma dinámica, todo mediante ventanas emergentes (modales).
 
## Funcionalidad
 
- **Editar perfil**: el usuario puede abrir una ventana emergente para actualizar su nombre y descripción. Los campos del formulario se rellenan automáticamente con la información actual antes de editarla.
- **Agregar tarjetas**: mediante una ventana emergente, el usuario puede crear una nueva tarjeta ingresando un título y un enlace a una imagen. La tarjeta se agrega como primer elemento de la galería.
- **Dar "Me gusta"**: cada tarjeta tiene un botón en forma de corazón que cambia de apariencia al hacer clic, indicando que el lugar fue marcado como favorito.
- **Eliminar tarjetas**: cada tarjeta cuenta con un botón de papelera que la elimina del DOM de forma permanente.
- **Ampliar imágenes**: al hacer clic sobre la imagen de una tarjeta, se abre una ventana emergente con la imagen en tamaño completo y su título.
- **Generación dinámica de tarjetas**: las tarjetas iniciales se generan a partir de un array de datos (`initialCards`) y un elemento `<template>` de HTML, en lugar de estar escritas directamente en el HTML.
- **Manejo de datos incompletos**: si al crear una tarjeta falta el nombre o el enlace de la imagen, se muestra automáticamente el texto "Sin título" y una imagen de marcador de posición.
## Tecnologías utilizadas
 
- HTML5
- CSS3 (metodología BEM, Flexbox y CSS Grid)
- JavaScript (manipulación del DOM, plantillas `<template>`, eventos)
- Typescript
- POO

## Autor

Daniel Felipe Silva
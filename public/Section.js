// Section.ts
// Renderiza una lista de elementos en un contenedor.
// No sabe nada sobre "tarjetas": recibe un renderer desde afuera,
// así mantiene un acoplamiento débil (no crea instancias de Card).
export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }
    // --- Método público: renderiza todos los elementos iniciales ---
    renderItems() {
        this._items.forEach((item) => this._renderer(item));
    }
    // --- Método público: agrega un elemento del DOM ya creado al contenedor ---
    addItem(element) {
        this._containerElement.prepend(element);
    }
}

// Section.ts
// Renderiza una lista de elementos en un contenedor.
// No sabe nada sobre "tarjetas": recibe un renderer desde afuera,
// así mantiene un acoplamiento débil (no crea instancias de Card).

export interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _containerElement: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string
  ) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(
      containerSelector
    ) as HTMLElement;
  }

  // --- Método público: renderiza todos los elementos iniciales ---
  renderItems(): void {
    this._items.forEach((item) => this._renderer(item));
  }

  // --- Método público: agrega un elemento del DOM ya creado al contenedor ---
  addItem(element: HTMLElement): void {
    this._containerElement.prepend(element);
  }
}
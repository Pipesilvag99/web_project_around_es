// UserInfo.ts
// Responsable de leer y actualizar la información del usuario en la página.

export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
}

export interface UserInfoData {
  name: string;
  description: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _descriptionElement: HTMLElement;

  constructor({ nameSelector, descriptionSelector }: UserInfoSelectors) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._descriptionElement = document.querySelector(
      descriptionSelector
    ) as HTMLElement;
  }

  // --- Método público: devuelve la info actual del usuario ---
  getUserInfo(): UserInfoData {
    return {
      name: this._nameElement.textContent ?? '',
      description: this._descriptionElement.textContent ?? '',
    };
  }

  // --- Método público: actualiza la info del usuario en el DOM ---
  setUserInfo({ name, description }: UserInfoData): void {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
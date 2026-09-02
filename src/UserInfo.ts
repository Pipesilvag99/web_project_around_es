// UserInfo.ts
// Responsable de leer y actualizar la información del usuario en la página.

export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
  avatarSelector: string;
}

export interface UserInfoData {
  name: string;
  description: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _descriptionElement: HTMLElement;
  private _avatarElement: HTMLImageElement;
  private _userId: string = '';

  constructor({ nameSelector, descriptionSelector, avatarSelector }: UserInfoSelectors) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._descriptionElement = document.querySelector(
      descriptionSelector
    ) as HTMLElement;
    this._avatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  getUserId(): string {
    return this._userId;
  }

  setUserId(id: string): void {
    this._userId = id;
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

  // --- Método público: actualiza el avatar en el DOM ---
  setAvatar(avatar: string): void {
    this._avatarElement.src = avatar;
  }
}
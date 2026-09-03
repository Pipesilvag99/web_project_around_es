// Api.ts
// Única clase responsable de comunicarse con el servidor.
// No instancia ni llama métodos de otras clases.

import type { CardData } from './Card.js';

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
      return await this._checkResponse<UserData>(res);
    } catch (err) {
      console.error('Error al obtener la información del usuario:', err);
      throw err;
    }
  }

  async getInitialCards(): Promise<CardData[]> {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      return await this._checkResponse<CardData[]>(res);
    } catch (err) {
      console.error('Error al obtener las tarjetas:', err);
      throw err;
    }
  }

  async updateUserInfo(data: { name: string; about: string }): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkResponse<UserData>(res);
    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      throw err;
    }
  }

  async addCard(data: { name: string; link: string }): Promise<CardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkResponse<CardData>(res);
    } catch (err) {
      console.error('Error al agregar la tarjeta:', err);
      throw err;
    }
  }

  async deleteCard(cardId: string): Promise<void> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      });
      await this._checkResponse<void>(res);
    } catch (err) {
      console.error('Error al eliminar la tarjeta:', err);
      throw err;
    }
  }

  async changeLikeCardStatus(cardId: string, isLiked: boolean): Promise<CardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers,
      });
      return await this._checkResponse<CardData>(res);
    } catch (err) {
      console.error("Error al actualizar el 'me gusta':", err);
      throw err;
    }
  }

  async updateAvatar(data: { avatar: string }): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkResponse<UserData>(res);
    } catch (err) {
      console.error('Error al actualizar el avatar:', err);
      throw err;
    }
  }
}

// Se crea UNA sola instancia de Api. Reemplaza el token por el tuyo.
export const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'b6947460-f062-4334-a51c-811defe06d35',
    'Content-Type': 'application/json',
  },
});
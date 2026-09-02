// Api.ts
// Única clase responsable de comunicarse con el servidor.
// No instancia ni llama métodos de otras clases.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Error: ${res.status}`));
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/users/me`, {
                    headers: this._headers,
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al obtener la información del usuario:', err);
                throw err;
            }
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/cards`, {
                    headers: this._headers,
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al obtener las tarjetas:', err);
                throw err;
            }
        });
    }
    updateUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/users/me`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify(data),
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al actualizar el perfil:', err);
                throw err;
            }
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/cards`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify(data),
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al agregar la tarjeta:', err);
                throw err;
            }
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: this._headers,
                });
                yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al eliminar la tarjeta:', err);
                throw err;
            }
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                    method: isLiked ? 'DELETE' : 'PUT',
                    headers: this._headers,
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error("Error al actualizar el 'me gusta':", err);
                throw err;
            }
        });
    }
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${this._baseUrl}/users/me/avatar`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify(data),
                });
                return yield this._checkResponse(res);
            }
            catch (err) {
                console.error('Error al actualizar el avatar:', err);
                throw err;
            }
        });
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

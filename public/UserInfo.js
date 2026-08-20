// UserInfo.ts
// Responsable de leer y actualizar la información del usuario en la página.
export class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
    }
    // --- Método público: devuelve la info actual del usuario ---
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this._nameElement.textContent) !== null && _a !== void 0 ? _a : '',
            description: (_b = this._descriptionElement.textContent) !== null && _b !== void 0 ? _b : '',
        };
    }
    // --- Método público: actualiza la info del usuario en el DOM ---
    setUserInfo({ name, description }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
    }
}

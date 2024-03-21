const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const character = document.querySelector(".container-character");
const message = document.querySelector(".container-message");
const output = document.querySelector(".text-output");
const btnCopy = document.querySelector(".btn-copy");
const textBox = document.querySelector(".text-box");
const key = 76;

btnEncrypt.addEventListener("click", () => handleButtonClick("encrypt"));
btnDecrypt.addEventListener("click", () => handleButtonClick("decrypt"));
btnCopy.addEventListener("click", copyToClipboard);

function recoverText() {
    return textBox.value;
}

function hideElements() {
    character.classList.add("hide");
    message.classList.add("hide");
}

function handleButtonClick(operation) {
    hideElements();
    output.textContent = operationText(recoverText(), operation);
}

function copyToClipboard() {
    const clipboardTmp = output.textContent;
    navigator.clipboard.writeText(clipboardTmp)
        .then(() => console.log("He copiado: " + clipboardTmp))
        .catch(error => console.error('Problema copiando en Portapapeles: ', error));
}

const operationText = (text, operation) => {
    switch (operation) {
        case "encrypt":
            return encryptText(text, key);
        case "decrypt":
            return decryptText(text, key);
        default:
            return text;
    }
};

function encryptText(text, key) {
    return shiftText(text, key % 26, true);
}

function decryptText(text, key) {
    return shiftText(text, key % 26, false);
}

function shiftText(text, key, encrypt) {
    return text.split('').map(char => {
        let charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) { // Mayusculas
            charCode = encrypt ? ((charCode - 65 + key) % 26 + 65) : ((charCode - 65 - key + 26) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) { // Minusculas
            charCode = encrypt ? ((charCode - 97 + key) % 26 + 97) : ((charCode - 97 - key + 26) % 26 + 97);
        } else if (charCode >= 48 && charCode <= 57) { // Numeros
            charCode = encrypt ? ((charCode - 48 + key) % 10 + 48) : ((charCode - 48 - key + 10) % 10 + 48);
        }
        return String.fromCharCode(charCode);
    }).join('');
}

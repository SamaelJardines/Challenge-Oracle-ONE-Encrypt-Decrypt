const inputEncriptar = document.getElementById("inputEncriptar");
const div = document.getElementById("div-todo");
const imagen = document.getElementById("imagen");
const todoMensajes = document.getElementById("todo-mensajes");
const todoMensajes2 = document.getElementById("todo-mensajes2");
const taskList = document.getElementById("task-list");
const copiar = document.getElementById("copiar");

// Array where we work to encrypt and decrypt
const caracteresArray = [
    ["a","ai"],
    ["e","enter"],
    ["i","imes"],
    ["o","ober"],
    ["u","ufat"]
];

// Encypt button
function botonEncriptar() {
    // Separate word in letters to encrypt
    let textArea = inputEncriptar.value.split("");

    // If the word hasn't letters = Send alert and return
    if (textArea.some(c => !/[a-z]/i.test(c))) {
        alert("No estan permitidos los numeros, simbolos y espacios en blanco.");
        return;

    // If input is empty = Send alert and return
    } else if (inputEncriptar.value == "") {
        alert("Escribe algo para encriptar.");
        return;

    }

    // Clear input text
    inputEncriptar.value = "";

    // Disable image and text where we will put the word encrypted o decrypted
    imagen.style.display = "none";
    todoMensajes.style.display = "none";
    todoMensajes2.style.display = "none";

    // Change div class where we will put the word encrypted o decrypted
    div.className = "div-todo-mensajes2";

    // Enable copy button
    copiar.style.display = "block";

    // Find in array a letter match to join the encrypted word
    const encriptar = textArea.map(x => caracteresArray.find(y => y[0] === x)?.[1] || x).join('');

    // Create a li element
    const task = document.createElement("li");

    // Enter the word encrypted in the li
    task.innerText = encriptar;
    // Add li in the ul
    taskList.appendChild(task);

}

// Decrypt button
function botonDesencriptar() {
    // Set variable with the last li element
    const textList = taskList.lastElementChild;

    // If the last li element is empety = Send alert and return
    if (textList === null) {
        alert("No hay un texto para desencriptar.");
        return;
    }

    // Set variable with text from the last li element
    let textArea = textList.innerHTML;

    // Loop with array length to decrypt
    for ( i=0; i < caracteresArray.length; i++ ) {
        // Replace word encrypted to letter decrypted
        const desencriptar = textArea.replaceAll(caracteresArray[i][1], caracteresArray[i][0]);
        // Change variable with word decrypted
        textArea = desencriptar;
    }

    // Change last li element with word decrypted
    textList.textContent = textArea;

}

// Copy button
function botonCopiar() {
    // Set variable with the last li element
    const textList = taskList.lastElementChild;
    // Set variable with text from the last li element
    let textArea = textList.innerHTML;

    // If api doesn't integred = Use other method to copy and send alert
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(textArea);
        alert("Copiado correctamente.");
        return;
    }

    // If api are integred = Use it to copy and send alert
    navigator.clipboard.writeText(textArea).then(function() {
        alert("Copiado correctamente.");

    }, function(err) { // If an error ocurred = Send alert with the error
        alert("Hubo un error al copiar: ", err);

    });
}
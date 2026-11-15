
"use strict";

// Ano automático no rodapé
const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(event) {
        const destino = this.getAttribute("href");

        if (destino === "#") return;

        const elemento = document.querySelector(destino);

        if (elemento) {
            event.preventDefault();
            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

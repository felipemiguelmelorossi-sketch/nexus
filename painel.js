
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_KEY } from "./supabase-config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const { data, error } = await supabase.auth.getUser();

if (error || !data.user) {
    window.location.replace("login.html");
} else {
    document.querySelector(".dashboard h1").textContent =
        "Bem-vindo à Nexus";
}

// Sair da conta
document.getElementById("logout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.replace("login.html");
});

// Nexus Code
const codigo = document.getElementById("codigo");
const executar = document.getElementById("executar");
const visualizacao = document.getElementById("visualizacao");

function atualizarPreview() {
    visualizacao.srcdoc = codigo.value;
}

executar.addEventListener("click", atualizarPreview);

atualizarPreview();

// Nexus Colors
const seletor = document.getElementById("cor");
const campoCor = document.getElementById("codigo-cor");
const copiar = document.getElementById("copiar-cor");
const mensagem = document.getElementById("mensagem-cor");

seletor.addEventListener("input", () => {
    campoCor.value = seletor.value.toUpperCase();
    mensagem.textContent = "";
});

copiar.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(campoCor.value);
        mensagem.textContent = "Código copiado!";
    } catch {
        mensagem.textContent = "Não foi possível copiar automaticamente.";
    }
});


import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { https://uwywhowbjkmcgcrsdsbd.supabase.co/rest/v1/, sb_publishable_PLgaGVIgsqfTGkAtfB_9Vw_nxeXzf3h } from "./supabase-config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const formulario = document.getElementById("auth-form");
const mensagem = document.getElementById("auth-message");

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const pagina = document.body.dataset.page;

    const botao = formulario.querySelector("button");
    botao.disabled = true;
    mostrarMensagem("Aguarde...");

    try {
        if (pagina === "cadastro") {
            const { data, error } = await supabase.auth.signUp({
                email,
                password: senha
            });

            if (error) throw error;

            if (data.session) {
                window.location.href = "painel.html";
            } else {
                mostrarMensagem(
                    "Cadastro iniciado! Verifique seu e-mail para confirmar a conta."
                );
            }
        }

        if (pagina === "login") {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha
            });

            if (error) throw error;

            window.location.href = "painel.html";
        }
    } catch (error) {
        mostrarMensagem("Não foi possível concluir: " + error.message);
    } finally {
        botao.disabled = false;
    }
});

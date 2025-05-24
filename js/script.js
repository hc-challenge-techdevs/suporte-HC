document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const btnModoEscuro = document.getElementById("toggle-dark-mode");
    const btnAumentarFonte = document.getElementById("aumentar-fonte");
    const btnDiminuirFonte = document.getElementById("diminuir-fonte");

    // --- DARK MODE ---
    const darkAtivo = localStorage.getItem("modo-escuro") === "true";
    if (darkAtivo) body.classList.add("dark-mode");

    btnModoEscuro.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("modo-escuro", body.classList.contains("dark-mode"));
    });

    // --- FONTE DINÂMICA GLOBAL ---
    const ajusteFonte = document.documentElement;
    let fonteAtual = parseFloat(localStorage.getItem("tamanho-fonte")) || 100;

    const aplicarFonte = () => {
        ajusteFonte.style.fontSize = `${fonteAtual}%`;
        localStorage.setItem("tamanho-fonte", fonteAtual);
    };

    aplicarFonte();

    btnAumentarFonte.addEventListener("click", () => {
        if (fonteAtual < 200) {
            fonteAtual += 10;
            aplicarFonte();
        }
    });

    btnDiminuirFonte.addEventListener("click", () => {
        if (fonteAtual > 70) {
            fonteAtual -= 10;
            aplicarFonte();
        }
    });
});
const agendamentos = {};
let dataSelecionada = "";

function abrirPrompt(dataDia) {
    dataSelecionada = dataDia;
    document.querySelectorAll("#modalPrompt input").forEach(input => input.value = "");
    document.getElementById("modalPrompt").showModal();
}

function fecharPrompt() {
    document.getElementById("modalPrompt").close();
}

function showAlertDialog(message) {
    const dialog = document.getElementById("alertDialog");
    const msgEl = document.getElementById("alertMessage");
    msgEl.innerText = message;
    dialog.showModal();
}

function confirmarAgendamento() {
    const nome = document.getElementById("nomeInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const telefone = document.getElementById("telefoneInput").value.trim();
    const horario = document.getElementById("horarioInput").value.trim();
    const tipo = document.getElementById("tipoInput").value.trim();

    if (!nome || !email || !telefone || !horario || !tipo) {
        showAlertDialog("Preencha todos os campos.");
        return;
    }

    agendamentos[dataSelecionada] = {
        nome,
        email,
        telefone,
        horario,
        tipo
    };

    const diaEl = document.querySelector(`[data-dia="${dataSelecionada}"]`);
    if (diaEl) diaEl.classList.add("dia-agendado");

    showAlertDialog(
        `✅ Prontinho, ${nome}!
Você receberá lembretes:

🗓 Dia ${dataSelecionada} às ${horario}
📨 Por e-mail e WhatsApp:
- 1 dia antes
- 2 horas antes.`
    );

    fecharPrompt();
}

function mostrarInfoConsulta(dataDia) {
    const consulta = agendamentos[dataDia];
    if (consulta) {
        document.getElementById("infoConsulta").innerText =
            `👤 ${consulta.nome}
📧 ${consulta.email}
📱 ${consulta.telefone}
🕒 ${consulta.horario}
📋 ${consulta.tipo}`;
        document.getElementById("modalInfo").showModal();
    }
}

function fecharInfo() {
    document.getElementById("modalInfo").close();
}

document.addEventListener("DOMContentLoaded", () => {
    const dias = document.querySelectorAll(".dias > div");
    const mesAno = document.querySelector(".calendario h2")?.innerText || "Mês Ano";

    dias.forEach(dia => {
        const texto = dia.textContent.trim();
        if (texto === ".") return;

        const dataDia = `${texto} ${mesAno}`;
        dia.setAttribute("data-dia", dataDia);

        dia.addEventListener("click", () => {
            if (agendamentos[dataDia]) {
                mostrarInfoConsulta(dataDia);
            } else {
                abrirPrompt(dataDia);
            }
        });
    });
});

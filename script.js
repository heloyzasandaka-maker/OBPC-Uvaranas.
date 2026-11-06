
document.addEventListener("DOMContentLoaded", function () {

    const WHATSAPP = "5542999304153";

    const PRECO_HAMBURGUER = 15;
    const PRECO_REFRIGERANTE = 3;
    const TAXA_ENTREGA = 8;

    let quantidade = 1;
    let quantidadeRefri = 0;

    const btnMais = document.getElementById("btnMais");
    const btnMenos = document.getElementById("btnMenos");

    const btnRefriMais = document.getElementById("btnRefriMais");
    const btnRefriMenos = document.getElementById("btnRefriMenos");

    const quantidadeElemento = document.getElementById("quantidade");
    const quantidadeRefriElemento = document.getElementById("quantidadeRefri");

    const resumoQuantidade = document.getElementById("resumoQuantidade");
    const resumoSubtotal = document.getElementById("resumoSubtotal");

    const resumoQuantidadeRefrigerante =
        document.getElementById("resumoQuantidadeRefrigerante");

    const resumoSubtotalRefrigerante =
        document.getElementById("resumoSubtotalRefrigerante");

    const totalElemento = document.getElementById("total");

    const tipoEntrega = document.getElementById("tipoEntrega");
    const dadosEntrega = document.getElementById("dadosEntrega");

    const linhaTaxaEntrega = document.getElementById("linhaTaxaEntrega");

    const pagamento = document.getElementById("pagamento");
    const pixInfo = document.getElementById("pixInfo");

    const btnWhatsApp = document.getElementById("btnWhatsApp");

    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function calcularTotal() {
        const subtotalHamburguer = quantidade * PRECO_HAMBURGUER;
        const subtotalRefri = quantidadeRefri * PRECO_REFRIGERANTE;

        const taxa = tipoEntrega.value === "Entrega"
            ? TAXA_ENTREGA
            : 0;

        return subtotalHamburguer + subtotalRefri + taxa;
    }

    function atualizarResumo() {
        const subtotalHamburguer = quantidade * PRECO_HAMBURGUER;
        const subtotalRefri = quantidadeRefri * PRECO_REFRIGERANTE;

        quantidadeElemento.textContent = quantidade;
        quantidadeRefriElemento.textContent = quantidadeRefri;

        resumoQuantidade.textContent = quantidade;
        resumoSubtotal.textContent = formatarMoeda(subtotalHamburguer);

        resumoQuantidadeRefrigerante.textContent = quantidadeRefri;
        resumoSubtotalRefrigerante.textContent =
            formatarMoeda(subtotalRefri);

        totalElemento.textContent = formatarMoeda(calcularTotal());

        linhaTaxaEntrega.style.display =
            tipoEntrega.value === "Entrega" ? "flex" : "none";
    }

    // ADICIONAR HAMBÚRGUER
    btnMais.addEventListener("click", function () {
        quantidade++;
        atualizarResumo();
    });

    // DIMINUIR HAMBÚRGUER
    btnMenos.addEventListener("click", function () {
        if (quantidade > 1) {
            quantidade--;
            atualizarResumo();
        }
    });

    // ADICIONAR REFRIGERANTE
    btnRefriMais.addEventListener("click", function () {
        quantidadeRefri++;
        atualizarResumo();
    });

    // DIMINUIR REFRIGERANTE
    btnRefriMenos.addEventListener("click", function () {
        if (quantidadeRefri > 0) {
            quantidadeRefri--;
            atualizarResumo();
        }
    });

    // MOSTRAR ENDEREÇO DE ENTREGA
    tipoEntrega.addEventListener("change", function () {
        if (tipoEntrega.value === "Entrega") {
            dadosEntrega.style.display = "block";
        } else {
            dadosEntrega.style.display = "none";
        }

        atualizarResumo();
    });

    // MOSTRAR INFORMAÇÕES DO PIX
    pagamento.addEventListener("change", function () {
        if (pagamento.value === "PIX") {
            pixInfo.style.display = "block";
        } else {
            pixInfo.style.display = "none";
        }
    });

    // MÁSCARA DE TELEFONE
    const telefone = document.getElementById("telefone");

    telefone.addEventListener("input", function () {
        let valor = telefone.value.replace(/\D/g, "");

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length > 10) {
            valor = valor.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                "($1) $2-$3"
            );
        } else if (valor.length > 6) {
            valor = valor.replace(
                /^(\d{2})(\d{4})(\d{0,4})$/,
                "($1) $2-$3"
            );
        } else if (valor.length > 2) {
            valor = valor.replace(
                /^(\d{2})(\d{0,5})$/,
                "($1) $2"
            );
        }

        telefone.value = valor;
    });

    // ENVIAR PEDIDO PELO WHATSAPP
    btnWhatsApp.addEventListener("click", function () {

        const nome = document.getElementById("nome").value.trim();
        const telefoneCliente = telefone.value.trim();

        const entrega = tipoEntrega.value;
        const endereco = document.getElementById("endereco").value.trim();
        const referencia = document.getElementById("referencia").value.trim();

        const formaPagamento = pagamento.value;

        // VALIDAÇÕES
        if (!nome) {
            alert("Por favor, informe seu nome.");
            document.getElementById("nome").focus();
            return;
        }

        if (telefoneCliente.replace(/\D/g, "").length < 10) {
            alert("Informe um número de WhatsApp válido.");
            telefone.focus();
            return;
        }

        if (!entrega) {
            alert("Selecione entrega ou retirada na igreja.");
            tipoEntrega.focus();
            return;
        }

        if (entrega === "Entrega" && !endereco) {
            alert("Informe o endereço de entrega.");
            document.getElementById("endereco").focus();
            return;
        }

        if (entrega === "Entrega" && !referencia) {
            alert("Informe um ponto de referência.");
            document.getElementById("referencia").focus();
            return;
        }

        if (!formaPagamento) {
            alert("Selecione a forma de pagamento.");
            pagamento.focus();
            return;
        }

        const subtotalHamburguer = quantidade * PRECO_HAMBURGUER;
        const subtotalRefri = quantidadeRefri * PRECO_REFRIGERANTE;

        const taxa = entrega === "Entrega" ? TAXA_ENTREGA : 0;

        const total = subtotalHamburguer + subtotalRefri + taxa;

        let mensagem = `
🍔 *NOVO PEDIDO - BURGUER OBPC*

⛪ *OBPC UVARANAS*
❤️ Pedido em prol da reforma da igreja!

👤 *CLIENTE*
Nome: ${nome}
WhatsApp: ${telefoneCliente}

🍔 *PEDIDO*
Burguer OBPC: ${quantidade} unidade(s)
Valor: ${formatarMoeda(subtotalHamburguer)}

🥤 *REFRIGERANTES*
Mini 200 ml: ${quantidadeRefri} unidade(s)
Valor: ${formatarMoeda(subtotalRefri)}
`;

        if (entrega === "Entrega") {
            mensagem += `
📦 *FORMA DE RECEBIMENTO:*
Entrega

📍 Endereço: ${endereco}
🧭 Ponto de referência: ${referencia}

🚚 Taxa de entrega: ${formatarMoeda(TAXA_ENTREGA)}
`;
        } else {
            mensagem += `
📦 *FORMA DE RECEBIMENTO:*
Retirada na igreja
`;
        }

        mensagem += `
💳 *FORMA DE PAGAMENTO:*
${formaPagamento}
`;

        if (formaPagamento === "PIX") {
            mensagem += `
📲 Chave PIX: 42 99930-4153
👤 Favorecido: Wagner Notargiacomo

Após realizar o pagamento, envie o comprovante por aqui.
`;
        }

        mensagem += `
━━━━━━━━━━━━━━━━
💰 *TOTAL DO PEDIDO: ${formatarMoeda(total)}*
━━━━━━━━━━━━━━━━

❤️ Obrigado por contribuir com a reforma da nossa igreja!

⛪ *OBPC UVARANAS*
`;

        const url = "https://wa.me/" + WHATSAPP +
            "?text=" + encodeURIComponent(mensagem);

        window.location.href = url;
    });

    atualizarResumo();

});

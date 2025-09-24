const formContato = document.querySelector('.campos-texto')
const telefone = document.querySelector('.ftel')

telefone.addEventListener('input', (evento) => {
    let valor = evento.target.value.replace(/\D/g, '');

    if (valor.length > 0) {
        if (valor.length <= 2) {
            valor = `(${valor}`;
        } else if (valor.length <= 6) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        } else if (valor.length <= 10) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
        } else {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
        }
    }

    evento.target.value = valor;
});


formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.querySelector('.fnome').value.trim();
    const email = document.querySelector('.femail').value.trim();
    const telLimpo = telefone.value.trim();
    const mensagem = document.getElementById('mensagem')?.value?.trim() || '';

    if (!nome || !email || !telLimpo || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, insira um email válido!');
        return false;
    }

    const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!regexTelefone.test(telLimpo)) {
        alert('Por favor, insira um telefone válido!');
        return false;
    }

    const dadosFormulario = {
        nome: nome,
        email: email,
        telefone: telLimpo,
        mensagem: mensagem
    }

    console.log("Dados do formulário: ", dadosFormulario)
    alert('Formulário enviado com sucesso!')
    formContato.reset();
})
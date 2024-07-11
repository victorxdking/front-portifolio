//Seu JavaScript de validação aqui

const formulario = document.getElementById('meuForm');
const campos = document.querySelectorAll('.formcontato__input');
const mensagemErro = document.querySelectorAll('.error'); 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const button = document.getElementById('botao');
const campoMensagem = document.getElementById('mensagem');

// Validation functions array
const validationFunctions = [nameValidate, emailValidate, assuntoValidate];

// Add input and blur event listeners for immediate feedback
campos.forEach((campo, index) => {
    campo.addEventListener('blur', validationFunctions[index]);
});

campoMensagem.addEventListener('blur', mensagemValidate);

formulario.addEventListener('submit', (event) => {
    if (!validarForm()) {
        event.preventDefault();  // prevent form from submitting

        console.log('Preencha todos os campos');
    } else {
        console.log('Enviado com sucesso');
        
    }
});

function nameValidate() {
    const nome = campos[0].value;
    console.log(`Validating name: ${nome}`); // Debugging statement
    if (nome === '') {
        setError(0, 'O campo Nome é obrigatório');
        return false;
    } else if (nome.length > 50) {
        setError(0, 'O texto deve ter menos de 50 caracteres');
        return false;
    } else {
        removeError(0);
        return true;
    }
}

function emailValidate() {
    const email = campos[1].value;
    console.log(`Validating email: ${email}`); // Debugging statement
    if (email === '') {
        setError(1, 'O campo Email é obrigatório');
        return false;
    } else if (!emailRegex.test(email)) {
        setError(1, 'O Email inserido não é válido');
        return false;
    } else {
        removeError(1);
        return true;
    }
}

function assuntoValidate() {
    const assunto = campos[2].value;
    console.log(`Validating assunto: ${assunto}`); // Debugging statement
    if (assunto === '') {
        setError(2, 'O campo Assunto é obrigatório');
        return false;
    } else if (assunto.length > 50) {
        setError(2, 'O texto deve ter menos de 50 caracteres');
        return false;
    } else {
        removeError(2);
        return true;
    }
}

function mensagemValidate() {

    const mensagem = campoMensagem.value;
    console.log(`Validating mensagem: ${mensagem}`); // Debugging statement
    if (mensagem === '') {
        mensagemErro[3].innerHTML = 'O campo de Mensagem é obrigatório';
        campoMensagem.style.border = '1px solid red';
        mensagemErro[3].style.display = 'block';
        
        return false;
    } else if (mensagem.length > 300) {
        mensagemErro[3].innerHTML = 'O texto pode tener apenas 300 caracteres';
        campoMensagem.style.border = '1px solid red';
        mensagemErro[3].style.display = 'block';
        return false;
    } else {
        campoMensagem.style.border = '';
        mensagemErro[3].style.display = 'none'; 
        return true;
    }
}

function setError(index, mensagem) {
    if (mensagemErro[index]) {
        mensagemErro[index].innerHTML = mensagem;
        campos[index].style.border = '1px solid red';
        mensagemErro[index].style.display = 'block';
    } else {
        console.error(`Error element for index ${index} not found.`);
    }
}

function removeError(index) {
    if (mensagemErro[index]) {
        campos[index].style.border = '';
        mensagemErro[index].style.display = 'none';
    } else {
        console.error(`Error element for index ${index} not found.`);
    }
}

function validarForm() {
    const nomeValido = nameValidate();
    const emailValido = emailValidate();
    const assuntoValido = assuntoValidate();
    const mensagemValida = mensagemValidate();

    console.log(`Validation results - Nome: ${nomeValido}, Email: ${emailValido}, Assunto: ${assuntoValido}, Mensagem: ${mensagemValida}`); // Debugging statement

    if (nomeValido && emailValido && assuntoValido && mensagemValida) {
        button.disabled = false;
        button.style = '';
        return true;

    } else {
        button.style.backgroundColor = 'grey';
        return false;
    }
}


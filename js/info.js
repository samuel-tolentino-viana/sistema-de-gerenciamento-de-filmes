const enviar = document.getElementById('enviar');
const identificador = document.querySelector('.identificador p');
const nomeDestaque = document.querySelector('.apresentacao h1 .destaque');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.fixed');
const corp = document.body;
const botoesGenero = document.querySelectorAll('.fixed .escolha-generos button');
const botoesNota = document.querySelectorAll('.fixed .escolha-notas button');
const generos = document.querySelectorAll('#genero-do-filme option');
const notas = document.querySelectorAll('#status option');

enviar.addEventListener('click', () => {
    const nomeDigitado = document.getElementById('nome');
    const nomeUsual = nomeDigitado.value.trim();


    if (nomeUsual.length >= 3) {
        selecionar();
        mudarNotas();
        nomeDestaque.innerText = `${nomeUsual.charAt(0).toUpperCase() + nomeUsual.slice(1)}!`;
        identificador.innerText = nomeUsual.charAt(0).toUpperCase();
        box.classList.add('desativar');
        overlay.classList.add('desativar');
        corp.classList.remove('bloquear-scroll');
    } else {
        nomeDigitado.placeholder = 'DIGITE SEU NOME!!';
    }


});

botoesGenero[0].classList.add('selecionado');

for (let botaoGeneroClicado of botoesGenero) {
    botaoGeneroClicado.addEventListener('click', () => {
        alterarSelecao(botoesGenero, botaoGeneroClicado);
    });
};

botoesNota[0].classList.add('selecionado');

for (let botaoNotaClicado of botoesNota) {
    botaoNotaClicado.addEventListener('click', () => {
        alterarSelecao(botoesNota, botaoNotaClicado);
    });
}

function alterarSelecao(botoes, botoesClicado) {
    for (let removeClass of botoes) {
        removeClass.classList.remove('selecionado');
    }
    botoesClicado.classList.add('selecionado');
}

function selecionar() {
    const generoSelecionado = document.querySelector('.escolha-generos button.selecionado');
    let generoColocado = document.querySelector('#genero-do-filme');

    for (let todosOsGeneros of generos) {
        if (todosOsGeneros.textContent === generoSelecionado.textContent) {
            generoColocado.value = todosOsGeneros.value;
        };
    };

    generoColocado.dispatchEvent(new Event('change'));
};

function mudarNotas() {
    const statusSelecionado = document.querySelector('.escolha-notas button.selecionado');
    let notaColocada = document.querySelector('#status');

    for(let todosAsNotas of notas) {
        if(todosAsNotas.textContent === statusSelecionado.textContent) {
            notaColocada.value = todosAsNotas.value;
        }
        
        notaColocada.dispatchEvent(new Event('change'));
    };
};
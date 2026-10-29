const nomeGuardado = localStorage.getItem('nome');
const identificador = document.querySelector('.identificador p');
const nomeDestaque = document.querySelector('.apresentacao h1 .destaque');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.fixed');
const corp = document.body;
const enviar = document.getElementById('enviar');
const botoesGenero = document.querySelectorAll('.fixed .escolha-generos button');
const botoesNota = document.querySelectorAll('.fixed .escolha-notas button');
const generos = document.querySelectorAll('#genero-do-filme option');
const opcoesSatatus = document.querySelectorAll('#status option');

enviar.addEventListener('click', () => {
    const nomeDigitado = document.getElementById('nome');
    const nomeUsual = nomeDigitado.value.trim();


    if (nomeUsual.length >= 3) {
        selecionar();
        mudarNotas();
        nomeDestaque.innerText = `${nomeUsual.charAt(0).toUpperCase() + nomeUsual.slice(1)}`;
        identificador.innerText = nomeUsual.charAt(0).toUpperCase();
        limparBox();
        localStorage.setItem('nome', nomeUsual.charAt(0).toUpperCase() + nomeUsual.slice(1));
    } else {
        nomeDigitado.placeholder = 'DIGITE SEU NOME!!';
    }


});

botoesGenero[0].classList.add('bnt-selecionado');

for (let botaoGeneroClicado of botoesGenero) {
    botaoGeneroClicado.addEventListener('click', () => {
        alterarSelecao(botoesGenero, botaoGeneroClicado);
    });
};

botoesNota[0].classList.add('bnt-selecionado');

for (let botaoNotaClicado of botoesNota) {
    botaoNotaClicado.addEventListener('click', () => {
        alterarSelecao(botoesNota, botaoNotaClicado);
    });
}

function alterarSelecao(botoes, botoesClicado) {
    for (let removeClass of botoes) {
        removeClass.classList.remove('bnt-selecionado');
    }
    botoesClicado.classList.add('bnt-selecionado');
}

function selecionar() {
    const generoSelecionado = document.querySelector('.escolha-generos button.bnt-selecionado');
    let generoColocado = document.querySelector('#genero-do-filme');

    for (let todosOsGeneros of generos) {
        if (todosOsGeneros.textContent === generoSelecionado.textContent) {
            generoColocado.value = todosOsGeneros.value;
        };
    };

    generoColocado.dispatchEvent(new Event('change'));
};

function mudarNotas() {
    const statusSelecionado = document.querySelector('.escolha-notas button.bnt-selecionado');
    let notaColocada = document.querySelector('#status');

    for (let todosAsNotas of opcoesSatatus) {
        if (todosAsNotas.textContent === statusSelecionado.textContent) {
            notaColocada.value = todosAsNotas.value;
        }

        notaColocada.dispatchEvent(new Event('change'));
    };
};

function limparBox() {
    box.classList.add('desativar');
    overlay.classList.add('desativar');
    corp.classList.remove('bloquear-scroll');
};

const botao = document.querySelector('.bg-click');
const sairBarra = document.querySelector('.sair');

botao.addEventListener('click', () => {
    const barraLateral = document.querySelector('.seletores');
    const nomeColocarNaBarra = document.querySelector('.apresentacao .destaque').textContent;
    const areaNomeBarraLateral = document.querySelector('.sidebar-perfil strong');
    const identificadorDaBarraLateral = document.querySelector('.sidebar-perfil .perfil-avatar');

    if (barraLateral.classList.contains('desativar')) {
        identificadorDaBarraLateral.innerText = nomeColocarNaBarra.charAt(0).toUpperCase();
        areaNomeBarraLateral.innerText = nomeColocarNaBarra;
        barraLateral.classList.remove('desativar');
        corp.classList.add('bloquear-scroll');
        overlay.classList.remove('desativar');
    }
});

sairBarra.addEventListener('click', () => {
    const barraLateral = document.querySelector('.seletores');

    if (!barraLateral.classList.contains('desativar')) {
        barraLateral.classList.add('reverter-barra');
        corp.classList.remove('bloquear-scroll');
        overlay.classList.add('desativar');
        setTimeout(() => {
            barraLateral.classList.add('desativar');
            barraLateral.classList.remove('reverter-barra');
        }, 1000);
    }
});

if (nomeGuardado) {
    limparBox();
    nomeDestaque.innerText = `${nomeGuardado}`;
    identificador.innerText = nomeGuardado.charAt(0).toUpperCase();
}
const irAFilmes = document.getElementById('levar-aos-filmes');
const notas = document.getElementById('notas');
const assistidos = document.getElementById('assistidos');
const naoAssistidos = document.getElementById('nao-assistidos');
const catalogoDefilmes = document.querySelector('.catalogo-filmes');
const selecaoStatus = document.querySelector('#status');

irAFilmes.addEventListener('click', () => {
    selecaoStatus.value = 'todos';
    selecaoStatus.dispatchEvent(new Event('change'));
    rolarAosFilmes();
});

notas.addEventListener('click', () => {
    selecaoStatus.value = 'maiores avaliacoes';
    selecaoStatus.dispatchEvent(new Event('change'));
    rolarAosFilmes();
});

assistidos.addEventListener('click', () => {
    selecaoStatus.value = 'assistido';
    selecaoStatus.dispatchEvent(new Event('change'));
    rolarAosFilmes();
});

naoAssistidos.addEventListener('click', () => {
    selecaoStatus.value = 'nao assistido';
    selecaoStatus.dispatchEvent(new Event('change'));
    rolarAosFilmes();
});

function rolarAosFilmes() {
    const posicao = catalogoDefilmes.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: posicao - 120,
        behavior: 'smooth'
    });
};

fetch('data/data.json')

    .then(resposta => {
        return resposta.json();
    })

    .then(dadosCompletos => {
        setTimeout(() => {
            alterarInformacoes(dadosCompletos);
        }, 200);
    });

function alterarInformacoes(dads) {
    const cards = document.querySelectorAll('.catalogo-filmes article');
    const numeroParaAlterar = document.querySelectorAll('.info-ativid .numero');

    numeroParaAlterar[0].innerHTML = cards.length;

    const mediaNotas = dads.filter((filme) => {
        return filme.notaDoFilme !== undefined && filme.notaDoFilme !== ''; // FILTER PEGA O ARRAY QUE PASSA NA CONDIÇÃO
    });

    let soma = 0;

    for (let todasNotas of mediaNotas) {
        soma += Number(todasNotas.notaDoFilme);
    };

    soma = soma / mediaNotas.length;
    numeroParaAlterar[1].innerHTML = soma.toFixed(2);

    const assistidos = [...cards].filter((cards) => {
        return cards.dataset.estadoDoFilme === 'Assistido';
    }).length;

    numeroParaAlterar[2].innerHTML = assistidos;

    const naoAssistidos = [...cards].filter((cards) => {
        return cards.dataset.estadoDoFilme === 'Não Assistido';
    }).length;

    numeroParaAlterar[3].innerHTML = naoAssistidos;
};
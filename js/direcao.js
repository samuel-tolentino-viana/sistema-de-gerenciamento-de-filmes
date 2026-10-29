const botoesSelecao = document.querySelectorAll('#select');
const areaFilmes = document.querySelector('.catalogo-filmes');

for (let botaoClicado of botoesSelecao) {
    botaoClicado.addEventListener('click', () => {
        for (let botao of botoesSelecao) {
            botao.classList.remove('selecionado');
        };
        botaoClicado.classList.add('selecionado');

        fetch('data/data.json')

            .then(resposta => {
                return resposta.json();
            })

            .then(dadosCompletos => {
                alterarHorientacao(dadosCompletos);
                alterarImagem(dadosCompletos);

            });

    });
};

function alterarHorientacao(dads) {
    const cards = document.querySelectorAll('.catalogo-filmes article');

    if (botoesSelecao[1].classList.contains('selecionado')) {
        areaFilmes.classList.add('controle-grid');
        for (let i = 2; i < cards.length; i++) {
            cards[i].classList.add('horizontal');
        };

        for (let dadosDoJson of dads) {
            dadosDoJson.modoHorizontal = true;
        }
    } else {
        areaFilmes.classList.remove('controle-grid');
        for (let i = 2; i < cards.length; i++) {
            cards[i].classList.remove('horizontal');
            cards[0].classList.remove('espacamento');
            cards[1].classList.remove('espacamento');
        };

        for (let dadosDoJson of dads) {
            dadosDoJson.modoHorizontal = false;
        };
    }
};

function alterarImagem() {
    const cards = document.querySelectorAll('.catalogo-filmes article');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const imagem = card.querySelector('.filme-poster img');

        if (i < 2) {
            continue;
        }

        if (card.classList.contains('horizontal')) {
            imagem.src = card.dataset.posterHorizontal;
        } else {
            imagem.src = card.dataset.posterVertical;
        }
    }
};
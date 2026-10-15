const filmesLocal = document.querySelector('.catalogo-filmes');

fetch('data/data.json')

    .then(resposta => {
        return resposta.json();
    })

    .then(dadosCompletos => {
        for (let todosCards of dadosCompletos) {
            complet(todosCards);
        }
    });

// ASSISTIDO

function complet(dads) {
    const card = document.createElement('article');
    card.classList.add('fundo');
    filmesLocal.appendChild(card);
    
    posterFilm(dads, card);

    if (dads.modo === 'lancado') {
        informacoesDaSerie(dads, card);
        botoes(card);
    } else {
        card.classList.add('card-new-film');
        destaques(dads, card);
    }
};

function posterFilm(dads, cardPai) {
    const areaPoster = document.createElement('div');
    areaPoster.classList.add('filme-poster');
    cardPai.appendChild(areaPoster);

    const imagem = document.createElement('img');

    if (dads.imagemCompleta) {
        imagem.classList.add('completo');
    }

    if (dads.conteudo === 'filme' || dads.conteudo === 'anime') {
        imagem.alt = `Imagem do ${dads.conteudo}: ${dads.titulo}`;
    } else if (dads.conteudo === 'serie') {
        imagem.alt = `Imagem da ${dads.conteudo}: ${dads.titulo}`;
    } else {
        imagem.alt = `${dads.titulo}`;
    }
    areaPoster.appendChild(imagem);
};

function informacoesDaSerie(dads, cardPai) {
    const infoSerie = document.createElement('div');
    infoSerie.classList.add('info-serie');
    cardPai.appendChild(infoSerie);

    const tituloDoFilme = document.createElement('h3');
    tituloDoFilme.innerText = dads.titulo;
    infoSerie.appendChild(tituloDoFilme);

    const generoFilme = document.createElement('p');
    generoFilme.classList.add('genero');
    generoFilme.innerText = dads.genero;
    infoSerie.appendChild(generoFilme);

    const notaEassistido = document.createElement('div');
    infoSerie.appendChild(notaEassistido);

    const nota = document.createElement('p');
    nota.innerHTML = `<i class="fa-solid fa-star nota"></i> ${dads.notaDoFilme}`;
    notaEassistido.appendChild(nota);

    const estado = document.createElement('span');
    notaEassistido.appendChild(estado);

    assistiu(dads, estado);
};

function botoes(cardPai) {
    const areaBotoes = document.createElement('div');
    areaBotoes.classList.add('filme-acoes');
    cardPai.appendChild(areaBotoes);

    const infoFilme = document.createElement('button');
    const editarFilme = document.createElement('button');
    const deletarFilme = document.createElement('button');

    infoFilme.type = 'button';
    editarFilme.type = 'button';
    deletarFilme.type = 'button';

    deletarFilme.classList.add('delete');

    infoFilme.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    editarFilme.innerHTML = '<i class="fa-solid fa-pen"></i>';
    deletarFilme.innerHTML = '<i class="fa-solid fa-trash"></i>';

    areaBotoes.appendChild(infoFilme);
    areaBotoes.appendChild(editarFilme);
    areaBotoes.appendChild(deletarFilme);
};



function destaques(dads, cardPai) {
    const infoSerie = document.createElement('div');
    infoSerie.classList.add('info-serie');
    cardPai.appendChild(infoSerie);

    const tituloDoFilme = document.createElement('h3');
    tituloDoFilme.innerText = dads.titulo;
    infoSerie.appendChild(tituloDoFilme);

    const generoFilme = document.createElement('p');
    generoFilme.classList.add('genero', 'destaque-centro');
    generoFilme.innerText = dads.genero;
    infoSerie.appendChild(generoFilme);

    const infoNewFilm = document.createElement('div');
    infoNewFilm.classList.add('info-new-film');
    infoSerie.appendChild(infoNewFilm);

    const emBreve = document.createElement('span');
    emBreve.innerText = 'Em breve nos cinemas!!';
    infoNewFilm.appendChild(emBreve);
    botoes(infoNewFilm);
};



// FUNÇÕES AUXILIARES


function assistiu(dads, estado) {

    if (dads.estadoDoFilme === 'assistido') {
        estado.classList.add('assistido');
        estado.innerHTML = '<i class="fa-solid fa-circle-check"></i> Assistido';
    } else if (dads.estadoDoFilme === 'naoAssistido') {
        estado.classList.add('nao-assistido');
        estado.innerHTML = '<i class="fa-solid fa-clock"></i> Não Assistido';
    } else {
        estado.innerText = '';
    }

}
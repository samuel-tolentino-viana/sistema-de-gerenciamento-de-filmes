const generoFilme = document.getElementById('genero-do-filme');
const statusFilme = document.getElementById('status');


fetch('./data/data.json')

    .then(resposta => {
        return resposta.json();
    })
    .then(dadosCompletos => {

        generoFilme.addEventListener('change', (event) => {

            let itemSelecionado = event.target.options[event.target.selectedIndex].text;

            filtrar(itemSelecionado);
        });

    });

function filtrar(generoSelect) {
    const cardFilmes = document.querySelectorAll('.catalogo-filmes article');

    for (let card of cardFilmes) {

        if (card.dataset.genero === generoSelect) {
            card.classList.remove('desativar');
        } else {
            card.classList.add('desativar');
        }
    };
};
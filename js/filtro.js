const generoFilme = document.getElementById('genero-do-filme');
const statusFilme = document.getElementById('status');
const cardFilmes = document.querySelectorAll('.catalogo-filmes article');

fetch('./data/data.json')

    .then(resposta => {
        return resposta.json();
    })
    .then(dadosCompletos => {
        for (let todosOsDados of dadosCompletos) {
            generoFilme.addEventListener('change', (event) => {
                let itemSelecionado = event.target.options[event.target.selectedIndex].text;
                filtrar(todosOsDados, itemSelecionado);
            });
        };
        console.log(dadosCompletos);
    });

function filtrar(dados, generoSelect) {
    dados.genero == generoSelect;
    if (dados.genero != generoSelect) {
        dados.naTela = false;
    }
};
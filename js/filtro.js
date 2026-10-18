// AUXILIO DE INTELIGENCIA ARTIFICIAL
const generoFilme = document.getElementById('genero-do-filme');
const statusFilme = document.getElementById('status');

let generoSelecionado = 'Todos';
let statusSelecionado = 'Todos';

generoFilme.addEventListener('change', (event) => {
    generoSelecionado = event.target.value === 'todos'
        ? 'Todos'
        : event.target.options[event.target.selectedIndex].text;

    filtrar();
});

statusFilme.addEventListener('change', (event) => {
    statusSelecionado = event.target.options[event.target.selectedIndex].text;
    filtrar();
});

function filtrar() {
    const catalogo = document.querySelector('.catalogo-filmes');
    const cardFilmes = [...catalogo.querySelectorAll('article')];

    // Ordenar pelas notas
    if (
        statusSelecionado === 'Maiores Avaliações' ||
        statusSelecionado === 'Menores Avaliações'
    ) {
        cardFilmes.sort((a, b) => {
            const notaA = Number(a.dataset.notaDoFilme);
            const notaB = Number(b.dataset.notaDoFilme);

            if (statusSelecionado === 'Maiores Avaliações') {
                return notaB - notaA;
            }

            return notaA - notaB;
        });

        cardFilmes.forEach((card) => {
            catalogo.appendChild(card);
        });
    }

    // Filtrar os cards
    for (const card of cardFilmes) {
        const correspondeGenero =
            generoSelecionado === 'Todos' ||
            card.dataset.genero === generoSelecionado;

        let correspondeStatus;

        if (statusSelecionado === 'Todos') {
            correspondeStatus = true;
        } else if (statusSelecionado === 'Em Breve') {
            correspondeStatus = card.classList.contains('card-new-film');
        } else if (
            statusSelecionado === 'Maiores Avaliações' ||
            statusSelecionado === 'Menores Avaliações'
        ) {
            correspondeStatus = !card.classList.contains('card-new-film');
        } else {
            correspondeStatus =
                card.dataset.estadoDoFilme === statusSelecionado;
        }

        if (correspondeGenero && correspondeStatus) {
            card.classList.remove('desativar');
        } else {
            card.classList.add('desativar');
        }
    }
}

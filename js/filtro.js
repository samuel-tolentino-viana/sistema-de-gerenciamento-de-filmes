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

    cardFilmes.forEach((card, index) => {
        if (card.dataset.ordemOriginal === undefined) {
            card.dataset.ordemOriginal = index;
        }
    });

    // Ordenar pelas notas ou restaurar a ordem original
    if (
        statusSelecionado === 'Maiores Avaliações' ||
        statusSelecionado === 'Menores Avaliações'
    ) {
        const cardsComNota = cardFilmes.filter((card) => {
            const nota = card.dataset.notaDoFilme;

            return nota !== undefined &&
                nota.trim() !== '' &&
                Number.isFinite(Number(nota));
        });

        cardsComNota.sort((a, b) => {
            const notaA = Number(a.dataset.notaDoFilme);
            const notaB = Number(b.dataset.notaDoFilme);

            if (statusSelecionado === 'Maiores Avaliações') {
                return notaB - notaA;
            }

            return notaA - notaB;
        });

        // Colocar primeiro os cards com nota, em ordem de avaliação
        cardsComNota.forEach((card) => {
            catalogo.appendChild(card);
        });

        // Os cards sem nota ficam depois, na ordem original
        const cardsSemNota = cardFilmes
            .filter((card) => !cardsComNota.includes(card))
            .sort((a, b) => {
                return Number(a.dataset.ordemOriginal) -
                    Number(b.dataset.ordemOriginal);
            });

        cardsSemNota.forEach((card) => {
            catalogo.appendChild(card);
        });
    } else {
        // Restaurar a ordem original ao sair da ordenação por notas
        cardFilmes.sort((a, b) => {
            return Number(a.dataset.ordemOriginal) -
                Number(b.dataset.ordemOriginal);
        });

        cardFilmes.forEach((card) => {
            catalogo.appendChild(card);
        });
    }

    // Filtrar os cards por gênero e status
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
            const nota = card.dataset.notaDoFilme;

            correspondeStatus = nota !== undefined &&
                nota.trim() !== '' &&
                Number.isFinite(Number(nota));
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

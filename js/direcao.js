const botoesSelecao = document.querySelectorAll('#select');

let botaoInicial = 0;

for(let botaoClicado of botoesSelecao) {
    botaoClicado.addEventListener('click', () => {
        botaoClicado.classList.add('selecionado');
    });
};
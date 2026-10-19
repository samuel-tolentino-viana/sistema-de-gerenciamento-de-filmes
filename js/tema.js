const botaoTrocarTema = document.querySelector('.trocar-tema');
const corpo = document.body;

botaoTrocarTema.addEventListener('click', () => {
    corpo.classList.toggle('tema-claro');
    if (corpo.classList.contains('tema-claro')) {
        botaoTrocarTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('tema', 'claro');
    } else {
        botaoTrocarTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('tema', 'escuro');
    }
});

let corDoTema = localStorage.getItem('tema');
if (corDoTema === 'claro') {
    corpo.classList.add('tema-claro');
    botaoTrocarTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
}
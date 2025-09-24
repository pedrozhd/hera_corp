const menuHamburguer = document.querySelector('.logo__menu')
const menu = document.querySelector('.menu__hamburguer')

menuHamburguer.addEventListener('click', () => {
    abrirMenu();
})

function abrirMenu() {
    let menuMobile = document.querySelector('.menuMobile')

    if (menuMobile) {
      menu.removeChild(menuMobile)
      return;
    }

    const menuHTML = `
      <div class="menuMobile">
          <ul class="lista__mobile">
              <li><a href="index.html">Home</a></li>
              <li><a href="./html/about.html">Sobre</a></li>
              <li><a href="./html/integrantes.html">Integrantes</a></li>
              <li><a href="./html/faq.html">FAQ</a></li>
              <li><a href="./html/contact.html">Contato</a></li>
              <li><a href="./html/solution.html">Solução</a></li>
          </ul>
      </div>
    `

    menu.insertAdjacentHTML('beforeend', menuHTML)

    document.addEventListener('click', fecharMenuFora);
}

function fecharMenu() {
    const menuMobile = document.querySelector('.menuMobile');
    if (menuMobile) {
        menu.removeChild(menuMobile);
        document.removeEventListener('click', fecharMenuFora);
    }
}

function fecharMenuFora(e) {
    if (!e.target.closest('.menuMobile') && !e.target.closest(menuHamburguer)) {
        fecharMenu();
    }
}
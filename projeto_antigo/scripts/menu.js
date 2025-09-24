const menuHamburguer = document.querySelector('.menu__hamburguer');
const menuOverlay = document.querySelector('.menu_overlay');
const closeMenu = document.querySelector('.close_menu');
const menuLinks = document.querySelectorAll('ul li');
const footer = document.querySelector('footer.rodape')

menuHamburguer.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    footer.style.display = 'none'
});

closeMenu.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    footer.style.display = 'block'
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            menuOverlay.classList.remove('active');
        }

        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, href);
            }
        }
    });
});
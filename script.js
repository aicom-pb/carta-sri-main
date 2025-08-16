document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.querySelector('.back-to-top');
    const departmentNav = document.querySelector('.department-nav');
    const navTabs = document.querySelectorAll('.nav-tab');
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    const departmentCards = document.querySelectorAll('.department-card');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const overlay = document.querySelector('.overlay');

    // --- Função de Rolagem Suave ---
    const smoothScrollTo = (element) => {
        // Offset para a barra de navegação fixa
        const headerOffset = departmentNav ? departmentNav.offsetHeight + 20 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    // --- Navegação por Abas e Botões Mobile ---
    const setupNavEvents = (buttons) => {
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    smoothScrollTo(targetElement);
                }

                // Fecha o menu mobile se um botão de navegação for clicado
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    };

    if (navTabs.length > 0) {
        setupNavEvents(navTabs);
    }
    if (mobileNavBtns.length > 0) {
        setupNavEvents(mobileNavBtns);
    }

    // --- Alternar Visibilidade do Menu Mobile ---
    const toggleMenu = () => {
        if (mobileMenu && overlay) {
            mobileMenu.classList.toggle('open');
            overlay.classList.toggle('visible');
        }
    };

    if (mobileMenuBtn && closeMenuBtn && overlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // --- Atualizar Aba Ativa na Rolagem ---
    const updateActiveNav = () => {
        let current = '';
        const navHeight = departmentNav ? departmentNav.offsetHeight : 0;

        departmentCards.forEach(card => {
            const cardTop = card.offsetTop - navHeight - 25; // Pequeno offset
            if (window.pageYOffset >= cardTop) {
                current = card.getAttribute('id');
            }
        });

        const setActive = (buttons) => {
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.target === current) {
                    btn.classList.add('active');
                }
            });
        };
        
        setActive(navTabs);
        setActive(mobileNavBtns);
    };

    // --- Lógica do Botão "Voltar ao Topo" ---
    const handleScroll = () => {
        // Visibilidade do botão
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
        // Atualiza a navegação ativa
        if (departmentCards.length > 0) {
            updateActiveNav();
        }
    };

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez para o caso da página carregar já rolada
});
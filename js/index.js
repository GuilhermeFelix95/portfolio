document.addEventListener('DOMContentLoaded', () => {

    // --- BLOCO 1: ANIMAÇÕES VISUAIS (Digitação e Hover dos Cards) ---
    const subtitulo = document.querySelector('.subtitulo-animado');
    if (subtitulo) {
        const textoOriginal = subtitulo.innerHTML;
        subtitulo.innerHTML = '';
        let i = 0;
        function digitar() {
            if (i < textoOriginal.length) {
                subtitulo.innerHTML += textoOriginal.charAt(i);
                i++;
                setTimeout(digitar, 75);
            }
        }
        digitar();
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- BLOCO 2: OBSERVERS DE SCROLL (Animação de entrada e Menu Inteligente) ---
    const secoes = document.querySelectorAll('.secao');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { rootMargin: '-50% 0px -50% 0px' };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Animação de fade-in
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
            
            // Lógica do Menu Inteligente
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if(navLink) navLink.classList.add('active');
            }
        });
    }, observerOptions);

    secoes.forEach(secao => scrollObserver.observe(secao));

    // --- BLOCO 3: LÓGICA DO MODAL DE PROJETOS ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.card-projeto');

    projectCards.forEach(card => {
        card.querySelector('.btn-detalhes').addEventListener('click', (e) => {
            e.preventDefault();
            
            modalTitle.textContent = card.dataset.title;
            modalDetails.textContent = card.dataset.details;
            
            modalOverlay.classList.remove('hidden');
        });
    });

    function closeModal() {
        modalOverlay.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // --- BLOCO 4: BOTÃO VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });
});



gsap.fromTo ( ".loading-page", 
    { opacity: 1 },
    {
        opacity: 0,
        duration: 2,
        delay: 2.5,
        esase: "power2.inOut",
    }
);

gsap.fromTo (".logo-name",
    {
        y: 50,
        opacity: 0,
    },
    {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
    }
);

const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (lastScrollY < window.scrollY) {
                // Bajando - esconder navbar
                navbar.classList.add('hidden');
            } else {
                // Subiendo - mostrar navbar
                navbar.classList.remove('hidden');
            }
            
            lastScrollY = window.scrollY;
        });


                                        
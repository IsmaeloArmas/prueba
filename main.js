

gsap.fromTo ( ".loading-page", 
    { opacity: 1 },
    {
        opacity: 0,
        duration: 2,
        delay: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
            document.querySelector('.loading-page').style.display = 'none'; 
        }
    }
);

gsap.from (".logo-name",
    {
        y: 50,
        opacity: 0,
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

gsap.registerPlugin(ScrollTrigger);

gsap.to(".logo-hero1", {
    opacity: 0,
    y: -50, // Añade movimiento vertical para mejor efecto
    duration: 1, // Duración de la animación en segundos
    ease: "power2.out", // Tipo de interpolación
    scrollTrigger: {
        trigger: ".logo-hero1",
        start: "top 20%", // Cuando el top del hero llegue al 80% de la ventana
        end: "bottom top",
        markers: false, // Para debug (quitar en producción)
        toggleActions: "play reverse none reverse" // play on enter, none on leave, none on enter back, none on leave back
    }
});

const footer = document.querySelector(".footer");
const lastCard = document.querySelector(".card.scroll");
const pinnedSections = gsap.utils.toArray(".pinned");

pinnedSections.forEach((section, index, sections) => {
    let img = section.querySelector(".img");

    let nextSection = section [index + 1] || lastCard;
    let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

    gsap.to (section, {
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: index === section.length?`+=${lastCard.offsetHeight/2}`:footer.offsetTop-window.innerHeight,
            pin: true,
            pinSpacing: false,
            scrub: 1,
        },
    });

    gsap.fromTo(img, { scale: 1 },{
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: endScalePoint,
            scrub: 1,
        },
    });
});

const hero = document.querySelector(".hero");
ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "+=400vh",
    duration: 2,
    scrub: 1,
    onUpdate: (self) => {
        let opacityProgress = self.progress;
        hero.style.opacity = 1 - opacityProgress;
    },
});
                                        
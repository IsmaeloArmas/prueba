

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

const logoHero = document.querySelector(".logo-hero1");
const btn = document.querySelector(".btn")

gsap.to(logoHero, {
    opacity: 0,
    y: -50, // Añade movimiento vertical para mejor efecto
    duration: 1, // Duración de la animación en segundos
    ease: "power2.out", // Tipo de interpolación
    scrollTrigger: {
        trigger: logoHero,
        start: "top 20%", 
        end: "bottom top",
        markers: false, 
        toggleActions: "play reverse none reverse",
        scrub: 1.5,
    }
});

gsap.to(btn, {
    opacity: 0,
    scrollTrigger: {
        trigger: logoHero,
        start: "top 20%",
        end: "bottom top",
        markers: false, 
        toggleActions: "play reverse none reverse",
        scrub: 1.5,
    }
});

const footer = document.querySelector(".footer");
const lastCard = document.querySelector(".card.scroll");
const lastTitle = document.querySelector(".lC");
const imgFinal = document.querySelector(".final");
const pinnedSections = gsap.utils.toArray(".pinned");

pinnedSections.forEach((section, index, sections) => {
    let img = section.querySelector(".img");
    let titulo = section.querySelector(".titulo")

    let nextSection = section [index + 1] || lastCard;
    let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

    gsap.to (section, {
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: index === section.length?`+=${lastCard.offsetHeight/2}`:footer.offsetTop-window.innerHeight,
            pin: true,
            pinSpacing: false,
            scrub: 2,
        },
    });

    gsap.fromTo(img, { 
        scale: 1, 
        filter: "brightness(1)",
        },
        {
        filter: "brightness(.3)",
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: endScalePoint,
            scrub: 1.5, 
        },
    });

    if (titulo) {
        gsap.fromTo(titulo,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 20%",   // empieza cuando entra la card
                    end: "top top",     // termina cuando avanza más
                    scrub: 2,
                    markers: false,
                },
            }
        );
    }

});

const hero = document.querySelector(".hero");
ScrollTrigger.create({
    trigger: logoHero,
    start: "top top",
    end: "+=400vh",
    duration: 2,
    scrub: 1.5,
    markers: false,
    onUpdate: (self) => {
        let opacityProgress = self.progress;
        hero.style.opacity = 1 - opacityProgress;
    },
});

gsap.fromTo(lastTitle,
            { opacity: 0, y: 60, },
            {
                opacity: 1,
                y: 0,
                delay: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: lastCard,
                    start: "top 10%",   // empieza cuando entra la card
                    end: "top top",     // termina cuando avanza más
                    scrub: 2,
                    markers: false,
                },
            }
        );

gsap.fromTo(imgFinal, { filter: "brightness(1)" },
    {
        filter: "brightness(.7)",
        scrollTrigger: {
                    trigger: lastCard,
                    start: "top 10%",   // empieza cuando entra la card
                    end: "top top",     // termina cuando avanza más
                    scrub: 2,
                    markers: false,
                },
    }
)
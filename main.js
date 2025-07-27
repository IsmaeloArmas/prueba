document.addEventListener("DOMContentLoaded", () => { 

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time*1000);
});
gsap.ticker.lagSmoothing(0);

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

const spotlightImages = document.querySelector(".spotlight-images");
const maskContainer = document.querySelector(".mask-container");
const maskImage = document.querySelector(".mask-img");
const maskHeader = document.querySelector(".mask-container .header h1");

const spotlightContainerHeight = spotlightImages.offsetHeight;
const viewportHeight = window.innerHeight;
const initialOffset = spotlightContainerHeight * 0.05;
const totalMoment = spotlightContainerHeight + initialOffset + viewportHeight;

let headerSplit = null;
if (maskHeader) {
    headerSplit = SplitText.create(maskHeader, {
        type: "words",
        wordsClass: "spotlight-word",
    });
    gsap.set(headerSplit.words, { opacity: 0 });
}

ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top top",
    end: `+=${window.innerHeight*7}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1.5,
    onUpdate: (self) => {
        const progress = self.progress;

        if (progress < 0.5) {
            const imagesMoveProgress = progress / .5;
            const startY = 5;
            const endY = -(totalMoment/spotlightContainerHeight)*100;
            const currentY = startY + (endY-startY)*imagesMoveProgress;

            gsap.set(spotlightImages, {
                y: `${currentY}%`,
            });
        }

        if (maskContainer && maskImage) {
            if (progress > 0.25 && progress < 0.75){
                const maskProgress = (progress - 0.25) / 0.5;
                const maskSize = `${maskProgress*850}%`;
                const imageScale = 1.5-maskProgress*.5;

                maskContainer.style.setProperty("-webkit-mask-size", maskSize);
                maskContainer.style.setProperty("mask-size", maskSize);

                gsap.set(maskImage, {
                    scale: imageScale,
                });
            } else if (progress < 0.25) {
                maskContainer.style.setProperty("-webkit-mask-size", "0%");
                maskContainer.style.setProperty("mask-size", "0%");

                gsap.set(maskImage, {
                    scale: 1.5,
                });
            } else if (progress > 0.75) {
                maskContainer.style.setProperty("-webkit-mask-size", "550%");
                maskContainer.style.setProperty("mask-size", "550%");

                gsap.set(maskImage, {
                    scale: 1,
                });
            }
        }

        if (headerSplit && headerSplit.words.length > 0) {
            if (progress > 0.75 && progress<0.95) {
                const textProgress = (progress - .75)/.2;
                const totalWords = headerSplit.words.length;

                headerSplit.words.forEach((word,index) => {
                    const wordRevealProgress = index / totalWords;

                    if (textProgress > wordRevealProgress) {
                        gsap.set(word, {opacity: 1});
                    } else {
                        gsap.set(word, {opacity: 0});
                    }
                });
            } else if (progress < 0.75) {
                gsap.set(headerSplit.words, {opacity: 0});
            } else if (progress > 0.95) {
                gsap.set(headerSplit.words, {opacity: 1});
            }
        }
    },
});

});
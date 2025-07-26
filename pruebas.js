gsap.registerPlugin(ScrollTrigger);

const navbar = document.getElementById('navbar');
let lastScroll = 0;

ScrollTrigger.create({
    start: 0,          // Comienza en el tope de la página
    end: "max",        // Termina al final del scroll
    onUpdate: (self) => {  // Función que se ejecuta al actualizarse el scroll
        // Lógica de mostrar/esconder
    }
});

if (self.scroll() > lastScroll && self.scroll() > 50) {
    // Bajando y hemos pasado los 50px - esconder
    gsap.to(navbar, {
        y: -70,          // Mueve el navbar hacia arriba (fuera de vista)
        duration: 0.3,   // Duración de la animación en segundos
        ease: "power2.inOut"  // Tipo de suavizado de la animación
    });
} else {
    // Subiendo o cerca del top - mostrar
    gsap.to(navbar, {
        y: 0,            // Vuelve a posición original
        duration: 0.3,
        ease: "power2.inOut"
    });
}
lastScroll = self.scroll();  // Guardamos la posición actual para la próxima comparación


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scroll-track');
    const pages = document.querySelectorAll('.menu-page');
    
    // Verificación de seguridad
    if (!track || pages.length === 0) return;

    // Pixeles exactos de scroll para dar vuelta a una hoja completa
    const scrollPerSheet = 700; 

    function updatePages() {
        const trackRect = track.getBoundingClientRect();
        
        // Calculamos la distancia de scroll efectiva
        let scrollDistance = 120 - trackRect.top;
        if (scrollDistance < 0) scrollDistance = 0;

        pages.forEach((page, index) => {
            // La última hoja (la naranja de la casa) se queda como base, nunca gira
            if (index === pages.length - 1) return;
            
            // Momentos de inicio y fin del giro para esta hoja en específico
            let startFlip = index * scrollPerSheet;
            let endFlip = startFlip + scrollPerSheet;
            
            // Calculamos el progreso del 0 al 1 (0% al 100%)
            let progress = 0;
            if (scrollDistance > endFlip) {
                progress = 1; 
            } else if (scrollDistance > startFlip) {
                progress = (scrollDistance - startFlip) / scrollPerSheet; 
            }
            
            // Rotamos hasta -130 grados para que se doble hacia arriba
            let angle = progress * -130;
            
            // El translateZ(10px, 9px...) fuerza al navegador a respetar qué hoja va encima en el mundo 3D
            let zOffset = 10 - index; 
            
            // Aplicamos la rotación
            page.style.transform = `translateZ(${zOffset}px) rotateX(${angle}deg)`;
            
            // Efecto de sombra: se oscurece ligeramente al levantarse
            page.style.opacity = 1 - (progress * 0.4);
        });
    }

    // Usamos requestAnimationFrame para que la animación fluya a los Hz de la pantalla del usuario
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updatePages);
    });
    
    // Forzamos un cálculo inicial por si el usuario recarga la página a la mitad
    updatePages();
});
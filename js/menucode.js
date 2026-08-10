document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scroll-track');
    const pages = document.querySelectorAll('.menu-page');
    
    // Si por alguna razón no encuentra el contenedor, detenemos el script para evitar errores
    if (!track || pages.length === 0) return;

    window.addEventListener('scroll', () => {
        // Leemos a qué distancia está la pista de scroll desde el tope de la pantalla
        const trackRect = track.getBoundingClientRect();
        
        // 120 es el "top" donde nuestra libreta se queda pegada (sticky)
        let scrollDistance = 120 - trackRect.top;
        
        // Si aún no hemos llegado a la libreta, mantenemos la distancia en 0
        if (scrollDistance < 0) scrollDistance = 0;

        // Definimos cuántos pixeles exactos de scroll toma dar vuelta a UNA hoja.
        const scrollPerSheet = 700;

        pages.forEach((page, index) => {
            // La última hoja (la naranja de la casa) nunca se voltea
            if (index === pages.length - 1) {
                return;
            }
            
            // Calculamos cuándo le toca empezar a girar a cada hoja
            let startFlip = index * scrollPerSheet;
            let endFlip = startFlip + scrollPerSheet;
            
            let progress = 0;
            if (scrollDistance > endFlip) {
                progress = 1; // Ya dio la vuelta completa
            } else if (scrollDistance > startFlip) {
                progress = (scrollDistance - startFlip) / scrollPerSheet; // Está en medio del giro
            }
            
            // Rotamos la hoja hasta -130 grados (hacia arriba) para que desaparezca completamente de la vista
            let angle = progress * -130;
            page.style.transform = `rotateX(${angle}deg)`;
            
            // Le bajamos la opacidad poco a poco para dar el efecto de sombra/profundidad al levantarse
            page.style.opacity = 1 - (progress * 0.8);
        });
    });
});
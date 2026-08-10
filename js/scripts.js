document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.custom-navbar');
    const smallLogoContainer = document.querySelector('.small-logo-container');
    
    const bigLogo = document.querySelector('.big-logo-img');

    const navColor = "255, 251, 242"; 
    const maxSmallPadding = 40; // Valor fijo de los 40px del contenedor

    window.addEventListener('scroll', () => {
        // Altura de referencia (150px si estamos en páginas internas sin logo grande)
        let bigLogoHeight = (bigLogo && bigLogo.offsetHeight > 0) ? bigLogo.offsetHeight : 150; 
        
        // Calculamos el progreso del scroll (de 0.0 a 1.0)
        let progress = window.scrollY / bigLogoHeight;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;
        
        // El padding va bajando de 40px (oculto) a 0px (visible)
        let smallPadding = maxSmallPadding - (progress * maxSmallPadding);
        smallLogoContainer.style.paddingTop = smallPadding + 'px';
        
        // El color y opacidad se basan directamente en el progreso
        navbar.style.backgroundColor = `rgba(${navColor}, ${progress})`;
        
        let shadowOpacity = progress * 0.05;
        if (window.scrollY > 10) {
            navbar.style.boxShadow = `0 2px 10px rgba(0,0,0,${shadowOpacity})`;
        } else {
            navbar.style.boxShadow = "none";
        }
    });
});
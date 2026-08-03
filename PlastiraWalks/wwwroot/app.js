// filepath: /Users/iosifgogolos/Plastira2026/PlastiraWalks/PlastiraWalks/wwwroot/app.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

// simple carousel autoplay helper used by ImageCarousel.razor
(() => {
    const carousels = new Map();

    window.startCarousel = (id, intervalMs = 4000) => {
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;

        if (carousels.has(id)) {
            clearInterval(carousels.get(id));
            carousels.delete(id);
        }

        const step = () => {
            const child = el.querySelector('.photo-slide');
            const width = el.clientWidth || (child ? child.clientWidth : 0);
            if (!width) return;

            const maxScroll = el.scrollWidth - el.clientWidth;
            if (Math.abs(el.scrollLeft - maxScroll) < 2) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: width, behavior: 'smooth' });
            }
        };

        setTimeout(() => {
            const timer = setInterval(step, Math.max(800, intervalMs));
            carousels.set(id, timer);
        }, 250);
    };

    window.stopCarousel = (id) => {
        if (carousels.has(id)) {
            clearInterval(carousels.get(id));
            carousels.delete(id);
        }
    };
})();
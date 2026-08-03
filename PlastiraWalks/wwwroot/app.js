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

        // clear existing timer
        if (carousels.has(id)) {
            clearInterval(carousels.get(id));
            carousels.delete(id);
        }

        // ensure smooth scrolling is supported
        const step = () => {
            const child = el.querySelector('.photo-slide');
            const width = el.clientWidth || (child ? child.clientWidth : 0);
            if (!width) return;

            const maxScroll = el.scrollWidth - el.clientWidth;
            const next = Math.min(el.scrollLeft + width, maxScroll);

            if (Math.abs(el.scrollLeft - maxScroll) < 2) {
                // wrap to start
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: width, behavior: 'smooth' });
            }
        };

        // small debounce initially to allow layout
        setTimeout(() => {
            const timer = setInterval(step, Math.max(800, intervalMs));
            carousels.set(id, timer);
        }, 250);
    };

    // optional stop helper
    window.stopCarousel = (id) => {
        if (carousels.has(id)) {
            clearInterval(carousels.get(id));
            carousels.delete(id);
        }
    };
})();
// lazyLoader.js - Lazy loading manager for modules
class LazyLoader {
    constructor() {
        this.loadedModules = new Set();
        this.loadingPromises = new Map();
    }

    // Lazy load script from cache
    async loadScript(src, moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return Promise.resolve();
        }

        if (this.loadingPromises.has(moduleName)) {
            return this.loadingPromises.get(moduleName);
        }

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => {
                this.loadedModules.add(moduleName);
                this.loadingPromises.delete(moduleName);
                resolve();
            };
            
            script.onerror = () => {
                this.loadingPromises.delete(moduleName);
                reject(new Error(`Failed to load script: ${src}`));
            };
            
            document.head.appendChild(script);
        });

        this.loadingPromises.set(moduleName, promise);
        return promise;
    }

    // Lazy load functionality on interaction
    async loadOnInteraction(elements, scriptSrc, moduleName, callback) {
        const loadHandler = async () => {
            try {
                await this.loadScript(scriptSrc, moduleName);
                if (callback) callback();
                
                // Remove event listeners after loading
                elements.forEach(el => {
                    el.removeEventListener('click', loadHandler);
                    el.removeEventListener('focus', loadHandler);
                    el.removeEventListener('mouseenter', loadHandler);
                });
            } catch (error) {
                console.error('Lazy loading failed:', error);
            }
        };

        elements.forEach(element => {
            if (element) {
                element.addEventListener('click', loadHandler, { once: true });
                element.addEventListener('focus', loadHandler, { once: true });
                element.addEventListener('mouseenter', loadHandler, { once: true, passive: true });
            }
        });
    }

    // Preload using Intersection Observer
    preloadOnVisible(elements, scriptSrc, moduleName, callback) {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.loadScript(scriptSrc, moduleName).then(callback);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadScript(scriptSrc, moduleName).then(callback);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            rootMargin: '50px',
            threshold: 0.1 
        });

        elements.forEach(el => el && observer.observe(el));
    }

    // Debounced loader
    createDebouncedLoader(delay = 150) {
        let timeoutId;
        return (fn) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fn, delay);
        };
    }
}

// Global instance
window.lazyLoader = new LazyLoader();

/**
 * Simple, Bulletproof Vanilla JS Router
 */
const AppRouter = (function() {
    "use strict";

    // 1. THE ROUTE MAP (Clean URL -> Actual File)
    const ROUTES = {
        "/": "/index.html",
        "/viadecide-decision-matrix": "/viadecide-decision-matrix.html",
        "/pricing": "/pricing.html",
        "/contact": "/contact.html"
        // Add your other routes here...
    };

    // 2. THE MOUNT POINT (The ID of the container we are swapping content inside)
    const MOUNT_POINT = "#app"; 

    // 3. INTERCEPT CLICKS
    function bindLinks() {
        document.addEventListener("click", e => {
            const a = e.target.closest("a");
            if (!a || !a.href) return;

            const url = new URL(a.href);

            // Let the browser handle external links, emails, and assets
            if (url.origin !== window.location.origin) return;
            if (url.hash && url.pathname === window.location.pathname) return;
            if (/\.(pdf|png|jpg|jpeg|svg|css|js|glb|stl)$/i.test(url.pathname)) return;

            // Stop the hard reload and route via JavaScript
            e.preventDefault(); 
            navigate(url.pathname + url.search + url.hash);
        });
    }

    // 4. FETCH AND SWAP CONTENT
    async function navigate(path, isPopState = false) {
        // Update the address bar
        if (!isPopState) {
            window.history.pushState({}, "", path);
        }

        // Clean the path to look up in our ROUTES map
        let cleanPath = path.split("?")[0].replace(/\/$/, "");
        if (cleanPath === "") cleanPath = "/";

        const fileToFetch = ROUTES[cleanPath];

        if (!fileToFetch) {
            // If route isn't in our map, force a hard redirect
            window.location.assign(path);
            return;
        }

        try {
            const response = await fetch(fileToFetch);
            if (!response.ok) throw new Error("File not found");
            const html = await response.text();

            // Parse the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            
            const newContent = doc.querySelector(MOUNT_POINT);
            const currentContainer = document.querySelector(MOUNT_POINT);

            // Swap the content inside the mount point
            if (newContent && currentContainer) {
                currentContainer.innerHTML = newContent.innerHTML;
                if (doc.title) document.title = doc.title;
                
                // CRITICAL: Browsers don't run scripts injected via innerHTML. This fixes that.
                executeScripts(currentContainer);
            } else {
                window.location.assign(path); // Fallback if HTML structure is wrong
            }
        } catch (err) {
            console.error("Routing failed:", err);
            document.querySelector(MOUNT_POINT).innerHTML = "<h2>Page not found</h2><a href='/'>Go Home</a>";
        }
    }

    // 5. SCRIPT EXECUTION ENGINE
    function executeScripts(container) {
        const scripts = container.querySelectorAll("script");
        scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.textContent = oldScript.textContent; // Copies inline code
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    // 6. BOOT UP
    function init() {
        bindLinks();
        // Handle the Back/Forward browser buttons
        window.addEventListener("popstate", () => navigate(window.location.pathname, true));
    }

    return { init, navigate };
})();

// Start the router when the page loads
document.addEventListener("DOMContentLoaded", () => AppRouter.init());

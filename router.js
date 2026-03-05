/**
 * ViaDecide SPA Router
 * Auto-generated — do not edit manually
 * Routes: 50 pages
 */
const AppRouter = (function () {
    "use strict";

    const ROUTES = {
        "/": "/index.html",
        "/404": "/404/index.html",
        "/AshokVerma": "/AshokVerma/index.html",
        "/CustomSwipeEngineForm": "/CustomSwipeEngineForm/index.html",
        "/engine-activation-request": "/engine-activation-request/index.html",
        "/HexWars": "/HexWars/index.html",
        "/HivaLand": "/HivaLand/index.html",
        "/Jalaram-food-court-rajkot": "/Jalaram-food-court-rajkot/index.html",
        "/ONDC-demo": "/ONDC-demo/index.html",
        "/StudyOS": "/StudyOS/index.html",
        "/SwipeOS": "/SwipeOS/index.html",
        "/the-decision-stack": "/the-decision-stack/index.html",
        "/ViaGuide": "/ViaGuide/index.html",
        "/Viadecide-blogs": "/Viadecide-blogs/index.html",
        "/alchemist": "/alchemist/index.html",
        "/app-generator": "/app-generator/index.html",
        "/brief": "/brief/index.html",
        "/cashback-claim": "/cashback-claim/index.html",
        "/cashback-rules": "/cashback-rules/index.html",
        "/cohort-apply-here": "/cohort-apply-here/index.html",
        "/contact": "/contact/index.html",
        "/decide-foodrajkot": "/decide-foodrajkot/index.html",
        "/decide-service": "/decide-service/index.html",
        "/decision-brief-guide": "/decision-brief-guide/index.html",
        "/decision-brief": "/decision-brief/index.html",
        "/decision-infrastructure-india": "/decision-infrastructure-india/index.html",
        "/discounts": "/discounts/index.html",
        "/engine-deals": "/engine-deals/index.html",
        "/engine-license": "/engine-license/index.html",
        "/finance-dashboard-msme": "/finance-dashboard-msme/index.html",
        "/founder": "/founder/index.html",
        "/indiaai-mission-2025": "/indiaai-mission-2025/index.html",
        "/interview-prep": "/interview-prep/index.html",
        "/laptops-under-50000": "/laptops-under-50000/index.html",
        "/mars-rover-simulator-game": "/mars-rover-simulator-game/index.html",
        "/memory": "/memory/index.html",
        "/multi-source-research-explained": "/multi-source-research-explained/index.html",
        "/ondc-for-bharat": "/ondc-for-bharat/index.html",
        "/payment-register": "/payment-register/index.html",
        "/pricing": "/pricing/index.html",
        "/privacy": "/privacy/index.html",
        "/prompt-alchemy": "/prompt-alchemy/index.html",
        "/sales-dashboard": "/sales-dashboard/index.html",
        "/student-research": "/student-research/index.html",
        "/terms": "/terms/index.html",
        "/viadecide-decision-matrix": "/viadecide-decision-matrix/index.html",
        "/viadecide-opportunity-radar": "/viadecide-opportunity-radar/index.html",
        "/viadecide-public-beta": "/viadecide-public-beta/index.html",
        "/viadecide-reality-check": "/viadecide-reality-check/index.html",
        "/why-small-businesses-dont-need-saas": "/why-small-businesses-dont-need-saas/index.html"
    };

    const MOUNT_POINT = "#app";

    function bindLinks() {
        document.addEventListener("click", e => {
            const a = e.target.closest("a");
            if (!a || !a.href) return;
            const url = new URL(a.href);
            if (url.origin !== window.location.origin) return;
            if (url.hash && url.pathname === window.location.pathname) return;
            if (/\.(pdf|png|jpg|jpeg|svg|css|js|glb|stl)$/i.test(url.pathname)) return;
            e.preventDefault();
            navigate(url.pathname + url.search + url.hash);
        });
    }

    async function navigate(path, isPopState = false) {
        if (!isPopState) window.history.pushState({}, "", path);
        let cleanPath = path.split("?")[0].replace(/\/$/, "");
        if (cleanPath === "") cleanPath = "/";

        const fileToFetch = ROUTES[cleanPath];
        if (!fileToFetch) {
            window.location.assign(path);
            return;
        }

        const mount = document.querySelector(MOUNT_POINT);
        if (mount) mount.innerHTML = '<div style="padding:3rem;text-align:center;opacity:.4;font-family:Outfit,sans-serif">Loading…</div>';

        try {
            const response = await fetch(fileToFetch);
            if (!response.ok) throw new Error("Not found: " + fileToFetch);
            const html = await response.text();

            const parser = new DOMParser();
            const doc    = parser.parseFromString(html, "text/html");

            doc.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
                if (node.tagName === "LINK") {
                    const href = node.getAttribute("href");
                    if (!document.querySelector(`link[href="${href}"]`)) {
                        document.head.appendChild(node.cloneNode(true));
                    }
                } else {
                    document.head.appendChild(node.cloneNode(true));
                }
            });

            const newContent   = doc.querySelector(MOUNT_POINT);
            const currentMount = document.querySelector(MOUNT_POINT);

            if (newContent && currentMount) {
                currentMount.innerHTML = newContent.innerHTML;
                if (doc.title) document.title = doc.title;
                window.scrollTo(0, 0);
                executeScripts(currentMount);
            } else {
                window.location.assign(path);
            }
        } catch (err) {
            console.error("[VDRouter] Routing failed:", err);
            const m = document.querySelector(MOUNT_POINT);
            if (m) m.innerHTML = '<h2 style="padding:2rem;font-family:Outfit,sans-serif">Page not found</h2><a href="/" style="padding:0 2rem;color:#22b4a0">← Go Home</a>';
        }
    }

    function executeScripts(container) {
        container.querySelectorAll("script").forEach(old => {
            const s = document.createElement("script");
            Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
            s.textContent = old.textContent;
            old.parentNode.replaceChild(s, old);
        });
    }

    /** Expose routes list for debugging */
    function routes() { return ROUTES; }

    function init() {
        bindLinks();
        window.addEventListener("popstate", () => navigate(window.location.pathname, true));
        const initial = window.location.pathname;
        const clean   = initial.replace(/\/$/, "") || "/";
        if (clean !== "/" && ROUTES[clean]) {
            navigate(initial, true);
        }
    }

    return { init, navigate, routes };
})();

// Also expose as VDRouter for legacy compatibility
window.VDRouter = AppRouter;
document.addEventListener("DOMContentLoaded", () => AppRouter.init());

/**
 * ════════════════════════════════════════════════════════════════════
 *  ViaDecide — Universal Router  v4.0
 *  https://github.com/via-decide/decide.engine
 *
 *  Purpose: Convert clean URLs into actual HTML files without
 *           exposing .html extensions. Works on static hosting
 *           (Vercel, GitHub Pages) with zero backend needed.
 *
 *  Responsibilities (per SOP):
 *    1. Pretty URL conversion   /app-generator → app-generator.html
 *    2. Navigation interception  Catches all internal link clicks
 *    3. Route resolution         ROUTES map + ALIASES + param routes
 *    4. Alias support            Legacy / alternate slugs
 *    5. 404 handling             Built-in not-found page with suggestions
 *    6. Overlay navigation       fetch+inject (bypasses X-Frame-Options)
 *
 *  Public API — window.VDRouter
 *    VDRouter.go("app-generator")          Navigate to a route
 *    VDRouter.url("keychain")              Get clean URL for a slug
 *    VDRouter.resolve("slug")             Get mapped filename
 *    VDRouter.register("slug","file.html") Add route at runtime
 *    VDRouter.params()                    Current route params
 *    VDRouter.query()                     Current query string as object
 *
 *  Adding a new page  (SOP §6)
 *    1. Create  /my-tool.html
 *    2. Add     "my-tool": "my-tool.html"  inside ROUTES below
 *    3. Link    href="/my-tool"
 * ════════════════════════════════════════════════════════════════════
 */
(function ViaDecideRouter() {
  "use strict";


  /* ══════════════════════════════════════════════════════════════════
     §4  ROUTES MAP   slug → file path
         - Slugs must always be lowercase
         - File paths are relative to the site root
         - Duplicate slugs are not allowed (last one wins in JS objects)
     ══════════════════════════════════════════════════════════════════ */
  var ROUTES = {

    // ── Core tools ─────────────────────────────────────────────────
    "app-generator":            "app-generator.html",
    "student-research":         "student-research.html",
    "decision-brief":           "decision-brief.html",
    "decision-brief-guide":     "decision-brief-guide.html",
    "brief":                    "brief.html",
    "alchemist":                "alchemist.html",
    "decision-tool":            "alchemist.html",
    "swipeos":                  "SwipeOS.html",
    "prompt-alchemy":           "prompt-alchemy.html",
    "promptalchemy":            "prompt-alchemy.html",
    "ondc-demo":                "ONDC-demo.html",
    "viaguide":                 "ViaGuide.html",
    "studyos":                  "StudyOS.html",
    "memory":                   "memory.html",
    "contact":                  "contact.html",

    // ── Dashboards ─────────────────────────────────────────────────
    "sales-dashboard":          "sales-dashboard.html",
    "finance-dashboard":        "finance-dashboard-msme.html",
    "viadecide-decision-matrix":"viadecide-decision-matrix.html",
    "decision-matrix":          "viadecide-decision-matrix.html",
    "viadecide-opportunity-radar":"viadecide-opportunity-radar.html",
    "opportunity-radar":        "viadecide-opportunity-radar.html",
    "viadecide-reality-check":  "viadecide-reality-check.html",
    "reality-check":            "viadecide-reality-check.html",

    // ── Interview & Research ───────────────────────────────────────
    "interview-prep":           "interview-prep.html",
    "interview-simulator":      "interview-prep.html",

    // ── Restaurant / Food demos ────────────────────────────────────
    "jalaram-food-court":       "Jalaram-food-court-rajkot.html",
    "restaurant-website":       "Jalaram-food-court-rajkot.html",
    "restaurant-builder":       "Jalaram-food-court-rajkot.html",
    "restaurant-example":       "Jalaram-food-court-rajkot.html",
    "decide-foodrajkot":        "decide-foodrajkot.html",
    "food-rajkot":              "decide-foodrajkot.html",

    // ── Engine & Payments ──────────────────────────────────────────
    "engine-deals":             "engine-deals.html",
    "engine-license":           "engine-license.html",
    "engine-activation-request":"Engine Activation Request.html",
    "cashback-claim":           "cashback-claim.html",
    "cashback-rules":           "cashback-rules.html",
    "payment-register":         "payment-register.html",
    "payroll-register":         "payment-register.html",
    "custom-swipe-engine-form": "CustomSwipeEngineForm.html",
    "customswipeengineform":    "CustomSwipeEngineForm.html",

    // ── People & About ─────────────────────────────────────────────
    "founder":                  "founder.html",
    "ashokverma":               "AshokVerma.html",
    "ashok-verma":              "AshokVerma.html",

    // ── Main site pages ────────────────────────────────────────────
    "pricing":                  "pricing.html",
    "discounts":                "discounts.html",
    "privacy":                  "privacy.html",
    "terms":                    "terms.html",
    "decide-service":           "decide-service.html",
    "cohort-apply-here":        "cohort-apply-here.html",
    "viadecide-public-beta":    "viadecide-public-beta.html",
    "indiaai-mission-2025":     "indiaai-mission-2025.html",

    // ── Games & Simulations  (SOP §8) ──────────────────────────────
    "hexwars":                  "HexWars.html",
    "mars-rover-simulator-game":"mars-rover-simulator-game.html",
    "hivaland":                 "HivaLand.html",

    // ── Store base  (SOP §7) ───────────────────────────────────────
    "printbydd-store":          "printbydd-store/index.html",
    "printbydd":                "printbydd-store/index.html",
    "keychain":                 "printbydd-store/keychain.html",
    "numberplate":              "printbydd-store/numberplate.html",
    "printbydd-products":       "printbydd-store/products.html",
    "gifts-that-mean-more":     "printbydd-store/gifts-that-mean-more.html",

    // ── Blogs ──────────────────────────────────────────────────────
    "blogs":                           "Viadecide-blogs.html",
    "viadecide-blogs":                 "Viadecide-blogs.html",
    "decision-infrastructure-india":   "decision-infrastructure-india.html",
    "ondc-for-bharat":                 "ondc-for-bharat.html",
    "laptops-under-50000":             "laptops-under-50000.html",
    "multi-source-research-explained": "multi-source-research-explained.html",
    "the-decision-stack":              "The Decision Stack.html",
    "decision-stack":                  "The Decision Stack.html",
    "why-small-businesses-dont-need-saas":
      "\u201cWhy Most Small Businesses Don\u2019t Need SaaS \u2014 They Need Structure\".html",
    "saas-structure":
      "\u201cWhy Most Small Businesses Don\u2019t Need SaaS \u2014 They Need Structure\".html",

  };


  /* ══════════════════════════════════════════════════════════════════
     §9  ALIASES   legacy slug / case variant → canonical ROUTES key
         Example: /PromptAlchemy → looks up ALIASES → "prompt-alchemy"
                  → looks up ROUTES["prompt-alchemy"] → file
     ══════════════════════════════════════════════════════════════════ */
  var ALIASES = {
    // Case variants
    "SwipeOS":          "swipeos",
    "swipeos?":         "swipeos",
    "PromptAlchemy":    "prompt-alchemy",
    "StudentResearch":  "student-research",
    "ViaGuide":         "viaguide",
    "StudyOS":          "studyos",
    "AshokVerma":       "ashokverma",
    "Ashok-Verma":      "ashok-verma",
    // Short aliases
    "ondc":             "ondc-demo",
    "ONDC-demo":        "ondc-demo",
    // Store short names
    "gifts":            "gifts-that-mean-more",
    "products":         "printbydd-products",
  };


  /* ══════════════════════════════════════════════════════════════════
     DYNAMIC PARAM ROUTES   /pattern/:param → file with param injected
     Example: /printbydd-store/keychain → printbydd-store/keychain.html
     ══════════════════════════════════════════════════════════════════ */
  var PARAM_ROUTES = [
    { pattern: "printbydd-store/:item", file: "printbydd-store/:item.html" },
    { pattern: "store/:item",           file: "printbydd-store/:item.html" },
    { pattern: "blog/:slug",            file: "blog/:slug.html"            },
  ];


  /* ══════════════════════════════════════════════════════════════════
     CONFIG
     ══════════════════════════════════════════════════════════════════ */
  var WILDCARD_FILE = "404.html"; // §12 — shown for unknown routes
  var SPA_MODE      = false;      // set true to load pages via fetch (no full reload)

  // Internal state
  var _currentParams = {};
  var _scrollMap     = {};
  var _hooks         = { before: [], after: [] };
  var _listeners     = {};
  var _prefetchCache = {};


  /* ══════════════════════════════════════════════════════════════════
     SECTION 1 — UTILITIES
     ══════════════════════════════════════════════════════════════════ */

  /** Detect in-app browsers that block window.open */
  function _isInAppBrowser() {
    return /Instagram|FBAN|FBAV|FB_IAB|Line|Twitter|Snapchat/i.test(
      navigator.userAgent || ""
    );
  }

  /**
   * Normalise a raw path/slug into a clean lowercase key.
   * Strips leading slashes, trailing slashes, ./ prefix, and .html extension.
   */
  function _normalizeSlug(raw) {
    return String(raw || "")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/^\.\//, "")
      .replace(/\.html?$/i, "")
      .trim()
      .toLowerCase();
  }

  /**
   * Auto-detect base path for GitHub Pages (e.g. /decide.engine/).
   * Returns "/" on production (viadecide.com). §16
   */
  function _getBasePath() {
    var host = window.location.host || "";
    var path = window.location.pathname || "/";
    if (/github\.io$/i.test(host)) {
      var seg = path.replace(/^\/+/, "").split("/")[0];
      if (seg) return "/" + seg + "/";
    }
    return "/";
  }

  function _origin() {
    return window.location.protocol + "//" + window.location.host;
  }

  function _joinURL(base, file) {
    return base.replace(/\/+$/, "/") + String(file || "").replace(/^\/+/, "");
  }

  function _parsePathParts(fullPath) {
    var m = String(fullPath || "/")
      .match(/^([^?#]*)(\?[^#]*)?(#.*)?$/) || [];
    return { path: m[1] || "/", search: m[2] || "", hash: m[3] || "" };
  }

  function _safeReplace(url) {
    try { window.location.replace(url); }
    catch (e) { window.location.href = url; }
  }

  /**
   * §13 — External link guard.
   * Returns true if the href should NOT be handled by the router.
   */
  function _isExternal(href) {
    if (!href) return true;
    if (/^(https?:)?\/\//i.test(href)) return true;
    if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(href)) return true;
    return false;
  }

  /**
   * §14 — Asset guard.
   * Returns true for file types the router must never intercept.
   */
  function _isAsset(href) {
    return /\.(js|css|png|jpg|jpeg|webp|svg|ico|json|txt|xml|pdf|mp4|webm|woff2?|ttf|stl|obj|glb|gltf)$/i
      .test(href || "");
  }

  function _hrefToURL(href) {
    try { return new URL(href, window.location.href); }
    catch (e) { return null; }
  }

  function _stripBasePath(pathname, basePath) {
    if (basePath !== "/" && pathname.indexOf(basePath) === 0)
      return pathname.slice(basePath.length - 1);
    return pathname;
  }

  /** Levenshtein distance for typo suggestions in the 404 page */
  function _levenshtein(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (j = 1; j <= n; j++)
      for (i = 1; i <= m; i++)
        d[i][j] = a[i - 1] === b[j - 1]
          ? d[i - 1][j - 1]
          : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
    return d[m][n];
  }

  /** Return up to 3 close-match route keys for a given slug */
  function _suggest(slug) {
    return Object.keys(ROUTES)
      .map(function (k) { return { k: k, d: _levenshtein(slug, k) }; })
      .filter(function (o) { return o.d <= 3; })
      .sort(function (a, b) { return a.d - b.d; })
      .slice(0, 3)
      .map(function (o) { return o.k; });
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 2 — ROUTE RESOLVER
     Implements SOP §3 Routing Workflow:
       slug → ROUTES exact → ALIASES → case-insensitive → PARAM_ROUTES → wildcard
     ══════════════════════════════════════════════════════════════════ */

  function _resolveRoute(slug) {
    if (!slug) return null;

    // 1. Exact match in ROUTES
    if (ROUTES[slug]) return { file: ROUTES[slug], params: {} };

    // 2. Alias lookup → then ROUTES
    var aliasTarget = ALIASES[slug] || ALIASES[String(slug).toLowerCase()];
    if (aliasTarget && ROUTES[aliasTarget])
      return { file: ROUTES[aliasTarget], params: {} };

    // 3. Case-insensitive ROUTES scan
    var lower = String(slug).toLowerCase();
    for (var key in ROUTES) {
      if (Object.prototype.hasOwnProperty.call(ROUTES, key) &&
          String(key).toLowerCase() === lower)
        return { file: ROUTES[key], params: {} };
    }

    // 4. Dynamic :param pattern matching
    for (var i = 0; i < PARAM_ROUTES.length; i++) {
      var pr     = PARAM_ROUTES[i];
      var params = _matchPattern(pr.pattern, String(slug));
      if (params) {
        var file = pr.file;
        for (var p in params) {
          file = file.replace(new RegExp(":" + p, "g"), params[p]);
        }
        return { file: file, params: params };
      }
    }

    // 5. Wildcard catch-all (§12)
    if (WILDCARD_FILE) return { file: WILDCARD_FILE, params: {} };

    return null;
  }

  /** Match a :param pattern against a path. Returns params object or null. */
  function _matchPattern(pattern, path) {
    var pp = pattern.split("/");
    var up = path.split("/");
    if (pp.length !== up.length) return null;
    var params = {};
    for (var i = 0; i < pp.length; i++) {
      if (pp[i].charAt(0) === ":") {
        params[pp[i].slice(1)] = decodeURIComponent(up[i] || "");
      } else if (pp[i] !== up[i]) {
        return null;
      }
    }
    return params;
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 3 — NAVIGATION CORE
     ══════════════════════════════════════════════════════════════════ */

  function _navigateTo(filePath, search, hash, replaceState) {
    var base = _getBasePath();
    var url  = _origin() + _joinURL(base, filePath) + (search || "") + (hash || "");

    if (SPA_MODE) {
      _spaNavigate(url, filePath, search, hash, replaceState);
    } else {
      if (replaceState) _safeReplace(url);
      else window.location.href = url;
    }
  }

  function _spaNavigate(url, filePath, search, hash, replace) {
    var from = window.location.href;

    _runHooks("before", { from: from, to: url, file: filePath }, function (ok) {
      if (!ok) return;

      _scrollMap[window.location.pathname] = window.scrollY || 0;

      if (replace) window.history.replaceState({ vd: true }, "", url);
      else         window.history.pushState({ vd: true }, "", url);

      _loadPageContent(filePath, function () {
        if (hash) {
          try {
            var el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } catch (e) {}
        } else {
          window.scrollTo(0, _scrollMap[window.location.pathname] || 0);
        }
        _runHooks("after", { from: from, to: url });
        _emit("routechange", { from: from, to: url, file: filePath });
      });
    });
  }

  function _loadPageContent(filePath, done) {
    var pageUrl = _origin() + _joinURL(_getBasePath(), filePath);
    fetch(pageUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc    = new DOMParser().parseFromString(html, "text/html");
        var newEl  = doc.querySelector("main") || doc.body;
        var curEl  = document.querySelector("main") || document.body;
        if (doc.title) document.title = doc.title;
        if (newEl && curEl) { curEl.innerHTML = newEl.innerHTML; _bindLinks(); }
        if (typeof done === "function") done();
      })
      .catch(function () { window.location.href = pageUrl; });
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 4 — OVERLAY  (fetch + inject, bypasses X-Frame-Options)
     Opens a subpage inside a full-screen overlay without iframe.
     Triggered by: target="_blank" links, data-inframe="true",
     and the modal's #m-tab "Open in Tab" button.
     ══════════════════════════════════════════════════════════════════ */

  function _openOverlay(url, opts) {
    opts = opts || {};

    // Remove any existing overlay
    var prev = document.getElementById("vd-overlay");
    if (prev) prev.parentNode.removeChild(prev);

    // ── Resolve to canonical file URL ──────────────────────────────
    var resolvedUrl = url;
    try {
      var uo    = new URL(url, window.location.href);
      var slug  = _normalizeSlug(uo.pathname.replace(/^\/+/, ""));
      var match = _resolveRoute(slug);
      if (match) {
        resolvedUrl = _origin() + _joinURL(_getBasePath(), match.file) +
                      (uo.search || "") + (uo.hash || "");
      }
    } catch (e) {}

    // ── Same-origin check ───────────────────────────────────────────
    var isSameOrigin = false;
    try { isSameOrigin = new URL(resolvedUrl).origin === _origin(); }
    catch (e) {}

    // ── Overlay shell ───────────────────────────────────────────────
    var overlay = document.createElement("div");
    overlay.id  = "vd-overlay";
    _css(overlay, "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:2100;display:flex;flex-direction:column;background:#080a0f;" +
      "opacity:0;transition:opacity .3s ease");

    // Top bar
    var bar = document.createElement("div");
    _css(bar, "display:flex;align-items:center;justify-content:space-between;" +
      "padding:.6rem 1rem;background:#0c0e15;flex-shrink:0;min-height:48px;" +
      "border-bottom:1px solid rgba(255,255,255,0.07);gap:.75rem");

    var barLeft = document.createElement("div");
    _css(barLeft, "display:flex;align-items:center;gap:.5rem;min-width:0;flex:1");

    // Back / close arrow
    var backBtn = _btn("←", "Close overlay");
    _css(backBtn, "background:none;border:none;color:#f0ede6;font-size:1.25rem;" +
      "cursor:pointer;padding:4px 10px;border-radius:6px;flex-shrink:0;" +
      "transition:background .15s");
    backBtn.onmouseover = function () { this.style.background = "rgba(255,255,255,.09)"; };
    backBtn.onmouseout  = function () { this.style.background = "none"; };

    var titleEl = document.createElement("span");
    titleEl.textContent = opts.title || "";
    _css(titleEl, "font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:600;" +
      "color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1");

    barLeft.appendChild(backBtn);
    barLeft.appendChild(titleEl);

    // "Open in New Tab" button — always visible, uses window.open (works on mobile)
    var newTabBtn = _btn("↗ New Tab", "Open in new tab");
    _css(newTabBtn, "font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;" +
      "padding:.36rem .8rem;border-radius:8px;cursor:pointer;background:transparent;" +
      "border:1px solid rgba(255,255,255,0.12);color:#a0a5b8;" +
      "transition:color .2s,border-color .2s");
    newTabBtn.onmouseover = function () {
      this.style.color = "#f0ede6";
      this.style.borderColor = "rgba(255,255,255,.3)";
    };
    newTabBtn.onmouseout = function () {
      this.style.color = "#a0a5b8";
      this.style.borderColor = "rgba(255,255,255,.12)";
    };
    newTabBtn.onclick = function () {
      _closeOverlay(overlay);
      setTimeout(function () {
        window.open(resolvedUrl, "_blank", "noopener,noreferrer");
      }, 50);
    };

    bar.appendChild(barLeft);
    bar.appendChild(newTabBtn);

    // Scrollable content area
    var content = document.createElement("div");
    _css(content, "flex:1;overflow-y:auto;overflow-x:hidden;background:#080a0f;" +
      "position:relative;-webkit-overflow-scrolling:touch");

    // Loading spinner
    var spinner = document.createElement("div");
    _css(spinner, "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
      "display:flex;flex-direction:column;align-items:center;gap:14px");
    spinner.innerHTML =
      "<div style='width:36px;height:36px;border:3px solid rgba(255,255,255,.08);" +
        "border-top-color:#e8a830;border-radius:50%;animation:vdSpin .7s linear infinite'></div>" +
      "<span style='font-family:Outfit,sans-serif;font-size:.8rem;" +
        "color:rgba(240,237,230,.45)'>Loading…</span>";

    if (!document.getElementById("vd-spin-css")) {
      var ss = document.createElement("style");
      ss.id  = "vd-spin-css";
      ss.textContent = "@keyframes vdSpin{to{transform:rotate(360deg)}}";
      document.head.appendChild(ss);
    }

    content.appendChild(spinner);
    overlay.appendChild(bar);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // ── Close helpers ────────────────────────────────────────────────
    function _onKey(e) { if (e.key === "Escape") _closeOverlay(overlay); }
    backBtn.onclick = function () { _closeOverlay(overlay); };
    document.addEventListener("keydown", _onKey);
    overlay._cleanup = function () { document.removeEventListener("keydown", _onKey); };

    // Fade in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.style.opacity = "1"; });
    });

    // ── External URL: open new tab and close ─────────────────────────
    if (!isSameOrigin) {
      spinner.innerHTML =
        "<span style='font-size:2rem'>↗</span>" +
        "<span style='font-family:Outfit,sans-serif;font-size:.85rem;" +
          "color:rgba(240,237,230,.6)'>Opening in new tab…</span>";
      setTimeout(function () {
        window.open(resolvedUrl, "_blank", "noopener,noreferrer");
        _closeOverlay(overlay);
      }, 400);
      return;
    }

    // ── Same-origin: fetch + inject (bypasses X-Frame-Options) ───────
    fetch(resolvedUrl, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");

        // Auto-fill title from fetched page if not provided
        if (!opts.title && doc.title) {
          titleEl.textContent = doc.title.split("|")[0].split("—")[0].trim();
        }

        // Build isolated content host
        var host = document.createElement("div");
        _css(host, "min-height:100%;position:relative");

        // Inject stylesheets from fetched page
        doc.querySelectorAll("style").forEach(function (s) {
          var ns = document.createElement("style");
          ns.textContent = s.textContent;
          host.appendChild(ns);
        });
        doc.querySelectorAll("link[rel~='stylesheet']").forEach(function (lk) {
          try {
            var href = new URL(lk.getAttribute("href") || "", resolvedUrl).href;
            if (new URL(href).origin === _origin()) {
              var nl = document.createElement("link");
              nl.rel  = "stylesheet";
              nl.href = href;
              host.appendChild(nl);
            }
          } catch (e) {}
        });

        // Inject body content
        host.insertAdjacentHTML("beforeend", (doc.body || doc.documentElement).innerHTML);

        // Remove any vd-nav bar injected by vd-nav-fix.js (we have our own bar)
        var injectedNav = host.querySelector("#vd-nav");
        if (injectedNav) injectedNav.parentNode.removeChild(injectedNav);

        // Remove vd-nav padding-top
        host.style.paddingTop = "0";

        // Replace spinner with content
        content.removeChild(spinner);
        content.appendChild(host);

        // ── Intercept internal link clicks inside overlay ─────────────
        host.addEventListener("click", function (e) {
          var a = e.target && e.target.closest
            ? e.target.closest("a[href]") : null;
          if (!a) return;
          var href = a.getAttribute("href") || "";
          if (!href || href.charAt(0) === "#") return;
          if (_isExternal(href)) return;
          if (_isAsset(href)) return;

          try {
            var aUrl   = new URL(href, resolvedUrl);
            if (aUrl.origin !== _origin()) return;
            e.preventDefault();
            e.stopPropagation();
            var aPath  = aUrl.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
            var aMatch = _resolveRoute(aPath) || _resolveRoute(_normalizeSlug(aPath));
            var next   = aMatch
              ? _origin() + _joinURL(_getBasePath(), aMatch.file) + aUrl.search + aUrl.hash
              : aUrl.href;
            _openOverlay(next, { title: "" });
          } catch (e2) {}
        }, true);

        // ── Re-execute scripts so page interactivity works ────────────
        _execScripts(host, resolvedUrl, 0);
      })
      .catch(function (err) {
        content.removeChild(spinner);
        var errDiv = document.createElement("div");
        _css(errDiv, "display:flex;flex-direction:column;align-items:center;" +
          "justify-content:center;min-height:60vh;gap:16px;padding:32px;" +
          "text-align:center;font-family:'Outfit',sans-serif");
        errDiv.innerHTML =
          "<span style='font-size:2.5rem'>⚠️</span>" +
          "<p style='color:#f0ede6;font-size:1rem;margin:0;font-weight:600'>Could not load page</p>" +
          "<p style='color:rgba(240,237,230,.5);font-size:.82rem;margin:0'>" + (err.message || "Network error") + "</p>" +
          "<button onclick=\"window.open('" + resolvedUrl.replace(/'/g, "\\'") + "','_blank','noopener,noreferrer')\"" +
            " style='margin-top:8px;padding:.6rem 1.4rem;background:rgba(200,147,42,.15);" +
            "color:#e8a830;border:1px solid rgba(200,147,42,.35);border-radius:10px;" +
            "font-family:inherit;font-size:.82rem;font-weight:700;cursor:pointer'>↗ Open in New Tab</button>";
        content.appendChild(errDiv);
      });
  }

  function _closeOverlay(overlay) {
    overlay.style.opacity = "0";
    if (typeof overlay._cleanup === "function") overlay._cleanup();
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = "";
    }, 300);
  }

  /** Re-execute <script> tags in a host element so interactivity works */
  function _execScripts(host, baseUrl, idx) {
    var scripts = host.querySelectorAll("script");
    if (idx >= scripts.length) return;
    var orig = scripts[idx];
    var ns   = document.createElement("script");
    for (var i = 0; i < orig.attributes.length; i++) {
      try { ns.setAttribute(orig.attributes[i].name, orig.attributes[i].value); }
      catch (e) {}
    }
    if (orig.getAttribute("src")) {
      try {
        var src = new URL(orig.getAttribute("src"), baseUrl).href;
        if (new URL(src).origin === _origin()) {
          ns.src     = src;
          ns.onload  = function () { _execScripts(host, baseUrl, idx + 1); };
          ns.onerror = function () { _execScripts(host, baseUrl, idx + 1); };
          host.appendChild(ns);
          return; // async — continue in callback
        }
      } catch (e) {}
    } else {
      ns.textContent = orig.textContent;
      try { host.appendChild(ns); } catch (e) {}
    }
    _execScripts(host, baseUrl, idx + 1);
  }

  function _css(el, str) { el.style.cssText = str; }
  function _btn(text, label) {
    var b = document.createElement("button");
    b.textContent = text;
    b.setAttribute("aria-label", label);
    return b;
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 5 — MIDDLEWARE & EVENT BUS
     ══════════════════════════════════════════════════════════════════ */

  function _runHooks(type, ctx, cb) {
    var hooks = _hooks[type] || [];
    var i = 0;
    function next() {
      if (i >= hooks.length) { if (cb) cb(true); return; }
      var hook = hooks[i++];
      try {
        var r = hook(ctx, next);
        if (r === false)                  { if (cb) cb(false); }
        else if (r && typeof r.then === "function") {
          r.then(function (v) {
            if (v === false) { if (cb) cb(false); } else next();
          }).catch(function () { if (cb) cb(false); });
        }
      } catch (e) { next(); }
    }
    next();
  }

  function _emit(event, data) {
    (_listeners[event] || []).forEach(function (fn) {
      try { fn(data); } catch (e) {}
    });
    try { window.dispatchEvent(new CustomEvent("vd:" + event, { detail: data })); }
    catch (e) {}
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 6 — BOOT SEQUENCE
     Runs on page load to resolve the current pretty URL.
     ══════════════════════════════════════════════════════════════════ */

  // ── A. Pretty URL resolution ───────────────────────────────────────
  (function _handlePrettyURL() {
    var base     = _getBasePath();
    var pathname = _stripBasePath(window.location.pathname || "/", base);
    var clean    = pathname.replace(/^\/+/, "");

    // Nothing to do: index, assets, or already a real .html file
    if (!clean || clean === "index.html" || clean === "index.htm") return;
    if (_isAsset(clean)) return;
    if (/\.html?$/i.test(clean)) return; // already resolved — avoid redirect loop

    var slug  = clean.replace(/\/+$/, "");
    // Try full path first (supports param routes like printbydd-store/keychain),
    // then fall back to normalised first segment
    var match = _resolveRoute(slug) ||
                _resolveRoute(_normalizeSlug(slug)) ||
                _resolveRoute(_normalizeSlug(slug.split("/")[0]));

    if (!match) return;

    _currentParams = match.params || {};
    _navigateTo(match.file, window.location.search || "", window.location.hash || "", true);
  })();


  // ── B. Session-storage redirect (handles SPA fallback redirects) ───
  var _stored = null;
  try { _stored = sessionStorage.getItem("__vd_redirect__"); } catch (e) {}

  if (_stored) {
    try { sessionStorage.removeItem("__vd_redirect__"); } catch (e) {}
    var _p = _parsePathParts(_stored);
    // Use full stored path (not just first segment) to support param routes
    var _fullPath = (_p.path || "/").replace(/^\//, "").replace(/\/+$/, "");
    if (_fullPath) {
      var _m = _resolveRoute(_normalizeSlug(_fullPath)) ||
               _resolveRoute(_normalizeSlug(_fullPath.split("/")[0]));
      if (_m) {
        _currentParams = _m.params || {};
        _navigateTo(_m.file, _p.search, _p.hash, true);
      } else {
        _render404(_fullPath);
      }
    }
  }


  // ── C. Hash-based routing  (#/app-generator style) ─────────────────
  var _hash = window.location.hash || "";
  if (_hash) {
    var _hashPath = _hash.replace(/^#\/?/, "");
    if (_hashPath && !/^p=/.test(_hashPath) && _hashPath.length < 120) {
      var _hm = _resolveRoute(_normalizeSlug(_hashPath.split("?")[0]));
      if (_hm) {
        _currentParams = _hm.params || {};
        _navigateTo(_hm.file, "", "", false);
      }
    }
  }


  // ── D. SPA popstate listener ───────────────────────────────────────
  if (SPA_MODE) {
    window.addEventListener("popstate", function () {
      var clean = _stripBasePath(window.location.pathname, _getBasePath())
        .replace(/^\/+/, "");
      if (!clean) return;
      var m = _resolveRoute(_normalizeSlug(clean));
      if (m) {
        _currentParams = m.params || {};
        _loadPageContent(m.file, function () {
          _emit("routechange", { to: window.location.href });
        });
      }
    });
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 7 — LINK BINDING  §10
     Intercepts clicks on nav / header / footer / cards / data-vd-route
     ══════════════════════════════════════════════════════════════════ */

  var NAV_SELECTOR = "a.subpage-card, nav a, header a, footer a, a[data-vd-route]";

  function _bindLinks() {
    _fixNavHrefs();

    // Single delegated listener on document (idempotent via _vdBound flag)
    if (document._vdBound) return;
    document._vdBound = true;

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented) return;
      if (e.button && e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // [data-back] — go back or home
      var backEl = e.target && e.target.closest
        ? e.target.closest("[data-back]") : null;
      if (backEl) {
        var bh = backEl.getAttribute("href") || "";
        if (bh && _isExternal(bh)) return;
        e.preventDefault();
        if (window.history.length > 1) window.history.back();
        else _safeReplace(_origin() + _joinURL(_getBasePath(), "index.html"));
        return;
      }

      var a = e.target && e.target.closest
        ? e.target.closest(NAV_SELECTOR) : null;
      if (!a) return;

      // target="_blank" or data-inframe → show in overlay instead
      var target   = (a.getAttribute("target") || "").toLowerCase();
      var inframe  = (a.getAttribute("data-inframe") || "").toLowerCase();
      if (target === "_blank" || inframe === "true") {
        e.preventDefault();
        _openOverlay(a.href);
        return;
      }

      var hrefAttr = a.getAttribute("href") || "";
      if (!hrefAttr || _isExternal(hrefAttr)) return;
      if (hrefAttr.charAt(0) === "#") return;
      if (_isAsset(hrefAttr)) return;

      var url = _hrefToURL(hrefAttr);
      if (!url || url.origin !== window.location.origin) return;

      var base  = _getBasePath();
      var path  = _stripBasePath(url.pathname || "/", base);
      var clean = String(path || "/").replace(/^\/+/, "");

      // Direct .html file link — navigate without slug lookup
      if (/\.html?$/i.test(clean)) {
        e.preventDefault();
        _navigateTo(clean, url.search || "", url.hash || "", false);
        return;
      }

      var slug  = _normalizeSlug(clean);
      if (!slug) return;

      var match = _resolveRoute(clean.replace(/\/+$/, "")) || _resolveRoute(slug);
      e.preventDefault();

      if (!match) {
        _safeReplace(
          _origin() + _joinURL(base, slug + "/") + (url.search || "") + (url.hash || "")
        );
        return;
      }

      _currentParams = match.params || {};
      _navigateTo(match.file, url.search || "", url.hash || "", false);
    }, true);
  }

  /** Rewrite relative nav/header/footer hrefs to absolute clean URLs */
  function _fixNavHrefs() {
    var base  = _getBasePath();
    var nodes = [];
    ["nav a[href]", "header a[href]", "footer a[href]"].forEach(function (q) {
      try { document.querySelectorAll(q).forEach(function (a) { nodes.push(a); }); }
      catch (e) {}
    });

    nodes.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#") return;
      if (_isExternal(href)) return;
      if (href.charAt(0) === "/") return;
      if (_isAsset(href)) return;

      var parts = _parsePathParts(href);
      var p = (parts.path || "").replace(/^\.\//, "");

      // Strip subfolder prefix unless it's a known multi-segment route
      if (p.indexOf("/") !== -1 &&
          !p.startsWith("printbydd-store") &&
          !p.startsWith("store") &&
          !p.startsWith("blog")) {
        var segs = p.split("/").filter(Boolean);
        p = segs[segs.length - 1] || p;
      }

      if (p && !/\./.test(p)) {
        a.setAttribute("href", _joinURL(base, p + "/") + parts.search + parts.hash);
      } else if (/\.html?$/i.test(p)) {
        a.setAttribute("href", _joinURL(base, p.replace(/^\/+/, "")) + parts.search + parts.hash);
      }
    });
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 8 — 404 PAGE  §12
     Renders a built-in not-found screen with typo suggestions.
     ══════════════════════════════════════════════════════════════════ */

  function _render404(slug) {
    var hints = _suggest(String(slug));

    function _draw() {
      document.title = "404 — Page Not Found · ViaDecide";
      document.body.style.cssText =
        "margin:0;background:#04080f;color:#e8edf5;" +
        "font-family:Outfit,system-ui,-apple-system,sans-serif;" +
        "display:flex;align-items:center;justify-content:center;" +
        "min-height:100vh;flex-direction:column;gap:14px;" +
        "text-align:center;padding:22px";

      var hintHtml = "";
      if (hints.length) {
        hintHtml =
          "<p style='margin:0;color:rgba(232,237,245,.55);font-size:14px'>" +
          "Did you mean: " +
          hints.map(function (s) {
            return "<a href='" + _joinURL(_getBasePath(), s + "/") + "'" +
              " style='color:#ff671f;text-decoration:none'>" + s + "</a>";
          }).join(" &bull; ") +
          "</p>";
      }

      document.body.innerHTML =
        "<h1 style='font-size:54px;letter-spacing:-.03em;margin:0'>404</h1>" +
        "<p style='margin:0;color:rgba(232,237,245,.75)'>Page not found</p>" +
        "<p style='margin:0;color:rgba(232,237,245,.65)'>" +
          "No route registered for: <strong style='color:#fff'>" + String(slug) + "</strong>" +
        "</p>" +
        hintHtml +
        "<a href='" + _joinURL(_getBasePath(), "") + "'" +
          " style='color:#ff671f;text-decoration:none;margin-top:10px;" +
          "border:1px solid #ff671f;padding:10px 18px;border-radius:50px'>" +
          "← Back to Home" +
        "</a>";
    }

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", _draw);
    else
      _draw();
  }


  /* ══════════════════════════════════════════════════════════════════
     SECTION 9 — PUBLIC API   window.VDRouter  (SOP §11)
     ══════════════════════════════════════════════════════════════════ */

  window.VDRouter = {

    /**
     * Navigate to a slug or URL.
     * VDRouter.go("app-generator")
     * VDRouter.go("app-generator", { newTab: true })
     */
    go: function (slug, options) {
      options = options || {};
      var s = String(slug || "");

      if (_isExternal(s)) {
        if (options.newTab && !_isInAppBrowser()) {
          window.open(s, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = s;
        }
        return;
      }

      if (options.overlay) {
        _openOverlay(s, options);
        return;
      }

      var norm  = _normalizeSlug(s);
      var match = _resolveRoute(norm);

      if (!match) {
        _safeReplace(_origin() + _joinURL(_getBasePath(), norm + "/"));
        return;
      }

      _currentParams = match.params || {};
      _navigateTo(match.file, options.search || "", options.hash || "", false);
    },

    /**
     * Get the clean URL for a slug (for building href values).
     * VDRouter.url("keychain")  →  "/keychain/"
     */
    url: function (slug) {
      return _joinURL(_getBasePath(), _normalizeSlug(slug) + "/");
    },

    /**
     * Resolve a slug to its mapped filename.
     * VDRouter.resolve("swipeos")  →  "SwipeOS.html"
     */
    resolve: function (slug) {
      var m = _resolveRoute(_normalizeSlug(slug));
      return m ? m.file : null;
    },

    /**
     * Get a snapshot of all registered routes.
     */
    routes: function () {
      var out = {};
      for (var k in ROUTES)
        if (Object.prototype.hasOwnProperty.call(ROUTES, k)) out[k] = ROUTES[k];
      return out;
    },

    /**
     * Register a new route at runtime.  (SOP §6)
     * VDRouter.register("my-tool", "my-tool.html")
     */
    register: function (slug, file) {
      ROUTES[_normalizeSlug(slug)] = String(file || "");
    },

    /** Register a dynamic :param route at runtime. */
    registerParam: function (pattern, file) {
      PARAM_ROUTES.push({ pattern: String(pattern), file: String(file) });
    },

    /** Set the wildcard / 404 file. */
    setWildcard: function (file) {
      WILDCARD_FILE = file || null;
    },

    /** Enable/disable SPA mode (fetch-based navigation without full reloads). */
    setSPAMode: function (enabled) {
      SPA_MODE = !!enabled;
    },

    /** Open a URL in the in-app overlay (same-origin: fetch+inject; external: new tab). */
    openOverlay: function (url, opts) {
      _openOverlay(url, opts || {});
    },

    /** Current route params (from :param patterns). */
    params: function () {
      return Object.assign({}, _currentParams);
    },

    /** Current query string parsed as an object. */
    query: function () {
      var out = {};
      try {
        new URLSearchParams(window.location.search).forEach(function (v, k) {
          out[k] = v;
        });
      } catch (e) {}
      return out;
    },

    /** Prefetch a route's file as a <link rel="prefetch">. */
    prefetch: function (slug) {
      var m = _resolveRoute(_normalizeSlug(slug));
      if (!m || _prefetchCache[m.file]) return;
      _prefetchCache[m.file] = true;
      try {
        var lk   = document.createElement("link");
        lk.rel   = "prefetch";
        lk.href  = _joinURL(_getBasePath(), m.file);
        document.head.appendChild(lk);
      } catch (e) {}
    },

    // History helpers
    back:    function () { window.history.back(); },
    forward: function () { window.history.forward(); },

    // Middleware hooks
    beforeEach: function (fn) {
      if (typeof fn === "function") _hooks.before.push(fn);
      return window.VDRouter;
    },
    afterEach: function (fn) {
      if (typeof fn === "function") _hooks.after.push(fn);
      return window.VDRouter;
    },

    // Event bus
    on: function (event, fn) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(fn);
      return window.VDRouter;
    },
    off: function (event, fn) {
      if (!_listeners[event]) return window.VDRouter;
      _listeners[event] = _listeners[event].filter(function (f) { return f !== fn; });
      return window.VDRouter;
    },
    emit: function (event, data) {
      _emit(event, data);
      return window.VDRouter;
    },

    /**
     * §10 — Bind router to links.
     * Called automatically on DOMContentLoaded but can be re-called
     * after dynamic content is injected.
     */
    bindLinks: function () { _bindLinks(); },
  };


  /* ══════════════════════════════════════════════════════════════════
     SECTION 10 — MODAL TAB BUTTON WIRING
     The #m-tab anchor in index.html opens a subpage from the sheet
     modal. We intercept it to keep context inside the overlay.
     ══════════════════════════════════════════════════════════════════ */

  (function _wireModalTabBtn() {
    function _attach() {
      var mTab = document.getElementById("m-tab");
      if (!mTab) return;
      mTab.addEventListener("click", function (e) {
        var href = mTab.getAttribute("href") || "";
        if (!href || href === "#") return;
        e.preventDefault();
        e.stopPropagation();

        var title = (document.getElementById("m-name") || {}).textContent || href;

        if (typeof closeModal === "function") closeModal();
        setTimeout(function () {
          _openOverlay(href, { title: title });
        }, 380);
      });
    }

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", _attach);
    else
      _attach();
  })();


  /* ══════════════════════════════════════════════════════════════════
     INIT — bind links on DOM ready
     ══════════════════════════════════════════════════════════════════ */

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", _bindLinks);
  else
    _bindLinks();

})();

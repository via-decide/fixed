/**
 * ═══════════════════════════════════════════════════════════
 * viadecide.com — UNIVERSAL ROUTER v3.1
 *
 * Upgrades (v3.1):
 * ✦ Inframe Context: Intercepts _blank/new tabs and opens 
 * them in a sleek iframe overlay to preserve app context.
 * ✦ Dynamic Subpage Interpolation: PARAM_ROUTES now directly
 * injects matched parameters into the resolved file path.
 * ✦ Automated Store Routing: printbydd-store/:item maps instantly.
 *
 * Features:
 * ✦ Route parameters  (/blog/:slug → params.slug)
 * ✦ Wildcard routes   (* catch-all)
 * ✦ beforeEach / afterEach middleware hooks
 * ✦ Event bus         (VDRouter.on / off / emit)
 * ✦ pushState SPA mode (no reload for in-site navigation)
 * ✦ Scroll restoration per route
 * ═══════════════════════════════════════════════════════════
 */
(function ViaDecideRouter() {
  "use strict";

  // ─────────────────────────────────────────────────────────
  // ROUTE MAP  (slug → file path)
  // Static paths go here.
  // ─────────────────────────────────────────────────────────
  var ROUTES = {
    // ── Popular-tool dedicated subpages ──────────────────────────────────────
    "interview-simulator":      "interview-prep.html",
    "interview-prep":           "interview-prep.html",
    "restaurant-website":       "Jalaram-food-court-rajkot.html",
    "restaurant-builder":       "Jalaram-food-court-rajkot.html",
    "finance-dashboard":        "finance-dashboard-msme.html",
    "sales-dashboard":          "sales-dashboard.html",
    "decision-tool":            "alchemist.html",
    "app-generator":            "app-generator.html",

    // ── All real pages in repo ────────────────────────────────────────────────
    "indiaai-mission-2025":           "indiaai-mission-2025.html",
    "viadecide-public-beta":          "viadecide-public-beta.html",
    "multi-source-research-explained":"multi-source-research-explained.html",
    "payment-register":               "payment-register.html",
    "payroll-register":               "payment-register.html",
    "jalaram-food-court":             "Jalaram-food-court-rajkot.html",
    "restaurant-example":             "Jalaram-food-court-rajkot.html",
    "viaguide":                       "ViaGuide.html",
    "studyos":                        "StudyOS.html",

    // ── Previously missing pages (now added) ─────────────────────────────────
    "decide-foodrajkot":              "decide-foodrajkot.html",
    "food-rajkot":                    "decide-foodrajkot.html",
    "viadecide-decision-matrix":      "viadecide-decision-matrix.html",
    "decision-matrix":                "viadecide-decision-matrix.html",
    "viadecide-opportunity-radar":    "viadecide-opportunity-radar.html",
    "opportunity-radar":              "viadecide-opportunity-radar.html",
    "viadecide-reality-check":        "viadecide-reality-check.html",
    "reality-check":                  "viadecide-reality-check.html",
    "ashokverma":                     "AshokVerma.html",
    "ashok-verma":                    "AshokVerma.html",
    "custom-swipe-engine-form":       "CustomSwipeEngineForm.html",
    "customswipeengineform":          "CustomSwipeEngineForm.html",
    "engine-activation-request":      "Engine Activation Request.html",
    "the-decision-stack":             "The Decision Stack.html",
    "decision-stack":                 "The Decision Stack.html",
    // Blog post with special characters
    "why-small-businesses-dont-need-saas": "\u201cWhy Most Small Businesses Don\u2019t Need SaaS \u2014 They Need Structure\".html",
    "saas-structure":                      "\u201cWhy Most Small Businesses Don\u2019t Need SaaS \u2014 They Need Structure\".html",

    // Core tools
    alchemist:          "alchemist.html",
    swipeos:            "SwipeOS.html",
    "engine-deals":     "engine-deals.html",
    "cashback-claim":   "cashback-claim.html",
    "cashback-rules":   "cashback-rules.html",
    "engine-license":   "engine-license.html",
    "ondc-demo":        "ONDC-demo.html",
    "prompt-alchemy":   "prompt-alchemy.html",
    promptalchemy:      "prompt-alchemy.html",
    "student-research": "student-research.html",
    contact:            "contact.html",
    brief:              "brief.html",
    "decision-brief":   "decision-brief.html",

    // Main pages
    pricing:                 "pricing.html",
    discounts:               "discounts.html",
    memory:                  "memory.html",
    founder:                 "founder.html",
    privacy:                 "privacy.html",
    terms:                   "terms.html",
    "decision-brief-guide":  "decision-brief-guide.html",
    "decide-service":        "decide-service.html",
    "cohort-apply-here":     "cohort-apply-here.html",

    // Games / sims
    hexwars:                      "HexWars.html",
    "mars-rover-simulator-game":  "mars-rover-simulator-game.html",
    hivaland:                     "HivaLand.html",

    // Store Base (Dynamic item routing handled in PARAM_ROUTES)
    "printbydd-store":      "printbydd-store/index.html",
    printbydd:              "printbydd-store/index.html",

    // Blog Base
    blogs:                           "Viadecide-blogs.html",
    "viadecide-blogs":               "Viadecide-blogs.html",
    "decision-infrastructure-india": "decision-infrastructure-india.html",
    "ondc-for-bharat":               "ondc-for-bharat.html",
    "laptops-under-50000":           "laptops-under-50000.html",
  };

  // ─────────────────────────────────────────────────────────
  // ALIASES  (legacy slug / case variant → canonical slug)
  // ─────────────────────────────────────────────────────────
  var ALIASES = {
    SwipeOS:        "swipeos",
    "swipeos?":     "swipeos",
    PromptAlchemy:  "prompt-alchemy",
    StudentResearch:"student-research",
    "ONDC-demo":    "ondc-demo",
    ondc:           "ondc-demo",
    ViaGuide:       "viaguide",
    StudyOS:        "studyos",
    AshokVerma:     "ashokverma",
    "Ashok-Verma":  "ashok-verma",
    keychain:               "printbydd-store/keychain",
    numberplate:            "printbydd-store/numberplate",
    products:               "printbydd-store/products",
    "gifts-that-mean-more": "printbydd-store/gifts-that-mean-more",
    gifts:                  "printbydd-store/gifts-that-mean-more"
  };

  // ─────────────────────────────────────────────────────────
  // DYNAMIC PARAM ROUTES  (pattern → file template)
  // Auto-interpolates parameters: "printbydd-store/:item" -> "printbydd-store/:item.html"
  // ─────────────────────────────────────────────────────────
  var PARAM_ROUTES = [
    { pattern: "printbydd-store/:item", file: "printbydd-store/:item.html" },
    { pattern: "store/:item",           file: "printbydd-store/:item.html" },
    { pattern: "blog/:slug",            file: "blog/:slug.html" }
  ];

  var WILDCARD_FILE = "404.html"; // show proper 404 for unmatched routes
  var SPA_MODE = false;

  // Internal state
  var _currentParams  = {};
  var _scrollMap      = {};           
  var _hooks          = { before: [], after: [] };
  var _listeners      = {};           
  var _prefetchCache  = {};

  // ══════════════════════════════════════════════════════════
  // ①  UTILITIES
  // ══════════════════════════════════════════════════════════

  function isInAppBrowser() {
    return /Instagram|FBAN|FBAV|FB_IAB|Line|Twitter|Snapchat/i.test(
      navigator.userAgent || ""
    );
  }

  function normalizeSlug(raw) {
    return String(raw || "")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/^\.\//, "")
      .replace(/\.html?$/i, "")
      .trim()
      .toLowerCase();
  }

  function getBasePath() {
    var host = window.location.host || "";
    var path = window.location.pathname || "/";
    if (/github\.io$/i.test(host)) {
      var seg = path.replace(/^\/+/, "").split("/")[0];
      if (seg) return "/" + seg + "/";
    }
    return "/";
  }

  function origin() {
    return window.location.protocol + "//" + window.location.host;
  }

  function joinURL(basePath, filePath) {
    return basePath.replace(/\/+$/, "/") +
      String(filePath || "").replace(/^\/+/, "");
  }

  function parsePathParts(fullPath) {
    var m = String(fullPath || "/")
      .match(/^([^?#]*)(\?[^#]*)?(#.*)?$/) || [];
    return { path: m[1] || "/", search: m[2] || "", hash: m[3] || "" };
  }

  function safeReplace(url) {
    try { window.location.replace(url); }
    catch (e) { window.location.href = url; }
  }

  function isLikelyExternalHref(href) {
    if (!href) return true;
    if (/^(https?:)?\/\//i.test(href)) return true;
    if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(href)) return true;
    return false;
  }

  function isAssetHref(href) {
    return /\.(js|css|png|jpg|jpeg|webp|svg|ico|json|txt|xml|pdf|mp4|webm|woff2?|ttf|stl|obj|glb|gltf)$/i
      .test(href || "");
  }

  function hrefToSameOriginURL(href) {
    try { return new URL(href, window.location.href); }
    catch (e) { return null; }
  }

  function stripBasePrefix(pathname, basePath) {
    if (basePath !== "/" && pathname.indexOf(basePath) === 0)
      return pathname.slice(basePath.length - 1);
    return pathname;
  }

  function levenshtein(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (j = 1; j <= n; j++)
      for (i = 1; i <= m; i++)
        d[i][j] = a[i-1] === b[j-1]
          ? d[i-1][j-1]
          : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
    return d[m][n];
  }

  function suggest(slug) {
    var all = Object.keys(ROUTES);
    return all
      .map(function(k) { return { k: k, d: levenshtein(slug, k) }; })
      .filter(function(o) { return o.d <= 3; })
      .sort(function(a, b) { return a.d - b.d; })
      .slice(0, 3)
      .map(function(o) { return o.k; });
  }

  // ══════════════════════════════════════════════════════════
  // ②  INFRAME OVERLAY  ─ shows subpage content inside the app
  //     instead of redirecting to a new tab.
  //     Triggered by: target="_blank" links, data-inframe="true",
  //     and the modal's "Open in Tab" CTA (#m-tab).
  // ══════════════════════════════════════════════════════════

  function _openInframe(url, opts) {
    opts = opts || {};
    var overlayId = "vd-inframe-overlay";
    var existing  = document.getElementById(overlayId);
    if (existing) existing.parentNode.removeChild(existing);

    // ── resolve route to get the canonical file URL ──────────────────
    var resolvedUrl = url;
    try {
      var urlObj   = new URL(url, window.location.href);
      var pathname = urlObj.pathname.replace(/^\/+/, "");
      var slug     = normalizeSlug(pathname);
      var match    = resolveRoute(slug);
      if (match) {
        resolvedUrl = origin() + joinURL(getBasePath(), match.file) +
                      (urlObj.search || "") + (urlObj.hash || "");
      }
    } catch(e) {}

    // ── check same-origin (fetch+inject) vs external (new tab only) ──
    var isSameOrigin = false;
    try {
      var resolvedObj = new URL(resolvedUrl, window.location.href);
      isSameOrigin = resolvedObj.origin === window.location.origin;
    } catch(e) {}

    // ── build overlay ─────────────────────────────────────────────────
    var overlay = document.createElement("div");
    overlay.id  = overlayId;
    overlay.style.cssText = [
      "position:fixed;top:0;left:0;width:100vw;height:100vh",
      "z-index:2100;display:flex;flex-direction:column",
      "background:#080a0f",
      "opacity:0;transition:opacity .3s ease"
    ].join(";");

    // ── top bar ───────────────────────────────────────────────────────
    var bar = document.createElement("div");
    bar.style.cssText = [
      "display:flex;align-items:center;justify-content:space-between",
      "padding:.65rem 1rem",
      "background:#0c0e15",
      "border-bottom:1px solid rgba(255,255,255,0.07)",
      "flex-shrink:0;gap:.75rem;min-height:48px"
    ].join(";");

    var barLeft = document.createElement("div");
    barLeft.style.cssText = "display:flex;align-items:center;gap:.5rem;min-width:0;flex:1";

    // back chevron (closes overlay)
    var backBtn = document.createElement("button");
    backBtn.innerHTML = "&#8592;";
    backBtn.setAttribute("aria-label", "Close");
    backBtn.style.cssText = [
      "background:none;border:none;color:#f0ede6;font-size:1.2rem",
      "cursor:pointer;padding:4px 8px;border-radius:6px;flex-shrink:0",
      "transition:background .15s"
    ].join(";");
    backBtn.onmouseover = function(){ this.style.background = "rgba(255,255,255,0.08)"; };
    backBtn.onmouseout  = function(){ this.style.background = "none"; };

    var barTitle = document.createElement("span");
    barTitle.textContent = opts.title || "";
    barTitle.style.cssText = [
      "font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:600",
      "color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1"
    ].join(";");

    barLeft.appendChild(backBtn);
    barLeft.appendChild(barTitle);

    var barRight = document.createElement("div");
    barRight.style.cssText = "display:flex;align-items:center;gap:.4rem;flex-shrink:0";

    // "Open in New Tab" — always visible, always works via window.open()
    var extBtn = document.createElement("button");
    extBtn.textContent = "↗ New Tab";
    extBtn.id = "vd-inframe-ext";
    extBtn.style.cssText = [
      "font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600",
      "padding:.36rem .8rem;border-radius:8px",
      "border:1px solid rgba(255,255,255,0.12);color:#a0a5b8",
      "background:transparent;cursor:pointer",
      "transition:border-color .2s,color .2s"
    ].join(";");
    extBtn.onmouseover = function(){ this.style.color="#f0ede6"; this.style.borderColor="rgba(255,255,255,0.3)"; };
    extBtn.onmouseout  = function(){ this.style.color="#a0a5b8"; this.style.borderColor="rgba(255,255,255,0.12)"; };
    extBtn.onclick = function() {
      // Close overlay first, then open tab — works on mobile too
      _closeOverlay();
      setTimeout(function(){ window.open(resolvedUrl, "_blank", "noopener,noreferrer"); }, 50);
    };

    barRight.appendChild(extBtn);
    bar.appendChild(barLeft);
    bar.appendChild(barRight);

    // ── content area ──────────────────────────────────────────────────
    var wrap = document.createElement("div");
    wrap.style.cssText = [
      "flex:1;overflow-y:auto;overflow-x:hidden",
      "background:#080a0f;position:relative",
      "-webkit-overflow-scrolling:touch"
    ].join(";");

    // Loading spinner
    var loader = document.createElement("div");
    loader.style.cssText = [
      "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)",
      "display:flex;flex-direction:column;align-items:center;gap:14px"
    ].join(";");
    loader.innerHTML = [
      "<div style=\"width:36px;height:36px;border:3px solid rgba(255,255,255,0.08);",
        "border-top-color:#e8a830;border-radius:50%;",
        "animation:vdSpin .7s linear infinite\"></div>",
      "<span style=\"font-family:'Outfit',sans-serif;font-size:.8rem;",
        "color:rgba(240,237,230,0.45)\">Loading…</span>"
    ].join("");

    // Spin keyframes (injected once)
    if (!document.getElementById("vd-spin-style")) {
      var spinStyle = document.createElement("style");
      spinStyle.id = "vd-spin-style";
      spinStyle.textContent = "@keyframes vdSpin{to{transform:rotate(360deg)}}";
      document.head.appendChild(spinStyle);
    }

    wrap.appendChild(loader);
    overlay.appendChild(bar);
    overlay.appendChild(wrap);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // ── close helpers ─────────────────────────────────────────────────
    function _closeOverlay() {
      overlay.style.opacity = "0";
      setTimeout(function(){
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = "";
        document.removeEventListener("keydown", _onKey);
      }, 300);
    }

    function _onKey(e) {
      if (e.key === "Escape") _closeOverlay();
    }

    backBtn.onclick = _closeOverlay;
    document.addEventListener("keydown", _onKey);

    // fade in immediately (content loads inside)
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ overlay.style.opacity = "1"; });
    });

    // ── fetch + inject for same-origin; open tab for external ─────────
    if (!isSameOrigin) {
      // External page — can't fetch, just open in new tab
      loader.innerHTML = [
        "<span style=\"font-size:2rem\">↗</span>",
        "<span style=\"font-family:'Outfit',sans-serif;font-size:.85rem;",
          "color:rgba(240,237,230,0.6)\">Opening in new tab…</span>"
      ].join("");
      setTimeout(function(){
        window.open(resolvedUrl, "_blank", "noopener,noreferrer");
        _closeOverlay();
      }, 400);
      return;
    }

    // Same-origin: fetch HTML and inject it — bypasses X-Frame-Options entirely
    fetch(resolvedUrl, { credentials: "same-origin" })
      .then(function(res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function(html) {
        var parser = new DOMParser();
        var doc    = parser.parseFromString(html, "text/html");

        // Update bar title from page title if not provided
        if (!opts.title && doc.title) {
          barTitle.textContent = doc.title.split("|")[0].split("—")[0].trim();
        }

        // ── Build an isolated content host ──
        var host = document.createElement("div");
        host.style.cssText = "min-height:100%;position:relative;";

        // Inject <style> tags from fetched page
        var fetchedStyles = doc.querySelectorAll("style");
        for (var si = 0; si < fetchedStyles.length; si++) {
          var s = document.createElement("style");
          s.textContent = fetchedStyles[si].textContent;
          host.appendChild(s);
        }

        // Inject <link rel="stylesheet"> from fetched page (same-origin only)
        var fetchedLinks = doc.querySelectorAll("link[rel~='stylesheet']");
        for (var li = 0; li < fetchedLinks.length; li++) {
          try {
            var linkHref = new URL(fetchedLinks[li].getAttribute("href") || "", resolvedUrl).href;
            if (new URL(linkHref).origin === window.location.origin) {
              var lk = document.createElement("link");
              lk.rel  = "stylesheet";
              lk.href = linkHref;
              host.appendChild(lk);
            }
          } catch(e) {}
        }

        // Inject body content
        var bodyEl = doc.body || doc.documentElement;
        host.insertAdjacentHTML("beforeend", bodyEl.innerHTML);

        // Remove any vd-nav injected inside fetched page (we have our own bar)
        var injectedNav = host.querySelector("#vd-nav");
        if (injectedNav) injectedNav.parentNode.removeChild(injectedNav);

        // Remove body padding-top added by vd-nav-fix
        host.style.paddingTop = "0";

        // Replace loader with content
        wrap.removeChild(loader);
        wrap.appendChild(host);

        // ── Intercept internal link clicks inside the overlay ──────────
        host.addEventListener("click", function(e) {
          var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
          if (!a) return;
          var href = a.getAttribute("href") || "";
          if (!href || href.charAt(0) === "#") return;
          if (isLikelyExternalHref(href)) return;
          if (isAssetHref(href)) return;

          try {
            var aUrl = new URL(href, resolvedUrl);
            if (aUrl.origin !== window.location.origin) return;

            e.preventDefault();
            e.stopPropagation();

            var aPath = aUrl.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
            var aSlug = normalizeSlug(aPath);
            var aMatch = resolveRoute(aPath) || resolveRoute(aSlug);
            var nextUrl = aMatch
              ? origin() + joinURL(getBasePath(), aMatch.file) + aUrl.search + aUrl.hash
              : aUrl.href;

            // Navigate overlay to new page
            _openInframe(nextUrl, { title: "" });
          } catch(e2) {}
        }, true);

        // ── Re-execute scripts so internal routing/interactivity works ─
        var scripts = host.querySelectorAll("script");
        function _execNextScript(idx) {
          if (idx >= scripts.length) return;
          var orig = scripts[idx];
          var ns   = document.createElement("script");

          // Copy attributes
          for (var ai = 0; ai < orig.attributes.length; ai++) {
            var attr = orig.attributes[ai];
            try { ns.setAttribute(attr.name, attr.value); } catch(e) {}
          }

          // Set scope context so scripts that reference document.body work correctly
          if (orig.src) {
            try {
              var srcUrl = new URL(orig.getAttribute("src") || "", resolvedUrl).href;
              if (new URL(srcUrl).origin === window.location.origin) {
                ns.src = srcUrl;
                ns.onload  = function() { _execNextScript(idx + 1); };
                ns.onerror = function() { _execNextScript(idx + 1); };
                host.appendChild(ns);
                return; // async, continue in callback
              }
            } catch(e) {}
          } else {
            ns.textContent = orig.textContent;
            try { host.appendChild(ns); } catch(e) {}
          }
          _execNextScript(idx + 1);
        }
        _execNextScript(0);
      })
      .catch(function(err) {
        // Fetch failed — show helpful error with direct link
        wrap.removeChild(loader);
        var errDiv = document.createElement("div");
        errDiv.style.cssText = [
          "display:flex;flex-direction:column;align-items:center;justify-content:center",
          "min-height:60vh;gap:16px;padding:32px;text-align:center",
          "font-family:'Outfit',sans-serif"
        ].join(";");
        errDiv.innerHTML = [
          "<span style='font-size:2.5rem'>⚠️</span>",
          "<p style='color:#f0ede6;font-size:1rem;margin:0;font-weight:600'>Could not load page</p>",
          "<p style='color:rgba(240,237,230,0.5);font-size:.82rem;margin:0'>" + (err.message || "Network error") + "</p>",
          "<button onclick=\"window.open('" + resolvedUrl.replace(/'/g, "\\'") + "','_blank','noopener,noreferrer')\" " +
            "style='margin-top:8px;padding:.6rem 1.4rem;background:rgba(200,147,42,0.15);",
            "color:#e8a830;border:1px solid rgba(200,147,42,0.35);border-radius:10px;",
            "font-family:inherit;font-size:.82rem;font-weight:700;cursor:pointer'>",
            "↗ Open in New Tab</button>"
        ].join("");
        wrap.appendChild(errDiv);
      });
  }

  // ══════════════════════════════════════════════════════════
  // ③  ROUTE RESOLVER
  // ══════════════════════════════════════════════════════════

  function resolveRoute(slug) {
    if (!slug) return null;

    // Static exact match
    if (ROUTES[slug]) return { file: ROUTES[slug], params: {} };

    // Alias
    var aliasTarget = ALIASES[slug] || ALIASES[String(slug).toLowerCase()];
    if (aliasTarget && ROUTES[aliasTarget])
      return { file: ROUTES[aliasTarget], params: {} };

    // Case-insensitive static match
    var lower = String(slug).toLowerCase();
    for (var key in ROUTES) {
      if (Object.prototype.hasOwnProperty.call(ROUTES, key) &&
          String(key).toLowerCase() === lower)
        return { file: ROUTES[key], params: {} };
    }

    // Dynamic :param patterns (Interpolates params into the file path)
    var fullPath = String(slug);
    for (var i = 0; i < PARAM_ROUTES.length; i++) {
      var pr = PARAM_ROUTES[i];
      var result = matchPattern(pr.pattern, fullPath);
      if (result) {
        var finalFile = pr.file;
        for (var paramKey in result) {
           finalFile = finalFile.replace(new RegExp(":" + paramKey, "g"), result[paramKey]);
        }
        return { file: finalFile, params: result };
      }
    }

    // Wildcard catch-all
    if (WILDCARD_FILE) return { file: WILDCARD_FILE, params: {} };

    return null;
  }

  function matchPattern(pattern, path) {
    var pParts = pattern.split("/");
    var uParts = path.split("/");
    if (pParts.length !== uParts.length) return null;
    var params = {};
    for (var i = 0; i < pParts.length; i++) {
      if (pParts[i].charAt(0) === ":") {
        params[pParts[i].slice(1)] = decodeURIComponent(uParts[i] || "");
      } else if (pParts[i] !== uParts[i]) {
        return null;
      }
    }
    return params;
  }


  // ══════════════════════════════════════════════════════════
  // ④  NAVIGATION CORE
  // ══════════════════════════════════════════════════════════

  function navigateTo(filePath, search, hash, replaceState) {
    var base = getBasePath();
    var url = origin() + joinURL(base, filePath) + (search || "") + (hash || "");

    if (SPA_MODE) {
      _spaNavigate(url, filePath, search, hash, replaceState);
    } else {
      if (replaceState) safeReplace(url);
      else window.location.href = url;
    }
  }

  function _spaNavigate(url, filePath, search, hash, replace) {
    var from = window.location.href;

    _runHooks("before", { from: from, to: url, file: filePath }, function(allowed) {
      if (!allowed) return;

      _scrollMap[window.location.pathname] = window.scrollY || 0;

      if (replace) window.history.replaceState({ vd: true }, "", url);
      else         window.history.pushState({ vd: true }, "", url);

      _loadPage(filePath, function() {
        if (hash) {
          try {
            var el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } catch(e) {}
        } else {
          var saved = _scrollMap[window.location.pathname] || 0;
          window.scrollTo(0, saved);
        }
        _runHooks("after", { from: from, to: url });
        _emit("routechange", { from: from, to: url, file: filePath });
      });
    });
  }

  function _loadPage(filePath, done) {
    var base = getBasePath();
    var pageUrl = origin() + joinURL(base, filePath);

    fetch(pageUrl)
      .then(function(res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        if (doc.title) document.title = doc.title;

        var newMain = doc.querySelector("main") || doc.body;
        var curMain = document.querySelector("main") || document.body;
        if (newMain && curMain) {
          curMain.innerHTML = newMain.innerHTML;
          bindNow(); 
        }

        if (typeof done === "function") done();
      })
      .catch(function() {
        window.location.href = pageUrl;
      });
  }


  // ══════════════════════════════════════════════════════════
  // ⑤  MIDDLEWARE & EVENT BUS
  // ══════════════════════════════════════════════════════════

  function _runHooks(type, ctx, cb) {
    var hooks = _hooks[type] || [];
    var i = 0;

    function next() {
      if (i >= hooks.length) { if (cb) cb(true); return; }
      var hook = hooks[i++];
      try {
        var result = hook(ctx, next);
        if (result === false) { if (cb) cb(false); }
        else if (result && typeof result.then === "function") {
          result.then(function(v) {
            if (v === false) { if (cb) cb(false); }
            else next();
          }).catch(function() { if (cb) cb(false); });
        }
      } catch(e) { next(); }
    }
    next();
  }

  function _emit(event, data) {
    var fns = _listeners[event] || [];
    for (var i = 0; i < fns.length; i++) {
      try { fns[i](data); } catch(e) {}
    }
    try {
      window.dispatchEvent(new CustomEvent("vd:" + event, { detail: data }));
    } catch(e) {}
  }


  // ══════════════════════════════════════════════════════════
  // ⑥  BOOT SEQUENCE
  // ══════════════════════════════════════════════════════════

  (function handlePrettyURL() {
    var base     = getBasePath();
    var pathname = window.location.pathname || "/";
    pathname = stripBasePrefix(pathname, base);

    var clean = pathname.replace(/^\/+/, "");
    if (!clean || clean === "index.html" || clean === "index.htm") return;
    if (isAssetHref(clean)) return;
    // Already at a real .html file — no routing needed, avoids redundant redirect loop
    if (/\.html?$/i.test(clean)) return;

    var fullSlug = clean.replace(/\/+$/, "");
    // Try the full path first (supports param routes), then fall back to first segment only
    var match = resolveRoute(fullSlug) ||
                resolveRoute(normalizeSlug(fullSlug)) ||
                resolveRoute(normalizeSlug(fullSlug.split("/")[0]));
    if (!match) return;

    _currentParams = match.params || {};
    navigateTo(
      match.file,
      window.location.search || "",
      window.location.hash  || "",
      true 
    );
  })();

  var _stored = null;
  try { _stored = sessionStorage.getItem("__vd_redirect__"); } catch(e) {}

  if (_stored) {
    try { sessionStorage.removeItem("__vd_redirect__"); } catch(e) {}

    var _parts   = parsePathParts(_stored);
    // Use the full path (minus leading slash) to support multi-segment routes
    var _fullPath = (_parts.path || "/").replace(/^\//, "").replace(/\/+$/, "");
    var _rawSlug  = _fullPath || "";

    if (_rawSlug) {
      var _norm  = normalizeSlug(_rawSlug);
      // Try full path first, then first segment as fallback
      var _match = resolveRoute(_norm) ||
                   resolveRoute(normalizeSlug(_rawSlug.split("/")[0]));
      if (_match) {
        _currentParams = _match.params || {};
        navigateTo(_match.file, _parts.search, _parts.hash, true);
      } else {
        renderNotFound(_rawSlug);
      }
    }
  }

  var _hash = window.location.hash || "";
  if (_hash) {
    var _hashPath = _hash.replace(/^#\/?/, "");
    if (_hashPath && !/^p=/.test(_hashPath) && _hashPath.length < 120) {
      var _hashSlug  = normalizeSlug(_hashPath.split("?")[0]);
      var _hashMatch = resolveRoute(_hashSlug);
      if (_hashMatch) {
        _currentParams = _hashMatch.params || {};
        navigateTo(_hashMatch.file, "", "", false);
      }
    }
  }

  if (SPA_MODE) {
    window.addEventListener("popstate", function(e) {
      var pathname = window.location.pathname;
      var base     = getBasePath();
      var clean    = stripBasePrefix(pathname, base).replace(/^\/+/, "");
      if (!clean) return;

      var slug  = normalizeSlug(clean);
      var match = resolveRoute(slug);
      if (match) {
        _currentParams = match.params || {};
        _loadPage(match.file, function() {
          _emit("routechange", { to: window.location.href });
        });
      }
    });
  }


  // ══════════════════════════════════════════════════════════
  // ⑦  PUBLIC API   window.VDRouter
  // ══════════════════════════════════════════════════════════
  window.VDRouter = {

    go: function(slug, options) {
      options = options || {};

      // If external/forced new tab -> Route to inframe modal
      if (isLikelyExternalHref(String(slug || ""))) {
        if (options.newTab && !isInAppBrowser()) {
          _openInframe(String(slug));
        } else {
          window.location.href = String(slug);
        }
        return;
      }

      var norm  = normalizeSlug(slug);
      var match = resolveRoute(norm);

      if (!match) {
        var fallback = origin() + joinURL(getBasePath(), norm + "/");
        if (options.newTab && !isInAppBrowser()) {
          _openInframe(fallback);
        } else safeReplace(fallback);
        return;
      }

      _currentParams = match.params || {};
      var url = origin() + joinURL(getBasePath(), match.file) +
                (options.search || "") + (options.hash || "");

      if (options.newTab && !isInAppBrowser()) {
        _openInframe(url);
      } else {
        navigateTo(match.file, options.search || "", options.hash || "", false);
      }
    },

    url: function(slug) {
      return joinURL(getBasePath(), normalizeSlug(slug) + "/");
    },

    resolve: function(slug) {
      var match = resolveRoute(normalizeSlug(slug));
      return match ? match.file : null;
    },

    routes: function() {
      var out = {};
      for (var k in ROUTES)
        if (Object.prototype.hasOwnProperty.call(ROUTES, k)) out[k] = ROUTES[k];
      return out;
    },

    register: function(slug, file) {
      ROUTES[normalizeSlug(slug)] = String(file || "");
    },

    registerParam: function(pattern, file) {
      PARAM_ROUTES.push({ pattern: String(pattern), file: String(file) });
    },

    setWildcard: function(file) {
      WILDCARD_FILE = file || null;
    },

    params: function() {
      return Object.assign({}, _currentParams);
    },

    query: function() {
      var out = {};
      try {
        new URLSearchParams(window.location.search).forEach(function(v, k) {
          out[k] = v;
        });
      } catch(e) {}
      return out;
    },

    back: function()    { window.history.back(); },
    forward: function() { window.history.forward(); },

    prefetch: function(slug) {
      var match = resolveRoute(normalizeSlug(slug));
      if (!match || _prefetchCache[match.file]) return;
      _prefetchCache[match.file] = true;
      try {
        var link = document.createElement("link");
        link.rel  = "prefetch";
        link.href = joinURL(getBasePath(), match.file);
        document.head.appendChild(link);
      } catch(e) {}
    },

    beforeEach: function(fn) {
      if (typeof fn === "function") _hooks.before.push(fn);
      return window.VDRouter; 
    },

    afterEach: function(fn) {
      if (typeof fn === "function") _hooks.after.push(fn);
      return window.VDRouter;
    },

    on: function(event, fn) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(fn);
      return window.VDRouter;
    },

    off: function(event, fn) {
      if (!_listeners[event]) return window.VDRouter;
      _listeners[event] = _listeners[event].filter(function(f) { return f !== fn; });
      return window.VDRouter;
    },

    emit: function(event, data) {
      _emit(event, data);
      return window.VDRouter;
    },

    setSPAMode: function(enabled) {
      SPA_MODE = !!enabled;
    },

    bindLinks: function(selector) {
      var sel = selector ||
        "a.subpage-card, nav a, header a, footer a, a[data-vd-route], #m-tab";

      document.addEventListener("click", function(e) {
        if (e.defaultPrevented) return;
        if (e.button && e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var backEl = e.target && e.target.closest
          ? e.target.closest("[data-back]") : null;
        if (backEl) {
          var backHref = backEl.getAttribute("href") || "";
          if (backHref && isLikelyExternalHref(backHref)) return;
          e.preventDefault();
          if (window.history.length > 1) window.history.back();
          else safeReplace(origin() + joinURL(getBasePath(), "index.html"));
          return;
        }

        var a = e.target && e.target.closest
          ? e.target.closest(sel) : null;
        if (!a) return;

        // Inframe intercept for target="_blank"
        var target = (a.getAttribute("target") || "").toLowerCase();
        var inframeAttr = (a.getAttribute("data-inframe") || "").toLowerCase();
        
        if (target === "_blank" || inframeAttr === "true") {
          e.preventDefault();
          _openInframe(a.href);
          return;
        }

        var hrefAttr = a.getAttribute("href") || "";
        if (!hrefAttr) return;
        if (isLikelyExternalHref(hrefAttr)) return;
        if (hrefAttr.charAt(0) === "#") return;
        if (isAssetHref(hrefAttr)) return;

        var url = hrefToSameOriginURL(hrefAttr);
        if (!url) return;
        if (url.origin !== window.location.origin) return;

        var base = getBasePath();
        var path = stripBasePrefix(url.pathname || "/", base);
        var clean = String(path || "/").replace(/^\/+/, "");

        if (/\.html?$/i.test(clean)) {
          e.preventDefault();
          navigateTo(clean, url.search || "", url.hash || "", false);
          return;
        }

        var slug  = normalizeSlug(clean);
        if (!slug) return;

        // Try mapping it as a full parameterized path first (e.g. printbydd-store/keychain)
        var match = resolveRoute(clean.replace(/\/+$/, "")) || resolveRoute(slug);
        e.preventDefault();

        if (!match) {
          safeReplace(
            origin() + joinURL(base, slug + "/") +
            (url.search || "") + (url.hash || "")
          );
          return;
        }

        _currentParams = match.params || {};
        window.VDRouter.go(clean.replace(/\/+$/, ""), {
          newTab: false,
          search: url.search || "",
          hash:   url.hash   || "",
        });
      }, true);
    },
  };


  // ══════════════════════════════════════════════════════════
  // ⑧  NAV HREF FIXER  
  // ══════════════════════════════════════════════════════════
  function fixNavHrefs() {
    var base  = getBasePath();
    var nodes = [];
    ["nav a[href]", "header a[href]", "footer a[href]"].forEach(function(q) {
      try {
        var list = document.querySelectorAll(q);
        for (var i = 0; i < list.length; i++) nodes.push(list[i]);
      } catch(e) {}
    });

    for (var k = 0; k < nodes.length; k++) {
      var a    = nodes[k];
      var href = a.getAttribute("href") || "";
      if (!href) continue;
      if (href.charAt(0) === "#") continue;
      if (isLikelyExternalHref(href)) continue;
      if (href.charAt(0) === "/") continue;
      if (isAssetHref(href)) continue;

      var parts = parsePathParts(href);
      var p = (parts.path || "").replace(/^\.\//, "");
      var s = parts.search || "";
      var h = parts.hash   || "";

      if (p.indexOf("/") !== -1 && !p.startsWith("printbydd-store") && !p.startsWith("store") && !p.startsWith("blog")) {
        var segs = p.split("/").filter(Boolean);
        p = segs[segs.length - 1] || p;
      }

      if (p && !/\./.test(p)) {
        a.setAttribute("href", joinURL(base, p + "/") + s + h);
        continue;
      }
      if (/\.html?$/i.test(p)) {
        a.setAttribute("href", joinURL(base, p.replace(/^\/+/, "")) + s + h);
        continue;
      }
    }
  }

  function bindNow() {
    try { fixNavHrefs(); }    catch(e) {}
    try {
      window.VDRouter.bindLinks(
        "a.subpage-card, nav a, header a, footer a, a[data-vd-route]"
      );
    } catch(e) {}
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", bindNow);
  else
    bindNow();

  // ── Wire the modal "Open in Tab" link to _openInframe ─────────────
  // The #m-tab anchor in index.html opens in target="_blank" by default.
  // We intercept that click and render the page inside the inframe overlay
  // so users stay within the ViaDecide context.
  (function wireModalTabBtn() {
    function attach() {
      var mTab = document.getElementById("m-tab");
      if (!mTab) return;
      mTab.addEventListener("click", function(e) {
        var href = mTab.getAttribute("href") || "";
        if (!href || href === "#") return;
        e.preventDefault();
        e.stopPropagation();

        // read title from the open modal
        var title = (document.getElementById("m-name")  || {}).textContent || href;

        // close the sheet modal first, then open overlay
        if (typeof closeModal === "function") closeModal();
        setTimeout(function(){
          _openInframe(href, { title: title });
        }, 380);  // matches modal close transition
      });
    }
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", attach);
    else
      attach();
  })();


  // ══════════════════════════════════════════════════════════
  // ⑨  BUILT-IN 404 PAGE  
  // ══════════════════════════════════════════════════════════
  function renderNotFound(slug) {
    var hints = suggest(String(slug));

    function render() {
      document.body.style.cssText =
        "margin:0;background:#04080f;color:#e8edf5;" +
        "font-family:Outfit,system-ui,-apple-system,sans-serif;" +
        "display:flex;align-items:center;justify-content:center;" +
        "min-height:100vh;flex-direction:column;gap:14px;" +
        "text-align:center;padding:22px";

      var suggestHtml = "";
      if (hints.length) {
        suggestHtml =
          "<p style='margin:0;color:rgba(232,237,245,.55);font-size:14px'>" +
          "Did you mean: " +
          hints.map(function(s) {
            return "<a href='" + joinURL(getBasePath(), s + "/") + "'" +
              " style='color:#ff671f;text-decoration:none'>" + s + "</a>";
          }).join(" &bull; ") +
          "</p>";
      }

      document.body.innerHTML =
        "<h1 style='font-size:54px;letter-spacing:-.03em;margin:0'>404</h1>" +
        "<p style='margin:0;color:rgba(232,237,245,.75)'>Page not found</p>" +
        "<p style='margin:0;color:rgba(232,237,245,.65)'>" +
          "No route registered for: " +
          "<strong style='color:#fff'>" + String(slug) + "</strong>" +
        "</p>" +
        suggestHtml +
        "<a href='" + joinURL(getBasePath(), "") + "'" +
          " style='color:#ff671f;text-decoration:none;margin-top:10px;" +
          "border:1px solid #ff671f;padding:10px 18px;border-radius:50px'>" +
          "← Back to Home" +
        "</a>";
    }

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", render);
    else
      render();
  }

})();

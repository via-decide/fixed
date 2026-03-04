/**
 * ════════════════════════════════════════════════════════════════════
 * ViaDecide — Universal Router  v4.0 (BULLETPROOF EDITION)
 * ════════════════════════════════════════════════════════════════════
 */
(function ViaDecideRouter() {
  "use strict";

  var ROUTES = {
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
    "sales-dashboard":          "sales-dashboard.html",
    "finance-dashboard":        "finance-dashboard-msme.html",
    "viadecide-decision-matrix":"viadecide-decision-matrix.html",
    "decision-matrix":          "viadecide-decision-matrix.html",
    "viadecide-opportunity-radar":"viadecide-opportunity-radar.html",
    "opportunity-radar":        "viadecide-opportunity-radar.html",
    "viadecide-reality-check":  "viadecide-reality-check.html",
    "reality-check":            "viadecide-reality-check.html",
    "interview-prep":           "interview-prep.html",
    "interview-simulator":      "interview-prep.html",
    "jalaram-food-court":       "Jalaram-food-court-rajkot.html",
    "restaurant-website":       "Jalaram-food-court-rajkot.html",
    "restaurant-builder":       "Jalaram-food-court-rajkot.html",
    "restaurant-example":       "Jalaram-food-court-rajkot.html",
    "decide-foodrajkot":        "decide-foodrajkot.html",
    "food-rajkot":              "decide-foodrajkot.html",
    "engine-deals":             "engine-deals.html",
    "engine-license":           "engine-license.html",
    "engine-activation-request":"Engine Activation Request.html",
    "cashback-claim":           "cashback-claim.html",
    "cashback-rules":           "cashback-rules.html",
    "payment-register":         "payment-register.html",
    "payroll-register":         "payment-register.html",
    "custom-swipe-engine-form": "CustomSwipeEngineForm.html",
    "customswipeengineform":    "CustomSwipeEngineForm.html",
    "founder":                  "founder.html",
    "ashokverma":               "AshokVerma.html",
    "ashok-verma":              "AshokVerma.html",
    "pricing":                  "pricing.html",
    "discounts":                "discounts.html",
    "privacy":                  "privacy.html",
    "terms":                    "terms.html",
    "decide-service":           "decide-service.html",
    "cohort-apply-here":        "cohort-apply-here.html",
    "viadecide-public-beta":    "viadecide-public-beta.html",
    "indiaai-mission-2025":     "indiaai-mission-2025.html",
    "hexwars":                  "HexWars.html",
    "mars-rover-simulator-game":"mars-rover-simulator-game.html",
    "hivaland":                 "HivaLand.html",
    "printbydd-store":          "printbydd-store/index.html",
    "printbydd":                "printbydd-store/index.html",
    "keychain":                 "printbydd-store/keychain.html",
    "numberplate":              "printbydd-store/numberplate.html",
    "printbydd-products":       "printbydd-store/products.html",
    "gifts-that-mean-more":     "printbydd-store/gifts-that-mean-more.html",
    "blogs":                           "Viadecide-blogs.html",
    "viadecide-blogs":                 "Viadecide-blogs.html",
    "decision-infrastructure-india":   "decision-infrastructure-india.html",
    "ondc-for-bharat":                 "ondc-for-bharat.html",
    "laptops-under-50000":             "laptops-under-50000.html",
    "multi-source-research-explained": "multi-source-research-explained.html",
    "the-decision-stack":              "The Decision Stack.html",
    "decision-stack":                  "The Decision Stack.html",
    "why-small-businesses-dont-need-saas": "“Why Most Small Businesses Don’t Need SaaS — They Need Structure”.html",
    "saas-structure":                      "“Why Most Small Businesses Don’t Need SaaS — They Need Structure”.html",
  };

  var ALIASES = {
    "SwipeOS":          "swipeos",
    "swipeos?":         "swipeos",
    "PromptAlchemy":    "prompt-alchemy",
    "StudentResearch":  "student-research",
    "ViaGuide":         "viaguide",
    "StudyOS":          "studyos",
    "AshokVerma":       "ashokverma",
    "Ashok-Verma":      "ashok-verma",
    "ondc":             "ondc-demo",
    "ONDC-demo":        "ondc-demo",
    "gifts":            "gifts-that-mean-more",
    "products":         "printbydd-products",
  };

  var PARAM_ROUTES = [
    { pattern: "printbydd-store/:item", file: "printbydd-store/:item.html" },
    { pattern: "store/:item",           file: "printbydd-store/:item.html" },
    { pattern: "blog/:slug",            file: "blog/:slug.html"            },
  ];

  var WILDCARD_FILE = "404.html"; 
  var SPA_MODE      = true;  

  var _currentParams = {};
  var _scrollMap     = {};
  var _hooks         = { before: [], after: [] };
  var _listeners     = {};
  var _prefetchCache = {};

  function _isInAppBrowser() { return /Instagram|FBAN|FBAV|FB_IAB|Line|Twitter|Snapchat/i.test(navigator.userAgent || ""); }
  function _normalizeSlug(raw) { return String(raw || "").replace(/^\/+/, "").replace(/\/+$/, "").replace(/^\.\//, "").replace(/\.html?$/i, "").trim().toLowerCase(); }
  function _getBasePath() {
    var host = window.location.host || "";
    var path = window.location.pathname || "/";
    if (/github\.io$/i.test(host)) {
      var seg = path.replace(/^\/+/, "").split("/")[0];
      if (seg) return "/" + seg + "/";
    }
    return "/";
  }
  function _origin() { return window.location.protocol + "//" + window.location.host; }
  function _joinURL(base, file) { return base.replace(/\/+$/, "/") + String(file || "").replace(/^\/+/, ""); }
  function _parsePathParts(fullPath) {
    var m = String(fullPath || "/").match(/^([^?#]*)(\?[^#]*)?(#.*)?$/) || [];
    return { path: m[1] || "/", search: m[2] || "", hash: m[3] || "" };
  }
  function _safeReplace(url) { try { window.location.replace(url); } catch (e) { window.location.href = url; } }
  function _isAsset(href) { return /\.(js|css|png|jpg|jpeg|webp|svg|ico|json|txt|xml|pdf|mp4|webm|woff2?|ttf|stl|obj|glb|gltf)$/i.test(href || ""); }
  function _hrefToURL(href) { try { return new URL(href, window.location.href); } catch (e) { return null; } }
  function _stripBasePath(pathname, basePath) {
    if (basePath !== "/" && pathname.indexOf(basePath) === 0) return pathname.slice(basePath.length - 1);
    return pathname;
  }
  function _levenshtein(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (j = 1; j <= n; j++)
      for (i = 1; i <= m; i++)
        d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
    return d[m][n];
  }
  function _suggest(slug) {
    return Object.keys(ROUTES)
      .map(function (k) { return { k: k, d: _levenshtein(slug, k) }; })
      .filter(function (o) { return o.d <= 3; })
      .sort(function (a, b) { return a.d - b.d; })
      .slice(0, 3)
      .map(function (o) { return o.k; });
  }

  function _resolveRoute(slug) {
    if (!slug) return null;
    if (ROUTES[slug]) return { file: ROUTES[slug], params: {} };
    var aliasTarget = ALIASES[slug] || ALIASES[String(slug).toLowerCase()];
    if (aliasTarget && ROUTES[aliasTarget]) return { file: ROUTES[aliasTarget], params: {} };
    var lower = String(slug).toLowerCase();
    for (var key in ROUTES) {
      if (Object.prototype.hasOwnProperty.call(ROUTES, key) && String(key).toLowerCase() === lower)
        return { file: ROUTES[key], params: {} };
    }
    for (var i = 0; i < PARAM_ROUTES.length; i++) {
      var pr = PARAM_ROUTES[i];
      var params = _matchPattern(pr.pattern, String(slug));
      if (params) {
        var file = pr.file;
        for (var p in params) file = file.replace(new RegExp(":" + p, "g"), params[p]);
        return { file: file, params: params };
      }
    }
    if (WILDCARD_FILE) return { file: WILDCARD_FILE, params: {} };
    return null;
  }

  function _matchPattern(pattern, path) {
    var pp = pattern.split("/");
    var up = path.split("/");
    if (pp.length !== up.length) return null;
    var params = {};
    for (var i = 0; i < pp.length; i++) {
      if (pp[i].charAt(0) === ":") params[pp[i].slice(1)] = decodeURIComponent(up[i] || "");
      else if (pp[i] !== up[i]) return null;
    }
    return params;
  }

  function _navigateTo(slug, filePath, search, hash, replaceState) {
    var base = _getBasePath();
    var displayUrl = _origin() + _joinURL(base, slug) + (search || "") + (hash || "");

    if (SPA_MODE) {
      _spaNavigate(displayUrl, filePath, search, hash, replaceState);
    } else {
      var actualUrl = _origin() + _joinURL(base, filePath) + (search || "") + (hash || "");
      if (replaceState) _safeReplace(actualUrl);
      else window.location.href = actualUrl;
    }
  }

  function _spaNavigate(displayUrl, filePath, search, hash, replace) {
    var from = window.location.href;
    _runHooks("before", { from: from, to: displayUrl, file: filePath }, function (ok) {
      if (!ok) return;
      _scrollMap[window.location.pathname] = window.scrollY || 0;
      if (replace) window.history.replaceState({ vd: true }, "", displayUrl);
      else         window.history.pushState({ vd: true }, "", displayUrl);

      _loadPageContent(filePath, function () {
        if (hash) {
          try {
            var el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } catch (e) {}
        } else {
          window.scrollTo(0, _scrollMap[window.location.pathname] || 0);
        }
        _runHooks("after", { from: from, to: displayUrl });
        _emit("routechange", { from: from, to: displayUrl, file: filePath });
      });
    });
  }

  // 🔥 NEW BULLETPROOF FETCH & INJECT LOGIC
  function _loadPageContent(filePath, done) {
    var pageUrl = _origin() + _joinURL(_getBasePath(), filePath);
    fetch(pageUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        if (doc.title) document.title = doc.title;

        // 1. Merge CSS from the new page into the current <head> so styling isn't lost
        doc.querySelectorAll('link[rel="stylesheet"], style').forEach(function(node) {
          if (node.tagName === 'LINK') {
            var href = node.getAttribute('href');
            if (!document.querySelector('link[href="' + href + '"]')) {
              document.head.appendChild(node.cloneNode(true));
            }
          } else {
            document.head.appendChild(node.cloneNode(true));
          }
        });

        // 2. Strict Mount Targeting (Looks for id="vd-router-view" first)
        var targetSelector = "#vd-router-view, main";
        var newEl  = doc.querySelector(targetSelector) || doc.body;
        var curEl  = document.querySelector(targetSelector) || document.body;

        if (newEl && curEl) { 
          // Inject content
          curEl.innerHTML = newEl.innerHTML; 
          
          // Re-execute scripts inside the container
          _execScripts(curEl, pageUrl, 0); 
          _bindLinks(); 
        }
        if (typeof done === "function") done();
      })
      .catch(function () { 
        // If fetch completely fails, hard reload to the file
        window.location.href = pageUrl; 
      });
  }

  /* ══════════════════════════════════════════════════════════════════
     SECTION 4 — OVERLAY 
     ══════════════════════════════════════════════════════════════════ */
  function _openOverlay(url, opts) {
    opts = opts || {};
    var prev = document.getElementById("vd-overlay");
    if (prev) prev.parentNode.removeChild(prev);

    var resolvedUrl = url;
    try {
      var uo    = new URL(url, window.location.href);
      var slug  = _normalizeSlug(uo.pathname.replace(/^\/+/, ""));
      var match = _resolveRoute(slug);
      if (match) {
        resolvedUrl = _origin() + _joinURL(_getBasePath(), match.file) + (uo.search || "") + (uo.hash || "");
      }
    } catch (e) {}

    var isSameOrigin = false;
    try { isSameOrigin = new URL(resolvedUrl).origin === _origin(); } catch (e) {}

    var overlay = document.createElement("div");
    overlay.id  = "vd-overlay";
    _css(overlay, "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2100;display:flex;flex-direction:column;background:#080a0f;opacity:0;transition:opacity .3s ease");

    var bar = document.createElement("div");
    _css(bar, "display:flex;align-items:center;justify-content:space-between;padding:.6rem 1rem;background:#0c0e15;flex-shrink:0;min-height:48px;border-bottom:1px solid rgba(255,255,255,0.07);gap:.75rem");

    var barLeft = document.createElement("div");
    _css(barLeft, "display:flex;align-items:center;gap:.5rem;min-width:0;flex:1");

    var backBtn = _btn("←", "Close overlay");
    _css(backBtn, "background:none;border:none;color:#f0ede6;font-size:1.25rem;cursor:pointer;padding:4px 10px;border-radius:6px;flex-shrink:0;transition:background .15s");
    backBtn.onmouseover = function () { this.style.background = "rgba(255,255,255,.09)"; };
    backBtn.onmouseout  = function () { this.style.background = "none"; };

    var titleEl = document.createElement("span");
    titleEl.textContent = opts.title || "";
    _css(titleEl, "font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:600;color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1");

    barLeft.appendChild(backBtn);
    barLeft.appendChild(titleEl);

    var newTabBtn = _btn("↗ New Tab", "Open in new tab");
    _css(newTabBtn, "font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;padding:.36rem .8rem;border-radius:8px;cursor:pointer;background:transparent;border:1px solid rgba(255,255,255,0.12);color:#a0a5b8;transition:color .2s,border-color .2s");
    newTabBtn.onmouseover = function () { this.style.color = "#f0ede6"; this.style.borderColor = "rgba(255,255,255,.3)"; };
    newTabBtn.onmouseout = function () { this.style.color = "#a0a5b8"; this.style.borderColor = "rgba(255,255,255,.12)"; };
    newTabBtn.onclick = function () {
      _closeOverlay(overlay);
      setTimeout(function () { window.open(resolvedUrl, "_blank", "noopener,noreferrer"); }, 50);
    };

    bar.appendChild(barLeft);
    bar.appendChild(newTabBtn);

    var content = document.createElement("div");
    _css(content, "flex:1;overflow-y:auto;overflow-x:hidden;background:#080a0f;position:relative;-webkit-overflow-scrolling:touch");

    var spinner = document.createElement("div");
    _css(spinner, "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:14px");
    spinner.innerHTML = "<div style='width:36px;height:36px;border:3px solid rgba(255,255,255,.08);border-top-color:#e8a830;border-radius:50%;animation:vdSpin .7s linear infinite'></div><span style='font-family:Outfit,sans-serif;font-size:.8rem;color:rgba(240,237,230,.45)'>Loading…</span>";

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

    function _onKey(e) { if (e.key === "Escape") _closeOverlay(overlay); }
    backBtn.onclick = function () { _closeOverlay(overlay); };
    document.addEventListener("keydown", _onKey);
    overlay._cleanup = function () { document.removeEventListener("keydown", _onKey); };

    requestAnimationFrame(function () { requestAnimationFrame(function () { overlay.style.opacity = "1"; }); });

    if (!isSameOrigin) {
      spinner.innerHTML = "<span style='font-size:2rem'>↗</span><span style='font-family:Outfit,sans-serif;font-size:.85rem;color:rgba(240,237,230,.6)'>Opening in new tab…</span>";
      setTimeout(function () {
        window.open(resolvedUrl, "_blank", "noopener,noreferrer");
        _closeOverlay(overlay);
      }, 400);
      return;
    }

    fetch(resolvedUrl, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        if (!opts.title && doc.title) { titleEl.textContent = doc.title.split("|")[0].split("—")[0].trim(); }

        var host = document.createElement("div");
        _css(host, "min-height:100%;position:relative");

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

        host.insertAdjacentHTML("beforeend", (doc.body || doc.documentElement).innerHTML);

        var injectedNav = host.querySelector("#vd-nav");
        if (injectedNav) injectedNav.parentNode.removeChild(injectedNav);
        host.style.paddingTop = "0";

        content.removeChild(spinner);
        content.appendChild(host);

        host.addEventListener("click", function (e) {
          var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
          if (!a) return;
          var href = a.getAttribute("href") || "";
          try {
            var urlObj = new URL(href, resolvedUrl);
            if (urlObj.origin !== window.location.origin) return; 
            if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(urlObj.protocol)) return;
            if (_isAsset(urlObj.pathname)) return;
            if (urlObj.pathname === window.location.pathname && urlObj.hash && !urlObj.search) return;
            
            e.preventDefault();
            e.stopPropagation();
            var aPath  = urlObj.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
            var aMatch = _resolveRoute(aPath) || _resolveRoute(_normalizeSlug(aPath));
            var next   = aMatch ? _origin() + _joinURL(_getBasePath(), aMatch.file) + urlObj.search + urlObj.hash : urlObj.href;
            _openOverlay(next, { title: "" });
          } catch (e2) {}
        }, true);

        _execScripts(host, resolvedUrl, 0);
      })
      .catch(function (err) {
        content.removeChild(spinner);
        var errDiv = document.createElement("div");
        _css(errDiv, "display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:16px;padding:32px;text-align:center;font-family:'Outfit',sans-serif");
        errDiv.innerHTML = "<span style='font-size:2.5rem'>⚠️</span><p style='color:#f0ede6;font-size:1rem;margin:0;font-weight:600'>Could not load page</p><p style='color:rgba(240,237,230,.5);font-size:.82rem;margin:0'>" + (err.message || "Network error") + "</p><button onclick=\"window.open('" + resolvedUrl.replace(/'/g, "\\'") + "','_blank','noopener,noreferrer')\" style='margin-top:8px;padding:.6rem 1.4rem;background:rgba(200,147,42,.15);color:#e8a830;border:1px solid rgba(200,147,42,.35);border-radius:10px;font-family:inherit;font-size:.82rem;font-weight:700;cursor:pointer'>↗ Open in New Tab</button>";
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

  function _execScripts(host, baseUrl, idx) {
    var scripts = host.querySelectorAll("script");
    if (idx >= scripts.length) return;
    var orig = scripts[idx];
    var ns   = document.createElement("script");
    for (var i = 0; i < orig.attributes.length; i++) {
      try { ns.setAttribute(orig.attributes[i].name, orig.attributes[i].value); } catch (e) {}
    }
    if (orig.getAttribute("src")) {
      try {
        var src = new URL(orig.getAttribute("src"), baseUrl).href;
        if (new URL(src).origin === _origin()) {
          ns.src     = src;
          ns.onload  = function () { _execScripts(host, baseUrl, idx + 1); };
          ns.onerror = function () { _execScripts(host, baseUrl, idx + 1); };
          host.appendChild(ns);
          return;
        }
      } catch (e) {}
    } else {
      ns.textContent = orig.textContent;
      try { host.appendChild(ns); } catch (e) {}
    }
    _execScripts(host, baseUrl, idx + 1);
  }

  function _css(el, str) { el.style.cssText = str; }
  function _btn(text, label) { var b = document.createElement("button"); b.textContent = text; b.setAttribute("aria-label", label); return b; }

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
        if (r === false) { if (cb) cb(false); }
        else if (r && typeof r.then === "function") {
          r.then(function (v) { if (v === false) { if (cb) cb(false); } else next(); }).catch(function () { if (cb) cb(false); });
        }
      } catch (e) { next(); }
    }
    next();
  }

  function _emit(event, data) {
    (_listeners[event] || []).forEach(function (fn) { try { fn(data); } catch (e) {} });
    try { window.dispatchEvent(new CustomEvent("vd:" + event, { detail: data })); } catch (e) {}
  }

  /* ══════════════════════════════════════════════════════════════════
     SECTION 6 — BOOT SEQUENCE
     ══════════════════════════════════════════════════════════════════ */
  (function _handlePrettyURL() {
    var base     = _getBasePath();
    var pathname = _stripBasePath(window.location.pathname || "/", base);
    var clean    = pathname.replace(/^\/+/, "");
    if (!clean || clean === "index.html" || clean === "index.htm" || _isAsset(clean) || /\.html?$/i.test(clean)) return;

    var slug  = clean.replace(/\/+$/, "");
    var match = _resolveRoute(slug) || _resolveRoute(_normalizeSlug(slug)) || _resolveRoute(_normalizeSlug(slug.split("/")[0]));
    if (!match) return;

    _currentParams = match.params || {};
    _navigateTo(slug || "/", match.file, window.location.search || "", window.location.hash || "", true);
  })();

  var _stored = null;
  try { _stored = sessionStorage.getItem("__vd_redirect__"); } catch (e) {}
  if (_stored) {
    try { sessionStorage.removeItem("__vd_redirect__"); } catch (e) {}
    var _p = _parsePathParts(_stored);
    var _fullPath = (_p.path || "/").replace(/^\//, "").replace(/\/+$/, "");
    if (_fullPath) {
      var _m = _resolveRoute(_normalizeSlug(_fullPath)) || _resolveRoute(_normalizeSlug(_fullPath.split("/")[0]));
      if (_m) {
        _currentParams = _m.params || {};
        _navigateTo(_fullPath || "/", _m.file, _p.search, _p.hash, true);
      } else {
        _render404(_fullPath);
      }
    }
  }

  var _hash = window.location.hash || "";
  if (_hash) {
    var _hashPath = _hash.replace(/^#\/?/, "");
    if (_hashPath && !/^p=/.test(_hashPath) && _hashPath.length < 120) {
      var _hm = _resolveRoute(_normalizeSlug(_hashPath.split("?")[0]));
      if (_hm) {
        _currentParams = _hm.params || {};
        _navigateTo(_hashPath, _hm.file, "", "", false);
      }
    }
  }

  if (SPA_MODE) {
    window.addEventListener("popstate", function () {
      var clean = _stripBasePath(window.location.pathname, _getBasePath()).replace(/^\/+/, "");
      if (!clean) return;
      var m = _resolveRoute(_normalizeSlug(clean));
      if (m) {
        _currentParams = m.params || {};
        _loadPageContent(m.file, function () { _emit("routechange", { to: window.location.href }); });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     SECTION 7 — LINK BINDING
     ══════════════════════════════════════════════════════════════════ */
  var NAV_SELECTOR = "a[href]";

  function _bindLinks() {
    _fixNavHrefs();

    if (document._vdBound) return;
    document._vdBound = true;

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || (e.button && e.button !== 0) || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var backEl = e.target && e.target.closest ? e.target.closest("[data-back]") : null;
      if (backEl) {
        var bh = backEl.getAttribute("href") || "";
        if (bh && (/^(https?:)?\/\//i.test(bh)) && bh.indexOf(window.location.host) === -1) return;
        e.preventDefault();
        if (window.history.length > 1) window.history.back();
        else _safeReplace(_origin() + _joinURL(_getBasePath(), "index.html"));
        return;
      }

      var a = e.target && e.target.closest ? e.target.closest(NAV_SELECTOR) : null;
      if (!a) return;

      var target   = (a.getAttribute("target") || "").toLowerCase();
      var inframe  = (a.getAttribute("data-inframe") || "").toLowerCase();
      if (target === "_blank" || inframe === "true") {
        e.preventDefault();
        _openOverlay(a.href);
        return;
      }

      var hrefAttr = a.getAttribute("href") || "";
      if (!hrefAttr) return;

      var url = _hrefToURL(hrefAttr);
      if (!url) return;

      if (url.origin !== window.location.origin) return;
      if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(url.protocol)) return;
      if (_isAsset(url.pathname)) return;
      if (url.pathname === window.location.pathname && url.hash && !url.search) return;

      e.preventDefault();

      var base  = _getBasePath();
      var path  = _stripBasePath(url.pathname || "/", base);
      var clean = String(path || "/").replace(/^\/+/, "");

      if (/\.html?$/i.test(clean)) {
        _navigateTo(clean, clean, url.search || "", url.hash || "", false);
        return;
      }

      var slug  = _normalizeSlug(clean);
      
      if (!slug) {
         _navigateTo("", "index.html", url.search || "", url.hash || "", false);
         return;
      }

      var match = _resolveRoute(clean.replace(/\/+$/, "")) || _resolveRoute(slug);

      if (!match) {
        _safeReplace(_origin() + _joinURL(base, slug + "/") + (url.search || "") + (url.hash || ""));
        return;
      }

      _currentParams = match.params || {};
      _navigateTo(clean.replace(/\/+$/, ""), match.file, url.search || "", url.hash || "", false);
    }, true);
  }

  function _fixNavHrefs() {
    var base  = _getBasePath();
    var nodes = [];
    try { document.querySelectorAll("a[href]").forEach(function (a) { nodes.push(a); }); } catch (e) {}

    nodes.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#" || href.charAt(0) === "/") return;
      try {
        var u = new URL(href, window.location.origin);
        if (u.origin !== window.location.origin || _isAsset(u.pathname)) return;
      } catch(e) { return; }

      var parts = _parsePathParts(href);
      var p = (parts.path || "").replace(/^\.\//, "");

      if (p && !/\./.test(p)) {
        a.setAttribute("href", _joinURL(base, p) + parts.search + parts.hash);
      } else if (/\.html?$/i.test(p)) {
        a.setAttribute("href", _joinURL(base, p.replace(/^\/+/, "")) + parts.search + parts.hash);
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     SECTION 8 — 404 PAGE 
     ══════════════════════════════════════════════════════════════════ */
  function _render404(slug) {
    var hints = _suggest(String(slug));
    function _draw() {
      document.title = "404 — Page Not Found · ViaDecide";
      document.body.style.cssText = "margin:0;background:#04080f;color:#e8edf5;font-family:Outfit,system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:14px;text-align:center;padding:22px";

      var hintHtml = "";
      if (hints.length) {
        hintHtml = "<p style='margin:0;color:rgba(232,237,245,.55);font-size:14px'>Did you mean: " + hints.map(function (s) {
          return "<a href='" + _joinURL(_getBasePath(), s + "/") + "' style='color:#ff671f;text-decoration:none'>" + s + "</a>";
        }).join(" &bull; ") + "</p>";
      }

      document.body.innerHTML = "<h1 style='font-size:54px;letter-spacing:-.03em;margin:0'>404</h1><p style='margin:0;color:rgba(232,237,245,.75)'>Page not found</p><p style='margin:0;color:rgba(232,237,245,.65)'>No route registered for: <strong style='color:#fff'>" + String(slug) + "</strong></p>" + hintHtml + "<a href='" + _joinURL(_getBasePath(), "") + "' style='color:#ff671f;text-decoration:none;margin-top:10px;border:1px solid #ff671f;padding:10px 18px;border-radius:50px'>← Back to Home</a>";
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _draw);
    else _draw();
  }

  /* ══════════════════════════════════════════════════════════════════
     SECTION 9 — PUBLIC API
     ══════════════════════════════════════════════════════════════════ */
  window.VDRouter = {
    go: function (slug, options) {
      options = options || {};
      var s = String(slug || "");

      try {
        var urlObj = new URL(s, window.location.origin);
        if (urlObj.origin !== window.location.origin) {
          if (options.newTab && !_isInAppBrowser()) window.open(s, "_blank", "noopener,noreferrer");
          else window.location.href = s;
          return;
        }
      } catch (e) {}

      if (options.overlay) { _openOverlay(s, options); return; }

      var norm  = _normalizeSlug(s);
      var match = _resolveRoute(norm);

      if (!match) { _safeReplace(_origin() + _joinURL(_getBasePath(), norm + "/")); return; }
      
      _currentParams = match.params || {};
      _navigateTo(norm, match.file, options.search || "", options.hash || "", false);
    },
    url: function (slug) { return _joinURL(_getBasePath(), _normalizeSlug(slug) + "/"); },
    resolve: function (slug) { var m = _resolveRoute(_normalizeSlug(slug)); return m ? m.file : null; },
    routes: function () { var out = {}; for (var k in ROUTES) if (Object.prototype.hasOwnProperty.call(ROUTES, k)) out[k] = ROUTES[k]; return out; },
    register: function (slug, file) { ROUTES[_normalizeSlug(slug)] = String(file || ""); },
    registerParam: function (pattern, file) { PARAM_ROUTES.push({ pattern: String(pattern), file: String(file) }); },
    setWildcard: function (file) { WILDCARD_FILE = file || null; },
    setSPAMode: function (enabled) { SPA_MODE = !!enabled; },
    openOverlay: function (url, opts) { _openOverlay(url, opts || {}); },
    params: function () { return Object.assign({}, _currentParams); },
    query: function () {
      var out = {};
      try { new URLSearchParams(window.location.search).forEach(function (v, k) { out[k] = v; }); } catch (e) {}
      return out;
    },
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
    back:    function () { window.history.back(); },
    forward: function () { window.history.forward(); },
    beforeEach: function (fn) { if (typeof fn === "function") _hooks.before.push(fn); return window.VDRouter; },
    afterEach: function (fn) { if (typeof fn === "function") _hooks.after.push(fn); return window.VDRouter; },
    on: function (event, fn) { if (!_listeners[event]) _listeners[event] = []; _listeners[event].push(fn); return window.VDRouter; },
    off: function (event, fn) { if (!_listeners[event]) return window.VDRouter; _listeners[event] = _listeners[event].filter(function (f) { return f !== fn; }); return window.VDRouter; },
    emit: function (event, data) { _emit(event, data); return window.VDRouter; },
    bindLinks: function () { _bindLinks(); },
  };

  /* ══════════════════════════════════════════════════════════════════
     SECTION 10 — MODAL TAB BUTTON WIRING
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
        setTimeout(function () { _openOverlay(href, { title: title }); }, 380);
      });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _attach);
    else _attach();
  })();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _bindLinks);
  else _bindLinks();

})();

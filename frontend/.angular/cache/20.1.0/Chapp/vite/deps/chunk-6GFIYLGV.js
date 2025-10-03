import {
  A,
  FilterMatchMode,
  G,
  Kt,
  _,
  a,
  ee,
  i,
  m,
  p,
  s,
  s2,
  z2 as z
} from "./chunk-WYWXFNIO.js";
import {
  DOCUMENT,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  Subject,
  effect,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory
} from "./chunk-MDIEEAUC.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styled/dist/index.mjs
var Qe = Object.defineProperty;
var Ye = Object.defineProperties;
var et = Object.getOwnPropertyDescriptors;
var F2 = Object.getOwnPropertySymbols;
var fe = Object.prototype.hasOwnProperty;
var ye = Object.prototype.propertyIsEnumerable;
var he = (e, t, r) => t in e ? Qe(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var d = (e, t) => {
  for (var r in t || (t = {})) fe.call(t, r) && he(e, r, t[r]);
  if (F2) for (var r of F2(t)) ye.call(t, r) && he(e, r, t[r]);
  return e;
};
var _2 = (e, t) => Ye(e, et(t));
var b2 = (e, t) => {
  var r = {};
  for (var s3 in e) fe.call(e, s3) && t.indexOf(s3) < 0 && (r[s3] = e[s3]);
  if (e != null && F2) for (var s3 of F2(e)) t.indexOf(s3) < 0 && ye.call(e, s3) && (r[s3] = e[s3]);
  return r;
};
var st = s();
var R = st;
var v = /{([^}]*)}/g;
var lt = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ct = /var\([^)]+\)/g;
function ke(e) {
  return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function mt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t = "") {
  return mt(`${p(e, false) && p(t, false) ? `${e}-` : e}${t}`);
}
function ne(e = "", t = "") {
  return `--${Q(e, t)}`;
}
function dt(e = "") {
  let t = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t + r) % 2 !== 0;
}
function Y(e, t = "", r = "", s3 = [], o) {
  if (p(e)) {
    let a2 = e.trim();
    if (dt(a2)) return;
    if (z(a2, v)) {
      let n = a2.replaceAll(v, (l) => {
        let c = l.replace(/{|}/g, "").split(".").filter((m2) => !s3.some((u) => z(m2, u)));
        return `var(${ne(r, ee(c.join("-")))}${s2(o) ? `, ${o}` : ""})`;
      });
      return z(n.replace(ct, "0"), lt) ? `calc(${n})` : n;
    }
    return a2;
  } else if (_(e)) return e;
}
function _e(e, t, r) {
  p(t, false) && e.push(`${t}:${r};`);
}
function T(e, t) {
  return e ? `${e}{${t}}` : "";
}
function oe(e, t) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n, l) {
    let i2 = [], c = 0, m2 = "", u = null, p2 = 0;
    for (; c <= n.length; ) {
      let h = n[c];
      if ((h === '"' || h === "'" || h === "`") && n[c - 1] !== "\\" && (u = u === h ? null : h), !u && (h === "(" && p2++, h === ")" && p2--, (h === "," || c === n.length) && p2 === 0)) {
        let y = m2.trim();
        y.startsWith("dt(") ? i2.push(oe(y, l)) : i2.push(s3(y)), m2 = "", c++;
        continue;
      }
      h !== void 0 && (m2 += h), c++;
    }
    return i2;
  }
  function s3(n) {
    let l = n[0];
    if ((l === '"' || l === "'" || l === "`") && n[n.length - 1] === l) return n.slice(1, -1);
    let i2 = Number(n);
    return isNaN(i2) ? n : i2;
  }
  let o = [], a2 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a2.push(n), n += 2;
  else if (e[n] === ")" && a2.length > 0) {
    let l = a2.pop();
    a2.length === 0 && o.push([l, n]);
  }
  if (!o.length) return e;
  for (let n = o.length - 1; n >= 0; n--) {
    let [l, i2] = o[n], c = e.slice(l + 3, i2), m2 = r(c, t), u = t(...m2);
    e = e.slice(0, l) + u + e.slice(i2 + 1);
  }
  return e;
}
var tr = (e) => {
  var a2;
  let t = g.getTheme(), r = le(t, e, void 0, "variable"), s3 = (a2 = r == null ? void 0 : r.match(/--[\w-]+/g)) == null ? void 0 : a2[0], o = le(t, e, void 0, "value");
  return { name: s3, variable: r, value: o };
};
var P = (...e) => le(g.getTheme(), ...e);
var le = (e = {}, t, r, s3) => {
  if (t) {
    let { variable: o, options: a2 } = g.defaults || {}, { prefix: n, transform: l } = (e == null ? void 0 : e.options) || a2 || {}, i2 = z(t, v) ? t : `{${t}}`;
    return s3 === "value" || a(s3) && l === "strict" ? g.getTokenValue(t) : Y(i2, void 0, n, [o.excludedKeyRegex], r);
  }
  return "";
};
function ar(e, ...t) {
  if (e instanceof Array) {
    let r = e.reduce((s3, o, a2) => {
      var n;
      return s3 + o + ((n = m(t[a2], { dt: P })) != null ? n : "");
    }, "");
    return oe(r, P);
  }
  return m(e, { dt: P });
}
function ce(e, t = {}) {
  let r = g.defaults.variable, { prefix: s3 = r.prefix, selector: o = r.selector, excludedKeyRegex: a2 = r.excludedKeyRegex } = t, n = [], l = [], i2 = [{ node: e, path: s3 }];
  for (; i2.length; ) {
    let { node: m2, path: u } = i2.pop();
    for (let p2 in m2) {
      let h = m2[p2], y = ke(h), x = z(p2, a2) ? Q(u) : Q(u, ee(p2));
      if (i(y)) i2.push({ node: y, path: x });
      else {
        let k = ne(x), w2 = Y(y, x, s3, [a2]);
        _e(l, k, w2);
        let $ = x;
        s3 && $.startsWith(s3 + "-") && ($ = $.slice(s3.length + 1)), n.push($.replace(/-/g, "."));
      }
    }
  }
  let c = l.join("");
  return { value: l, tokens: n, declarations: c, css: T(o, c) };
}
var S = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s3;
    return (s3 = t.map((o) => o.resolve(r)).find((o) => o.matched)) != null ? s3 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t) {
  return ce(e, { prefix: t == null ? void 0 : t.prefix });
}, getCommon({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var w2, $, j, V, D, z2, E;
  let { preset: a2, options: n } = t, l, i2, c, m2, u, p2, h;
  if (s2(a2) && n.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re } = a2, y = te || {}, { colorScheme: K } = y, M = b2(y, ["colorScheme"]), N = re || {}, { colorScheme: X } = N, B = b2(N, ["colorScheme"]), x = K || {}, { dark: G2 } = x, I = b2(x, ["dark"]), k = X || {}, { dark: U2 } = k, H = b2(k, ["dark"]), W = s2(L) ? this._toVariables({ primitive: L }, n) : {}, q2 = s2(M) ? this._toVariables({ semantic: M }, n) : {}, Z = s2(I) ? this._toVariables({ light: I }, n) : {}, de = s2(G2) ? this._toVariables({ dark: G2 }, n) : {}, ue = s2(B) ? this._toVariables({ semantic: B }, n) : {}, pe = s2(H) ? this._toVariables({ light: H }, n) : {}, ge = s2(U2) ? this._toVariables({ dark: U2 }, n) : {}, [Le, Me] = [(w2 = W.declarations) != null ? w2 : "", W.tokens], [Ae, je] = [($ = q2.declarations) != null ? $ : "", q2.tokens || []], [De, ze] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Ke, Xe] = [(V = de.declarations) != null ? V : "", de.tokens || []], [Be, Ge] = [(D = ue.declarations) != null ? D : "", ue.tokens || []], [Ie, Ue] = [(z2 = pe.declarations) != null ? z2 : "", pe.tokens || []], [He, We] = [(E = ge.declarations) != null ? E : "", ge.tokens || []];
    l = this.transformCSS(e, Le, "light", "variable", n, s3, o), i2 = Me;
    let qe = this.transformCSS(e, `${Ae}${De}`, "light", "variable", n, s3, o), Ze = this.transformCSS(e, `${Ke}`, "dark", "variable", n, s3, o);
    c = `${qe}${Ze}`, m2 = [.../* @__PURE__ */ new Set([...je, ...ze, ...Xe])];
    let Fe = this.transformCSS(e, `${Be}${Ie}color-scheme:light`, "light", "variable", n, s3, o), Je = this.transformCSS(e, `${He}color-scheme:dark`, "dark", "variable", n, s3, o);
    u = `${Fe}${Je}`, p2 = [.../* @__PURE__ */ new Set([...Ge, ...Ue, ...We])], h = m(a2.css, { dt: P });
  }
  return { primitive: { css: l, tokens: i2 }, semantic: { css: c, tokens: m2 }, global: { css: u, tokens: p2 }, style: h };
}, getPreset({ name: e = "", preset: t = {}, options: r, params: s3, set: o, defaults: a2, selector: n }) {
  var y, N, x;
  let l, i2, c;
  if (s2(t) && r.transform !== "strict") {
    let k = e.replace("-directive", ""), m2 = t, { colorScheme: w2, extend: $, css: j } = m2, V = b2(m2, ["colorScheme", "extend", "css"]), u = $ || {}, { colorScheme: D } = u, z2 = b2(u, ["colorScheme"]), p2 = w2 || {}, { dark: E } = p2, L = b2(p2, ["dark"]), h = D || {}, { dark: te } = h, re = b2(h, ["dark"]), K = s2(V) ? this._toVariables({ [k]: d(d({}, V), z2) }, r) : {}, M = s2(L) ? this._toVariables({ [k]: d(d({}, L), re) }, r) : {}, X = s2(E) ? this._toVariables({ [k]: d(d({}, E), te) }, r) : {}, [B, G2] = [(y = K.declarations) != null ? y : "", K.tokens || []], [I, U2] = [(N = M.declarations) != null ? N : "", M.tokens || []], [H, W] = [(x = X.declarations) != null ? x : "", X.tokens || []], q2 = this.transformCSS(k, `${B}${I}`, "light", "variable", r, o, a2, n), Z = this.transformCSS(k, H, "dark", "variable", r, o, a2, n);
    l = `${q2}${Z}`, i2 = [.../* @__PURE__ */ new Set([...G2, ...U2, ...W])], c = m(j, { dt: P });
  }
  return { css: l, tokens: i2, style: c };
}, getPresetC({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var i2;
  let { preset: a2, options: n } = t, l = (i2 = a2 == null ? void 0 : a2.components) == null ? void 0 : i2[e];
  return this.getPreset({ name: e, preset: l, options: n, params: r, set: s3, defaults: o });
}, getPresetD({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var c, m2;
  let a2 = e.replace("-directive", ""), { preset: n, options: l } = t, i2 = ((c = n == null ? void 0 : n.components) == null ? void 0 : c[a2]) || ((m2 = n == null ? void 0 : n.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: i2, options: l, params: r, set: s3, defaults: o });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t.options.darkModeSelector) : [];
}, getLayerOrder(e, t = {}, r, s3) {
  let { cssLayer: o } = t;
  return o ? `@layer ${m(o.order || o.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: o, defaults: a2 }) {
  let n = this.getCommon({ name: e, theme: t, params: r, set: o, defaults: a2 }), l = Object.entries(s3).reduce((i2, [c, m2]) => i2.push(`${c}="${m2}"`) && i2, []).join(" ");
  return Object.entries(n || {}).reduce((i2, [c, m2]) => {
    if (i(m2) && Object.hasOwn(m2, "css")) {
      let u = G(m2.css), p2 = `${c}-variables`;
      i2.push(`<style type="text/css" data-primevue-style-id="${p2}" ${l}>${u}</style>`);
    }
    return i2;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: o, defaults: a2 }) {
  var c;
  let n = { name: e, theme: t, params: r, set: o, defaults: a2 }, l = (c = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c.css, i2 = Object.entries(s3).reduce((m2, [u, p2]) => m2.push(`${u}="${p2}"`) && m2, []).join(" ");
  return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${i2}>${G(l)}</style>` : "";
}, createTokens(e = {}, t, r = "", s3 = "", o = {}) {
  return {};
}, getTokenValue(e, t, r) {
  var l;
  let o = ((i2) => i2.split(".").filter((m2) => !z(m2.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a2 = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, n = [(l = e[o]) == null ? void 0 : l.computed(a2)].flat().filter((i2) => i2);
  return n.length === 1 ? n[0].value : n.reduce((i2 = {}, c) => {
    let p2 = c, { colorScheme: m2 } = p2, u = b2(p2, ["colorScheme"]);
    return i2[m2] = u, i2;
  }, void 0);
}, getSelectorRule(e, t, r, s3) {
  return r === "class" || r === "attr" ? T(s2(t) ? `${e}${t},${e} ${t}` : e, s3) : T(e, T(t != null ? t : ":root", s3));
}, transformCSS(e, t, r, s3, o = {}, a2, n, l) {
  if (s2(t)) {
    let { cssLayer: i2 } = o;
    if (s3 !== "style") {
      let c = this.getColorSchemeOption(o, n);
      t = r === "dark" ? c.reduce((m2, { type: u, selector: p2 }) => (s2(p2) && (m2 += p2.includes("[CSS]") ? p2.replace("[CSS]", t) : this.getSelectorRule(p2, l, u, t)), m2), "") : T(l != null ? l : ":root", t);
    }
    if (i2) {
      let c = { name: "primeui", order: "primeui" };
      i(i2) && (c.name = m(i2.name, { name: e, type: s3 })), s2(c.name) && (t = T(`@layer ${c.name}`, t), a2 == null || a2.layerNames(c.name));
    }
    return t;
  }
  return "";
} };
var g = { defaults: { variable: { prefix: "p", selector: ":root", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t } = e;
  t && (this._theme = _2(d({}, t), { options: d(d({}, this.defaults.options), t.options) }), this._tokens = S.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), R.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = _2(d({}, this.theme), { preset: e }), this._tokens = S.createTokens(e, this.defaults), this.clearLoadedStyleNames(), R.emit("preset:change", e), R.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = _2(d({}, this.theme), { options: e }), this.clearLoadedStyleNames(), R.emit("options:change", e), R.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return S.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t) {
  return S.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetC(r);
}, getDirective(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetD(r);
}, getCustomPreset(e = "", t, r, s3) {
  let o = { name: e, preset: t, options: this.options, selector: r, params: s3, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPreset(o);
}, getLayerOrderCSS(e = "") {
  return S.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t, r = "style", s3) {
  return S.transformCSS(e, t, s3, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t, r = {}) {
  return S.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t, r = {}) {
  return S.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t), R.emit(`theme:${t}:load`, e), !this._loadingStyles.size && R.emit("theme:load"));
} };

// node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    /* Non vue overlay animations */\n    .p-connected-overlay {\n        opacity: 0;\n        transform: scaleY(0.8);\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-visible {\n        opacity: 1;\n        transform: scaleY(1);\n    }\n\n    .p-connected-overlay-hidden {\n        opacity: 0;\n        transform: scaleY(1);\n        transition: opacity 0.1s linear;\n    }\n\n    /* Vue based overlay animations */\n    .p-connected-overlay-enter-from {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-connected-overlay-leave-to {\n        opacity: 0;\n    }\n\n    .p-connected-overlay-enter-active {\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-leave-active {\n        transition: opacity 0.1s linear;\n    }\n\n    /* Toggleable Content */\n    .p-toggleable-content-enter-from,\n    .p-toggleable-content-leave-to {\n        max-height: 0;\n    }\n\n    .p-toggleable-content-enter-to,\n    .p-toggleable-content-leave-from {\n        max-height: 1000px;\n    }\n\n    .p-toggleable-content-leave-active {\n        overflow: hidden;\n        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n    }\n\n    .p-toggleable-content-enter-active {\n        overflow: hidden;\n        transition: max-height 1s ease-in-out;\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: dt('mask.background');\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter {\n        animation: p-overlay-mask-enter-animation dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave {\n        animation: p-overlay-mask-leave-animation dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-overlay-mask-enter-animation {\n        from {\n            background: transparent;\n        }\n        to {\n            background: dt('mask.background');\n        }\n    }\n    @keyframes p-overlay-mask-leave-animation {\n        from {\n            background: dt('mask.background');\n        }\n        to {\n            background: transparent;\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-usestyle.mjs
var _id = 0;
var UseStyle = class _UseStyle {
  document = inject(DOCUMENT);
  use(css2, options = {}) {
    let isLoaded = false;
    let cssRef = css2;
    let styleRef = null;
    const {
      immediate = true,
      manual = false,
      name = `style_${++_id}`,
      id = void 0,
      media = void 0,
      nonce = void 0,
      first = false,
      props = {}
    } = options;
    if (!this.document) return;
    styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || id && this.document.getElementById(id) || this.document.createElement("style");
    if (!styleRef.isConnected) {
      cssRef = css2;
      A(styleRef, {
        type: "text/css",
        media,
        nonce
      });
      const HEAD = this.document.head;
      first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
      Kt(styleRef, "data-primeng-style-id", name);
    }
    if (styleRef.textContent !== cssRef) {
      styleRef.textContent = cssRef;
    }
    return {
      id,
      name,
      el: styleRef,
      css: cssRef
    };
  }
  static ɵfac = function UseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UseStyle)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UseStyle,
    factory: _UseStyle.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-base.mjs
var base = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName(name) {
    this._loadedStyleNames.delete(name);
  },
  clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  }
};
var css = (
  /*css*/
  `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`
);
var BaseStyle = class _BaseStyle {
  name = "base";
  useStyle = inject(UseStyle);
  theme = void 0;
  css = void 0;
  classes = {};
  inlineStyles = {};
  load = (style2, options = {}, transform = (cs) => cs) => {
    const computedStyle = transform(ar`${m(style2, {
      dt: P
    })}`);
    return computedStyle ? this.useStyle.use(G(computedStyle), __spreadValues({
      name: this.name
    }, options)) : {};
  };
  loadCSS = (options = {}) => {
    return this.load(this.css, options);
  };
  loadTheme = (options = {}, style2 = "") => {
    return this.load(this.theme, options, (computedStyle = "") => g.transformCSS(options.name || this.name, `${computedStyle}${ar`${style2}`}`));
  };
  loadGlobalCSS = (options = {}) => {
    return this.load(css, options);
  };
  loadGlobalTheme = (options = {}, style$1 = "") => {
    return this.load(style, options, (computedStyle = "") => g.transformCSS(options.name || this.name, `${computedStyle}${ar`${style$1}`}`));
  };
  getCommonTheme = (params) => {
    return g.getCommon(this.name, params);
  };
  getComponentTheme = (params) => {
    return g.getComponent(this.name, params);
  };
  getDirectiveTheme = (params) => {
    return g.getDirective(this.name, params);
  };
  getPresetTheme = (preset, selector, params) => {
    return g.getCustomPreset(this.name, preset, selector, params);
  };
  getLayerOrderThemeCSS = () => {
    return g.getLayerOrderCSS(this.name);
  };
  getStyleSheet = (extendedCSS = "", props = {}) => {
    if (this.css) {
      const _css = m(this.css, {
        dt: P
      });
      const _style = G(ar`${_css}${extendedCSS}`);
      const _props = Object.entries(props).reduce((acc, [k, v2]) => acc.push(`${k}="${v2}"`) && acc, []).join(" ");
      return `<style type="text/css" data-primeng-style-id="${this.name}" ${_props}>${_style}</style>`;
    }
    return "";
  };
  getCommonThemeStyleSheet = (params, props = {}) => {
    return g.getCommonStyleSheet(this.name, params, props);
  };
  getThemeStyleSheet = (params, props = {}) => {
    let css2 = [g.getStyleSheet(this.name, params, props)];
    if (this.theme) {
      const name = this.name === "base" ? "global-style" : `${this.name}-style`;
      const _css = ar`${m(this.theme, {
        dt: P
      })}`;
      const _style = G(g.transformCSS(name, _css));
      const _props = Object.entries(props).reduce((acc, [k, v2]) => acc.push(`${k}="${v2}"`) && acc, []).join(" ");
      css2.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
    }
    return css2.join("");
  };
  static ɵfac = function BaseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseStyle)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BaseStyle,
    factory: _BaseStyle.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-config.mjs
var ThemeProvider = class _ThemeProvider {
  // @todo define type for theme
  theme = signal(void 0);
  csp = signal({
    nonce: void 0
  });
  isThemeChanged = false;
  document = inject(DOCUMENT);
  baseStyle = inject(BaseStyle);
  constructor() {
    effect(() => {
      R.on("theme:change", (newTheme) => {
        untracked(() => {
          this.isThemeChanged = true;
          this.theme.set(newTheme);
        });
      });
    });
    effect(() => {
      const themeValue = this.theme();
      if (this.document && themeValue) {
        if (!this.isThemeChanged) {
          this.onThemeChange(themeValue);
        }
        this.isThemeChanged = false;
      }
    });
  }
  ngOnDestroy() {
    g.clearLoadedStyleNames();
    R.clear();
  }
  onThemeChange(value) {
    g.setTheme(value);
    if (this.document) {
      this.loadCommonTheme();
    }
  }
  loadCommonTheme() {
    if (this.theme() === "none") return;
    if (!g.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style: style2
      } = this.baseStyle.getCommonTheme?.() || {};
      const styleOptions = {
        nonce: this.csp?.()?.nonce
      };
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, styleOptions));
      this.baseStyle.loadGlobalTheme(__spreadValues({
        name: "global-style"
      }, styleOptions), style2);
      g.setLoadedStyleName("common");
    }
  }
  setThemeConfig(config) {
    const {
      theme,
      csp
    } = config || {};
    if (theme) this.theme.set(theme);
    if (csp) this.csp.set(csp);
  }
  static ɵfac = function ThemeProvider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeProvider)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ThemeProvider,
    factory: _ThemeProvider.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var PrimeNG = class _PrimeNG extends ThemeProvider {
  ripple = signal(false);
  platformId = inject(PLATFORM_ID);
  /**
   * @deprecated Since v20. Use `inputVariant` instead.
   */
  inputStyle = signal(null);
  inputVariant = signal(null);
  overlayAppendTo = signal("self");
  overlayOptions = {};
  csp = signal({
    nonce: void 0
  });
  filterMatchModeOptions = {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };
  translation = {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    is: "Is",
    isNot: "Is not",
    before: "Before",
    after: "After",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    completed: "Completed",
    upload: "Upload",
    cancel: "Cancel",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    dateFormat: "mm/dd/yy",
    firstDayOfWeek: 0,
    today: "Today",
    weekHeader: "Wk",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyMessage: "No results found",
    searchMessage: "Search results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyFilterMessage: "No results found",
    fileChosenMessage: "Files",
    noFileChosenMessage: "No file chosen",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      previousPageLabel: "Previous Page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List",
      selectColor: "Select a color",
      removeLabel: "Remove",
      browseFiles: "Browse Files",
      maximizeLabel: "Maximize"
    }
  };
  zIndex = {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  };
  translationSource = new Subject();
  translationObserver = this.translationSource.asObservable();
  getTranslation(key) {
    return this.translation[key];
  }
  setTranslation(value) {
    this.translation = __spreadValues(__spreadValues({}, this.translation), value);
    this.translationSource.next(this.translation);
  }
  setConfig(config) {
    const {
      csp,
      ripple,
      inputStyle,
      inputVariant,
      theme,
      overlayOptions,
      translation,
      filterMatchModeOptions,
      overlayAppendTo
    } = config || {};
    if (csp) this.csp.set(csp);
    if (overlayAppendTo) this.overlayAppendTo.set(overlayAppendTo);
    if (ripple) this.ripple.set(ripple);
    if (inputStyle) this.inputStyle.set(inputStyle);
    if (inputVariant) this.inputVariant.set(inputVariant);
    if (overlayOptions) this.overlayOptions = overlayOptions;
    if (translation) this.setTranslation(translation);
    if (filterMatchModeOptions) this.filterMatchModeOptions = filterMatchModeOptions;
    if (theme) this.setThemeConfig({
      theme,
      csp
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPrimeNG_BaseFactory;
    return function PrimeNG_Factory(__ngFactoryType__) {
      return (ɵPrimeNG_BaseFactory || (ɵPrimeNG_BaseFactory = ɵɵgetInheritedFactory(_PrimeNG)))(__ngFactoryType__ || _PrimeNG);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PrimeNG,
    factory: _PrimeNG.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeNG, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PRIME_NG_CONFIG = new InjectionToken("PRIME_NG_CONFIG");
function providePrimeNG(...features) {
  const providers = features?.map((feature) => ({
    provide: PRIME_NG_CONFIG,
    useValue: feature,
    multi: false
  }));
  const initializer = provideAppInitializer(() => {
    const PrimeNGConfig = inject(PrimeNG);
    features?.forEach((feature) => PrimeNGConfig.setConfig(feature));
    return;
  });
  return makeEnvironmentProviders([...providers, initializer]);
}

export {
  R,
  tr,
  g,
  base,
  BaseStyle,
  ThemeProvider,
  PrimeNG,
  PRIME_NG_CONFIG,
  providePrimeNG
};
//# sourceMappingURL=chunk-6GFIYLGV.js.map

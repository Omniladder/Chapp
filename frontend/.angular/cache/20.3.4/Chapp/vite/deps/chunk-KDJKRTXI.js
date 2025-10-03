import {
  BaseStyle,
  N,
  PrimeNG,
  S,
  base
} from "./chunk-HOWR6JSX.js";
import {
  F,
  f,
  s3 as s
} from "./chunk-L7ESSGLK.js";
import {
  isPlatformServer
} from "./chunk-QMSPOFXH.js";
import {
  ChangeDetectorRef,
  DOCUMENT,
  Directive,
  ElementRef,
  Injectable,
  Injector,
  Input,
  PLATFORM_ID,
  Renderer2,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory
} from "./chunk-BALQODO4.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/primeng/fesm2022/primeng-basecomponent.mjs
var BaseComponentStyle = class _BaseComponentStyle extends BaseStyle {
  name = "common";
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵBaseComponentStyle_BaseFactory;
    return function BaseComponentStyle_Factory(__ngFactoryType__) {
      return (ɵBaseComponentStyle_BaseFactory || (ɵBaseComponentStyle_BaseFactory = ɵɵgetInheritedFactory(_BaseComponentStyle)))(__ngFactoryType__ || _BaseComponentStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _BaseComponentStyle,
    factory: _BaseComponentStyle.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponentStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BaseComponent = class _BaseComponent {
  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  el = inject(ElementRef);
  injector = inject(Injector);
  cd = inject(ChangeDetectorRef);
  renderer = inject(Renderer2);
  config = inject(PrimeNG);
  baseComponentStyle = inject(BaseComponentStyle);
  baseStyle = inject(BaseStyle);
  scopedStyleEl;
  rootEl;
  dt;
  get styleOptions() {
    return {
      nonce: this.config?.csp().nonce
    };
  }
  get _name() {
    return this.constructor.name.replace(/^_/, "").toLowerCase();
  }
  get componentStyle() {
    return this["_componentStyle"];
  }
  attrSelector = s("pc");
  themeChangeListeners = [];
  _getHostInstance(instance) {
    if (instance) {
      return instance ? this["hostName"] ? instance["name"] === this["hostName"] ? instance : this._getHostInstance(instance.parentInstance) : instance.parentInstance : void 0;
    }
  }
  _getOptionValue(options, key = "", params = {}) {
    return F(options, key, params);
  }
  ngOnInit() {
    if (this.document) {
      this._loadCoreStyles();
      this._loadStyles();
    }
  }
  ngAfterViewInit() {
    this.rootEl = this.el?.nativeElement;
    if (this.rootEl) {
      this.rootEl?.setAttribute(this.attrSelector, "");
    }
  }
  ngOnChanges(changes) {
    if (this.document && !isPlatformServer(this.platformId)) {
      const {
        dt
      } = changes;
      if (dt && dt.currentValue) {
        this._loadScopedThemeStyles(dt.currentValue);
        this._themeChangeListener(() => this._loadScopedThemeStyles(dt.currentValue));
      }
    }
  }
  ngOnDestroy() {
    this._unloadScopedThemeStyles();
    this.themeChangeListeners.forEach((callback) => N.off("theme:change", callback));
  }
  _loadStyles() {
    const _load = () => {
      if (!base.isStyleNameLoaded("base")) {
        this.baseStyle.loadGlobalCSS(this.styleOptions);
        base.setLoadedStyleName("base");
      }
      this._loadThemeStyles();
    };
    _load();
    this._themeChangeListener(() => _load());
  }
  _loadCoreStyles() {
    if (!base.isStyleNameLoaded("base") && this.componentStyle?.name) {
      this.baseComponentStyle.loadCSS(this.styleOptions);
      this.componentStyle && this.componentStyle?.loadCSS(this.styleOptions);
      base.setLoadedStyleName(this.componentStyle?.name);
    }
  }
  _loadThemeStyles() {
    if (!S.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style
      } = this.componentStyle?.getCommonTheme?.() || {};
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, this.styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, this.styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, this.styleOptions));
      this.baseStyle.loadGlobalTheme(__spreadValues({
        name: "global-style"
      }, this.styleOptions), style);
      S.setLoadedStyleName("common");
    }
    if (!S.isStyleNameLoaded(this.componentStyle?.name) && this.componentStyle?.name) {
      const {
        css,
        style
      } = this.componentStyle?.getComponentTheme?.() || {};
      this.componentStyle?.load(css, __spreadValues({
        name: `${this.componentStyle?.name}-variables`
      }, this.styleOptions));
      this.componentStyle?.loadTheme(__spreadValues({
        name: `${this.componentStyle?.name}-style`
      }, this.styleOptions), style);
      S.setLoadedStyleName(this.componentStyle?.name);
    }
    if (!S.isStyleNameLoaded("layer-order")) {
      const layerOrder = this.componentStyle?.getLayerOrderThemeCSS?.();
      this.baseStyle.load(layerOrder, __spreadValues({
        name: "layer-order",
        first: true
      }, this.styleOptions));
      S.setLoadedStyleName("layer-order");
    }
    if (this.dt) {
      this._loadScopedThemeStyles(this.dt);
      this._themeChangeListener(() => this._loadScopedThemeStyles(this.dt));
    }
  }
  _loadScopedThemeStyles(preset) {
    const {
      css
    } = this.componentStyle?.getPresetTheme?.(preset, `[${this.attrSelector}]`) || {};
    const scopedStyle = this.componentStyle?.load(css, __spreadValues({
      name: `${this.attrSelector}-${this.componentStyle?.name}`
    }, this.styleOptions));
    this.scopedStyleEl = scopedStyle?.el;
  }
  _unloadScopedThemeStyles() {
    this.scopedStyleEl?.remove();
  }
  _themeChangeListener(callback = () => {
  }) {
    base.clearLoadedStyleNames();
    N.on("theme:change", callback);
    this.themeChangeListeners.push(callback);
  }
  cx(key, params = {}) {
    return f(this._getOptionValue(this.$style?.classes, key, __spreadValues({
      instance: this
    }, params)));
  }
  sx(key = "", when = true, params = {}) {
    if (when) {
      const self = this._getOptionValue(this.$style?.inlineStyles, key, __spreadValues({
        instance: this
      }, params));
      return self;
    }
    return void 0;
  }
  get parent() {
    return this["parentInstance"];
  }
  get $style() {
    return this.parent ? this.parent.componentStyle : this.componentStyle;
  }
  cn = f;
  static ɵfac = function BaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseComponent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _BaseComponent,
    inputs: {
      dt: "dt"
    },
    features: [ɵɵProvidersFeature([BaseComponentStyle, BaseStyle]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponent, [{
    type: Directive,
    args: [{
      standalone: true,
      providers: [BaseComponentStyle, BaseStyle]
    }]
  }], null, {
    dt: [{
      type: Input
    }]
  });
})();

export {
  BaseComponent
};
//# sourceMappingURL=chunk-KDJKRTXI.js.map

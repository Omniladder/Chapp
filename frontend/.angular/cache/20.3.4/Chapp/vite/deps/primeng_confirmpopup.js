import {
  Button,
  ButtonModule,
  FocusTrap
} from "./chunk-B3NC4ZVC.js";
import "./chunk-N4XLTRRN.js";
import "./chunk-NLE66XH4.js";
import {
  ConnectedOverlayScrollHandler,
  zindexutils
} from "./chunk-4GJD75WA.js";
import {
  BaseComponent
} from "./chunk-T3ENIUXM.js";
import {
  BaseStyle
} from "./chunk-F7NPH22Z.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-KG52PF6D.js";
import {
  ConfirmationService,
  D,
  K,
  OverlayService,
  PrimeTemplate,
  SharedModule,
  TranslationKeys,
  Ut,
  W,
  Yt,
  bt
} from "./chunk-QIJW7ICL.js";
import {
  CommonModule,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-QMSPOFXH.js";
import "./chunk-YLHXK2KV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  Input,
  NgModule,
  Renderer2,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-BALQODO4.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/confirmpopup/index.mjs
var style2 = "\n    .p-confirmpopup {\n        position: absolute;\n        margin-top: dt('confirmpopup.gutter');\n        top: 0;\n        left: 0;\n        background: dt('confirmpopup.background');\n        color: dt('confirmpopup.color');\n        border: 1px solid dt('confirmpopup.border.color');\n        border-radius: dt('confirmpopup.border.radius');\n        box-shadow: dt('confirmpopup.shadow');\n    }\n\n    .p-confirmpopup-content {\n        display: flex;\n        align-items: center;\n        padding: dt('confirmpopup.content.padding');\n        gap: dt('confirmpopup.content.gap');\n    }\n\n    .p-confirmpopup-icon {\n        font-size: dt('confirmpopup.icon.size');\n        width: dt('confirmpopup.icon.size');\n        height: dt('confirmpopup.icon.size');\n        color: dt('confirmpopup.icon.color');\n    }\n\n    .p-confirmpopup-footer {\n        display: flex;\n        justify-content: flex-end;\n        gap: dt('confirmpopup.footer.gap');\n        padding: dt('confirmpopup.footer.padding');\n    }\n\n    .p-confirmpopup-footer button {\n        width: auto;\n    }\n\n    .p-confirmpopup-footer button:last-child {\n        margin: 0;\n    }\n\n    .p-confirmpopup-flipped {\n        margin-block-start: calc(dt('confirmpopup.gutter') * -1);\n        margin-block-end: dt('confirmpopup.gutter');\n    }\n\n    .p-confirmpopup-enter-from {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-confirmpopup-leave-to {\n        opacity: 0;\n    }\n\n    .p-confirmpopup-enter-active {\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-confirmpopup-leave-active {\n        transition: opacity 0.1s linear;\n    }\n\n    .p-confirmpopup:after,\n    .p-confirmpopup:before {\n        bottom: 100%;\n        left: calc(dt('confirmpopup.arrow.offset') + dt('confirmpopup.arrow.left'));\n        content: ' ';\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n    }\n\n    .p-confirmpopup:after {\n        border-width: calc(dt('confirmpopup.gutter') - 2px);\n        margin-left: calc(-1 * (dt('confirmpopup.gutter') - 2px));\n        border-style: solid;\n        border-color: transparent;\n        border-bottom-color: dt('confirmpopup.background');\n    }\n\n    .p-confirmpopup:before {\n        border-width: dt('confirmpopup.gutter');\n        margin-left: calc(-1 * dt('confirmpopup.gutter'));\n        border-style: solid;\n        border-color: transparent;\n        border-bottom-color: dt('confirmpopup.border.color');\n    }\n\n    .p-confirmpopup-flipped:after,\n    .p-confirmpopup-flipped:before {\n        bottom: auto;\n        top: 100%;\n    }\n\n    .p-confirmpopup-flipped:after {\n        border-bottom-color: transparent;\n        border-top-color: dt('confirmpopup.background');\n    }\n\n    .p-confirmpopup-flipped:before {\n        border-bottom-color: transparent;\n        border-top-color: dt('confirmpopup.border.color');\n    }\n";

// node_modules/primeng/fesm2022/primeng-confirmpopup.mjs
var _c0 = ["content"];
var _c1 = ["accepticon"];
var _c2 = ["rejecticon"];
var _c3 = ["headless"];
var _c4 = (a0, a1) => ({
  showTransitionParams: a0,
  hideTransitionParams: a1
});
var _c5 = (a0) => ({
  value: "open",
  params: a0
});
var _c6 = (a0) => ({
  $implicit: a0
});
function ConfirmPopup_div_0_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ConfirmPopup_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ConfirmPopup_div_0_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headlessTemplate || ctx_r1._headlessTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c6, ctx_r1.confirmation));
  }
}
function ConfirmPopup_div_0_ng_template_2_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ConfirmPopup_div_0_ng_template_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ConfirmPopup_div_0_ng_template_2_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c6, ctx_r1.confirmation));
  }
}
function ConfirmPopup_div_0_ng_template_2_ng_template_3_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("icon"));
  }
}
function ConfirmPopup_div_0_ng_template_2_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmPopup_div_0_ng_template_2_ng_template_3_i_0_Template, 1, 2, "i", 12);
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.confirmation == null ? null : ctx_r1.confirmation.icon);
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("message"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.confirmation == null ? null : ctx_r1.confirmation.message);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵclassMap(ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectIcon);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template", null, 4, ɵɵtemplateRefExtractor);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_i_0_Template, 1, 2, "i", 14)(1, ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_1_Template, 2, 0, null, 15);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngIf", ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectIcon)("ngIfElse", ctx_r1.rejecticon);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.rejectIconTemplate || ctx_r1._rejectIconTemplate);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 13);
    ɵɵlistener("onClick", function ConfirmPopup_div_0_ng_template_2_p_button_6_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onReject());
    });
    ɵɵtemplate(1, ConfirmPopup_div_0_ng_template_2_p_button_6_ng_template_1_Template, 2, 3, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("pcRejectButton"));
    ɵɵproperty("label", ctx_r1.rejectButtonLabel)("styleClass", ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectButtonStyleClass)("size", (ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectButtonProps == null ? null : ctx_r1.confirmation.rejectButtonProps.size) || "small")("text", (ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectButtonProps == null ? null : ctx_r1.confirmation.rejectButtonProps.text) || false)("buttonProps", ctx_r1.getRejectButtonProps())("autofocus", ctx_r1.autoFocusReject);
    ɵɵattribute("aria-label", ctx_r1.rejectButtonLabel);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_i_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵclassMap(ctx_r1.confirmation == null ? null : ctx_r1.confirmation.acceptIcon);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template", null, 5, ɵɵtemplateRefExtractor);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_i_0_Template, 1, 2, "i", 14)(1, ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_1_Template, 2, 0, null, 15);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngIf", ctx_r1.confirmation == null ? null : ctx_r1.confirmation.acceptIcon)("ngIfElse", ctx_r1.accepticontemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.acceptIconTemplate || ctx_r1._acceptIconTemplate);
  }
}
function ConfirmPopup_div_0_ng_template_2_p_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 16);
    ɵɵlistener("onClick", function ConfirmPopup_div_0_ng_template_2_p_button_7_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onAccept());
    });
    ɵɵtemplate(1, ConfirmPopup_div_0_ng_template_2_p_button_7_ng_template_1_Template, 2, 3, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("pcAcceptButton"));
    ɵɵproperty("label", ctx_r1.acceptButtonLabel)("styleClass", ctx_r1.confirmation == null ? null : ctx_r1.confirmation.acceptButtonStyleClass)("size", (ctx_r1.confirmation == null ? null : ctx_r1.confirmation.acceptButtonProps == null ? null : ctx_r1.confirmation.acceptButtonProps.size) || "small")("buttonProps", ctx_r1.getAcceptButtonProps())("autofocus", ctx_r1.autoFocusAccept);
    ɵɵattribute("aria-label", ctx_r1.acceptButtonLabel);
  }
}
function ConfirmPopup_div_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", null, 1);
    ɵɵtemplate(2, ConfirmPopup_div_0_ng_template_2_ng_container_2_Template, 2, 4, "ng-container", 8)(3, ConfirmPopup_div_0_ng_template_2_ng_template_3_Template, 3, 4, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div");
    ɵɵtemplate(6, ConfirmPopup_div_0_ng_template_2_p_button_6_Template, 3, 9, "p-button", 10)(7, ConfirmPopup_div_0_ng_template_2_p_button_7_Template, 3, 8, "p-button", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const withoutContentTemplate_r5 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("content"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngIfElse", withoutContentTemplate_r5);
    ɵɵadvance(3);
    ɵɵclassMap(ctx_r1.cx("footer"));
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r1.confirmation == null ? null : ctx_r1.confirmation.rejectVisible) !== false);
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r1.confirmation == null ? null : ctx_r1.confirmation.acceptVisible) !== false);
  }
}
function ConfirmPopup_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("click", function ConfirmPopup_div_0_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onOverlayClick($event));
    })("@animation.start", function ConfirmPopup_div_0_Template_div_animation_animation_start_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationStart($event));
    })("@animation.done", function ConfirmPopup_div_0_Template_div_animation_animation_done_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationEnd($event));
    });
    ɵɵtemplate(1, ConfirmPopup_div_0_ng_container_1_Template, 2, 4, "ng-container", 8)(2, ConfirmPopup_div_0_ng_template_2_Template, 8, 8, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const notHeadless_r6 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass));
    ɵɵproperty("ngStyle", ctx_r1.style)("@animation", ɵɵpureFunction1(9, _c5, ɵɵpureFunction2(6, _c4, ctx_r1.showTransitionOptions, ctx_r1.hideTransitionOptions)));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.headlessTemplate || ctx_r1._headlessTemplate)("ngIfElse", notHeadless_r6);
  }
}
var classes = {
  root: () => ["p-confirmpopup p-component"],
  content: "p-confirmpopup-content",
  icon: ({
    instance
  }) => ["p-confirmpopup-icon", instance.confirmation?.icon],
  message: "p-confirmpopup-message",
  footer: "p-confirmpopup-footer",
  pcRejectButton: "p-confirmpopup-reject-button",
  pcAcceptButton: "p-confirmpopup-accept-button"
};
var ConfirmPopupStyle = class _ConfirmPopupStyle extends BaseStyle {
  name = "confirmpopup";
  theme = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵConfirmPopupStyle_BaseFactory;
    return function ConfirmPopupStyle_Factory(__ngFactoryType__) {
      return (ɵConfirmPopupStyle_BaseFactory || (ɵConfirmPopupStyle_BaseFactory = ɵɵgetInheritedFactory(_ConfirmPopupStyle)))(__ngFactoryType__ || _ConfirmPopupStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfirmPopupStyle,
    factory: _ConfirmPopupStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmPopupStyle, [{
    type: Injectable
  }], null, null);
})();
var ConfirmPopupClasses;
(function(ConfirmPopupClasses2) {
  ConfirmPopupClasses2["root"] = "p-confirmpopup";
  ConfirmPopupClasses2["content"] = "p-confirmpopup-content";
  ConfirmPopupClasses2["icon"] = "p-confirmpopup-icon";
  ConfirmPopupClasses2["message"] = "p-confirmpopup-message";
  ConfirmPopupClasses2["footer"] = "p-confirmpopup-footer";
  ConfirmPopupClasses2["pcRejectButton"] = "p-confirmpopup-reject-button";
  ConfirmPopupClasses2["pcAcceptButton"] = "p-confirmpopup-accept-button";
})(ConfirmPopupClasses || (ConfirmPopupClasses = {}));
var ConfirmPopup = class _ConfirmPopup extends BaseComponent {
  el;
  confirmationService;
  renderer;
  cd;
  overlayService;
  document;
  /**
   * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
   * @group Props
   */
  key;
  /**
   * Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none".
   * @group Props
   */
  defaultFocus = "accept";
  /**
   * Transition options of the show animation.
   * @group Props
   */
  showTransitionOptions = ".12s cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Transition options of the hide animation.
   * @group Props
   */
  hideTransitionOptions = ".1s linear";
  /**
   * Whether to automatically manage layering.
   * @group Props
   */
  autoZIndex = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Defines if the component is visible.
   * @group Props
   */
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    this.cd.markForCheck();
  }
  container;
  subscription;
  confirmation;
  autoFocusAccept = false;
  autoFocusReject = false;
  contentTemplate;
  acceptIconTemplate;
  rejectIconTemplate;
  headlessTemplate;
  _contentTemplate;
  _acceptIconTemplate;
  _rejectIconTemplate;
  _headlessTemplate;
  _visible;
  documentClickListener;
  documentResizeListener;
  scrollHandler;
  window;
  _componentStyle = inject(ConfirmPopupStyle);
  constructor(el, confirmationService, renderer, cd, overlayService, document) {
    super();
    this.el = el;
    this.confirmationService = confirmationService;
    this.renderer = renderer;
    this.cd = cd;
    this.overlayService = overlayService;
    this.document = document;
    this.window = this.document.defaultView;
    this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
      if (!confirmation) {
        this.hide();
        return;
      }
      if (confirmation.key === this.key) {
        this.confirmation = confirmation;
        const keys = Object.keys(confirmation);
        keys.forEach((key) => {
          this[key] = confirmation[key];
        });
        if (this.confirmation.accept) {
          this.confirmation.acceptEvent = new EventEmitter();
          this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
        }
        if (this.confirmation.reject) {
          this.confirmation.rejectEvent = new EventEmitter();
          this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
        }
        this.visible = true;
      }
    });
  }
  templates;
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        case "rejecticon":
          this._rejectIconTemplate = item.template;
          break;
        case "accepticon":
          this._acceptIconTemplate = item.template;
          break;
        case "headless":
          this._headlessTemplate = item.template;
          break;
      }
    });
  }
  option(name, k) {
    const source = this;
    if (source.hasOwnProperty(name)) {
      if (k) {
        return source[k];
      }
      return source[name];
    }
    return void 0;
  }
  onEscapeKeydown(event) {
    if (this.confirmation && this.confirmation.closeOnEscape !== false) {
      this.onReject();
    }
  }
  onAnimationStart(event) {
    if (event.toState === "open") {
      this.container = event.element;
      this.renderer.appendChild(this.document.body, this.container);
      this.align();
      this.bindListeners();
      this.autoFocusAccept = this.defaultFocus === void 0 || this.defaultFocus === "accept" ? true : false;
      this.autoFocusReject = this.defaultFocus === "reject" ? true : false;
    }
  }
  onAnimationEnd(event) {
    switch (event.toState) {
      case "void":
        this.onContainerDestroy();
        break;
    }
  }
  getAcceptButtonProps() {
    return this.option("acceptButtonProps");
  }
  getRejectButtonProps() {
    return this.option("rejectButtonProps");
  }
  align() {
    if (this.autoZIndex) {
      zindexutils.set("overlay", this.container, this.config.zIndex.overlay);
    }
    if (!this.confirmation || !this.confirmation.target) {
      return;
    }
    D(this.container, this.confirmation?.target, false);
    const containerOffset = K(this.container);
    const targetOffset = K(this.confirmation?.target);
    let arrowLeft = 0;
    if (containerOffset && targetOffset && containerOffset.left < targetOffset.left) {
      arrowLeft = targetOffset.left - containerOffset.left;
    }
    if (this.container) {
      this.container.style.setProperty("--p-confirmpopup-arrow-left", `${arrowLeft}px`);
    }
    if (containerOffset && targetOffset && containerOffset.top < targetOffset.top) {
      W(this.container, "p-confirm-popup-flipped");
    }
  }
  hide() {
    this.visible = false;
  }
  onAccept() {
    if (this.confirmation?.acceptEvent) {
      this.confirmation.acceptEvent.emit();
    }
    this.hide();
    bt(this.confirmation?.target);
  }
  onReject() {
    if (this.confirmation?.rejectEvent) {
      this.confirmation.rejectEvent.emit();
    }
    this.hide();
    bt(this.confirmation?.target);
  }
  onOverlayClick(event) {
    this.overlayService.add({
      originalEvent: event,
      target: this.el.nativeElement
    });
  }
  bindListeners() {
    setTimeout(() => {
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
      this.bindScrollListener();
    });
  }
  unbindListeners() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      let documentEvent = Ut() ? "touchstart" : "click";
      const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
      this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
        if (this.confirmation && this.confirmation.dismissableMask !== false) {
          let targetElement = this.confirmation.target;
          if (this.container !== event.target && !this.container?.contains(event.target) && targetElement !== event.target && !targetElement.contains(event.target)) {
            this.hide();
          }
        }
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  onWindowResize() {
    if (this.visible && !Yt()) {
      this.hide();
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(this.window, "resize", this.onWindowResize.bind(this));
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.confirmation?.target, () => {
        if (this.visible) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unsubscribeConfirmationSubscriptions() {
    if (this.confirmation) {
      if (this.confirmation.acceptEvent) {
        this.confirmation.acceptEvent.unsubscribe();
      }
      if (this.confirmation.rejectEvent) {
        this.confirmation.rejectEvent.unsubscribe();
      }
    }
  }
  onContainerDestroy() {
    this.unbindListeners();
    this.unsubscribeConfirmationSubscriptions();
    if (this.autoZIndex) {
      zindexutils.clear(this.container);
    }
    this.confirmation = null;
    this.container = null;
  }
  restoreAppend() {
    if (this.container) {
      this.renderer.removeChild(this.document.body, this.container);
    }
    this.onContainerDestroy();
  }
  get acceptButtonLabel() {
    return this.confirmation?.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
  }
  get rejectButtonLabel() {
    return this.confirmation?.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
  }
  ngOnDestroy() {
    this.restoreAppend();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  static ɵfac = function ConfirmPopup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmPopup)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ConfirmationService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(OverlayService), ɵɵdirectiveInject(DOCUMENT));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ConfirmPopup,
    selectors: [["p-confirmpopup"]],
    contentQueries: function ConfirmPopup_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.acceptIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rejectIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headlessTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostBindings: function ConfirmPopup_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown.Escape", function ConfirmPopup_keydown_Escape_HostBindingHandler($event) {
          return ctx.onEscapeKeydown($event);
        }, ɵɵresolveDocument);
      }
    },
    inputs: {
      key: "key",
      defaultFocus: "defaultFocus",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      style: "style",
      styleClass: "styleClass",
      visible: "visible"
    },
    features: [ɵɵProvidersFeature([ConfirmPopupStyle]), ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    consts: [["notHeadless", ""], ["content", ""], ["withoutContentTemplate", ""], ["icon", ""], ["rejecticon", ""], ["accepticontemplate", ""], ["pFocusTrap", "", "role", "alertdialog", 3, "class", "ngStyle", "click", 4, "ngIf"], ["pFocusTrap", "", "role", "alertdialog", 3, "click", "ngStyle"], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "label", "class", "styleClass", "size", "text", "buttonProps", "autofocus", "onClick", 4, "ngIf"], ["type", "button", 3, "label", "class", "styleClass", "size", "buttonProps", "autofocus", "onClick", 4, "ngIf"], [3, "class", 4, "ngIf"], ["type", "button", 3, "onClick", "label", "styleClass", "size", "text", "buttonProps", "autofocus"], [3, "class", 4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"], ["type", "button", 3, "onClick", "label", "styleClass", "size", "buttonProps", "autofocus"]],
    template: function ConfirmPopup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, ConfirmPopup_div_0_Template, 4, 11, "div", 6);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.visible);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, SharedModule, ButtonModule, Button, FocusTrap],
    encapsulation: 2,
    data: {
      animation: [trigger("animation", [state("void", style({
        transform: "scaleY(0.8)",
        opacity: 0
      })), state("open", style({
        transform: "translateY(0)",
        opacity: 1
      })), transition("void => open", animate("{{showTransitionParams}}")), transition("open => void", animate("{{hideTransitionParams}}"))])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmPopup, [{
    type: Component,
    args: [{
      selector: "p-confirmpopup",
      standalone: true,
      imports: [CommonModule, SharedModule, ButtonModule, FocusTrap],
      template: `
        <div
            *ngIf="visible"
            pFocusTrap
            [class]="cn(cx('root'), styleClass)"
            [ngStyle]="style"
            role="alertdialog"
            (click)="onOverlayClick($event)"
            [@animation]="{
                value: 'open',
                params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
            }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
        >
            <ng-container *ngIf="headlessTemplate || _headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate || _headlessTemplate; context: { $implicit: confirmation }"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div #content [class]="cx('content')">
                    <ng-container *ngIf="contentTemplate || _contentTemplate; else withoutContentTemplate">
                        <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: confirmation }"></ng-container>
                    </ng-container>
                    <ng-template #withoutContentTemplate>
                        <i [class]="cx('icon')" *ngIf="confirmation?.icon"></i>
                        <span [class]="cx('message')">{{ confirmation?.message }}</span>
                    </ng-template>
                </div>
                <div [class]="cx('footer')">
                    <p-button
                        type="button"
                        [label]="rejectButtonLabel"
                        (onClick)="onReject()"
                        [class]="cx('pcRejectButton')"
                        [styleClass]="confirmation?.rejectButtonStyleClass"
                        [size]="confirmation?.rejectButtonProps?.size || 'small'"
                        [text]="confirmation?.rejectButtonProps?.text || false"
                        *ngIf="confirmation?.rejectVisible !== false"
                        [attr.aria-label]="rejectButtonLabel"
                        [buttonProps]="getRejectButtonProps()"
                        [autofocus]="autoFocusReject"
                    >
                        <ng-template #icon>
                            <i [class]="confirmation?.rejectIcon" *ngIf="confirmation?.rejectIcon; else rejecticon"></i>
                            <ng-template #rejecticon *ngTemplateOutlet="rejectIconTemplate || _rejectIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                    <p-button
                        type="button"
                        [label]="acceptButtonLabel"
                        (onClick)="onAccept()"
                        [class]="cx('pcAcceptButton')"
                        [styleClass]="confirmation?.acceptButtonStyleClass"
                        [size]="confirmation?.acceptButtonProps?.size || 'small'"
                        *ngIf="confirmation?.acceptVisible !== false"
                        [attr.aria-label]="acceptButtonLabel"
                        [buttonProps]="getAcceptButtonProps()"
                        [autofocus]="autoFocusAccept"
                    >
                        <ng-template #icon>
                            <i [class]="confirmation?.acceptIcon" *ngIf="confirmation?.acceptIcon; else accepticontemplate"></i>
                            <ng-template #accepticontemplate *ngTemplateOutlet="acceptIconTemplate || _acceptIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                </div>
            </ng-template>
        </div>
    `,
      animations: [trigger("animation", [state("void", style({
        transform: "scaleY(0.8)",
        opacity: 0
      })), state("open", style({
        transform: "translateY(0)",
        opacity: 1
      })), transition("void => open", animate("{{showTransitionParams}}")), transition("open => void", animate("{{hideTransitionParams}}"))])],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ConfirmPopupStyle]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ConfirmationService
  }, {
    type: Renderer2
  }, {
    type: ChangeDetectorRef
  }, {
    type: OverlayService
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    key: [{
      type: Input
    }],
    defaultFocus: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    acceptIconTemplate: [{
      type: ContentChild,
      args: ["accepticon", {
        descendants: false
      }]
    }],
    rejectIconTemplate: [{
      type: ContentChild,
      args: ["rejecticon", {
        descendants: false
      }]
    }],
    headlessTemplate: [{
      type: ContentChild,
      args: ["headless", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    onEscapeKeydown: [{
      type: HostListener,
      args: ["document:keydown.Escape", ["$event"]]
    }]
  });
})();
var ConfirmPopupModule = class _ConfirmPopupModule {
  static ɵfac = function ConfirmPopupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmPopupModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ConfirmPopupModule,
    imports: [ConfirmPopup, SharedModule],
    exports: [ConfirmPopup, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [ConfirmPopup, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmPopupModule, [{
    type: NgModule,
    args: [{
      imports: [ConfirmPopup, SharedModule],
      exports: [ConfirmPopup, SharedModule]
    }]
  }], null, null);
})();
export {
  ConfirmPopup,
  ConfirmPopupClasses,
  ConfirmPopupModule,
  ConfirmPopupStyle
};
//# sourceMappingURL=primeng_confirmpopup.js.map

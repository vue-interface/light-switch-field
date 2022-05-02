var Shadowable = {
  props: {
    dropShadow: [Boolean, String],
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: [Boolean, String],
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const dropShadowClassName = this.dropShadow === true ? "" : this.dropShadow && `-${this.dropShadow}`;
      const shadowClassName = this.shadow === true ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${dropShadowClassName}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${shadowClassName}`]: !!this.shadow
      };
    }
  }
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({
    delimiter: "."
  }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({
    delimiter: "-"
  }, options));
}
const global = {};
function config(...args) {
  if (!args.length) {
    return global;
  }
  const [key, value] = args;
  if (typeof key === "string") {
    return typeof global[key] !== "undefined" ? global[key] : value;
  }
  if (Array.isArray(key)) {
    return key.reduce((carry, key2) => {
      return Object.assign(carry, {
        [key2]: global[key2]
      });
    }, {});
  }
  return Object.assign(global, ...args);
}
function prefix(key, value, delimeter = "-") {
  const string = value.toString().replace(new RegExp(`^${key}${delimeter}?`), "");
  return [paramCase(string), key].filter((value2) => !!value2).join(delimeter);
}
function isObject(subject) {
  return !Array.isArray(subject) && typeof subject === "object";
}
var FormControl = {
  directives: {
    bindEvents: {
      bind(el, binding, vnode) {
        el.addEventListener("focus", () => {
          vnode.context.hasFocus = true;
        });
        el.addEventListener("blur", () => {
          vnode.context.hasFocus = false;
        });
        el.addEventListener(el.tagName === "SELECT" ? "change" : "input", (e) => {
          vnode.context.isEmpty = !el.value;
          vnode.context.currentValue = el.value;
        });
        vnode.context.hasChanged = !!el.value;
        vnode.context.bindEvents.forEach((name) => {
          el.addEventListener(name, (event) => {
            vnode.context.$emit(name, event);
          });
        });
        if (el.tagName === "SELECT") {
          const opt = el.querySelector('[value=""]');
          if (opt && opt.value === el.value) {
            vnode.context.defaultEmpty = true;
          }
        }
      }
    }
  },
  mixins: [Shadowable],
  inheritAttrs: false,
  props: {
    activity: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: () => config("animated", false)
    },
    bindEvents: {
      type: Array,
      default() {
        return ["focus", "blur", "change", "click", "keypress", "keyup", "keydown", "progress", "paste"];
      }
    },
    componentName: {
      type: String,
      default() {
        return this.$options.name;
      }
    },
    defaultControlClass: {
      type: String,
      default: () => config("defaultControlClass", "form-control")
    },
    defaultValue: {
      default: () => config("defaultValue", null)
    },
    error: [String, Array, Boolean],
    errors: {
      type: [Array, Object, Boolean],
      default() {
        return {};
      }
    },
    feedback: [String, Array],
    group: {
      type: Boolean,
      default: () => config("group", true)
    },
    helpText: [Number, String],
    hideLabel: Boolean,
    indicator: {
      type: String,
      default: () => config("indicator", "spinner")
    },
    indicatorSize: String,
    inline: Boolean,
    invalid: Boolean,
    label: [Number, String],
    labelClass: {
      type: [Object, String],
      default: () => config("labelClass", "form-label")
    },
    pill: Boolean,
    plaintext: Boolean,
    size: String,
    spacing: String,
    valid: Boolean,
    value: {
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value || this.defaultValue,
      defaultEmpty: false,
      hasChanged: false,
      hasFocus: false,
      isEmpty: !(this.value || this.defaultValue)
    };
  },
  computed: {
    id() {
      return this.$attrs.id || this.$attrs.name;
    },
    controlAttributes() {
      return Object.keys(this.$attrs).concat([["id", this.id], ["class", this.controlClasses]]).reduce((carry, key) => {
        if (Array.isArray(key)) {
          carry[key[0]] = key[1];
        } else {
          carry[key] = this[key] || this.$attrs[key];
        }
        return carry;
      }, {});
    },
    controlClass() {
      return this.defaultControlClass;
    },
    controlSizeClass() {
      return prefix(this.size, this.controlClass);
    },
    formGroupClasses() {
      return {
        [paramCase(this.componentName)]: !!this.componentName,
        [this.size && prefix(this.size, this.componentName)]: !!this.size,
        "animated": this.animated,
        "default-empty": this.defaultEmpty,
        "form-group": this.group,
        [this.size && prefix(this.size, "form-group")]: !!this.size,
        "has-activity": this.activity,
        "has-changed": this.hasChanged,
        "has-focus": this.hasFocus,
        "has-icon": !!this.$slots.icon,
        "is-empty": this.isEmpty,
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        "is-valid": !!(this.valid || this.validFeedback)
      };
    },
    controlClasses() {
      return Object.assign({
        [this.controlClass]: !!this.controlClass,
        [this.controlSizeClass]: !!this.controlSizeClass,
        "form-control-icon": !!this.$slots.icon,
        "is-valid": !!(this.valid || this.validFeedback),
        "is-invalid": !!(this.invalid || this.invalidFeedback),
        [this.pillClasses]: this.pill,
        [this.plaintextClass]: this.plaintext,
        [this.spacing]: !!this.spacing
      }, this.shadowableClass);
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    invalidFeedback() {
      if (this.error === "") {
        return null;
      }
      if (this.error) {
        return this.error;
      }
      const errors = this.getFieldErrors();
      return Array.isArray(errors) ? errors.filter((error) => {
        return error && typeof error === "string";
      }).join("<br>") : errors;
    },
    pillClasses() {
      return "rounded rounded-pill";
    },
    plaintextClass() {
      return "form-control-plaintext";
    },
    validFeedback() {
      return Array.isArray(this.feedback) ? this.feedback.join("<br>") : this.feedback;
    }
  },
  watch: {
    hasFocus() {
      if (this.shouldChangeOnFocus()) {
        this.hasChanged = true;
      }
    },
    value(value) {
      this.currentValue = value;
    },
    currentValue() {
      this.hasChanged = true;
    },
    defaultEmpty() {
      this.hasChanged = true;
    }
  },
  mounted() {
    if (this.value === null && this.defaultValue !== null) {
      this.$emit("input", this.defaultValue);
    }
  },
  methods: {
    blur() {
      if (this.getInputField()) {
        this.getInputField().blur();
      }
    },
    focus() {
      if (this.getInputField()) {
        this.getInputField().focus();
      }
    },
    getInputField() {
      return this.$el.querySelector(".form-control, input, select, textarea");
    },
    getFieldErrors() {
      let errors = this.error || this.errors;
      if (this.errors && isObject(this.errors)) {
        errors = this.errors[this.$attrs.name || this.$attrs.id];
      }
      return !errors || Array.isArray(errors) || isObject(errors) ? errors : [errors];
    },
    shouldChangeOnFocus() {
      return !this.getInputField().readOnly;
    },
    onInput(e) {
      this.$emit("input", e.target.value);
      this.$emit("update:value", e.target.value);
    }
  }
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.formGroupClasses }, [_c("div", { ref: "input", class: _vm.controlClasses, on: { "keyup": [function($event) {
    if (!$event.type.indexOf("key") && $event.keyCode !== 32) {
      return null;
    }
    return _vm.toggle(_vm.currentValue);
  }, function($event) {
    if (!$event.type.indexOf("key") && $event.keyCode !== 37) {
      return null;
    }
    return _vm.toggle(false);
  }, function($event) {
    if (!$event.type.indexOf("key") && $event.keyCode !== 39) {
      return null;
    }
    return _vm.toggle(true);
  }] } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.currentValue, expression: "currentValue" }], ref: "input", staticClass: "form-check-input", attrs: { "type": "checkbox" }, domProps: { "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue }, on: { "change": function($event) {
    var $$a = _vm.currentValue, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = null, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.currentValue = $$c;
    }
  } } }), _vm._t("label", function() {
    return [_vm.label ? _c("label", { staticStyle: { "padding-left": ".5em" }, attrs: { "for": _vm.$attrs.id } }, [_vm._t("default", function() {
      return [_vm._v(_vm._s(_vm.label))];
    })], 2) : _vm._e()];
  })], 2), _vm._t("feedback", function() {
    return [_vm.invalidFeedback ? _c("div", { staticClass: "invalid-feedback", attrs: { "invalid": "" }, domProps: { "innerHTML": _vm._s(_vm.invalidFeedback) } }) : _vm.validFeedback ? _c("div", { staticClass: "valid-feedback", attrs: { "valid": "" }, domProps: { "innerHTML": _vm._s(_vm.validFeedback) } }) : _vm._e()];
  }), _vm._t("help", function() {
    return [_vm.helpText ? _c("small", { ref: "help" }, [_vm._v(" " + _vm._s(_vm.helpText) + " ")]) : _vm._e()];
  })], 2);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script = {
  name: "LightSwitchField",
  mixins: [
    FormControl
  ],
  model: {
    prop: "currentValue"
  },
  props: {
    activeClass: {
      type: String,
      default: "on"
    },
    defaultControlClass: {
      type: String,
      default: "form-switch"
    },
    onValue: {
      type: [String, Number, Boolean, Object, Array],
      default: 1
    },
    offValue: {
      type: [String, Number, Boolean, Object, Array],
      default: 0
    }
  },
  data: () => ({
    currentValue: null
  }),
  computed: {
    isActive: function() {
      return this.currentValue === this.onValue;
    },
    controlSizeClass() {
      if (this.size === "md") {
        return "form-control";
      }
      return this.size && `form-control-${this.size}`;
    },
    controlClasses() {
      return [
        this.controlClass,
        this.controlSizeClass,
        this.spacing || "",
        this.invalidFeedback ? "is-invalid" : "",
        this.isActive ? "is-active" : ""
      ].join(" ");
    }
  },
  watch: {
    currentValue(value) {
      console.log(value);
      this.$emit("input", !!value ? this.onValue : this.offValue);
    }
  },
  methods: {
    getTransitionInMilliseconds() {
      const duration = getComputedStyle(this.getInputField()).transitionDuration;
      const numeric = parseFloat(duration, 10);
      const unit = duration.match(/m?s/);
      switch (unit[0]) {
        case "s":
          return numeric * 1e3;
        case "ms":
          return numeric;
      }
      throw new Error(`"${unit[0]}" is not a valid unit of measure. Unit must be "s" (seconds) or "ms" (milliseconds).`);
    },
    toggle(value) {
      this.currentValue = value;
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var LightSwitchField = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { LightSwitchField };

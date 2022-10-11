(function(o,i){typeof exports=="object"&&typeof module<"u"?i(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],i):(o=typeof globalThis<"u"?globalThis:o||self,i(o.LightSwitchField={},o.Vue))})(this,function(o,i){"use strict";const d={};function h(...e){if(!e.length)return d;const[t,s]=e;return typeof t=="string"?typeof d[t]<"u"?d[t]:s:Array.isArray(t)?t.reduce((r,a)=>Object.assign(r,{[a]:d[a]}),{}):Object.assign(d,...e)}var S={props:{dropShadow:[Boolean,String],dropShadowableClassPrefix:{type:String,default:"drop-shadow"},shadow:[Boolean,String],shadowableClassPrefix:{type:String,default:"shadow"}},computed:{shadowableClass(){const e=this.dropShadow===!0?"":this.dropShadow&&`-${this.dropShadow}`,t=this.shadow===!0?"":this.shadow&&`-${this.shadow}`;return{[`${this.dropShadowableClassPrefix}${e}`]:!!this.dropShadow,[`${this.shadowableClassPrefix}${t}`]:!!this.shadow}}}},u=function(){return u=Object.assign||function(t){for(var s,r=1,a=arguments.length;r<a;r++){s=arguments[r];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},u.apply(this,arguments)};function w(e){return e.toLowerCase()}var k=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],E=/[^A-Z0-9]+/gi;function F(e,t){t===void 0&&(t={});for(var s=t.splitRegexp,r=s===void 0?k:s,a=t.stripRegexp,n=a===void 0?E:a,l=t.transform,x=l===void 0?w:l,C=t.delimiter,I=C===void 0?" ":C,c=g(g(e,r,"$1\0$2"),n,"\0"),p=0,m=c.length;c.charAt(p)==="\0";)p++;for(;c.charAt(m-1)==="\0";)m--;return c.slice(p,m).split("\0").map(x).join(I)}function g(e,t,s){return t instanceof RegExp?e.replace(t,s):t.reduce(function(r,a){return r.replace(a,s)},e)}function A(e,t){return t===void 0&&(t={}),F(e,u({delimiter:"."},t))}function y(e,t){return t===void 0&&(t={}),A(e,u({delimiter:"-"},t))}function f(e,t,s="-"){const r=t.toString().replace(new RegExp(`^${e}${s}?`),"");return[y(r),e].filter(a=>!!a).join(s)}function b(e){return!Array.isArray(e)&&typeof e=="object"}function v(e){return e===void 0}const V={directives:{bindEvents:{beforeMount(e,t,s){t.instance.bindEvents(e)}}},mixins:[S],inheritAttrs:!1,props:{activity:{type:Boolean,default:!1},animated:{type:Boolean,default:()=>h("animated",!1)},nativeEvents:{type:Array,default(){return["focus","blur","change","click","keypress","keyup","keydown","progress","paste"]}},defaultControlClass:{type:String,default:()=>h("defaultControlClass","form-control")},error:[String,Array,Boolean],errors:{type:[Array,Object,Boolean],default(){return{}}},feedback:[String,Array],group:{type:Boolean,default:()=>h("group",!0)},helpText:[Number,String],hideLabel:Boolean,indicator:{type:String,default:()=>h("indicator","spinner")},indicatorSize:String,inline:Boolean,invalid:Boolean,label:[Number,String],labelClass:{type:[Object,String],default:()=>h("labelClass","form-label")},modelValue:{default:void 0},pill:Boolean,plaintext:Boolean,size:String,spacing:String,valid:Boolean},data(){return{defaultEmpty:!1,hasChanged:!1,hasFocus:!1,isEmpty:!0}},computed:{id(){return this.$attrs.id||this.$attrs.name||(Math.random()+1).toString(36).substring(7)},componentName(){return this.$options.name},controlAttributes(){return Object.fromEntries(Object.entries(this.$attrs).concat([["id",this.id],["class",this.controlClasses]]))},controlClass(){return this.defaultControlClass},controlSizeClass(){return f(this.size,this.controlClass)},formGroupClasses(){return{[y(this.componentName)]:!!this.componentName,[this.size&&f(this.size,this.componentName)]:!!this.size,animated:this.animated,"default-empty":this.defaultEmpty,"form-group":this.group,[this.size&&f(this.size,"form-group")]:!!this.size,"has-activity":this.activity,"has-changed":this.hasChanged,"has-focus":this.hasFocus,"has-icon":!!this.$slots.icon,"is-empty":this.isEmpty,"is-invalid":!!(this.invalid||this.invalidFeedback),"is-valid":!!(this.valid||this.validFeedback),[this.$attrs.class]:!!this.$attrs.class,[this.$attrs.id]:!!this.$attrs.id}},controlClasses(){return Object.assign({[this.controlClass]:!!this.controlClass,[this.controlSizeClass]:!!this.controlSizeClass,"form-control-icon":!!this.$slots.icon,"is-valid":!!(this.valid||this.validFeedback),"is-invalid":!!(this.invalid||this.invalidFeedback),[this.pillClasses]:this.pill,[this.plaintextClass]:this.plaintext,[this.spacing]:!!this.spacing},this.shadowableClass)},hasDefaultSlot(){return!!this.$slots.default},invalidFeedback(){if(this.error==="")return null;if(this.error)return this.error;const e=this.getFieldErrors();return Array.isArray(e)?e.filter(t=>t&&typeof t=="string").join("<br>"):e},pillClasses(){return"rounded rounded-pill"},plaintextClass(){return"form-control-plaintext"},validFeedback(){return Array.isArray(this.feedback)?this.feedback.join("<br>"):this.feedback}},watch:{hasFocus(){this.shouldChangeOnFocus()&&(this.hasChanged=!0)},defaultEmpty(){this.hasChanged=!0}},methods:{bindEvents(e,t){t||(t=this.onInput);const s=e.querySelectorAll("option")[e.selectedIndex];v(this.modelValue)?v(s)||(e.value=s.value):e.value=this.modelValue,e.value&&t(e.value),this.hasChanged=!!e.value,this.isEmpty=!e.value,e.addEventListener("focus",()=>{this.hasFocus=!0}),e.addEventListener("blur",()=>{this.hasFocus=!1}),e.addEventListener("input",r=>{this.isEmpty=!1,this.hasChanged=!0}),e.addEventListener(e.tagName==="SELECT"?"change":"input",()=>t(e.value)),this.nativeEvents.forEach(r=>{e.addEventListener(r,a=>{this.$emit(r,a)})})},blur(){this.getInputField()&&this.getInputField().blur()},focus(){this.getInputField()&&this.getInputField().focus()},getInputField(){return this.$el.querySelector(".form-control, input, select, textarea")},getFieldErrors(){let e=this.error||this.errors;return this.errors&&b(this.errors)&&(e=this.errors[this.$attrs.name||this.$attrs.id]),!e||Array.isArray(e)||b(e)?e:[e]},shouldChangeOnFocus(){return!this.getInputField().readOnly},onInput(e){this.$emit("update:modelValue",e)}}},$=(e,t)=>{const s=e.__vccOpts||e;for(const[r,a]of t)s[r]=a;return s},B={name:"LightSwitchField",mixins:[V],props:{activeClass:String,defaultControlClass:{type:String,default:"form-switch"},inactiveClass:String,onValue:{type:[String,Number,Boolean,Object,Array],default:1},offValue:{type:[String,Number,Boolean,Object,Array],default:0}},data(){return{currentValue:this.modelValue===this.onValue?this.onValue:this.offValue}},computed:{isActive:function(){return this.currentValue===this.onValue},controlSizeClass(){return this.size==="md"?"form-control":this.size&&`form-control-${this.size}`},controlClasses(){return[this.controlClass,this.controlSizeClass,this.spacing||"",this.invalidFeedback?"is-invalid":"",this.isActive?"is-active":"",this.isActive?this.activeClass:"",this.isActive?"":this.inactiveClass].join(" ")},hash(){return Math.random().toString(20).substr(2,6)}},watch:{currentValue(e){this.$emit("update:modelValue",e)}},methods:{getTransitionInMilliseconds(){const e=getComputedStyle(this.getInputField()).transitionDuration,t=parseFloat(e,10),s=e.match(/m?s/);switch(s[0]){case"s":return t*1e3;case"ms":return t}throw new Error(`"${s[0]}" is not a valid unit of measure. Unit must be "s" (seconds) or "ms" (milliseconds).`)},toggle(e){e===void 0&&(e=this.isActive?this.offValue:this.onValue),this.currentValue=e}}},z=["id","checked"],j=["for"],L=["innerHTML"],O=["innerHTML"];function N(e,t,s,r,a,n){return i.openBlock(),i.createElementBlock("div",{class:i.normalizeClass(e.formGroupClasses)},[i.createElementVNode("div",{ref:"input",class:i.normalizeClass(n.controlClasses),onKeyup:[t[1]||(t[1]=i.withKeys(l=>n.toggle(),["space"])),t[2]||(t[2]=i.withKeys(l=>n.toggle(s.offValue),["arrow-left"])),t[3]||(t[3]=i.withKeys(l=>n.toggle(s.onValue),["arrow-right"]))]},[i.createElementVNode("input",{id:e.$attrs.id||n.hash,ref:"input",checked:a.currentValue===s.onValue,type:"checkbox",class:"form-check-input",onInput:t[0]||(t[0]=l=>n.toggle(l.target.checked?s.onValue:s.offValue))},null,40,z),i.renderSlot(e.$slots,"label",{},()=>[e.label?(i.openBlock(),i.createElementBlock("label",{key:0,for:e.$attrs.id||n.hash,style:{"padding-left":".5em"}},[i.renderSlot(e.$slots,"default",{},()=>[i.createTextVNode(i.toDisplayString(e.label),1)])],8,j)):i.createCommentVNode("",!0)])],34),i.renderSlot(e.$slots,"feedback",{},()=>[e.invalidFeedback?(i.openBlock(),i.createElementBlock("div",{key:0,class:"invalid-feedback",invalid:"",innerHTML:e.invalidFeedback},null,8,L)):e.validFeedback?(i.openBlock(),i.createElementBlock("div",{key:1,class:"valid-feedback",valid:"",innerHTML:e.validFeedback},null,8,O)):i.createCommentVNode("",!0)]),i.renderSlot(e.$slots,"help",{},()=>[e.helpText?(i.openBlock(),i.createElementBlock("small",{key:0,ref:"help"},i.toDisplayString(e.helpText),513)):i.createCommentVNode("",!0)])],2)}const T=$(B,[["render",N]]);o.LightSwitchField=T,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});

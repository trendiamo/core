!function(n,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("styled-components"),require("react"));else if("function"==typeof define&&define.amd)define(["styled-components","react"],e);else{var t="object"==typeof exports?e(require("styled-components"),require("react")):e(n.StyledComponents,n.React);for(var r in t)("object"==typeof exports?exports:n)[r]=t[r]}}("undefined"!=typeof self?self:this,function(n,e){return function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=4)}([function(e,t){e.exports=n},function(n,t){n.exports=e},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TopSlideAnimation=e.animate=void 0;var r=function(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}(["\n    opacity: ",";\n    transform: ",";\n    transition: opacity 0.25s ease, transform 0.25s ease;\n  "],["\n    opacity: ",";\n    transform: ",";\n    transition: opacity 0.25s ease, transform 0.25s ease;\n  "]),o=t(0),i=function(n){return n&&n.__esModule?n:{default:n}}(o),u=t(6),a=function(n){return(0,u.compose)((0,u.withState)("isEntering","setIsEntering",!0),(0,u.lifecycle)({componentDidMount:function(){var n=this.props,e=n.setIsEntering,t=n.timeout;setTimeout(function(){return e(!1)},t||10)}}))(n)},c=a(i.default.div(r,function(n){var e=n.isEntering,t=n.isLeaving;return e||t?0:1},function(n){var e=n.isEntering,t=n.isLeaving;return e||t?"translateY(20px)":"none"}));e.animate=a,e.TopSlideAnimation=c},function(n,e,t){"use strict";function r(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}Object.defineProperty(e,"__esModule",{value:!0}),e.PaddedCover=e.PersonaDescription=e.CoverImg=e.BelowCover=void 0;var o=r(["\n  background-color: #232323;\n  color: #fff;\n  padding: 35px 20px 20px 20px;\n  height: 100px;\n  min-height: 100px;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  z-index: 2;\n\n  @media (min-height: 500px) {\n    position: fixed;\n  }\n"],["\n  background-color: #232323;\n  color: #fff;\n  padding: 35px 20px 20px 20px;\n  height: 100px;\n  min-height: 100px;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  z-index: 2;\n\n  @media (min-height: 500px) {\n    position: fixed;\n  }\n"]),i=r(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  @media (min-height: 500px) {\n    margin-top: 100px;\n  }\n"],["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  @media (min-height: 500px) {\n    margin-top: 100px;\n  }\n"]),u=r(["\n  border-radius: 50%;\n  height: 45px;\n  min-height: 45px;\n  width: 45px;\n  min-width: 45px;\n  object-fit: cover;\n"],["\n  border-radius: 50%;\n  height: 45px;\n  min-height: 45px;\n  width: 45px;\n  min-width: 45px;\n  object-fit: cover;\n"]),a=r(["\n  padding-left: 10px;\n"],["\n  padding-left: 10px;\n"]),c=r(["\n    color: #ddd;\n    font-size: 12px;\n  "],["\n    color: #ddd;\n    font-size: 12px;\n  "]),f=t(0),l=function(n){return n&&n.__esModule?n:{default:n}}(f),p=t(2),s=l.default.div(o),d=l.default.div(i),m=l.default.img(u),h=l.default.div(a),v=(0,p.animate)(l.default.div(c),500);e.BelowCover=d,e.CoverImg=m,e.PersonaDescription=v,e.PaddedCover=h,e.default=s},function(n,e,t){n.exports=t(5)},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(e,"__esModule",{value:!0}),e.TopSlideAnimation=e.PaddedCover=e.Outro=e.Navigation=e.matchUrl=e.CoverImg=e.Cover=e.BelowCover=e.animate=void 0;var o=t(3),i=r(o),u=t(18),a=r(u),c=t(20),f=r(c),l=t(2),p=t(21);e.animate=l.animate,e.BelowCover=o.BelowCover,e.Cover=i.default,e.CoverImg=o.CoverImg,e.matchUrl=p.matchUrl,e.Navigation=a.default,e.Outro=f.default,e.PaddedCover=o.PaddedCover,e.TopSlideAnimation=l.TopSlideAnimation},function(n,e,t){"use strict";function r(n){return n(function(n){return n.children(n)})}Object.defineProperty(e,"__esModule",{value:!0}),t.d(e,"mapProps",function(){return x}),t.d(e,"withProps",function(){return O}),t.d(e,"withPropsOnChange",function(){return w}),t.d(e,"withHandlers",function(){return E}),t.d(e,"defaultProps",function(){return S}),t.d(e,"renameProp",function(){return _}),t.d(e,"renameProps",function(){return k}),t.d(e,"flattenProp",function(){return T}),t.d(e,"withState",function(){return W}),t.d(e,"withStateHandlers",function(){return z}),t.d(e,"withReducer",function(){return D}),t.d(e,"branch",function(){return N}),t.d(e,"renderComponent",function(){return I}),t.d(e,"renderNothing",function(){return V}),t.d(e,"shouldUpdate",function(){return B}),t.d(e,"pure",function(){return $}),t.d(e,"onlyUpdateForKeys",function(){return q}),t.d(e,"onlyUpdateForPropTypes",function(){return H}),t.d(e,"withContext",function(){return L}),t.d(e,"getContext",function(){return K}),t.d(e,"lifecycle",function(){return Y}),t.d(e,"toClass",function(){return J}),t.d(e,"toRenderProps",function(){return r}),t.d(e,"fromRenderProps",function(){return Q}),t.d(e,"setStatic",function(){return v}),t.d(e,"setPropTypes",function(){return X}),t.d(e,"setDisplayName",function(){return b}),t.d(e,"compose",function(){return Z}),t.d(e,"getDisplayName",function(){return y}),t.d(e,"wrapDisplayName",function(){return g}),t.d(e,"isClassComponent",function(){return G}),t.d(e,"createSink",function(){return nn}),t.d(e,"componentFromProp",function(){return en}),t.d(e,"nest",function(){return tn}),t.d(e,"hoistStatics",function(){return rn}),t.d(e,"componentFromStream",function(){return fn}),t.d(e,"componentFromStreamWithConfig",function(){return cn}),t.d(e,"mapPropsStream",function(){return sn}),t.d(e,"mapPropsStreamWithConfig",function(){return pn}),t.d(e,"createEventHandler",function(){return mn}),t.d(e,"createEventHandlerWithConfig",function(){return dn}),t.d(e,"setObservableConfig",function(){return un});var o=t(1),i=t.n(o),u=t(7),a=t(8),c=t.n(a),f=t(9),l=t(10),p=t(11),s=t(12),d=t.n(s),m=t(13),h=(t.n(m),t(14));t.d(e,"shallowEqual",function(){return c.a});var v=function(n,e){return function(t){return t[n]=e,t}},b=function(n){return v("displayName",n)},y=function(n){return"string"==typeof n?n:n?n.displayName||n.name||"Component":void 0},g=function(n,e){return e+"("+y(n)+")"},x=function(n){return function(e){var t=Object(o.createFactory)(e);return function(e){return t(n(e))}}},O=function(n){return x(function(e){return Object(u.a)({},e,"function"==typeof n?n(e):n)})},j=function(n,e){for(var t={},r=0;r<e.length;r++){var o=e[r];n.hasOwnProperty(o)&&(t[o]=n[o])}return t},w=function(n,e){return function(t){var r=Object(o.createFactory)(t),i="function"==typeof n?n:function(e,t){return!c()(j(e,n),j(t,n))},a=function(n){function t(){for(var t,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return t=n.call.apply(n,[this].concat(o))||this,t.state={computedProps:e(t.props),prevProps:t.props},t}return Object(f.a)(t,n),t.getDerivedStateFromProps=function(n,t){return i(t.prevProps,n)?{computedProps:e(n),prevProps:n}:{prevProps:n}},t.prototype.render=function(){return r(Object(u.a)({},this.props,this.state.computedProps))},t}(o.Component);return Object(l.a)(a),a}},P=function(n,e){var t={};for(var r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r],r));return t},E=function(n){return function(e){var t=Object(o.createFactory)(e);return function(e){function r(){for(var t,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return t=e.call.apply(e,[this].concat(o))||this,t.handlers=P("function"==typeof n?n(t.props):n,function(n){return function(){return n(t.props).apply(void 0,arguments)}}),t}return Object(f.a)(r,e),r.prototype.render=function(){return t(Object(u.a)({},this.props,this.handlers))},r}(o.Component)}},S=function(n){return function(e){var t=Object(o.createFactory)(e),r=function(n){return t(n)};return r.defaultProps=n,r}},C=function(n,e){for(var t=Object(u.a)({},n),r=0;r<e.length;r++){var o=e[r];t.hasOwnProperty(o)&&delete t[o]}return t},_=function(n,e){return x(function(t){var r;return Object(u.a)({},C(t,[n]),(r={},r[e]=t[n],r))})},U=Object.keys,F=function(n,e){return U(n).reduce(function(t,r){var o=n[r];return t[e(o,r)]=o,t},{})},k=function(n){return x(function(e){return Object(u.a)({},C(e,U(n)),F(j(e,U(n)),function(e,t){return n[t]}))})},T=function(n){return function(e){var t=Object(o.createFactory)(e);return function(e){return t(Object(u.a)({},e,e[n]))}}},W=function(n,e,t){return function(r){var i=Object(o.createFactory)(r);return function(r){function o(){for(var n,e=arguments.length,o=new Array(e),i=0;i<e;i++)o[i]=arguments[i];return n=r.call.apply(r,[this].concat(o))||this,n.state={stateValue:"function"==typeof t?t(n.props):t},n.updateStateValue=function(e,t){return n.setState(function(n){var t=n.stateValue;return{stateValue:"function"==typeof e?e(t):e}},t)},n}return Object(f.a)(o,r),o.prototype.render=function(){var t;return i(Object(u.a)({},this.props,(t={},t[n]=this.state.stateValue,t[e]=this.updateStateValue,t)))},o}(o.Component)}},z=function(n,e){return function(t){var r=Object(o.createFactory)(t);return function(t){function o(){for(var r,o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return r=t.call.apply(t,[this].concat(i))||this,r.state="function"==typeof n?n(r.props):n,r.stateUpdaters=P(e,function(n){return function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),i=1;i<t;i++)o[i-1]=arguments[i];e&&"function"==typeof e.persist&&e.persist(),r.setState(function(t,r){return n(t,r).apply(void 0,[e].concat(o))})}}),r}Object(f.a)(o,t);var i=o.prototype;return i.shouldComponentUpdate=function(n,e){var t=n!==this.props,r=!c()(e,this.state);return t||r},i.render=function(){return r(Object(u.a)({},this.props,this.state,this.stateUpdaters))},o}(o.Component)}},A=function(){},D=function(n,e,t,r){return function(i){var a=Object(o.createFactory)(i);return function(o){function i(){for(var n,e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return n=o.call.apply(o,[this].concat(r))||this,n.state={stateValue:n.initializeStateValue()},n.dispatch=function(e,r){return void 0===r&&(r=A),n.setState(function(n){var r=n.stateValue;return{stateValue:t(r,e)}},function(){return r(n.state.stateValue)})},n}Object(f.a)(i,o);var c=i.prototype;return c.initializeStateValue=function(){return void 0!==r?"function"==typeof r?r(this.props):r:t(void 0,{type:"@@recompose/INIT"})},c.render=function(){var t;return a(Object(u.a)({},this.props,(t={},t[n]=this.state.stateValue,t[e]=this.dispatch,t)))},i}(o.Component)}},M=function(n){return n},N=function(n,e,t){return void 0===t&&(t=M),function(r){var i,u;return function(a){return n(a)?(i=i||Object(o.createFactory)(e(r)))(a):(u=u||Object(o.createFactory)(t(r)))(a)}}},I=function(n){return function(e){var t=Object(o.createFactory)(n);return function(n){return t(n)}}},R=function(n){function e(){return n.apply(this,arguments)||this}return Object(f.a)(e,n),e.prototype.render=function(){return null},e}(o.Component),V=function(n){return R},B=function(n){return function(e){var t=Object(o.createFactory)(e);return function(e){function r(){return e.apply(this,arguments)||this}Object(f.a)(r,e);var o=r.prototype;return o.shouldComponentUpdate=function(e){return n(this.props,e)},o.render=function(){return t(this.props)},r}(o.Component)}},$=function(n){return B(function(n,e){return!c()(n,e)})(n)},q=function(n){return B(function(e,t){return!c()(j(t,n),j(e,n))})},H=function(n){var e=n.propTypes,t=Object.keys(e||{});return q(t)(n)},L=function(n,e){return function(t){var r=Object(o.createFactory)(t),i=function(n){function t(){for(var t,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return t=n.call.apply(n,[this].concat(o))||this,t.getChildContext=function(){return e(t.props)},t}return Object(f.a)(t,n),t.prototype.render=function(){return r(this.props)},t}(o.Component);return i.childContextTypes=n,i}},K=function(n){return function(e){var t=Object(o.createFactory)(e),r=function(n,e){return t(Object(u.a)({},n,e))};return r.contextTypes=n,r}},Y=function(n){return function(e){var t=Object(o.createFactory)(e),r=function(n){function e(){return n.apply(this,arguments)||this}return Object(f.a)(e,n),e.prototype.render=function(){return t(Object(u.a)({},this.props,this.state))},e}(o.Component);return Object.keys(n).forEach(function(e){return r.prototype[e]=n[e]}),r}},G=function(n){return Boolean(n&&n.prototype&&"function"==typeof n.prototype.render)},J=function(n){var e,t;return G(n)?n:(t=e=function(e){function t(){return e.apply(this,arguments)||this}return Object(f.a)(t,e),t.prototype.render=function(){return"string"==typeof n?i.a.createElement(n,this.props):n(this.props,this.context)},t}(o.Component),e.displayName=y(n),e.propTypes=n.propTypes,e.contextTypes=n.contextTypes,e.defaultProps=n.defaultProps,t)},Q=function(n,e,t){return void 0===t&&(t="children"),function(r){var o=i.a.createFactory(r),a=i.a.createFactory(n);return function(n){var r;return a((r={},r[t]=function(){return o(Object(u.a)({},n,e.apply(void 0,arguments)))},r))}}},X=function(n){return v("propTypes",n)},Z=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.reduce(function(n,e){return function(){return n(e.apply(void 0,arguments))}},function(n){return n})},nn=function(n){var e=function(e){function t(){for(var n,t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return n=e.call.apply(e,[this].concat(r))||this,n.state={},n}return Object(f.a)(t,e),t.getDerivedStateFromProps=function(e){return n(e),null},t.prototype.render=function(){return null},t}(o.Component);return Object(l.a)(e),e},en=function(n){var e=function(e){return Object(o.createElement)(e[n],C(e,[n]))};return e.displayName="componentFromProp("+n+")",e},tn=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];var r=e.map(o.createFactory);return function(n){var e=n.children,t=Object(p.a)(n,["children"]);return r.reduceRight(function(n,e){return e(t,n)},e)}},rn=function(n,e){return function(t){var r=n(t);return d()(r,t,e),r}},on={fromESObservable:null,toESObservable:null},un=function(n){on=n},an={fromESObservable:function(n){return"function"==typeof on.fromESObservable?on.fromESObservable(n):n},toESObservable:function(n){return"function"==typeof on.toESObservable?on.toESObservable(n):n}},cn=function(n){return function(e){return function(t){function r(){for(var r,o,i=arguments.length,u=new Array(i),a=0;a<i;a++)u[a]=arguments[a];return o=t.call.apply(t,[this].concat(u))||this,o.state={vdom:null},o.propsEmitter=Object(m.createChangeEmitter)(),o.props$=n.fromESObservable((r={subscribe:function(n){return{unsubscribe:o.propsEmitter.listen(function(e){e?n.next(e):n.complete()})}}},r[h.a]=function(){return this},r)),o.vdom$=n.toESObservable(e(o.props$)),o}Object(f.a)(r,t);var o=r.prototype;return o.componentWillMount=function(){var n=this;this.subscription=this.vdom$.subscribe({next:function(e){n.setState({vdom:e})}}),this.propsEmitter.emit(this.props)},o.componentWillReceiveProps=function(n){this.propsEmitter.emit(n)},o.shouldComponentUpdate=function(n,e){return e.vdom!==this.state.vdom},o.componentWillUnmount=function(){this.propsEmitter.emit(),this.subscription.unsubscribe()},o.render=function(){return this.state.vdom},r}(o.Component)}},fn=function(n){return cn(an)(n)},ln=function(n){return n},pn=function(n){var e=cn({fromESObservable:ln,toESObservable:ln});return function(t){return function(r){var i=Object(o.createFactory)(r),u=n.fromESObservable,a=n.toESObservable;return e(function(n){var e;return e={subscribe:function(e){var r=a(t(u(n))).subscribe({next:function(n){return e.next(i(n))}});return{unsubscribe:function(){return r.unsubscribe()}}}},e[h.a]=function(){return this},e})}}},sn=function(n){return pn(an)(n)},dn=function(n){return function(){var e,t=Object(m.createChangeEmitter)(),r=n.fromESObservable((e={subscribe:function(n){return{unsubscribe:t.listen(function(e){return n.next(e)})}}},e[h.a]=function(){return this},e));return{handler:t.emit,stream:r}}},mn=dn(an)},function(n,e,t){"use strict";function r(){return r=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},r.apply(this,arguments)}e.a=r},function(n,e,t){"use strict";function r(n,e){return n===e?0!==n||0!==e||1/n==1/e:n!==n&&e!==e}function o(n,e){if(r(n,e))return!0;if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1;var t=Object.keys(n),o=Object.keys(e);if(t.length!==o.length)return!1;for(var u=0;u<t.length;u++)if(!i.call(e,t[u])||!r(n[t[u]],e[t[u]]))return!1;return!0}var i=Object.prototype.hasOwnProperty;n.exports=o},function(n,e,t){"use strict";function r(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}e.a=r},function(n,e,t){"use strict";function r(){var n=this.constructor.getDerivedStateFromProps(this.props,this.state);null!==n&&void 0!==n&&this.setState(n)}function o(n){function e(e){var t=this.constructor.getDerivedStateFromProps(n,e);return null!==t&&void 0!==t?t:null}this.setState(e.bind(this))}function i(n,e){try{var t=this.props,r=this.state;this.props=n,this.state=e,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(t,r)}finally{this.props=t,this.state=r}}function u(n){var e=n.prototype;if(!e||!e.isReactComponent)throw new Error("Can only polyfill class components");if("function"!=typeof n.getDerivedStateFromProps&&"function"!=typeof e.getSnapshotBeforeUpdate)return n;var t=null,u=null,a=null;if("function"==typeof e.componentWillMount?t="componentWillMount":"function"==typeof e.UNSAFE_componentWillMount&&(t="UNSAFE_componentWillMount"),"function"==typeof e.componentWillReceiveProps?u="componentWillReceiveProps":"function"==typeof e.UNSAFE_componentWillReceiveProps&&(u="UNSAFE_componentWillReceiveProps"),"function"==typeof e.componentWillUpdate?a="componentWillUpdate":"function"==typeof e.UNSAFE_componentWillUpdate&&(a="UNSAFE_componentWillUpdate"),null!==t||null!==u||null!==a){var c=n.displayName||n.name,f="function"==typeof n.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+c+" uses "+f+" but also contains the following legacy lifecycles:"+(null!==t?"\n  "+t:"")+(null!==u?"\n  "+u:"")+(null!==a?"\n  "+a:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"==typeof n.getDerivedStateFromProps&&(e.componentWillMount=r,e.componentWillReceiveProps=o),"function"==typeof e.getSnapshotBeforeUpdate){if("function"!=typeof e.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");e.componentWillUpdate=i;var l=e.componentDidUpdate;e.componentDidUpdate=function(n,e,t){var r=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:t;l.call(this,n,e,r)}}return n}t.d(e,"a",function(){return u}),r.__suppressDeprecationWarning=!0,o.__suppressDeprecationWarning=!0,i.__suppressDeprecationWarning=!0},function(n,e,t){"use strict";function r(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}e.a=r},function(n,e,t){"use strict";function r(n,e,t){if("string"!=typeof e){if(p){var s=l(e);s&&s!==p&&r(n,s,t)}var d=a(e);c&&(d=d.concat(c(e)));for(var m=0;m<d.length;++m){var h=d[m];if(!(o[h]||i[h]||t&&t[h])){var v=f(e,h);try{u(n,h,v)}catch(n){}}}return n}return n}var o={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},u=Object.defineProperty,a=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,p=l&&l(Object);n.exports=r},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createChangeEmitter=function(){function n(){o===r&&(o=r.slice())}function e(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return n(),o.push(e),function(){if(t){t=!1,n();var r=o.indexOf(e);o.splice(r,1)}}}function t(){r=o;for(var n=r,e=0;e<n.length;e++)n[e].apply(n,arguments)}var r=[],o=r;return{listen:e,emit:t}}},function(n,e,t){"use strict";(function(n,r){var o,i=t(17);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:r;var u=Object(i.a)(o);e.a=u}).call(e,t(15),t(16)(n))},function(n,e){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(n){"object"==typeof window&&(t=window)}n.exports=t},function(n,e){n.exports=function(n){if(!n.webpackPolyfill){var e=Object.create(n);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(n,e,t){"use strict";function r(n){var e,t=n.Symbol;return"function"==typeof t?t.observable?e=t.observable:(e=t("observable"),t.observable=e):e="@@observable",e}e.a=r},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}function o(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}Object.defineProperty(e,"__esModule",{value:!0});var i=o(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n"],["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n"]),u=o(["\n  display: flex;\n"],["\n  display: flex;\n"]),a=o(["\n  flex: 1;\n  padding: 1rem;\n  background-color: #ebeef2;\n"],["\n  flex: 1;\n  padding: 1rem;\n  background-color: #ebeef2;\n"]),c=t(3),f=r(c),l=t(1),p=r(l),s=t(0),d=r(s),m=t(19),h=t(2),v=d.default.div(i),b=d.default.div(u),y=d.default.div(a),g=function(n){var e=n.persona;return p.default.createElement(b,null,p.default.createElement(c.CoverImg,{src:e.profilePic.url}),p.default.createElement(c.PaddedCover,null,p.default.createElement("span",null,e.name),p.default.createElement(h.TopSlideAnimation,{timeout:0},p.default.createElement(c.PersonaDescription,null,e.description))))},x=function(n){var e=n.navigationItems,t=n.onTileClick,r=n.persona;return p.default.createElement(v,null,p.default.createElement(f.default,null,p.default.createElement(g,{persona:r})),p.default.createElement(c.BelowCover,null,p.default.createElement(y,null,p.default.createElement(h.TopSlideAnimation,{timeout:250},p.default.createElement(m.TilesWrapper,null,e.map(function(n){return p.default.createElement(m.Tile,{imageUrl:n.picture.url,key:n.id,onClick:function(){return t(n)},title:n.text})}))))))};e.default=x},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}function o(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}Object.defineProperty(e,"__esModule",{value:!0}),e.TilesWrapper=e.Tile=void 0;var i=o(["\n  align-content: baseline;\n  display: flex;\n  flex-wrap: wrap;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem;\n"],["\n  align-content: baseline;\n  display: flex;\n  flex-wrap: wrap;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem;\n"]),u=o(["\n  font-size: 14px;\n  text-align: center;\n  user-select: none;\n"],["\n  font-size: 14px;\n  text-align: center;\n  user-select: none;\n"]),a=o(["\n  border-radius: 15px;\n  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.11);\n  background-color: #fff;\n  height: 120px;\n  padding: 0.75rem;\n  cursor: pointer;\n\n  display: flex;\n  flex-direction: column;\n  align-items: ",";\n  justify-content: ",";\n\n  position: relative;\n  transition: background-color 0.4s linear;\n\n  overflow: hidden;\n\n  &::after {\n    content: '';\n    border-radius: 15px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-image: ",";\n  }\n\n  "," {\n    color: ",";\n    z-index: 1;\n    letter-spacing: 0.6px;\n    font-weight: 500;\n  }\n"],["\n  border-radius: 15px;\n  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.11);\n  background-color: #fff;\n  height: 120px;\n  padding: 0.75rem;\n  cursor: pointer;\n\n  display: flex;\n  flex-direction: column;\n  align-items: ",";\n  justify-content: ",";\n\n  position: relative;\n  transition: background-color 0.4s linear;\n\n  overflow: hidden;\n\n  &::after {\n    content: '';\n    border-radius: 15px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-image: ",";\n  }\n\n  "," {\n    color: ",";\n    z-index: 1;\n    letter-spacing: 0.6px;\n    font-weight: 500;\n  }\n"]),c=o(["\n  background-image: ",";\n  background-size: cover;\n  transition: transform 0.2s linear;\n\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n"],["\n  background-image: ",";\n  background-size: cover;\n  transition: transform 0.2s linear;\n\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n"]),f=o(["\n  width: 50%;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-bottom: 1rem;\n\n  svg {\n    height: 50px;\n    width: 50px;\n    fill: #00adef;\n  }\n\n  :active {\n    "," {\n      background-color: #00adef;\n      color: white;\n    }\n\n    "," {\n      transform: scale(1.2);\n    }\n\n    svg {\n      fill: #fff;\n    }\n\n    "," {\n      color: #fff;\n    }\n  }\n"],["\n  width: 50%;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-bottom: 1rem;\n\n  svg {\n    height: 50px;\n    width: 50px;\n    fill: #00adef;\n  }\n\n  :active {\n    "," {\n      background-color: #00adef;\n      color: white;\n    }\n\n    "," {\n      transform: scale(1.2);\n    }\n\n    svg {\n      fill: #fff;\n    }\n\n    "," {\n      color: #fff;\n    }\n  }\n"]),l=t(1),p=r(l),s=t(0),d=r(s),m=d.default.div(i),h=d.default.div(u),v=d.default.div(a,function(n){return n.imageUrl?"start":"center"},function(n){return n.imageUrl?"flex-end":"space-evenly"},function(n){return n.imageUrl?"linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.7) 100%)":"none"},h,function(n){return n.imageUrl?"#f0f0f0":"#000"}),b=d.default.div(c,function(n){var e=n.imageUrl;return e?"url("+e+")":"none"}),y=d.default.div(f,v,b,h),g=function(n){var e=n.title,t=n.Icon,r=n.imageUrl,o=n.onClick;return p.default.createElement(y,{onClick:o},p.default.createElement(v,{imageUrl:r},r&&p.default.createElement(b,{imageUrl:r}),t&&p.default.createElement(t,null),p.default.createElement(h,null,e)))};e.Tile=g,e.TilesWrapper=m,e.default=g},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}function o(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}Object.defineProperty(e,"__esModule",{value:!0});var i=o(["\n  background: linear-gradient(to bottom, #f3fdff, #fff);\n  color: #333;\n  height: 100%;\n  height: 100%;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"],["\n  background: linear-gradient(to bottom, #f3fdff, #fff);\n  color: #333;\n  height: 100%;\n  height: 100%;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]),u=o(["\n  flex: 1;\n  padding-left: 60px;\n  padding-right: 60px;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n"],["\n  flex: 1;\n  padding-left: 60px;\n  padding-right: 60px;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n"]),a=o(["\n  color: #999;\n  font-size: small;\n  text-align: center;\n  a {\n    color: #5d69b9;\n    text-decoration: none;\n  }\n"],["\n  color: #999;\n  font-size: small;\n  text-align: center;\n  a {\n    color: #5d69b9;\n    text-decoration: none;\n  }\n"]),c=o(["\n  font-size: 18px;\n  font-weight: bold;\n"],["\n  font-size: 18px;\n  font-weight: bold;\n"]),f=o(["\n  margin-bottom: 1rem;\n  border-radius: 50%;\n  height: 80px;\n  width: 80px;\n  object-fit: cover;\n"],["\n  margin-bottom: 1rem;\n  border-radius: 50%;\n  height: 80px;\n  width: 80px;\n  object-fit: cover;\n"]),l=o(["\n  display: flex;\n  width: 100%;\n"],["\n  display: flex;\n  width: 100%;\n"]),p=o(["\n  width: 3rem;\n  border-top: solid 1px #282828;\n  border-bottom: 0;\n"],["\n  width: 3rem;\n  border-top: solid 1px #282828;\n  border-bottom: 0;\n"]),s=t(1),d=r(s),m=t(0),h=r(m),v=h.default.div(i),b=h.default.div(u),y=(0,h.default)(function(n){var e=n.className;return d.default.createElement("div",{className:e},"Trusted by ",d.default.createElement("a",{href:"https://trendiamo.com",rel:"noopener noreferrer",target:"_blank"},"Trendiamo"))})(a),g=h.default.div(c),x=h.default.img(f),O=h.default.div(l),j=h.default.hr(p),w=function(n){var e=n.persona;return d.default.createElement(v,null,d.default.createElement(b,null,d.default.createElement(x,{src:e.profilePic.url}),d.default.createElement(g,null,e.name),d.default.createElement("p",null,"Thanks for buying my recommendation."),d.default.createElement(j,null),d.default.createElement("p",null,"Enjoy and let me know what you think! 🙌")),d.default.createElement(O,null,d.default.createElement("div",{style:{flex:1}}),d.default.createElement(y,null)))};e.default=w},function(n,e,t){"use strict";function r(n){return n.replace(/(^\/+|\/+$)/g,"").split("/")}Object.defineProperty(e,"__esModule",{value:!0});var o={};e.matchUrl=function(n,e){var t=/(?:\?([^#]*))?(#.*)?$/,i=n.match(t),u={},a=void 0;if(i&&i[1])for(var c=i[1].split("&"),f=0;f<c.length;f++){var l=c[f].split("=");u[decodeURIComponent(l[0])]=decodeURIComponent(l.slice(1).join("="))}n=r(n.replace(t,"")),e=r(e||"");for(var p=Math.max(n.length,e.length),s=0;s<p;s++)if(e[s]&&":"===e[s].charAt(0)){var d=(e[s].match(/[+*?]+$/)||o)[0]||"",m=e[s].replace(/(^:|[+*?]+$)/g,""),h=~d.indexOf("+"),v=~d.indexOf("*"),b=n[s]||"";if(!b&&!v&&(d.indexOf("?")<0||h)){a=!1;break}if(u[m]=decodeURIComponent(b),h||v){u[m]=n.slice(s).map(decodeURIComponent).join("/");break}}else if(e[s]!==n[s]){a=!1;break}return!1!==a&&u}}])});
import{r as P}from"./index-c013ead5.js";import{g as R}from"./_commonjsHelpers-725317a4.js";var V={exports:{}},f={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C=P,L=Symbol.for("react.element"),A=Symbol.for("react.fragment"),U=Object.prototype.hasOwnProperty,$=C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,D={key:!0,ref:!0,__self:!0,__source:!0};function N(o,e,r){var n,s={},t=null,a=null;r!==void 0&&(t=""+r),e.key!==void 0&&(t=""+e.key),e.ref!==void 0&&(a=e.ref);for(n in e)U.call(e,n)&&!D.hasOwnProperty(n)&&(s[n]=e[n]);if(o&&o.defaultProps)for(n in e=o.defaultProps,e)s[n]===void 0&&(s[n]=e[n]);return{$$typeof:L,type:o,key:t,ref:a,props:s,_owner:$.current}}f.Fragment=A;f.jsx=N;f.jsxs=N;V.exports=f;var m=V.exports;const F="Button--button-YI4Ck",T="Button--button-primary-kvfku",W="Button--button-secondary-l6ZI3",z="Button--button-outline-p5Wsq",H="Button--button-empty-3d-pL",Y="Button--button-hidden-ol4et",Z="Button--add-icon-uczVt",J="Button--disabled-LN4Xt",i={button:F,"button-primary":"Button--button-primary-kvfku",buttonPrimary:T,"button-secondary":"Button--button-secondary-l6ZI3",buttonSecondary:W,"button-outline":"Button--button-outline-p5Wsq",buttonOutline:z,"button-empty":"Button--button-empty-3d-pL",buttonEmpty:H,"button-hidden":"Button--button-hidden-ol4et",buttonHidden:Y,"add-icon":"Button--add-icon-uczVt",addIcon:Z,disabled:J};var q={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var e={}.hasOwnProperty;function r(){for(var n=[],s=0;s<arguments.length;s++){var t=arguments[s];if(t){var a=typeof t;if(a==="string"||a==="number")n.push(t);else if(Array.isArray(t)){if(t.length){var u=r.apply(null,t);u&&n.push(u)}}else if(a==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){n.push(t.toString());continue}for(var h in t)e.call(t,h)&&t[h]&&n.push(h)}}}return n.join(" ")}o.exports?(r.default=r,o.exports=r):window.classNames=r})()})(q);var X=q.exports;const G=R(X),K=""+new URL("add_20-401cf149.svg",import.meta.url).href,y=({title:o,mode:e,type:r,width:n,height:s,disabled:t,handleClick:a})=>{const u=G(i.button,{[i.buttonPrimary]:e==="primary",[i.buttonSecondary]:e==="secondary",[i.buttonOutline]:e==="outline",[i.buttonEmpty]:e==="empty"});return o==="Добавить сотрудника"?m.jsxs("button",{onClick:a,className:u,style:{width:n,height:s},type:r,children:[m.jsx("img",{className:i.addIcon,src:K}),o]}):m.jsx("button",{onClick:a,disabled:t,className:t&&e!=="empty"?`${u} ${i.disabled}`:u,style:{width:n,height:s},type:r,children:o})};try{y.displayName="Button",y.__docgenInfo={description:"",displayName:"Button",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"outline"'},{value:'"empty"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"submit"'},{value:'"reset"'},{value:'"button"'}]}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},handleClick:{defaultValue:null,description:"",name:"handleClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const tt={title:"Shared/UI/Button",component:y,tags:["autodocs"],argTypes:{title:{type:"string",description:"Текст внутри кнопки"},width:{type:"string",description:"Ширина кнопки в пикселях"},height:{type:"string",description:"Высота кнопки в пискелях"},type:{type:"string",description:"Возможные типы кнопок, не влияют на внешний вид",control:{type:"select"},defaultValue:"primary",options:["submit","reset","button"]},mode:{type:"string",description:"Вариант внешнего вида кнопки",control:{type:"radio"},defaultValue:"primary",options:["primary","secondary","outline","empty"]},disabled:{type:"boolean",description:"Кнопка активна или неактивна",control:{type:"inline-radio"},defaultValue:"false",options:[!1,!0]},handleClick:{action:"clicked",description:"Функция вызова обработчика клика"}}},b=o=>m.jsx(y,{...o}),l=b.bind({});l.args={title:"Далее",mode:"primary",width:"200px",height:"44px",disabled:!1};const d=b.bind({});d.args={title:"Подробнее",mode:"secondary",width:"200px",height:"44px",disabled:!1};const c=b.bind({});c.args={title:"Нет",mode:"outline",width:"200px",height:"44px",disabled:!1};const p=b.bind({});p.args={title:"Назад",mode:"empty",width:"200px",height:"44px",disabled:!1};var g,v,x;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:"arg => <Button {...arg} />",...(x=(v=l.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var _,B,S;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:"arg => <Button {...arg} />",...(S=(B=d.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var O,E,w;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:"arg => <Button {...arg} />",...(w=(E=c.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var j,k,I;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:"arg => <Button {...arg} />",...(I=(k=p.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const et=["Primary","Secondary","Outline","Empty"];export{p as Empty,c as Outline,l as Primary,d as Secondary,et as __namedExportsOrder,tt as default};
//# sourceMappingURL=Button.stories-6666bf80.js.map

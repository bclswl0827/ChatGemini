"use strict";(self.webpackChunkchatgemini=self.webpackChunkchatgemini||[]).push([[840],{3040:(e,t,n)=>{n.d(t,{k:()=>a});const a=async e=>{const t=navigator.clipboard||{writeText:e=>{const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}};return!!t&&(t.writeText(e),!0)}},3840:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var a=n(3424),s=n(328),r=n(1604),l=n(3556),c=n(4092),i=n(3760),o=(n(8408),n(8012)),d=n(3040),m=n(7803);const u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=Date.now();return function(){if(Date.now()-n>=t){for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];e.apply(null,s),n=Date.now()}}};var g=n(9584),p=n(1984);const h=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return function(){for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];clearTimeout(t),t=setTimeout((()=>{e.apply(this,s)}),n)}};var x=n(7884);const f=e=>{const{className:t,typingEffect:n,children:a}=e,[f,y]=(0,g.useState)(""),b=u((async(e,t)=>{const n=await(0,d.k)(e),a=t.innerText;t.innerText=n?"\u590d\u5236\u6210\u529f":"\u590d\u5236\u5931\u8d25",setTimeout((()=>{t.innerText=a}),1e3)}),1200),v=h((async(e,t)=>{const n=t.innerText;try{t.innerText="\u6b63\u5728\u6267\u884c",t.disabled=!0,y("# \u6b63\u5728\u52a0\u8f7d\u8d44\u6e90");const n=await(0,p.m)({indexURL:"".concat(window.location.pathname,"pyodide/"),stdout:e=>y("# stdout\n".concat(e)),stderr:e=>y("# stderr\n".concat(e))});await n.runPythonAsync("\nfrom js import prompt\ndef input(p):\n    return prompt(p)\n__builtins__.input = input\n"),y("# \u6b63\u5728\u6267\u884c\u4ee3\u7801"),await n.runPythonAsync(e)}catch(a){y("# \u8fd0\u884c\u5931\u8d25\n".concat(a))}t.innerText=n,t.disabled=!1}),300);return(0,g.useEffect)((()=>{y("")}),[a]),(0,x.jsx)(s.I,{className:"prose text-sm lg:prose-base max-w-[100%] break-words ".concat(null!==t&&void 0!==t?t:""),children:a,components:{a:e=>{let{node:t,...n}=e;return(0,x.jsx)("a",{href:n.href,target:"_blank",rel:"noreferrer",...n,children:n.children})},pre:e=>{let{node:t,...n}=e;return(0,x.jsx)("pre",{className:"bg-transparent p-2",...n})},code:e=>{let{className:t,children:a}=e;const s=/language-(\w+)/.exec(null!==t&&void 0!==t?t:""),r=null!==s?s[1]:"",l=(a?String(a):"\u275a").replace(n,"\u275a");return s?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.c,{PreTag:"div",style:m.c,language:r,children:l.replace(/\n$/,"")}),(0,x.jsxs)("div",{className:"flex gap-2",children:[(0,x.jsx)("button",{className:"text-gray-700/100 text-xs hover:opacity-50",onClick:e=>{let{currentTarget:t}=e;return b(l,t)},children:"\u590d\u5236\u4ee3\u7801"}),!l.includes("\u275a")&&"python"===r&&(0,x.jsx)("button",{className:"text-gray-700/100 text-xs hover:opacity-50",onClick:e=>{let{currentTarget:t}=e;return v(l,t)},children:"\u6267\u884c\u4ee3\u7801"})]}),!!f.length&&(0,x.jsx)(o.c,{PreTag:"div",style:m.c,language:"python",children:f.replace(/\n$/,"")})]}):(0,x.jsx)("code",{className:"text-gray-700",children:l.replace(/\n$/,"")})},table:e=>{let{node:t,...n}=e;return(0,x.jsx)("table",{className:"overflow-x-auto block whitespace-nowrap",...n})}},urlTransform:e=>e,rehypePlugins:[l.c,i.c],remarkPlugins:[r.c,c.c]})};const y=n.p+"static/media/wand-magic-sparkles-solid.b85c9c00c06c7ce7f5afa005c270a4e2.svg";const b=n.p+"static/media/user-regular.29db6a1f607a24b769df338cded3a768.svg";const v=n.p+"static/media/pen-to-square-solid.323a05100783991ea833e21daa2c0798.svg";const j=n.p+"static/media/trash-solid.65e8f8fd4029e1db2f655e77aab432af.svg";const w=n.p+"static/media/arrows-rotate-solid.814c55263931133090f94e8a0e4d3c9b.svg";const N=n.p+"static/media/clipboard-regular.087182556a42a3609963076f55a76062.svg";var k=n(3996),C=n(2816);let T=function(e){return e.Model="model",e.User="user",e}({}),D=function(e){return e[e.Edit=0]="Edit",e[e.Done=1]="Done",e[e.Cancel=2]="Cancel",e}({});const E=e=>{const{index:t,prompt:n,postscript:a,editState:s,role:r,children:l,onEdit:c,onDelete:i,onRefresh:o}=e,m=(0,g.useRef)(null);return(0,x.jsxs)("div",{className:"p-5 mb-3 mr-3 space-y-3 rounded-lg hover:bg-gray-100 transition-all",children:[(0,x.jsxs)("div",{className:"flex items-center",children:[(0,x.jsxs)("div",{className:"size-6 rounded-full flex justify-center items-center ".concat(r===T.Model?"bg-purple-600":"bg-lime-700"),children:[(0,x.jsx)("img",{className:r===T.Model?"size-3":"hidden",src:y,alt:""}),(0,x.jsx)("img",{className:r===T.User?"size-3":"hidden",src:b,alt:""})]}),(0,x.jsx)("span",{className:"ml-2 font-semibold text-gray-800/100",children:r===T.Model?"AI":"\u60a8"})]}),(0,x.jsx)("div",{className:"px-7",children:s.state===D.Edit&&t===s.index?(0,x.jsxs)("div",{className:"flex flex-col space-y-2 lg:text-base text-sm",children:[(0,x.jsx)("textarea",{className:"bg-transparent text-gray-800 rounded-lg p-2 overflow-y-scroll resize-none !outline-none",placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9...",defaultValue:n,ref:m,onInput:e=>{let{currentTarget:t}=e;return(0,k.S)(t,60,200)}}),(0,x.jsxs)("div",{className:"flex gap-2 justify-center",children:[(0,x.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700",onClick:()=>{const{current:e}=m,{value:a}=e;c(t,D.Done,a!==n?a:"")},children:"\u50a8\u5b58\u5e76\u63d0\u4ea4"}),(0,x.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg hover:bg-gray-300",onClick:()=>c(t,D.Cancel,""),children:"\u53d6\u6d88"})]})]}):(0,x.jsx)(x.Fragment,{children:l})}),(0,x.jsxs)("div",{className:"flex ml-6 gap-1",children:[(0,x.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:async()=>{let e=l.props.children;a&&(e=e.replace(a,""));await(0,d.k)(e)?(0,C.I)("\u5185\u5bb9\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f"):(0,C.I)("\u5185\u5bb9\u590d\u5236\u5931\u8d25",!0)},children:(0,x.jsx)("img",{src:N,className:"size-4",alt:""})}),r===T.User&&s.state!==D.Edit&&(0,x.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>c(t,D.Edit,""),children:(0,x.jsx)("img",{src:v,className:"size-4",alt:""})}),r===T.Model&&(0,x.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>o(t),children:(0,x.jsx)("img",{src:w,className:"size-4",alt:""})}),r===T.Model&&1!==t&&(0,x.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>i(t),children:(0,x.jsx)("img",{src:j,className:"size-4",alt:""})})]})]})};var z=n(3948),I=n(708),A=n(9224),S=n(3544),W=n(3440),M=n(3420),R=n(8572),U=n(4916);var P=n(6137);n(6588);const _=e=>{const{delegate:t,options:n,children:a}=e;return(0,g.useEffect)((()=>(P.gx.bind(null!==t&&void 0!==t?t:"[data-image-view]",n),()=>P.gx.destroy())),[t,n]),(0,x.jsx)(x.Fragment,{children:a})};var O=n(6848);const F="\u91cd\u65b0\u751f\u6210\u4e2d...",L=e=>{var t,n;const s=null!==(t=null===(n=e.refs)||void 0===n?void 0:n.mainSectionRef.current)&&void 0!==t?t:null,{site:r}=M.globalConfig.title,l=(0,z.OY)(),c=(0,z.w1)((e=>e.sessions.sessions)),i=(0,z.w1)((e=>e.ai.ai)),{id:o}=(0,a.W4)(),[d,m]=(0,g.useState)([]),[u,p]=(0,g.useState)({index:0,state:D.Cancel}),[h,y]=(0,g.useState)({}),b=(0,g.useCallback)((function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(i.busy||e)&&(null===s||void 0===s||s.scrollTo({top:s.scrollHeight,behavior:"smooth"}))}),[i,s]),v=async(e,t)=>{const n=null!==t&&void 0!==t?t:c;if(!i.busy&&o&&o in n){var a;let t={...n,[o]:[...n[o].slice(0,e),{role:"model",parts:F,timestamp:Date.now()}]};l((0,I.Wy)({...i,busy:!0})),l((0,A.Wy)(t));const s=(n,a)=>{a&&l((0,I.Wy)({...i,busy:!1}));const s=t[o][e].parts!==F?t[o][e].parts:"",r=Date.now();t={...t,[o]:[...t[o].slice(0,e),{role:"model",parts:"".concat(s).concat(n),timestamp:r}]},m(t[o]),l((0,A.Wy)(t))};null!==(a=t[o][e-1].attachment)&&void 0!==a&&a.data.length?await(0,U.g)(i.model.vision,t[o][e-1].parts,t[o][e-1].attachment,M.globalConfig.sse,s):await(0,S.W)(i.model.pro,t[o].slice(0,e-1),t[o][e-1].parts,M.globalConfig.sse,W.W,s)}else i.busy&&(0,C.I)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},j=(e,t,n)=>{if(i.busy||p({index:e,state:t}),!i.busy&&o&&o in c&&n.length&&t===D.Done){const t={...c,[o]:[...c[o].slice(0,e),{...c[o][e],parts:n},{role:"model",parts:F,timestamp:Date.now()}]};m(t[o]),v(e+1,t)}else i.busy&&(0,C.I)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},w=e=>{!i.busy&&o&&o in c?(0,O.O)("\u8fd9\u5219\u56de\u5e94\u548c\u5bf9\u5e94\u63d0\u95ee\u90fd\u5c06\u88ab\u79fb\u9664\uff0c\u8981\u7ee7\u7eed\u5417\uff1f",(()=>{const t={...c,[o]:[...c[o].slice(0,e-1),...c[o].slice(e+1)]};l((0,A.Wy)(t)),m(t[o])})):i.busy&&(0,C.I)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)};return(0,g.useEffect)((()=>{if(o&&o in c){var e;m(c[o]);let t=null!==(e=c[o][0].title)&&void 0!==e?e:c[o][0].parts;t.length>20&&(t="".concat(t.substring(0,20)," ...")),document.title="".concat(t," | ").concat(r)}else document.title="\u4f1a\u8bdd\u65e0\u6548 | ".concat(r),m([{role:"model",parts:"\u60a8\u5f53\u524d\u7684\u4f1a\u8bdd ID \u4f3c\u4e4e\u65e0\u6548\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u5740\uff0c\u60a8\u4e5f\u53ef\u4ee5\u65b0\u5efa\u4e00\u4e2a\u4f1a\u8bdd\u3002",timestamp:0}]);setTimeout((()=>b(!0)),300)}),[r,o,c,s,b]),(0,x.jsx)(R.q,{className:"max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]",children:(0,x.jsx)(_,{children:d.map(((e,t)=>{let{role:n,parts:a,attachment:s,timestamp:r}=e;const{mimeType:l,data:c}=null!==s&&void 0!==s?s:{mimeType:"",data:""};let o="";c.length&&r in h?o=h[r]:c.length&&(o=(e=>{try{let t="image/png";if(e.indexOf("data:image")>=0){let n=e.split(",");t=n[0].match(/:(.*?);/)[1]||"image/png",e=n[1]}let n=window.atob(e),a=new ArrayBuffer(n.length),s=new Uint8Array(a);for(let e=0;e<n.length;e++)s[e]=n.charCodeAt(e);let r=new Blob([a],{type:t});return URL.createObjectURL(r)}catch(t){return""}})("data:".concat(l,";base64,").concat(c)),y((e=>({...e,[r]:o}))));const m='\n\n---\n\n<div class="inline-block text-center overflow-hidden">\n                        <a data-image-view="gallery" href="'.concat(o,'">\n                            <img src="').concat(o,'" style="\n                                max-width: 10rem;\n                                margin-top: 0;\n                                margin-bottom: 0.2rem;\n                                border-radius: 0.25rem;\n                            " alt="\u56fe\u7247\u9644\u4ef6" />\n                        </a>\n                        <span class="text-xs text-gray-400">\n                            \u70b9\u51fb\u67e5\u770b\u5927\u56fe\n                        </span>\n                    </div>'),g='<div class="inline px-1 bg-gray-900 animate-pulse animate-duration-700"></div>';return i.busy&&n===T.Model&&t===d.length-1&&(a+=g),(0,x.jsx)(E,{index:t,prompt:a,editState:u,role:n,onRefresh:v,onDelete:w,onEdit:j,postscript:c.length?m:"",children:(0,x.jsx)(f,{typingEffect:g,children:"".concat(a).concat(c.length?m:"")})},t)}))})})}}}]);
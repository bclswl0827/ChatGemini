"use strict";(self.webpackChunkchatgemini=self.webpackChunkchatgemini||[]).push([[78],{2792:(e,t,s)=>{s.d(t,{s:()=>n});const n=async e=>{const t=navigator.clipboard||{writeText:e=>{const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}};return!!t&&(t.writeText(e),!0)}},6078:(e,t,s)=>{s.r(t),s.d(t,{default:()=>S});var n=s(8467),a=s(364),l=s(9785),r=s(1731),c=s(6934),i=s(6087),o=(s(1973),s(5673)),d=s(7523),m=s(6417);const u=e=>{const{className:t,children:s}=e;return(0,m.jsx)(a.U,{className:"prose text-sm lg:prose-base max-w-[100%] break-words ".concat(null!==t&&void 0!==t?t:""),children:s,components:{a:e=>{let{node:t,...s}=e;return(0,m.jsx)("a",{href:s.href,target:"_blank",rel:"noreferrer",...s,children:s.children})},pre:e=>{let{node:t,...s}=e;return(0,m.jsx)("pre",{className:"bg-transparent p-2",...s})},code:e=>{let{className:t,children:s}=e;const n=/language-(\w+)/.exec(t||"");return n?(0,m.jsx)(o.Z,{PreTag:"div",style:d.Z,language:null!==n&&(null===n||void 0===n?void 0:n.length)>1?n[1]:"",children:String(s).replace(/\n$/,"")}):(0,m.jsx)("code",{className:"text-gray-700",children:s})},table:e=>{let{node:t,...s}=e;return(0,m.jsx)("table",{className:"overflow-x-auto block whitespace-nowrap",...s})}},urlTransform:e=>e,rehypePlugins:[r.Z,i.Z],remarkPlugins:[l.Z,c.Z]})};var g=s(7313);const p=s.p+"static/media/wand-magic-sparkles-solid.b85c9c00c06c7ce7f5afa005c270a4e2.svg";const h=s.p+"static/media/user-regular.29db6a1f607a24b769df338cded3a768.svg";const x=s.p+"static/media/pen-to-square-solid.323a05100783991ea833e21daa2c0798.svg";const f=s.p+"static/media/trash-solid.65e8f8fd4029e1db2f655e77aab432af.svg";const b=s.p+"static/media/arrows-rotate-solid.814c55263931133090f94e8a0e4d3c9b.svg";const v=s.p+"static/media/clipboard-regular.087182556a42a3609963076f55a76062.svg";var y=s(2792),j=s(4452),N=s(6099);let w=function(e){return e.Model="model",e.User="user",e}({}),C=function(e){return e[e.Edit=0]="Edit",e[e.Done=1]="Done",e[e.Cancel=2]="Cancel",e}({});const k=e=>{const{index:t,prompt:s,editState:n,role:a,children:l,onEdit:r,onDelete:c,onRefresh:i}=e,o=(0,g.useRef)(null);return(0,m.jsxs)("div",{className:"p-5 mb-3 mr-3 space-y-3 rounded-lg hover:bg-gray-100 transition-all",children:[(0,m.jsxs)("div",{className:"flex items-center",children:[(0,m.jsxs)("div",{className:"size-6 rounded-full flex justify-center items-center ".concat(a===w.Model?"bg-purple-600":"bg-lime-700"),children:[(0,m.jsx)("img",{className:a===w.Model?"size-3":"hidden",src:p,alt:""}),(0,m.jsx)("img",{className:a===w.User?"size-3":"hidden",src:h,alt:""})]}),(0,m.jsx)("span",{className:"ml-2 font-semibold text-gray-800/100",children:a===w.Model?"AI":"\u60a8"})]}),(0,m.jsx)("div",{className:"px-7",children:n.state===C.Edit&&t===n.index?(0,m.jsxs)("div",{className:"flex flex-col space-y-2 lg:text-base text-sm",children:[(0,m.jsx)("textarea",{className:"bg-transparent text-gray-800 rounded-lg p-2 overflow-y-scroll resize-none",placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9...",defaultValue:s,ref:o,onInput:e=>{let{currentTarget:t}=e;return(0,j.J)(t,200,60)}}),(0,m.jsxs)("div",{className:"flex gap-2 justify-center",children:[(0,m.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700",onClick:()=>{const{current:e}=o,{value:n}=e;r(t,C.Done,n!==s?n:"")},children:"\u50a8\u5b58\u5e76\u63d0\u4ea4"}),(0,m.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg hover:bg-gray-300",onClick:()=>r(t,C.Cancel,""),children:"\u53d6\u6d88"})]})]}):(0,m.jsx)(m.Fragment,{children:l})}),(0,m.jsxs)("div",{className:"flex ml-6 gap-1",children:[(0,m.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:async()=>{const e=l.props.children;await(0,y.s)(e)?(0,N.L)("\u5185\u5bb9\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f"):(0,N.L)("\u5185\u5bb9\u590d\u5236\u5931\u8d25",!0)},children:(0,m.jsx)("img",{src:v,className:"size-4",alt:""})}),a===w.User&&n.state!==C.Edit&&(0,m.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>r(t,C.Edit,""),children:(0,m.jsx)("img",{src:x,className:"size-4",alt:""})}),a===w.Model&&(0,m.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>i(t),children:(0,m.jsx)("img",{src:b,className:"size-4",alt:""})}),a===w.Model&&1!==t&&(0,m.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>c(t),children:(0,m.jsx)("img",{src:f,className:"size-4",alt:""})})]})]})};var D=s(5537),E=s(5138),z=s(9705),L=s(4074),M=s(6244),I=s(6406),R=s(1109),U=s(6242);var A=s(6349);s(4300);const O=e=>{const{delegate:t,options:s,children:n}=e;return(0,g.useEffect)((()=>(A.KR.bind(null!==t&&void 0!==t?t:"[data-image-view]",s),()=>A.KR.destroy())),[t,s]),(0,m.jsx)(m.Fragment,{children:n})};var T=s(844);const Z="\u91cd\u65b0\u751f\u6210\u4e2d...",S=()=>{const{site:e}=I.globalConfig.title,t=(0,D.I0)(),s=(0,D.v9)((e=>e.sessions.sessions)),a=(0,D.v9)((e=>e.ai.ai)),{id:l}=(0,n.UO)(),[r,c]=(0,g.useState)([]),[i,o]=(0,g.useState)({index:0,state:C.Cancel}),d=(0,g.useRef)(null),p=(0,g.useCallback)((function(){var e;let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(a.busy||t)&&(null===(e=d.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"end",inline:"end"}))}),[a]),h=(0,g.useCallback)((()=>p()),[p]),x=async(e,n)=>{const r=null!==n&&void 0!==n?n:s;if(!a.busy&&l&&l in r){var i;let s={...r,[l]:[...r[l].slice(0,e),{role:"model",parts:Z,timestamp:Date.now()}]};t((0,E.f0)({...a,busy:!0})),t((0,z.f0)(s));const n=(n,r)=>{r&&t((0,E.f0)({...a,busy:!1}));const i=s[l][e].parts!==Z?s[l][e].parts:"",o=Date.now();s={...s,[l]:[...s[l].slice(0,e),{role:"model",parts:"".concat(i).concat(n),timestamp:o}]},c(s[l]),t((0,z.f0)(s))};null!==(i=s[l][e-1].attachment)&&void 0!==i&&i.data.length?await(0,U.H)(a.model.vision,s[l][e-1].parts,s[l][e-1].attachment,I.globalConfig.sse,n):await(0,L.B)(a.model.pro,s[l].slice(0,e-1),s[l][e-1].parts,I.globalConfig.sse,M.W,n)}else a.busy&&(0,N.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},f=(e,t,n)=>{if(a.busy||o({index:e,state:t}),!a.busy&&l&&l in s&&n.length&&t===C.Done){const t={...s,[l]:[...s[l].slice(0,e),{...s[l][e],parts:n},{role:"model",parts:Z,timestamp:Date.now()}]};c(t[l]),x(e+1,t)}else a.busy&&(0,N.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},b=e=>{!a.busy&&l&&l in s?(0,T.D)("\u8fd9\u5219\u56de\u5e94\u548c\u5bf9\u5e94\u63d0\u95ee\u90fd\u5c06\u88ab\u79fb\u9664\uff0c\u8981\u7ee7\u7eed\u5417\uff1f",(()=>{const n={...s,[l]:[...s[l].slice(0,e-1),...s[l].slice(e+1)]};t((0,z.f0)(n)),c(n[l])})):a.busy&&(0,N.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)};return(0,g.useEffect)((()=>{if(l&&l in s){c(s[l]);let t=s[l][0].parts;t.length>20&&(t="".concat(t.substring(0,20)," ...")),document.title="".concat(t," | ").concat(e),p(!0)}else document.title="\u4f1a\u8bdd\u65e0\u6548 | ".concat(e),c([{role:"model",parts:"\u60a8\u5f53\u524d\u7684\u4f1a\u8bdd ID \u4f3c\u4e4e\u65e0\u6548\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u5740\uff0c\u60a8\u4e5f\u53ef\u4ee5\u65b0\u5efa\u4e00\u4e2a\u4f1a\u8bdd\u3002",timestamp:0}]);const{current:t}=d;return null===t||void 0===t||t.addEventListener("DOMNodeInserted",h),null===t||void 0===t||t.addEventListener("DOMNodeRemoved",h),()=>{null===t||void 0===t||t.removeEventListener("DOMNodeInserted",h),null===t||void 0===t||t.removeEventListener("DOMNodeRemoved",h)}}),[e,l,s,d,p,h]),(0,m.jsx)(R.W,{className:"max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]",ref:d,children:(0,m.jsx)(O,{children:r.map(((e,t)=>{let{role:s,parts:n,attachment:l}=e;const{mimeType:c,data:o}=null!==l&&void 0!==l?l:{mimeType:"",data:""},d=o.length?(e=>{try{let t="image/png";if(e.indexOf("data:image")>=0){let s=e.split(",");t=s[0].match(/:(.*?);/)[1]||"image/png",e=s[1]}let s=window.atob(e),n=new ArrayBuffer(s.length),a=new Uint8Array(n);for(let e=0;e<s.length;e++)a[e]=s.charCodeAt(e);let l=new Blob([n],{type:t});return URL.createObjectURL(l)}catch(t){return console.log(t),""}})("data:".concat(c,";base64,").concat(o)):"",g='<div class="inline-block text-center overflow-hidden">\n                        <a data-image-view="gallery" href="'.concat(d,'">\n                            <img src="').concat(d,'" style="\n                                max-width: 10rem;\n                                margin-top: 0;\n                                margin-bottom: 0.2rem;\n                                border-radius: 0.25rem;\n                            " alt="\u56fe\u7247\u9644\u4ef6" />\n                        </a>\n                        <span class="text-xs text-gray-400">\n                            \u70b9\u51fb\u67e5\u770b\u5927\u56fe\n                        </span>\n                    </div>');return a.busy&&s===w.Model&&t===r.length-1&&(n+='<div class="inline px-1 bg-gray-900 animate-pulse animate-duration-700"></div>'),(0,m.jsx)(k,{index:t,prompt:n,editState:i,role:s,onRefresh:x,onDelete:b,onEdit:f,children:(0,m.jsx)(u,{children:"".concat(n).concat(o.length?"\n\n---\n\n".concat(g):"")})},t)}))})})}}}]);
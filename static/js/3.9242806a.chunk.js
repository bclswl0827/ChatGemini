"use strict";(self.webpackChunkchatgemini=self.webpackChunkchatgemini||[]).push([[3],{2792:(e,t,a)=>{a.d(t,{s:()=>n});const n=async e=>{const t=navigator.clipboard||{writeText:e=>{const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}};return!!t&&(t.writeText(e),!0)}},3:(e,t,a)=>{a.r(t),a.d(t,{default:()=>F});var n=a(8467),s=a(364),l=a(9785),r=a(1731),c=a(6934),i=a(6087),o=(a(1973),a(5673)),d=a(2792),m=a(7523);const u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,a=Date.now();return function(){if(Date.now()-a>=t){for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];e.apply(null,s),a=Date.now()}}};var g=a(6417);const p=u((async(e,t)=>{const a=await(0,d.s)(e),n=t.innerHTML;t.innerHTML=a?"\u590d\u5236\u6210\u529f":"\u590d\u5236\u5931\u8d25",setTimeout((()=>{t.innerHTML=n}),1e3)}),1200),h=e=>{const{className:t,typingEffect:a,children:n}=e;return(0,g.jsx)(s.U,{className:"prose text-sm lg:prose-base max-w-[100%] break-words ".concat(null!==t&&void 0!==t?t:""),children:n,components:{a:e=>{let{node:t,...a}=e;return(0,g.jsx)("a",{href:a.href,target:"_blank",rel:"noreferrer",...a,children:a.children})},pre:e=>{let{node:t,...a}=e;return(0,g.jsx)("pre",{className:"bg-transparent p-2",...a})},code:e=>{let{className:t,children:n}=e;const s=/language-(\w+)/.exec(null!==t&&void 0!==t?t:""),l=String(n).replace(a,"\u275a");return s?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.Z,{PreTag:"div",style:m.Z,language:null!==s&&(null===s||void 0===s?void 0:s.length)>1?s[1]:"",children:l.replace(/\n$/,"")}),(0,g.jsx)("button",{className:"text-gray-700/100 text-xs hover:opacity-50",onClick:e=>{let{currentTarget:t}=e;return p(l,t)},children:"\u590d\u5236\u4ee3\u7801"})]}):(0,g.jsx)("code",{className:"text-gray-700",children:l.replace(/\n$/,"")})},table:e=>{let{node:t,...a}=e;return(0,g.jsx)("table",{className:"overflow-x-auto block whitespace-nowrap",...a})}},urlTransform:e=>e,rehypePlugins:[r.Z,i.Z],remarkPlugins:[l.Z,c.Z]})};var x=a(7313);const f=a.p+"static/media/wand-magic-sparkles-solid.b85c9c00c06c7ce7f5afa005c270a4e2.svg";const b=a.p+"static/media/user-regular.29db6a1f607a24b769df338cded3a768.svg";const v=a.p+"static/media/pen-to-square-solid.323a05100783991ea833e21daa2c0798.svg";const y=a.p+"static/media/trash-solid.65e8f8fd4029e1db2f655e77aab432af.svg";const j=a.p+"static/media/arrows-rotate-solid.814c55263931133090f94e8a0e4d3c9b.svg";const w=a.p+"static/media/clipboard-regular.087182556a42a3609963076f55a76062.svg";var N=a(4452),C=a(6099);let k=function(e){return e.Model="model",e.User="user",e}({}),D=function(e){return e[e.Edit=0]="Edit",e[e.Done=1]="Done",e[e.Cancel=2]="Cancel",e}({});const T=e=>{const{index:t,prompt:a,editState:n,role:s,children:l,onEdit:r,onDelete:c,onRefresh:i}=e,o=(0,x.useRef)(null);return(0,g.jsxs)("div",{className:"p-5 mb-3 mr-3 space-y-3 rounded-lg hover:bg-gray-100 transition-all",children:[(0,g.jsxs)("div",{className:"flex items-center",children:[(0,g.jsxs)("div",{className:"size-6 rounded-full flex justify-center items-center ".concat(s===k.Model?"bg-purple-600":"bg-lime-700"),children:[(0,g.jsx)("img",{className:s===k.Model?"size-3":"hidden",src:f,alt:""}),(0,g.jsx)("img",{className:s===k.User?"size-3":"hidden",src:b,alt:""})]}),(0,g.jsx)("span",{className:"ml-2 font-semibold text-gray-800/100",children:s===k.Model?"AI":"\u60a8"})]}),(0,g.jsx)("div",{className:"px-7",children:n.state===D.Edit&&t===n.index?(0,g.jsxs)("div",{className:"flex flex-col space-y-2 lg:text-base text-sm",children:[(0,g.jsx)("textarea",{className:"bg-transparent text-gray-800 rounded-lg p-2 overflow-y-scroll resize-none",placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9...",defaultValue:a,ref:o,onInput:e=>{let{currentTarget:t}=e;return(0,N.J)(t,200,60)}}),(0,g.jsxs)("div",{className:"flex gap-2 justify-center",children:[(0,g.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700",onClick:()=>{const{current:e}=o,{value:n}=e;r(t,D.Done,n!==a?n:"")},children:"\u50a8\u5b58\u5e76\u63d0\u4ea4"}),(0,g.jsx)("button",{className:"px-3 py-2 border font-medium rounded-lg hover:bg-gray-300",onClick:()=>r(t,D.Cancel,""),children:"\u53d6\u6d88"})]})]}):(0,g.jsx)(g.Fragment,{children:l})}),(0,g.jsxs)("div",{className:"flex ml-6 gap-1",children:[(0,g.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:async()=>{const e=l.props.children;await(0,d.s)(e)?(0,C.L)("\u5185\u5bb9\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f"):(0,C.L)("\u5185\u5bb9\u590d\u5236\u5931\u8d25",!0)},children:(0,g.jsx)("img",{src:w,className:"size-4",alt:""})}),s===k.User&&n.state!==D.Edit&&(0,g.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>r(t,D.Edit,""),children:(0,g.jsx)("img",{src:v,className:"size-4",alt:""})}),s===k.Model&&(0,g.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>i(t),children:(0,g.jsx)("img",{src:j,className:"size-4",alt:""})}),s===k.Model&&1!==t&&(0,g.jsx)("button",{className:"size-6 rounded-lg hover:bg-gray-200 flex justify-center items-center",onClick:()=>c(t),children:(0,g.jsx)("img",{src:y,className:"size-4",alt:""})})]})]})};var z=a(5537),E=a(5138),L=a(9705),M=a(4074),A=a(6244),R=a(6406),U=a(1109),I=a(6242);var S=a(6349);a(4300);const Z=e=>{const{delegate:t,options:a,children:n}=e;return(0,x.useEffect)((()=>(S.KR.bind(null!==t&&void 0!==t?t:"[data-image-view]",a),()=>S.KR.destroy())),[t,a]),(0,g.jsx)(g.Fragment,{children:n})};var H=a(844);const B="\u91cd\u65b0\u751f\u6210\u4e2d...",F=e=>{var t;const a=(null===(t=e.refs)||void 0===t?void 0:t.mainSectionRef.current)||null,{site:s}=R.globalConfig.title,l=(0,z.I0)(),r=(0,z.v9)((e=>e.sessions.sessions)),c=(0,z.v9)((e=>e.ai.ai)),{id:i}=(0,n.UO)(),[o,d]=(0,x.useState)([]),[m,u]=(0,x.useState)({index:0,state:D.Cancel}),[p,f]=(0,x.useState)({}),b=(0,x.useCallback)((function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(c.busy||e)&&(null===a||void 0===a||a.scrollTo({top:a.scrollHeight,behavior:"smooth"}))}),[c,a]),v=async(e,t)=>{const a=null!==t&&void 0!==t?t:r;if(!c.busy&&i&&i in a){var n;let t={...a,[i]:[...a[i].slice(0,e),{role:"model",parts:B,timestamp:Date.now()}]};l((0,E.f0)({...c,busy:!0})),l((0,L.f0)(t));const s=(a,n)=>{n&&l((0,E.f0)({...c,busy:!1}));const s=t[i][e].parts!==B?t[i][e].parts:"",r=Date.now();t={...t,[i]:[...t[i].slice(0,e),{role:"model",parts:"".concat(s).concat(a),timestamp:r}]},d(t[i]),l((0,L.f0)(t))};null!==(n=t[i][e-1].attachment)&&void 0!==n&&n.data.length?await(0,I.H)(c.model.vision,t[i][e-1].parts,t[i][e-1].attachment,R.globalConfig.sse,s):await(0,M.B)(c.model.pro,t[i].slice(0,e-1),t[i][e-1].parts,R.globalConfig.sse,A.W,s)}else c.busy&&(0,C.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},y=(e,t,a)=>{if(c.busy||u({index:e,state:t}),!c.busy&&i&&i in r&&a.length&&t===D.Done){const t={...r,[i]:[...r[i].slice(0,e),{...r[i][e],parts:a},{role:"model",parts:B,timestamp:Date.now()}]};d(t[i]),v(e+1,t)}else c.busy&&(0,C.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)},j=e=>{!c.busy&&i&&i in r?(0,H.D)("\u8fd9\u5219\u56de\u5e94\u548c\u5bf9\u5e94\u63d0\u95ee\u90fd\u5c06\u88ab\u79fb\u9664\uff0c\u8981\u7ee7\u7eed\u5417\uff1f",(()=>{const t={...r,[i]:[...r[i].slice(0,e-1),...r[i].slice(e+1)]};l((0,L.f0)(t)),d(t[i])})):c.busy&&(0,C.L)("AI \u6b63\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",!0)};return(0,x.useEffect)((()=>{if(i&&i in r){d(r[i]);let e=r[i][0].parts;e.length>20&&(e="".concat(e.substring(0,20)," ...")),document.title="".concat(e," | ").concat(s)}else document.title="\u4f1a\u8bdd\u65e0\u6548 | ".concat(s),d([{role:"model",parts:"\u60a8\u5f53\u524d\u7684\u4f1a\u8bdd ID \u4f3c\u4e4e\u65e0\u6548\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u5740\uff0c\u60a8\u4e5f\u53ef\u4ee5\u65b0\u5efa\u4e00\u4e2a\u4f1a\u8bdd\u3002",timestamp:0}]);setTimeout((()=>b(!0)),300)}),[s,i,r,a,b]),(0,g.jsx)(U.W,{className:"max-w-[calc(100%)] py-5 pl-3 mb-auto mx-1 md:mx-[4rem] lg:mx-[8rem]",children:(0,g.jsx)(Z,{children:o.map(((e,t)=>{let{role:a,parts:n,attachment:s,timestamp:l}=e;const{mimeType:r,data:i}=null!==s&&void 0!==s?s:{mimeType:"",data:""};let d="";i.length&&l in p?d=p[l]:i.length&&(d=(e=>{try{let t="image/png";if(e.indexOf("data:image")>=0){let a=e.split(",");t=a[0].match(/:(.*?);/)[1]||"image/png",e=a[1]}let a=window.atob(e),n=new ArrayBuffer(a.length),s=new Uint8Array(n);for(let e=0;e<a.length;e++)s[e]=a.charCodeAt(e);let l=new Blob([n],{type:t});return URL.createObjectURL(l)}catch(t){return""}})("data:".concat(r,";base64,").concat(i)),f((e=>({...e,[l]:d}))));const u='<div class="inline-block text-center overflow-hidden">\n                        <a data-image-view="gallery" href="'.concat(d,'">\n                            <img src="').concat(d,'" style="\n                                max-width: 10rem;\n                                margin-top: 0;\n                                margin-bottom: 0.2rem;\n                                border-radius: 0.25rem;\n                            " alt="\u56fe\u7247\u9644\u4ef6" />\n                        </a>\n                        <span class="text-xs text-gray-400">\n                            \u70b9\u51fb\u67e5\u770b\u5927\u56fe\n                        </span>\n                    </div>'),x='<div class="inline px-1 bg-gray-900 animate-pulse animate-duration-700"></div>';return c.busy&&a===k.Model&&t===o.length-1&&(n+=x),(0,g.jsx)(T,{index:t,prompt:n,editState:m,role:a,onRefresh:v,onDelete:j,onEdit:y,children:(0,g.jsx)(h,{typingEffect:x,children:"".concat(n).concat(i.length?"\n\n---\n\n".concat(u):"")})},t)}))})})}}}]);
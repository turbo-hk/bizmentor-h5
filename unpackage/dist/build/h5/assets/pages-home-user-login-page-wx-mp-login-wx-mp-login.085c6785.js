import{J as e,o,c as n,w as l,a as i,d as t,t as s,g as a,m as d,I as c,a4 as g,a5 as m,a6 as r,a2 as u,f as h}from"./index.17d24554.js";import{U as p}from"./utils.3676ebaf.js";import{l as b}from"./loginSuccess.c615671c.js";import{_ as f}from"./logo.649191f6.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";var _=x({data:()=>({login:{mobile:void 0,smsCode:"9999",agreements:!1,code:void 0,state:void 0,type:31},loginForm:{mobilePlaceholder:"请输入手机号",smsCodePlaceholder:"请输入验证码",phoneLoginTip:"未注册的手机号验证通过后自动注册",submitBtnText:"绑定手机号码"}}),computed:{canLogin(){return this.login.mobile&&this.login.mobile.length&&this.isPhone},isPhone(){return this.login&&/^1\d{10}$/.test(this.login.mobile)}},onLoad(e){this.login.code=e.code,this.login.state=e.state,console.log(this.login)},methods:{wxBindLogin(){const o=this;null!=this.login.code&&null!=this.login.state||p.postData("/member/auth/social-bind-login/no-sms-code",o.login,(function(o){0==o.code?b(o.data):1002014005==o.code?e({title:"操作太频繁",icon:"none"}):e({title:o.msg,icon:"none"})}),(function(){})),0!=this.login.agreements?p.postData("/member/auth/social-bind-login/no-sms-code",o.login,(function(o){0==o.code?b(o.data):1002014005==o.code?e({title:"操作太频繁",icon:"none"}):e({title:o.msg,icon:"none"})}),(function(){})):e({title:"请阅读用户服务协议",icon:"none"})},checkboxChange(e){console.log(e),this.login.agreements=!this.login.agreements}}},[["render",function(e,p,b,x,_,C){const L=a,k=d,v=c,V=g,j=m,B=r,P=u,y=h;return o(),n(y,{class:"content"},{default:l((()=>[i(L,{class:"title"}),i(k,{class:"logo",src:f}),i(v,{class:"input-box",inputBorder:!1,modelValue:_.login.mobile,"onUpdate:modelValue":p[0]||(p[0]=e=>_.login.mobile=e),placeholder:_.loginForm.mobilePlaceholder},null,8,["modelValue","placeholder"]),i(B,{onChange:C.checkboxChange},{default:l((()=>[i(j,null,{default:l((()=>[i(V,{modelValue:_.login.agreements,"onUpdate:modelValue":p[1]||(p[1]=e=>_.login.agreements=e),checked:_.login.agreements},null,8,["modelValue","checked"]),i(L,{class:"tip"},{default:l((()=>[t("同意用户服务协议&隐私政策")])),_:1})])),_:1})])),_:1},8,["onChange"]),i(P,{class:"send-btn",disabled:!C.canLogin,type:C.canLogin?"primary":"default",onClick:C.wxBindLogin},{default:l((()=>[t(s(_.loginForm.submitBtnText),1)])),_:1},8,["disabled","type","onClick"])])),_:1})}],["__scopeId","data-v-6bf8b49e"]]);export{_ as default};

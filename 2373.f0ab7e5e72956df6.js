"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2373],{2373:(B,b,a)=>{a.r(b),a.d(b,{ProfilePageModule:()=>N});var x=a(177),O=a(4341),i=a(9364),C=a(4964),v=a(467),I=a(7935),j=a(2578),e=a(4438),k=a(3510),y=a(6796),R=a(7157),A=a(1182),S=a(4902);const D=[{path:"",component:(()=>{var t;class u{constructor(o,n,l,h,p,r){this.database=o,this.authservice=n,this.navCtrl=l,this.afAuth=h,this.authService=p,this.papa=r}ngOnInit(){var o=this;return(0,v.A)(function*(){I.A.auth().onAuthStateChanged(n=>{if(console.log("AUTH_USER",n),n){const l=o.authservice.getUserUid();if(!l)return void console.error("User UID is invalid");o.database.doc(`/profile/${l}`).valueChanges().subscribe({next:r=>{r?(console.log("PROFILE:",r),o.profileName=r.name,o.profileEmail=r.email,o.profileImageUrl=r.photoUrl||"/assets/images/avatar.png"):console.log("Perfil n\xe3o encontrado")},error:r=>{console.error("Erro ao recuperar perfil:",r)}}),o.database.doc(`/users/${l}`).valueChanges().subscribe({next:r=>{r&&(console.log("USER:",r),o.userPhone=r.phone,o.userProf=r.prof)},error:r=>{console.error("Erro ao recuperar usu\xe1rio:",r)}})}})})()}irAlterarImagem(){this.navCtrl.navigateForward("/uploadimage")}logout(){var o=this;return(0,v.A)(function*(){try{yield o.afAuth.signOut(),console.log("User signed out")}catch(n){console.error("Error signing out: ",n)}})()}exportCSV(){var o=this;return(0,v.A)(function*(){try{const n=yield o.authService.fetchUserQuestionnaires();if(!n)return void console.error("No data found");const{userProfile:l,questionnaires:h}=n,p=h.map(c=>{var s,d,g;const F={};for(const[X,L]of Object.entries(c.responses))F[X]=String(L);return{Nome:null!==(s=null==l?void 0:l.name)&&void 0!==s?s:"",Email:null!==(d=null==l?void 0:l.email)&&void 0!==d?d:"",Timestamp:new Date(1e3*(null===(g=c.timestamp)||void 0===g?void 0:g.seconds)).toLocaleString(),...F}}),r=p.reduce((c,s)=>(Object.keys(s).forEach(d=>c.add(d)),c),new Set),P=Array.from(r).sort(),E=p.map(c=>{const s={};return P.forEach(d=>{var g;s[d]=null!==(g=c[d])&&void 0!==g?g:""}),s}).map(c=>P.map(s=>c[s]));E.unshift(P);const M=o.papa.unparse(E,{quotes:!1,delimiter:";",header:!0}),U=(M.replace(/\r?\n/g,"\r\n"),new Blob([M],{type:"text/csv;charset=utf-8;"}));(0,j.saveAs)(U,"questionnaires.csv");const T=URL.createObjectURL(U),f=document.createElement("a");f.setAttribute("href",T),f.setAttribute("download","questionnaires.csv"),f.style.visibility="hidden",document.body.appendChild(f),f.click(),document.body.removeChild(f)}catch(n){console.error("Error exporting CSV:",n)}})()}}return(t=u).\u0275fac=function(o){return new(o||t)(e.rXU(k.Qe),e.rXU(y.u),e.rXU(R.q9),e.rXU(A.DS),e.rXU(y.u),e.rXU(S.F))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-profile"]],decls:33,vars:5,consts:[[1,"ion-no-border"],[1,"container"],[1,"overlay"],[1,"ion-no-margin"],[1,"profileImage",3,"src"],[1,"alterarImagem"],["fill","clear",1,"ion-no-padding",3,"click"],[1,"ion-no-padding"],["lines","none"],["name","mail"],["name","call"],["name","briefcase"],[3,"click"]],template:function(o,n){1&o&&(e.j41(0,"ion-header",0)(1,"ion-toolbar"),e.nrm(2,"ion-title"),e.k0s()(),e.j41(3,"ion-content")(4,"div",1)(5,"div",2)(6,"ion-avatar",3),e.nrm(7,"ion-img",4),e.k0s()()(),e.j41(8,"ion-card")(9,"div",5)(10,"ion-button",6),e.bIt("click",function(){return n.irAlterarImagem()}),e.EFF(11,"Alterar imagem"),e.k0s()(),e.j41(12,"ion-card-header",7)(13,"ion-card-title"),e.EFF(14),e.k0s()(),e.j41(15,"ion-card-content")(16,"ion-item",8),e.nrm(17,"ion-icon",9),e.j41(18,"ion-label"),e.EFF(19),e.k0s()(),e.j41(20,"ion-item",8),e.nrm(21,"ion-icon",10),e.j41(22,"ion-label"),e.EFF(23),e.k0s()(),e.j41(24,"ion-item",8),e.nrm(25,"ion-icon",11),e.j41(26,"ion-label"),e.EFF(27),e.k0s()()(),e.j41(28,"ion-button",12),e.bIt("click",function(){return n.exportCSV()}),e.EFF(29,"Exportar Dados"),e.k0s(),e.j41(30,"div",5)(31,"ion-button",6),e.bIt("click",function(){return n.logout()}),e.EFF(32,"Sair da conta"),e.k0s()()()()),2&o&&(e.R7$(7),e.Y8G("src",n.profileImageUrl),e.R7$(7),e.SpI(" ",n.profileName," "),e.R7$(5),e.JRh(n.profileEmail),e.R7$(4),e.JRh(n.userPhone),e.R7$(4),e.JRh(n.userProf))},dependencies:[i.mC,i.Jm,i.b_,i.I9,i.ME,i.tN,i.W9,i.eU,i.iq,i.KW,i.uz,i.he,i.BC,i.ai],styles:["ion-content[_ngcontent-%COMP%]{--ion-background-color: #E1EAF9}ion-header[_ngcontent-%COMP%]{position:relative;--background: transparent}ion-toolbar[_ngcontent-%COMP%]{background-color:#e1eaf9;--opacity: 0}ion-card-title[_ngcontent-%COMP%]{font-style:normal;font-weight:lighter;color:#647b9d}.container[_ngcontent-%COMP%]{width:100%;height:100px;display:block;background-color:#e1eaf9}ion-avatar[_ngcontent-%COMP%]{height:100px;width:100px;margin:auto;border:4px solid #647B9D}.overlay[_ngcontent-%COMP%]{position:relative;text-align:center;top:2%}ion-card[_ngcontent-%COMP%]{background-color:transparent;box-shadow:none;text-align:center}ion-item[_ngcontent-%COMP%]{--ion-item-background: #536c77;text-align:center;color:#e1eaf9;font-style:italic;font-weight:300;font-size:13px;border-radius:5px;min-height:35px;margin-bottom:10px}ion-label[_ngcontent-%COMP%]{text-align:center;padding:0;margin:0}.profileImage[_ngcontent-%COMP%]{max-height:100px;max-width:100px;margin:0}.alterarImagem[_ngcontent-%COMP%]{text-align:center;margin-bottom:10px}.alterarImagem[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{font-size:12px}"]}),u})()}];let $=(()=>{var t;class u{}return(t=u).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[C.iI.forChild(D),C.iI]}),u})(),N=(()=>{var t;class u{}return(t=u).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[x.MD,O.YN,i.bv,$]}),u})()}}]);
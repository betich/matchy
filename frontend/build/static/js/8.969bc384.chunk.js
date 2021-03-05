(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{111:function(e,t,a){"use strict";var n=a(13);t.a=function(e){for(var t={},a=function(e,a){e in t?t[e].push(a):t[e]=[a]},r=0,c=Object.entries(e);r<c.length;r++){var i=Object(n.a)(c[r],2),s=i[0],o=i[1];switch(s){case"username":o.match(/[^a-zA-Z0-9]/g)&&a("username","username contains special characters"),(o.length<2||o.length>30)&&a("username","username length must be 2-30 characters long"),0===o.length&&a("username","no username specified");break;case"fullname":o.match(/^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/)||a("fullname","unsupported name format");break;case"login":case"description":break;case"email":o.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)||a("email","invalid email format");break;case"password":if(void 0===o)break;o.match(/^(?=.*[a-z])(?=.*\d).{8,}$/)||a("password","password must contain a minimum of eight characters, and at least one letter and one number:");break;case"projectname":var l=o.match(/[^A-Za-z0-9\s]/);o?l&&a("projectname","project name contains special characters"):a("projectname","project name must not be empty");break;case"cucumber":o.some((function(e){return""===e}))&&a("formfield","fill all the fields dumbass");break;case"interests":case"experiences":case"questions":break;case"tags":0===o.length&&a("Tags","at least one tag is required");break;case"birthday":var j=o.day,d=o.month,u=o.year;j&&d&&u||a("birthday","fill out all fields"),2===d?0===u%4&&0!==u%100||0===u%400?(j>29||j<1)&&a("birthday","invalid day"):(j>28||j<1)&&a("birthday","invalid day"):j>[31,28,31,30,31,30,31,31,30,31,30,31][d-1]&&a("birthday","invalid day"),u>(new Date).getUTCFullYear()&&a("birthday","invalid year");break;default:a("invalidKey",[s,o])}}return{valid:0===Object.keys(t).length&&t.constructor===Object,invalidData:t}}},112:function(e,t,a){"use strict";var n=a(2),r=a(13),c=a(102);t.a=function(e){var t=0===Object.keys(e.errors).length&&e.errors.constructor===Object?"":Object.entries(e.errors).map((function(e,t){var a=Object(r.a)(e,2),c=a[0],i=a[1];return Object(n.jsx)("p",{children:"".concat(c,":\n").concat(i.join(",\n"))},t)}));return Object(n.jsx)(n.Fragment,{children:""!==t?Object(n.jsx)(c.a,{variant:"danger",children:Object(n.jsx)("pre",{children:t})}):Object(n.jsx)(n.Fragment,{})})}},117:function(e,t,a){"use strict";a.d(t,"b",(function(){return f})),a.d(t,"a",(function(){return x}));var n=a(119),r=a(42),c=a(31),i=a(13),s=a(2),o=a(125),l=a(100),j=a(1),d=a(41),u=a.n(d),b=a(111),h=a(112),m=function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)(o.a.Group,{children:[Object(s.jsx)(o.a.Label,{children:e.question.value}),Object(s.jsx)(o.a.Control,{onChange:function(t){e.onChange(e.question.value,t.target.value)}})]})})},O=function(e){var t=Object(j.useState)(e.value),a=Object(i.a)(t,2),n=a[0],r=a[1],d=e.onChange;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(o.a.Control,{placeholder:"Question",onChange:function(e){var t=Object(c.a)(Object(c.a)({},n),{},{value:e.target.value});r(t),d(t)},value:e.value.value}),Object(s.jsx)(o.a.Control,{placeholder:"Answer",disabled:!0}),Object(s.jsx)(l.a,{variant:"danger",onClick:function(){var e=Object(c.a)(Object(c.a)({},n),{},{deleting:!0});r(e),d(e)},children:"Delete"})]})},f=function(e){var t=e.project.questions.reduce((function(e,t){return e[t.value]="",e}),{}),a=Object(j.useState)(t),n=Object(i.a)(a,2),d=n[0],O=n[1],f=Object(j.useState)({}),x=Object(i.a)(f,2),g=x[0],p=x[1],v=e.project,k=v.questions,y=function(e,t){var a=Object(c.a)(Object(c.a)({},d),{},Object(r.a)({},e,t));O(a)};return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)(o.a,{children:[k.map((function(e,t){return Object(s.jsx)(m,{question:e,onChange:y},t)})),Object(s.jsx)(h.a,{errors:g}),Object(s.jsx)(l.a,{onClick:function(t){t.preventDefault();var a={cucumber:Object.values(d)},n=Object(b.a)(a),r=n.valid,c=n.invalidData;if(r){u.a.post("/app/projects/answer/".concat(v._id),d,{headers:{"Content-Type":"application/json"}}).then((function(e){return e.data})).catch((function(e){switch(e.response.status){case 409:p({errors:{project:["duplicate project"]}});break;default:console.error(e)}})).finally((function(){e.onSubmit&&e.onSubmit()}))}else p(c)},variant:"info",children:"Submit answer"})]})})},x=function(e){var t=Object(j.useState)([]),a=Object(i.a)(t,2),r=a[0],c=a[1];Object(j.useEffect)((function(){(0,e.onChange)(r)}),[r,e.onChange]);var o=r.map((function(e,t){return Object(s.jsx)(O,{value:e,onChange:function(e){return function(e,t){var a=r;a[e]=t,a=a.filter((function(e){return!("deleting"in e)||!1===e.deleting})),c(a)}(t,e)}},t)}));return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(l.a,{onClick:function(){c([].concat(Object(n.a)(r),[{value:""}]))},variant:"outline-info",children:"Create"}),o]})}},122:function(e,t,a){"use strict";var n=a(3),r=a(4),c=a(5),i=a.n(c),s=a(1),o=a.n(s),l=a(6),j=a(24),d=a(44),u=a(45),b=o.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,s=e.variant,j=e.as,d=void 0===j?"img":j,u=Object(r.a)(e,["bsPrefix","className","variant","as"]),b=Object(l.a)(a,"card-img");return o.a.createElement(d,Object(n.a)({ref:t,className:i()(s?b+"-"+s:b,c)},u))}));b.displayName="CardImg",b.defaultProps={variant:null};var h=b,m=Object(d.a)("h5"),O=Object(d.a)("h6"),f=Object(j.a)("card-body"),x=Object(j.a)("card-title",{Component:m}),g=Object(j.a)("card-subtitle",{Component:O}),p=Object(j.a)("card-link",{Component:"a"}),v=Object(j.a)("card-text",{Component:"p"}),k=Object(j.a)("card-header"),y=Object(j.a)("card-footer"),C=Object(j.a)("card-img-overlay"),w=o.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,j=e.bg,d=e.text,b=e.border,h=e.body,m=e.children,O=e.as,x=void 0===O?"div":O,g=Object(r.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),p=Object(l.a)(a,"card"),v=Object(s.useMemo)((function(){return{cardHeaderBsPrefix:p+"-header"}}),[p]);return o.a.createElement(u.a.Provider,{value:v},o.a.createElement(x,Object(n.a)({ref:t},g,{className:i()(c,p,j&&"bg-"+j,d&&"text-"+d,b&&"border-"+b)}),h?o.a.createElement(f,null,m):m))}));w.displayName="Card",w.defaultProps={body:!1},w.Img=h,w.Title=x,w.Subtitle=g,w.Body=f,w.Link=p,w.Text=v,w.Header=k,w.Footer=y,w.ImgOverlay=C;t.a=w},136:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(1),c=a.n(r),i=a(7),s=a(107),o=a(108),l=a(106),j=a(110),d=a(109),u=a(41),b=a.n(u),h=a(122),m=a(100),O=a(14),f=function(e){var t=e.project,a=t.owner,r=t.workers;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(h.a,{bg:"white",text:"black",style:{width:"18rem"},className:"mb-2",children:Object(n.jsxs)(h.a.Body,{children:[Object(n.jsx)(h.a.Title,{children:t.name}),Object(n.jsxs)(h.a.Text,{children:["by ",a.username]}),Object(n.jsx)(h.a.Text,{children:t.description}),Object(n.jsxs)(h.a.Text,{children:["employees:"," ",r.map((function(e){return e.username})).join(", ")]}),Object(n.jsx)(h.a.Text,{children:"tags:"}),Object(n.jsx)(h.a.Text,{children:t.tags.map((function(e,t){return Object(n.jsx)(m.a,{variant:"outline-danger",children:e},t)}))})]})})})},x=a(117),g=function(e){var t=e.project;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("h2",{children:["Apply to ",t.name]}),Object(n.jsx)(x.b,{project:t,onSubmit:e.onSubmit})]})},p=function(e){var t=e.project,a=t.owner,r=t.workers;return Object(n.jsx)(h.a,{bg:"white",text:"black",style:{width:"18rem"},className:"mb-2",children:Object(n.jsxs)(h.a.Body,{children:[Object(n.jsx)(h.a.Title,{children:t.name}),Object(n.jsxs)(h.a.Text,{children:["by ",a.username]}),Object(n.jsx)(h.a.Text,{children:t.description}),Object(n.jsxs)(h.a.Text,{children:["employees: ",r.map((function(e){return e.username})).join(", ")]}),Object(n.jsx)(h.a.Text,{children:"tags:"}),Object(n.jsx)(h.a.Text,{children:t.tags.map((function(e,t){return Object(n.jsx)(m.a,{variant:"outline-danger",children:e},t)}))}),Object(n.jsx)(m.a,{variant:"outline-info",onClick:e.viewProject,type:"submit",children:"View"})]})})},v=function(e){Object(j.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={loaded:!1,error:null,clickable:!1,Project:null,page:"index"},n.handleNextClick=n.handleNextClick.bind(Object(l.a)(n)),n.changeToForm=n.changeToForm.bind(Object(l.a)(n)),n.getRandomProject=n.getRandomProject.bind(Object(l.a)(n)),n.handleError=n.handleError.bind(Object(l.a)(n)),n.changeToView=n.changeToView.bind(Object(l.a)(n)),n.changeToIndex=n.changeToIndex.bind(Object(l.a)(n)),n.onFormSubmit=n.onFormSubmit.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"handleError",value:function(e){e.response?this.setState({error:"Internal server error"}):this.setState({error:"An unknown error occured"}),window.flash("An error occured","error"),console.error(e)}},{key:"getRandomProject",value:function(){var e=this;b.a.get("/app/match").then((function(t){switch(t.status){case 200:e.setState({Project:t.data});break;case 204:e.setState({error:"There are no projects left to display"});break;default:e.getRandomProject()}})).catch((function(t){return e.handleError(t)})).finally((function(){e.setState({clickable:!0,loaded:!0})}))}},{key:"handleNextClick",value:function(e){var t=this;this.setState({clickable:!1},(function(){t.getRandomProject()}))}},{key:"componentDidMount",value:function(){this.getRandomProject()}},{key:"changeToForm",value:function(e){var t=this;this.setState({clickable:!1},(function(){b.a.get("/app/match/questions/".concat(t.state.Project._id)).then((function(e){switch(e.status){case 200:t.setState({page:"index",Project:null}),t.getRandomProject();break;case 202:t.setState({page:"form",questions:e.data});break;default:t.getRandomProject()}})).catch((function(e){return t.handleError(e)})).finally((function(){t.setState({clickable:!0,loaded:!0})}))}))}},{key:"changeToView",value:function(){this.setState({page:"view"})}},{key:"changeToIndex",value:function(){this.setState({page:"index"})}},{key:"onFormSubmit",value:function(){this.setState({page:"index",Project:null}),this.getRandomProject()}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(n.Fragment,{children:[function(){if(e.state.error){var t="object"===typeof e.state.error&&null!==e.state.error?JSON.stringify(e.state.error):e.state.error;return Object(n.jsx)("span",{children:t})}return Object(n.jsx)(n.Fragment,{})}(),e.state.loaded?e.state.Project?Object(n.jsxs)(n.Fragment,{children:[" ",function(){switch(e.state.page){case"index":return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{children:"Match"}),Object(n.jsx)(m.a,{variant:"outline-success",onClick:e.changeToForm,disabled:!e.state.clickable,className:"mr-2",children:e.state.clickable?"Request To Join":"loading..."}),Object(n.jsx)(m.a,{variant:"outline-danger",onClick:e.handleNextClick,disabled:!e.state.clickable,children:e.state.clickable?"Next":"loading..."}),Object(n.jsx)(p,{project:e.state.Project,viewProject:e.changeToView})]});case"view":return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("p",{children:Object(n.jsx)(O.b,{to:"#",onClick:e.changeToIndex,children:"back"})}),Object(n.jsx)(m.a,{variant:"outline-success",onClick:e.changeToForm,disabled:!e.state.clickable,className:"mr-2",children:e.state.clickable?"Request To Join":"loading..."}),Object(n.jsx)(m.a,{variant:"outline-danger",onClick:e.handleNextClick,disabled:!e.state.clickable,children:e.state.clickable?"Next":"loading..."}),Object(n.jsx)(f,{project:e.state.Project,handleNext:e.handleNextClick,handleAccept:e.handleAcceptClick})]});case"form":return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("p",{children:Object(n.jsx)(O.b,{to:"#",onClick:e.changeToIndex,children:"back"})}),Object(n.jsx)(g,{onSubmit:e.onFormSubmit,project:e.state.Project})]});default:return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("span",{children:"can't find the page you're looking for"})})}}()," "]}):void 0:Object(n.jsx)("span",{children:"loading..."})]})}}]),a}(c.a.Component);t.default=function(){return Object(n.jsx)(i.c,{children:Object(n.jsx)(i.a,{exact:!0,path:"/match",component:v})})}}}]);
//# sourceMappingURL=8.969bc384.chunk.js.map
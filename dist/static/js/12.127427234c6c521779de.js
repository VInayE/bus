webpackJsonp([12],{163:function(a,t,n){function e(a){n(266)}var c=n(56)(n(215),n(318),e,"data-v-478a27de",null);a.exports=c.exports},215:function(a,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(23);t.default={methods:{navigateSeatMap:function(){"SeatMap"==localStorage.getItem("cancellationNavigation")?e.a.push({name:"BusSeatMap"}):e.a.push({name:"BusReview"})}},created:function(){this.cancellationData=JSON.parse(localStorage.getItem("cancellationPolicy"))},data:function(){return{cancellationData:null}}}},234:function(a,t,n){t=a.exports=n(152)(!0),t.push([a.i,".card__title[data-v-478a27de]{padding:16px 16px 0;font-size:22px!important}.card__text[data-v-478a27de]{padding:16px 16px 0}.cancel[data-v-478a27de]{width:98%}.cancel td[data-v-478a27de],.cancel th[data-v-478a27de]{border:1px solid #ddd;padding:8px;font-size:14px}.cancel[data-v-478a27de]{margin:5px 0 0 5px}.cancel tr[data-v-478a27de]:nth-child(2n){background-color:#f2f2f2}.cancel tr[data-v-478a27de]:hover{background-color:#ddd}.cancel th[data-v-478a27de]{padding-top:6px;padding-bottom:6px;text-align:left;background-color:#ea2330;color:#fff;font-size:16px}","",{version:3,sources:["F:/bus/src/views/cancellationPolicy.vue"],names:[],mappings:"AACA,8BACI,oBAAqB,AAAC,wBAA2B,CACpD,AACD,6BACI,mBAAqB,CACxB,AACD,yBACI,SAAW,CACd,AACD,wDACI,sBAAuB,AACvB,YAAa,AACb,cAAgB,CACnB,AACD,yBACE,kBAAmB,CACpB,AACD,0CACI,wBAA0B,CAC7B,AACD,kCACI,qBAAuB,CAC1B,AACD,4BACI,gBAAiB,AACjB,mBAAoB,AACpB,gBAAiB,AACjB,yBAA0B,AAC1B,WAAa,AACd,cAAgB,CAClB",file:"cancellationPolicy.vue",sourcesContent:["\n.card__title[data-v-478a27de]{\n    padding: 16px 16px 0; font-size: 22px !important;\n}\n.card__text[data-v-478a27de]{\n    padding: 16px 16px 0;\n}\n.cancel[data-v-478a27de]{\n    width: 98%;\n}\n.cancel td[data-v-478a27de], .cancel th[data-v-478a27de] {\n    border: 1px solid #ddd;\n    padding: 8px;\n    font-size: 14px;\n}\n.cancel[data-v-478a27de] {\n\t\tmargin:5px 0 0 5px;\n}\n.cancel tr[data-v-478a27de]:nth-child(even){\n    background-color: #f2f2f2;\n}\n.cancel tr[data-v-478a27de]:hover {\n    background-color: #ddd;\n}\n.cancel th[data-v-478a27de] {\n    padding-top: 6px;\n    padding-bottom: 6px;\n    text-align: left;\n    background-color: #ea2330;\n    color: white;\n\t  font-size: 16px;\n}\n"],sourceRoot:""}])},266:function(a,t,n){var e=n(234);"string"==typeof e&&(e=[[a.i,e,""]]),e.locals&&(a.exports=e.locals);n(153)("03008758",e,!0,{})},318:function(a,t){a.exports={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",[n("v-toolbar",[n("v-layout",{staticClass:"nav-bar side-padding",attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs2:""},on:{click:a.navigateSeatMap}},[n("v-icon",[a._v("arrow_back")])],1),a._v(" "),n("v-flex",{attrs:{xs8:""}},[a._v("Cancellation Policy")])],1)],1),a._v(" "),n("table",{staticClass:"cancel"},[a._m(0),a._v(" "),a._l(a.cancellationData,function(t){return n("tr",{key:t.text},[n("td",[a._v(a._s(t.text))]),a._v(" "),n("td",[a._v(a._s(t.amount)+"%")])])})],2)],1)},staticRenderFns:[function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("tr",[n("th",[a._v("Cancellation Time")]),a._v(" "),n("th",[a._v("Refund")])])}]}}});
//# sourceMappingURL=12.127427234c6c521779de.js.map
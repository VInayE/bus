webpackJsonp([34],{198:function(t,e,s){"use strict";function a(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}Object.defineProperty(e,"__esModule",{value:!0});var i=s(57),o=s(22),n=s(168),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t};e.default={props:["GSTDetailsForm"],components:{StateListView:function(){return s.e(19).then(s.bind(null,304))},TelephoneListView:function(){return s.e(18).then(s.bind(null,305))}},watch:{GSTDetailsForm:function(){this.GSTDetailsForm&&(this.updateGST=""!=this.getGSTDetailsForm.gst_details.number,this.updateGST?this.gstFormDetails=jQuery.extend(!0,{},this.getGSTDetailsForm):this.getGSTDetailsForm.gst_details.number="",this.selectedState.state_code=this.gstFormDetails.state_code,s.i(n.a)("yt:bus:dom:checkout:travellers:gst","bus","ios/pwa","business","bus checkout","domestic bus","travellers","gst"))}},methods:r({},s.i(i.c)({setGstFormDetails:o.d}),{showState:function(){this.$refs.stateListInput.blur(),this.showStateListdialog=!0},clearGSTForm:function(t){this.submitted=!1;var e={gst_details:{number:"",name:"",address:"",state_code:"",city:"",pin_code:"",phone:"",email:""}};return this.selectedState={},this.gstFormDetails=e,this.$refs.gstInput.focus(),this.selectedTelephoneCode="+91",t.preventDefault(),t.stopPropagation(),!1},selectedTelephone:function(t){this.selectedTelephoneCode=t&&void 0!=t&&Object.keys(t).length>0?"+"+t.countryCode:"+91",this.showTelephoneDialog=!1,this.telephoneSelected=t},telephoneDialog:function(){this.showTelephoneDialog=!0},stateSelected:function(t){this.selectedState=t,this.gstFormDetails.gst_details.state_code=this.selectedState.stateName,this.showStateListdialog=!1},openStateDialog:function(){this.showStateListdialog=!0},closeGSTForm:function(t){this.clearGSTForm(t),this.$emit("closeGSTFormDetails",!1),this.getGSTDetailsForm.gst_details.number=""},saveGSTForm:function(){this.submitted=!0,this.$refs.form.validate()&&this.$refs.form.value&&this.formIsValid()&&(this.gstFormDetails.state_code=this.selectedState.state_code,this.setGstFormDetails(this.gstFormDetails),this.submitted=!1,this.$emit("closeGSTFormDetails",!1))},formIsValid:function(){var t=/^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[A-Za-z0-9]{3}$/,e=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,s=/^[1-9][0-9]{5}$/,a="+91"==this.selectedTelephoneCode?/^\d{10}$/:/^\d{3,16}$/;return""!==this.gstFormDetails.gst_details.number&&""!==this.gstFormDetails.gst_details.name&&""!==this.gstFormDetails.gst_details.email&&""!==this.gstFormDetails.gst_details.address&&""!==this.gstFormDetails.gst_details.city&&""!==this.gstFormDetails.gst_details.pin_code&&""!==this.gstFormDetails.gst_details.phone&&""!==this.gstFormDetails.gst_details.state_code&&e.test(this.gstFormDetails.gst_details.email)&&t.test(this.gstFormDetails.gst_details.number)&&a.test(this.gstFormDetails.gst_details.phone)&&s.test(this.gstFormDetails.gst_details.pin_code)},removeGST:function(t){var e={gst_details:{number:"",name:"",address:"",state_code:"",city:"",pin_code:"",phone:"",email:""}};this.selectedState={},this.gstFormDetails=e,this.setGstFormDetails(e),this.submitted=!1,this.$emit("closeGSTFormDetails",!1),t.preventDefault(),t.stopPropagation()},onlyNumeric:function(t,e){var s=new RegExp("^[0-9]+$"),a=String.fromCharCode(event.charCode?event.charCode:event.which);if(!s.test(a))return event.preventDefault(),!1},onlyAlphabets:function(t){var e=new RegExp("^[a-zA-Z ]+$"),s=String.fromCharCode(t.charCode?t.charCode:t.which);if(!e.test(s))return t.preventDefault(),!1},restrictSpecialChar:function(t){var e=new RegExp("^[a-zA-Z0-9]+$"),s=String.fromCharCode(t.charCode?t.charCode:t.which);if(!e.test(s))return t.preventDefault(),!1}}),created:function(){this.gstFormDetails=this.getGSTDetailsForm},computed:r({},s.i(i.b)({getGSTDetailsForm:o.m})),data:function(){var t,e=this;return t={gstFormDetails:{},showStateListdialog:!1,updateGST:!1,telephoneSelected:{},showTelephoneDialog:!1,selectedState:{},submitted:!1,selectedTelephoneCode:"+91"},a(t,"submitted",!1),a(t,"valid",!1),a(t,"gstNumber_rules",[function(t){return!!t||"GST No is required"},function(t){return/^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[A-Za-z0-9]{3}$/.test(t)||0==t.length||"Enter correct GST No"}]),a(t,"names_rule",[function(t){return!!t||"Name is Required"}]),a(t,"gstEmail_rules",[function(t){return!!t||"Email addresss is required"},function(t){return/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t)||0==t.length||"Enter correct Email Address"}]),a(t,"gstAddress_rules",[function(t){return!!t||"Address is Required"}]),a(t,"gstCity_rules",[function(t){return!!t||"City is Required"},function(t){return/^[A-Za-z\s]+$/.test(t)||0==t.length||"Enter correct City"}]),a(t,"gstPincode_rules",[function(t){return/^[1-9][0-9]{5}$/.test(t)||"Enter pincode"}]),a(t,"gstState_rules",[function(t){return!!t||"State name is Required"}]),a(t,"gstPhone_rules",[function(t){return!!t||"Phone Number is Required"},function(t){return 0==t.length||("+91"==e.selectedTelephoneCode?/^\d{10}$/.test(t):/^\d{3,16}$/.test(t))||"Enter correct telephone number"}]),t}}},232:function(t,e,s){e=t.exports=s(152)(!0),e.push([t.i,".gst_clear_all[data-v-3c3bee0e]{color:#ea2330!important;text-transform:capitalize}.cd_header_white[data-v-3c3bee0e]{font-weight:500;font-size:17px;color:#212121;margin-left:0}.cl_white_back[data-v-3c3bee0e]{margin-left:5px!important;font-size:25px;color:#616161!important}.gst_form_div[data-v-3c3bee0e]{background-color:#fff;padding:10px}.container[data-v-3c3bee0e]{padding:0!important}.inputHeight[data-v-3c3bee0e]{height:70px!important}.application--light .btn--disabled[data-v-3c3bee0e]:not(.btn--icon):not(.btn--flat){background-color:#f34747!important;color:#fff}.gst-btn[data-v-3c3bee0e]{background:#ea2330!important;color:#fff;margin-top:20px}.gst-btn[data-v-3c3bee0e],.remove-gst-btn[data-v-3c3bee0e]{font-weight:400;padding:10px;text-align:center;width:100%;bottom:0;margin-bottom:0;font-size:14px;left:0;outline:none;text-transform:capitalize;height:43px}.remove-gst-btn[data-v-3c3bee0e]{background:#fff!important;color:#ea2330;border:1px solid #ea2330;-webkit-box-shadow:none!important;box-shadow:none!important;border-radius:5px;margin-top:10px}","",{version:3,sources:["F:/bus/src/components/common/GSTFormDetailsView.vue"],names:[],mappings:"AACA,gCACI,wBAAkC,AAClC,yBAA2B,CAC9B,AACD,kCACI,gBAAiB,AACjB,eAAgB,AAChB,cAAe,AACf,aAAiB,CACpB,AACD,gCACI,0BAA2B,AAC3B,eAAgB,AAChB,uBAAyB,CAC5B,AACD,+BACI,sBAAwB,AACxB,YAAc,CACjB,AACD,4BACI,mBAAuB,CAC1B,AACD,8BACI,qBAAsB,CACzB,AACD,oFACI,mCAAqC,AACrC,UAAY,CACf,AACD,0BACI,6BAA8B,AAC9B,WAAY,AAKZ,eAAiB,CAQpB,AACD,2DAbI,gBAAiB,AACjB,aAAc,AACd,kBAAmB,AACnB,WAAY,AAEZ,SAAU,AACV,gBAAiB,AACjB,eAAgB,AAChB,OAAQ,AACR,aAAc,AACd,0BAA2B,AAC3B,WAAa,CAqBhB,AAnBD,iCACI,0BAA4B,AAC5B,cAAe,AACf,yBAA0B,AAC1B,kCAAmC,AAC3B,0BAA2B,AACnC,kBAAmB,AAKnB,eAAiB,CAQpB",file:"GSTFormDetailsView.vue",sourcesContent:["\n.gst_clear_all[data-v-3c3bee0e] {\n    color: rgb(234, 35, 48)!important;\n    text-transform: capitalize;\n}\n.cd_header_white[data-v-3c3bee0e] {\n    font-weight: 500;\n    font-size: 17px;\n    color: #212121;\n    margin-left: 0px;\n}\n.cl_white_back[data-v-3c3bee0e] {\n    margin-left: 5px!important;\n    font-size: 25px;\n    color: #616161!important;\n}\n.gst_form_div[data-v-3c3bee0e] {\n    background-color: white;\n    padding: 10px;\n}\n.container[data-v-3c3bee0e] {\n    padding: 0px!important;\n}\n.inputHeight[data-v-3c3bee0e] {\n    height: 70px!important\n}\n.application--light .btn--disabled[data-v-3c3bee0e]:not(.btn--icon):not(.btn--flat) {\n    background-color: #F34747 !important;\n    color: #fff;\n}\n.gst-btn[data-v-3c3bee0e] {\n    background: #EA2330!important;\n    color: #fff;\n    font-weight: 400;\n    padding: 10px;\n    text-align: center;\n    width: 100%;\n    margin-top: 20px;\n    bottom: 0;\n    margin-bottom: 0;\n    font-size: 14px;\n    left: 0;\n    outline: none;\n    text-transform: capitalize;\n    height: 43px;\n}\n.remove-gst-btn[data-v-3c3bee0e] {\n    background: white!important;\n    color: #EA2330;\n    border: 1px solid #EA2330;\n    -webkit-box-shadow: none!important;\n            box-shadow: none!important;\n    border-radius: 5px;\n    font-weight: 400;\n    padding: 10px;\n    text-align: center;\n    width: 100%;\n    margin-top: 10px;\n    bottom: 0;\n    margin-bottom: 0;\n    font-size: 14px;\n    left: 0;\n    outline: none;\n    text-transform: capitalize;\n    height: 43px;\n}\n"],sourceRoot:""}])},264:function(t,e,s){var a=s(232);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(153)("e9dafe48",a,!0,{})},296:function(t,e,s){function a(t){s(264)}var i=s(56)(s(198),s(316),a,"data-v-3c3bee0e",null);t.exports=i.exports},316:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"gst-detail",staticStyle:{"z-index":"20"},attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{fullscreen:"",transition:"dialog-bottom-transition",overlay:!1},model:{value:t.GSTDetailsForm,callback:function(e){t.GSTDetailsForm=e},expression:"GSTDetailsForm"}},[s("v-card",[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-toolbar",{staticClass:"white cd_fixed_header",attrs:{dark:""}},[s("v-btn",{staticStyle:{"margin-left":"0px"},attrs:{icon:"",dark:""},nativeOn:{click:function(e){t.closeGSTForm(e)}}},[s("v-icon",{staticClass:"cl_white_back padding_left_14"},[t._v("arrow_back")])],1),t._v(" "),s("v-toolbar-title",{staticClass:"cd_header_white"},[t._v(t._s(t.updateGST?"Update GST Details":"Add GST Details"))]),t._v(" "),s("v-spacer"),t._v(" "),s("v-toolbar-items",[s("v-btn",{staticClass:"gst_clear_all",attrs:{dark:"",flat:""},nativeOn:{click:function(e){t.clearGSTForm(e)}}},[t._v("Clear All")])],1)],1),t._v(" "),s("v-layout",{staticClass:"gst_form_background",attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"gst_form_div",attrs:{xs12:""}},[s("v-layout",{staticStyle:{"font-family":"font-size:12px","margin-bottom":"10px"},attrs:{row:"",wrap:""}},[t._v("\n                     Please fill the details as per your GST registration\n                  ")]),t._v(" "),s("v-container",{staticClass:"gst-form",attrs:{fluid:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"inputHeight",attrs:{xs12:""}},[s("v-text-field",{ref:"gstInput",attrs:{label:"GST Number",autofocus:"",required:"",rules:t.submitted?t.gstNumber_rules:[]},on:{keypress:t.restrictSpecialChar},model:{value:t.gstFormDetails.gst_details.number,callback:function(e){t.$set(t.gstFormDetails.gst_details,"number",e)},expression:"gstFormDetails.gst_details.number"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs12:""}},[s("v-text-field",{ref:"input",attrs:{label:"Name",required:"",rules:t.submitted?t.names_rule:[]},model:{value:t.gstFormDetails.gst_details.name,callback:function(e){t.$set(t.gstFormDetails.gst_details,"name",e)},expression:"gstFormDetails.gst_details.name"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs12:""}},[s("v-text-field",{ref:"emailInput",attrs:{label:"Email",required:"",rules:t.submitted?t.gstEmail_rules:[]},model:{value:t.gstFormDetails.gst_details.email,callback:function(e){t.$set(t.gstFormDetails.gst_details,"email",e)},expression:"gstFormDetails.gst_details.email"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Address",required:"",rules:t.submitted?t.gstAddress_rules:[]},model:{value:t.gstFormDetails.gst_details.address,callback:function(e){t.$set(t.gstFormDetails.gst_details,"address",e)},expression:"gstFormDetails.gst_details.address"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs12:""}},[s("v-text-field",{ref:"cityInput",attrs:{label:"City",type:"text",required:"",rules:t.submitted?t.gstCity_rules:[]},on:{keypress:t.onlyAlphabets},model:{value:t.gstFormDetails.gst_details.city,callback:function(e){t.$set(t.gstFormDetails.gst_details,"city",e)},expression:"gstFormDetails.gst_details.city"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs4:""}},[s("v-text-field",{ref:"pincodeInput",attrs:{label:"Pincode",type:"text",required:"",maxlength:"6",rules:t.submitted?t.gstPincode_rules:[]},on:{keypress:t.onlyNumeric},model:{value:t.gstFormDetails.gst_details.pin_code,callback:function(e){t.$set(t.gstFormDetails.gst_details,"pin_code",e)},expression:"gstFormDetails.gst_details.pin_code"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs8:""}},[s("v-text-field",{ref:"stateListInput",attrs:{label:"State",required:"",rules:t.submitted?t.gstState_rules:[]},on:{click:t.showState,keydown:t.showState},model:{value:t.gstFormDetails.gst_details.state_code,callback:function(e){t.$set(t.gstFormDetails.gst_details,"state_code",e)},expression:"gstFormDetails.gst_details.state_code"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs3:""}},[s("v-text-field",{attrs:{label:"ISD"},on:{click:t.telephoneDialog,keyup:t.telephoneDialog},model:{value:t.selectedTelephoneCode,callback:function(e){t.selectedTelephoneCode=e},expression:"selectedTelephoneCode"}})],1),t._v(" "),s("v-flex",{staticClass:"inputHeight",attrs:{xs9:""}},[s("v-text-field",{ref:"phoneNumberInput",attrs:{label:"Phone Number",type:"text",required:"",maxlength:"+91"==t.selectedTelephoneCode?10:16,minlength:"+91"==t.selectedTelephoneCode?0:3,rules:t.submitted?t.gstPhone_rules:[]},on:{keypress:t.onlyNumeric},model:{value:t.gstFormDetails.gst_details.phone,callback:function(e){t.$set(t.gstFormDetails.gst_details,"phone",e)},expression:"gstFormDetails.gst_details.phone"}})],1)],1)],1),t._v(" "),s("telephone-list-view",{attrs:{showTelephoneDialog:t.showTelephoneDialog,selectedtGSTISD:t.selectedTelephoneCode.substring(1,t.selectedTelephoneCode.length)},on:{closeTelephoneDialog:function(e){t.selectedTelephone(e)}}}),t._v(" "),s("state-list-view",{attrs:{showStateListdialog:t.showStateListdialog,selectedGSTStateCode:t.selectedState.state_code},on:{closeStateDialog:function(e){t.stateSelected(e)}}}),t._v(" "),s("v-layout",{staticStyle:{color:"rgb(158,158,158)","font-size":"11px"},attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[t._v("Please Note:")]),t._v(" "),s("v-flex",{attrs:{xs12:""}},[t._v("Your taxes may get updated post submitting you GST details.Please review the final amount in fare Details")])],1),t._v(" "),s("v-btn",{staticClass:"gst-btn",staticStyle:{color:"white"},attrs:{block:""},on:{click:t.saveGSTForm}},[t._v("\n                     "+t._s(t.updateGST?"Update GST Details":"Submit GST Details")+"\n                  ")]),t._v(" "),t.updateGST?s("v-btn",{staticClass:"remove-gst-btn",attrs:{block:""},on:{click:function(e){t.removeGST(e)}}},[t._v("\n                     Remove GST\n                  ")]):t._e()],1)],1)],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=34.babdf3ab73127ddc0b91.js.map
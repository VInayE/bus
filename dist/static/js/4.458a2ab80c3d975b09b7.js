webpackJsonp([4],{160:function(t,e,a){function s(t){a(272)}var o=a(56)(a(212),a(324),s,"data-v-60663c82",null);t.exports=o.exports},168:function(t,e,a){"use strict";function s(t){var e,a;return e=new RegExp("[; ]"+t+"=([^\\s;]*)"),a=(" "+document.cookie).match(e),t&&a?unescape(a[1]):""}a.d(e,"a",function(){return o});var o=function(t,e,a,o,i,r,n,l){var c={page:{pageInfo:{pageName:t,lob:e,sessionID:""!==s("sessionID")?s:"",platform:a},category:{pageType:o,primaryCategory:i,subCategory1:r,subCategory2:n,subCategory3:l}}};"undefined"!=typeof yt_adobe&&"undefined"!=typeof _satellite?yt_adobe.addDigitalData(c):"undefined"!=typeof yt_adobe&&"undefined"==typeof _satellite&&("production"==="production".toString()?yt_adobe.addHeaderScript("true","PROD"):yt_adobe.addHeaderScript("true"),yt_adobe.addDigitalData(c),yt_adobe.addFooterScript()),"undefined"!=typeof yt_adobe&&yt_adobe.track("virtualPageView",c)}},169:function(t,e,a){"use strict";a.d(e,"g",function(){return s}),a.d(e,"c",function(){return o}),a.d(e,"d",function(){return i}),a.d(e,"f",function(){return r}),a.d(e,"e",function(){return n}),a.d(e,"b",function(){return l}),a.d(e,"a",function(){return c});var s=function(t){return Vue.http.get('/busPWA/busview/ajax-search?src=""&dest=""&ddate='+t.ddate+"&tt="+t.tt+"&qty="+t.qty+"&srcStnCode="+t.srcID+"&destStnCode="+t.destID)},o=function(t){return Vue.http.get("/busPWA/busview/getReviewView?superpnr="+t.superPNR+"&smid="+t.smid+"&tt=o")},i=function(t,e){return Vue.http.get("/busPWA/busview/getCancellationPolicy?src="+t.src+"&dest="+t.dest+"&dep="+t.ddate+"&bid="+e)},r=function(t){return Vue.http.post("/busPWA/busview/getSeatMap?searchId="+t.searchID+"&busId="+t.busID+"&idProof="+t.idProof)},n=function(t){return Vue.http.headers.common["Content-Type"]="text/plain;charset=ISO-8859-1",Vue.http.post("/promo/partialValidate?promocode="+t.promoCode+"&superPnr="+t.superPNR+"&context=TRAVELLER")},l=function(t){return Vue.http.post("/busPWA/busview/getBookingDetails/?superPnr="+t.spnr+"&uuid="+t.uuid)},c=function(t){return Vue.http.get("/busPWA/busview/confirmationjson?ttid="+t.ttid+"&suc="+t.suc)}},212:function(t,e,a){"use strict";function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0});var o=a(57),i=a(169),r=a(22),n=a(168),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t};e.default={components:{PromoCode:function(){return a.e(30).then(a.bind(null,301))},GstInfoDialogView:function(){return a.e(33).then(a.bind(null,297))},GstFormDetailsView:function(){return a.e(34).then(a.bind(null,296))},LoginErrorMessage:function(){return a.e(31).then(a.bind(null,300))}},data:function(){var t;return t={submitted:!1,GSTInfoDialog:!1,GSTDetailsForm:!1,boardingDialog:!1,boardingPoints:null,showProceedButton:!1,snackbarText:"",timeout:3e3,showLoader:!0,apiUrlPath:r.n,y:"bottom",seatsVal:"",showBtn:!1,snackbar:!1,seatsSelected:{},seatsSelectedTemp:{},reviewData:null,discountAmnt:0,showLoginErrorDialog:!1,seatCount:null,storeTraveller:[{title:"",name:"",gender:"",age:""},{title:"",name:"",gender:"",age:""},{title:"",name:"",gender:"",age:""},{title:"",name:"",gender:"",age:""},{title:"",name:"",gender:"",age:""},{title:"",name:"",gender:"",age:""}],items:[],storeTravellerDetails:[],promoData:{id:"",type:"",code:""},genderData:[{text:"M"},{text:"F"}],titleData:[{text:"Mr"},{text:"Mrs"},{text:"Ms"}],ageData:[{text:"1"},{text:"2"},{text:"3"},{text:"4"},{text:"5"},{text:"6"},{text:"7"},{text:"8"},{text:"9"},{text:"10"},{text:"11"},{text:"12"},{text:"13"},{text:"14"},{text:"15"},{text:"16"},{text:"17"},{text:"18"},{text:"19"},{text:"20"},{text:"21"},{text:"22"},{text:"23"},{text:"24"},{text:"25"},{text:"26"},{text:"27"},{text:"28"},{text:"29"},{text:"30"},{text:"31"},{text:"32"},{text:"33"},{text:"34"},{text:"35"},{text:"36"},{text:"37"},{text:"38"},{text:"39"},{text:"40"},{text:"41"},{text:"42"},{text:"43"},{text:"44"},{text:"45"},{text:"46"},{text:"47"},{text:"48"},{text:"49"},{text:"50"},{text:"51"},{text:"52"},{text:"53"},{text:"54"},{text:"55"},{text:"56"},{text:"57"},{text:"58"},{text:"59"},{text:"60"},{text:"61"},{text:"62"},{text:"63"},{text:"64"},{text:"65"},{text:"66"},{text:"67"},{text:"68"},{text:"69"},{text:"70"},{text:"71"},{text:"72"},{text:"73"},{text:"74"},{text:"75"},{text:"76"},{text:"77"},{text:"78"},{text:"79"},{text:"80"},{text:"81"},{text:"82"},{text:"83"},{text:"84"},{text:"85"},{text:"86"},{text:"87"},{text:"88"},{text:"89"},{text:"90"},{text:"91"},{text:"92"},{text:"93"},{text:"94"},{text:"95"},{text:"96"},{text:"97"},{text:"98"},{text:"99"},{text:"100"}],states:[],TravellerData:[],submittedTab2:!1,paxData:{},paxDataJson:{},promoDataPayment:{code:"",type:""}},s(t,"reviewData",{}),s(t,"userInfo",{}),s(t,"departDate",""),s(t,"arivalDate",""),s(t,"DurationFormat",""),s(t,"Phone_rules",[function(t){return!!t||"Phone Number is required"},function(t){return/^\d{10}$/.test(t)||0==t.length||"Please enter valid phone no"}]),s(t,"mobileValid",!1),s(t,"UserProfileUrl","/social/user/userProfile.htm"),t},computed:l({},a.i(o.b)({getGSTDetailsForm:r.m,getSearchParams:r.g})),methods:{openGSTInfoDialog:function(){this.GSTInfoDialog=!0},isNumber:function(t){t=t||window.event;var e=t.which?t.which:t.keyCode;if(!(e>31&&(e<48||e>57)))return!0;t.preventDefault()},gotoCancellation:function(){localStorage.setItem("cancellationNavigation","Review"),this.$router.push({name:"CancellationPolicy"})},openGSTDetailsForm:function(){this.GSTDetailsForm=!0},appliDiscount:function(t){this.discountAmnt=parseInt(t.cash),this.paxData.promoid=t.promoId,this.paxData.promoType=t.promoType,this.paxData.promocode=t.promoCode,this.promoDataPayment.code=t.promoCode,this.promoDataPayment.type=t.promoType},closeboardingDialog:function(){var t=this,e=this.getCookie("userName");"production"==="production".toString()&&(t.isProd=!0),null!==e&&""!==e&&t.isProd?t.checkUser():this.$router.push({name:"BusLogin"})},getCookie:function(t){for(var e=t+"=",a=decodeURIComponent(document.cookie),s=a.split(";"),o=0;o<s.length;o++){for(var i=s[o];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""},checkUser:function(){var t=this,e={includeOptionalParams:"true",productId:"pwa_bus",channel:"b2c"},a=localStorage.getItem("loginBackClickStatus");Vue.http.headers.common["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",Vue.http.options.emulateJSON=!0,this.$http.post(t.UserProfileUrl,e).then(function(e){if("SUCCESS"==e.body.status){t.userEmail=e.body.responseData.userInfo.email,t.userMobile=e.body.responseData.userInfo.mobile;var s={email:e.body.responseData.userInfo.email,mobile:e.body.responseData.userInfo.mobile?e.body.responseData.userInfo.mobile:null,mobileISD:e.body.responseData.userInfo.mobileISD?e.body.responseData.userInfo.mobileISD:null};localStorage.setItem("userInfo",JSON.stringify(s)),t.$router.push({name:"BusDropingPoint"})}else a||this.$router.push({name:"BusLogin"})})},getBoardingPoint:function(t){var e=JSON.parse(localStorage.getItem("seatMapData"));e.OW.bp=t,localStorage.setItem("seatMapData",JSON.stringify(e)),this.$router.push({name:"BusDropingPoint"})},proceedToPay:function(){var t=this;this.showLoader=!0;this.submittedTab2=!1,localStorage.setItem("promoCodePayment",JSON.stringify(this.promoDataPayment));for(var e=0;e<this.seatCount.OW.seats.length;e++)""!=this.storeTraveller[e].title&&""!=this.storeTraveller[e].name&&""!=this.storeTraveller[e].gender&&""!=this.storeTraveller[e].age||(this.submittedTab2=!0,this.showLoader=!1,t.snackbar=!0,t.snackbarText="Title, Full Name, Age cannot be blank.");this.userInfo.mob.length<=9&&(this.submittedTab2=!0,this.mobileValid=!0,this.showLoader=!1);try{if(0==this.submittedTab2){for(var a=0;a<this.seatCount.OW.seats.length;a++)this.TravellerData.push({paxid:a,title:this.storeTraveller[a].title,name:this.storeTraveller[a].name,gender:this.storeTraveller[a].gender,age:this.storeTraveller[a].age,idType:"",idNumber:"",rf:""});var s=JSON.parse(localStorage.getItem("busReviewRequest"));this.paxData.travellerDetails=this.TravellerData,localStorage.setItem("retainTravellerDetails",JSON.stringify(this.TravellerData)),this.paxData.userEmail=this.userInfo.email,this.paxData.userMobile=this.userInfo.mob,this.paxData.superPnr=s.superPNR,this.paxData.smid=JSON.parse(localStorage.getItem("storeSMID")),this.paxData.tt="o",this.paxData.userAddons=[],this.paxDataJson=encodeURI(JSON.stringify(this.paxData)),Vue.http.options.emulateJSON=!1;var o=this.reviewData.fareDetails.total-this.discountAmnt;if(""!=this.getGSTDetailsForm.gst_details.address){var i={gstn:this.getGSTDetailsForm.gst_details.number,companyName:this.getGSTDetailsForm.gst_details.name,companyEmail:this.getGSTDetailsForm.gst_details.email,companyAddress:this.getGSTDetailsForm.gst_details.address,city:this.getGSTDetailsForm.gst_details.city,pinCode:this.getGSTDetailsForm.gst_details.pin_code,state:this.getGSTDetailsForm.gst_details.state_code,companyPhone:this.getGSTDetailsForm.gst_details.phone,superPnr:this.paxData.superPnr};this.$http.post(t.apiUrlPath,i).then(function(e){e.body.status&&this.$http.post(t.apiUrlPath+"savePaxData?data="+this.paxDataJson).then(function(e){e.ok&&(localStorage.setItem("TotalFare",o),localStorage.setItem("UUID",e.body.uuid),t.showLoader=!1,this.$router.push({name:"BusPaySwift"}))})})}else this.$http.post(t.apiUrlPath+"savePaxData?data="+this.paxDataJson).then(function(e){e.ok&&(localStorage.setItem("TotalFare",o),localStorage.setItem("UUID",e.body.uuid),t.showLoader=!1,this.$router.push({name:"BusPaySwift"}))})}}catch(t){console.log("Error... "+t.message)}},format:function(t){return t.replace(/(?:0)?(\d+):(?:0)?(\d+).*/,"$1H $2M")}},created:function(){var t=this,e=this;this.paxData.promoid="",this.paxData.promoType="",this.paxData.promocode="";var s=JSON.parse(localStorage.getItem("busReviewRequest")),o=JSON.parse(localStorage.getItem("seatMapJson")).busID;null==s?this.showLoginErrorDialog=!0:(a.i(i.c)(s).then(function(a){e.reviewData=a.body;var s=new Date(e.reviewData.OW.dd);t.DurationFormat=t.format(e.reviewData.OW.dur);var o=s.toString();t.departDate=o.substr(0,3)+", "+s.getDate()+" "+o.substr(4,3);var i=new Date(e.reviewData.OW.dd),r=i.toString();t.arivalDate=r.substr(0,3)+", "+s.getDate()+" "+r.substr(4,3),e.showProceedButton=!0,e.showLoader=!1}).catch(function(t){}),a.i(i.d)(this.getSearchParams,o).then(function(t){localStorage.setItem("cancellationPolicy",JSON.stringify(t.data.cp))}).catch(function(t){}),this.seatCount=JSON.parse(localStorage.getItem("seatMapData")),1==this.seatCount.OW.seats.length?this.seatsVal=this.seatCount.OW.seats[0].sn:this.seatsVal=this.seatCount.OW.seats.map(function(t){return t.sn}).join(","),a.i(n.a)("yt:bus:dom:checkout:travellers","bus","ios/pwa","business","bus checkout","domestic bus","travellers",""))},mounted:function(){this.storeTravellerDetails=localStorage.getItem("retainTravellerDetails")&&localStorage.getItem("retainTravellerDetails").length>0?JSON.parse(localStorage.getItem("retainTravellerDetails")):[];for(var t=0;t<this.storeTravellerDetails.length;t++)this.storeTraveller[t].title=this.storeTravellerDetails[t].title,this.storeTraveller[t].age=this.storeTravellerDetails[t].age,this.storeTraveller[t].gender=this.storeTravellerDetails[t].gender,this.storeTraveller[t].name=this.storeTravellerDetails[t].name;var e=JSON.parse(localStorage.getItem("userInfo"));"guest"==e.loginAs?(this.userInfo.email=e.email,this.userInfo.mobileISD=e.mobileISD,this.userInfo.mob=e.mobile):(this.userInfo.email=e.email,this.userInfo.mobileISD="+"+e.mobileISD,this.userInfo.mob=e.mobile)}}},240:function(t,e,a){e=t.exports=a(152)(!0),e.push([t.i,".termsCondition[data-v-60663c82]{padding:0 14px 0 16px;margin-bottom:9px;font-size:13px;line-height:16px;display:inline-block}.termsCondition a[data-v-60663c82]{color:#4169e1;text-decoration:none}.review-module .r-module[data-v-60663c82]{padding:16px;border-bottom:5px solid #eee}.review-module .r-module[data-v-60663c82]:last-child{border-bottom:none}.review-module .r-module>div[data-v-60663c82]{display:inline-block}.review-module .r-module>div[data-v-60663c82]:last-child{margin-right:0}.review-module .r-module>div .fs-14[data-v-60663c82]{color:rgba(0,0,0,.54)}.review-module .r-module>div .c-dark[data-v-60663c82]{color:rgba(0,0,0,.87)!important}.review-module .r-module p[data-v-60663c82]{margin-bottom:5px}.review-module .r-module .bus-policy[data-v-60663c82]{color:#2196f3;position:relative}.link_register[data-v-60663c82]{text-align:left}.cl_white_back[data-v-60663c82]{margin-left:5px!important;font-size:25px;color:#616161!important}.cd_header_white[data-v-60663c82]{font-weight:500;font-size:18px;color:rgba(0,0,0,.87)!important;margin-left:0}.p20[data-v-60663c82]{padding:20px}.pb0[data-v-60663c82]{padding-bottom:0}.logintxt[data-v-60663c82]{color:#fff;font-weight:500}.loginBtn[data-v-60663c82]{color:#fff;width:100%;margin:0}.registerTab[data-v-60663c82]{margin:0 20px;text-align:center}.application--light .btn--disabled[data-v-60663c82]:not(.btn--icon):not(.btn--flat){background-color:#f34747!important;color:#fff}.wlogin[data-v-60663c82]{padding:20px 20px 0}.txt-w[data-v-60663c82]{font-weight:500;font-size:16px}.facebookBlock[data-v-60663c82]{padding:0 20px;width:100%;margin-top:20px;bottom:0}.w100[data-v-60663c82]{width:100%}.p010[data-v-60663c82]{padding:10px 0}.gst[data-v-60663c82]{padding:16px;margin-top:10px;font-size:14px}.display_value[data-v-60663c82]{margin-left:5px;color:#9e9e9e}.pos-rel[data-v-60663c82]{position:absolute;right:0;color:rgba(0,0,0,.54)}.error-message[data-v-60663c82]{font-size:12px;color:#f34747;position:relative;top:0}.h55[data-v-60663c82]{height:55px}.travel-form .input-group[data-v-60663c82]{font-size:14px}.option[data-v-60663c82]{color:#1976d2}.isd[data-v-60663c82]{border-bottom:1px solid #ededed;padding-bottom:5px}.f500[data-v-60663c82]{font-weight:500}.img_ecash[data-v-60663c82]{width:50px;padding-right:2px;margin-left:6px;margin-top:6px}.travel-form[data-v-60663c82]{margin-top:20px}.travel-form[data-v-60663c82]:first-child{margin-top:0}","",{version:3,sources:["F:/bus/src/views/busReview.vue"],names:[],mappings:"AACA,iCACE,sBAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,iBAAkB,AAClB,oBAAsB,CACvB,AACD,mCACE,cAAiB,AACjB,oBAAsB,CACvB,AACD,0CACE,aAAc,AACd,4BAAiC,CAClC,AACD,qDACI,kBAAoB,CACvB,AACD,8CACI,oBAAsB,CACzB,AACD,yDACM,cAAgB,CACrB,AACD,qDACM,qBAA2B,CAChC,AACD,sDACM,+BAAsC,CAC3C,AACD,4CACI,iBAAmB,CACtB,AACD,sDACI,cAAe,AACf,iBAAmB,CACtB,AACD,gCACE,eAAiB,CAClB,AACD,gCACE,0BAA4B,AAC5B,eAAgB,AAChB,uBAA0B,CAC3B,AACD,kCACE,gBAAiB,AACjB,eAAgB,AAChB,gCAAsC,AACtC,aAAiB,CAClB,AACD,sBACE,YAAc,CACf,AACD,sBACE,gBAAkB,CACnB,AACD,2BACE,WAAY,AACZ,eAAiB,CAClB,AACD,2BACE,WAAY,AACZ,WAAY,AACZ,QAAU,CACX,AACD,8BACE,cAAe,AACf,iBAAmB,CACpB,AACD,oFACE,mCAAqC,AACrC,UAAY,CACb,AACD,yBACE,mBAA0B,CAC3B,AACD,wBACE,gBAAiB,AACjB,cAAgB,CACjB,AACD,gCACE,eAAgB,AAChB,WAAY,AACZ,gBAAiB,AACjB,QAAU,CACX,AACD,uBACE,UAAY,CACb,AACD,uBACE,cAAgB,CACjB,AACD,sBACE,aAAc,AACd,gBAAiB,AACjB,cAAgB,CACjB,AACD,gCACE,gBAAiB,AACjB,aAAe,CAChB,AACD,0BACE,kBAAmB,AACnB,QAAS,AACT,qBAA2B,CAC5B,AACD,gCACE,eAAgB,AAChB,cAAe,AACf,kBAAmB,AACnB,KAAS,CACV,AACD,sBACE,WAAa,CACd,AACD,2CACE,cAAgB,CACjB,AACD,yBACE,aAAe,CAChB,AACD,sBACE,gCAAiC,AACjC,kBAAoB,CACrB,AACD,uBACE,eAAiB,CAClB,AACD,4BACE,WAAY,AACZ,kBAAmB,AACnB,gBAAiB,AACjB,cAAgB,CACjB,AACD,8BACE,eAAiB,CAClB,AACD,0CACE,YAAc,CACf",file:"busReview.vue",sourcesContent:["\n.termsCondition[data-v-60663c82] {\n  padding: 0px 14px 0px 16px;\n  margin-bottom: 9px;\n  font-size: 13px;\n  line-height: 16px;\n  display: inline-block;\n}\n.termsCondition a[data-v-60663c82] {\n  color: royalblue;\n  text-decoration: none;\n}\n.review-module .r-module[data-v-60663c82] {\n  padding: 16px;\n  border-bottom: 5px solid #EEEEEE;\n}\n.review-module .r-module[data-v-60663c82]:last-child {\n    border-bottom: none;\n}\n.review-module .r-module > div[data-v-60663c82] {\n    display: inline-block;\n}\n.review-module .r-module > div[data-v-60663c82]:last-child {\n      margin-right: 0;\n}\n.review-module .r-module > div .fs-14[data-v-60663c82] {\n      color: rgba(0, 0, 0, 0.54);\n}\n.review-module .r-module > div .c-dark[data-v-60663c82] {\n      color: rgba(0, 0, 0, 0.87) !important;\n}\n.review-module .r-module p[data-v-60663c82] {\n    margin-bottom: 5px;\n}\n.review-module .r-module .bus-policy[data-v-60663c82] {\n    color: #2196F3;\n    position: relative;\n}\n.link_register[data-v-60663c82] {\n  text-align: left;\n}\n.cl_white_back[data-v-60663c82] {\n  margin-left: 5px !important;\n  font-size: 25px;\n  color: #616161 !important;\n}\n.cd_header_white[data-v-60663c82] {\n  font-weight: 500;\n  font-size: 18px;\n  color: rgba(0, 0, 0, 0.87) !important;\n  margin-left: 0px;\n}\n.p20[data-v-60663c82] {\n  padding: 20px;\n}\n.pb0[data-v-60663c82] {\n  padding-bottom: 0;\n}\n.logintxt[data-v-60663c82] {\n  color: #fff;\n  font-weight: 500;\n}\n.loginBtn[data-v-60663c82] {\n  color: #fff;\n  width: 100%;\n  margin: 0;\n}\n.registerTab[data-v-60663c82] {\n  margin: 0 20px;\n  text-align: center;\n}\n.application--light .btn--disabled[data-v-60663c82]:not(.btn--icon):not(.btn--flat) {\n  background-color: #F34747 !important;\n  color: #fff;\n}\n.wlogin[data-v-60663c82] {\n  padding: 20px 20px 0 20px;\n}\n.txt-w[data-v-60663c82] {\n  font-weight: 500;\n  font-size: 16px;\n}\n.facebookBlock[data-v-60663c82] {\n  padding: 0 20px;\n  width: 100%;\n  margin-top: 20px;\n  bottom: 0;\n}\n.w100[data-v-60663c82] {\n  width: 100%;\n}\n.p010[data-v-60663c82] {\n  padding: 10px 0;\n}\n.gst[data-v-60663c82] {\n  padding: 16px;\n  margin-top: 10px;\n  font-size: 14px;\n}\n.display_value[data-v-60663c82] {\n  margin-left: 5px;\n  color: #9e9e9e;\n}\n.pos-rel[data-v-60663c82] {\n  position: absolute;\n  right: 0;\n  color: rgba(0, 0, 0, 0.54);\n}\n.error-message[data-v-60663c82] {\n  font-size: 12px;\n  color: #F34747;\n  position: relative;\n  top: 0px;\n}\n.h55[data-v-60663c82] {\n  height: 55px;\n}\n.travel-form .input-group[data-v-60663c82] {\n  font-size: 14px;\n}\n.option[data-v-60663c82] {\n  color: #1976d2;\n}\n.isd[data-v-60663c82] {\n  border-bottom: 1px solid #ededed;\n  padding-bottom: 5px;\n}\n.f500[data-v-60663c82] {\n  font-weight: 500;\n}\n.img_ecash[data-v-60663c82] {\n  width: 50px;\n  padding-right: 2px;\n  margin-left: 6px;\n  margin-top: 6px;\n}\n.travel-form[data-v-60663c82] {\n  margin-top: 20px;\n}\n.travel-form[data-v-60663c82]:first-child {\n  margin-top: 0;\n}\n"],sourceRoot:""}])},272:function(t,e,a){var s=a(240);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(153)("fb828712",s,!0,{})},324:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bus-r"},[a("v-toolbar",[a("v-layout",{staticClass:"nav-bar side-padding",attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs2:""},on:{click:function(e){t.closeboardingDialog()}}},[a("v-icon",[t._v("arrow_back")])],1),t._v(" "),a("v-flex",{attrs:{xs10:""}},[t._v("Review Your Booking")])],1)],1),t._v(" "),Object.keys(t.reviewData).length>0?a("div",{staticClass:"review-module"},[a("div",{staticClass:"r-module"},[a("div",[a("div",[t._v(t._s(t.reviewData.OW.dc))]),t._v(" "),a("div",[t._v(t._s(t.reviewData.OW.dt))]),t._v(" "),a("div",{staticClass:"fs-14"},[t._v(t._s(t.departDate))])]),t._v(" "),a("div",[a("div",[t._v(t._s(t.reviewData.OW.ac))]),t._v(" "),a("div",[t._v(t._s(t.reviewData.OW.at))]),t._v(" "),a("div",{staticClass:"fs-14"},[t._v(t._s(t.arivalDate))])]),t._v(" "),a("div",[a("span",{staticClass:"fs-14 c-dark"},[t._v(t._s(t.DurationFormat))])])]),t._v(" "),a("div",{staticClass:"r-module"},[a("p",{staticClass:"f500"},[t._v("Boarding Details")]),t._v(" "),a("p",{staticClass:"fs-14"},[t._v(t._s(t.reviewData.OW.bp.name))]),t._v(" "),a("p",{staticClass:"fs-14 "},[t._v(t._s(t.reviewData.OW.bp.bt))])]),t._v(" "),a("div",{staticClass:"r-module"},[a("p",{staticClass:"f500"},[t._v("Bus Details")]),t._v(" "),a("p",{staticClass:"fs-14"},[t._v(t._s(t.reviewData.OW.opn))]),t._v(" "),a("div",{},[a("span",{staticClass:"fs-14"},[t._v("Sitting seat(s)")]),t._v(" "),a("span",{staticClass:"fs-14"},[t._v(t._s(t.seatsVal))])]),t._v(" "),a("div",{staticClass:"fr fs-14 bus-policy",on:{click:t.gotoCancellation}},[t._v("Cancellation Policy")])]),t._v(" "),a("div",{staticClass:"r-module"},t._l(t.seatCount.OW.seats,function(e,s){return a("div",{key:s,staticClass:"w100 travel-form"},[a("div",{staticClass:"f500"},[t._v("Traveller "+t._s(s+1))]),t._v(" "),a("v-select",{staticClass:"h55",attrs:{items:t.titleData,label:"Title","single-line":"",bottom:"","item-text":"text","item-value":"text",required:""},model:{value:t.storeTraveller[s].title,callback:function(e){t.$set(t.storeTraveller[s],"title",e)},expression:"storeTraveller[index].title"}}),t._v(" "),t.submittedTab2&&""==t.storeTraveller[s].title?a("div",{staticClass:"error-message"},[t._v("Please Enter Title")]):t._e(),t._v(" "),a("v-text-field",{staticClass:"h55",attrs:{label:"Full Name",required:""},model:{value:t.storeTraveller[s].name,callback:function(e){t.$set(t.storeTraveller[s],"name",e)},expression:"storeTraveller[index].name"}}),t._v(" "),t.submittedTab2&&""==t.storeTraveller[s].name?a("div",{staticClass:"error-message pabs"},[t._v("Please Enter Full Name")]):t._e(),t._v(" "),a("v-select",{staticClass:"h55",attrs:{label:"Gender",items:t.genderData,"item-text":"text","item-value":"text",required:""},model:{value:t.storeTraveller[s].gender,callback:function(e){t.$set(t.storeTraveller[s],"gender",e)},expression:"storeTraveller[index].gender"}}),t._v(" "),t.submittedTab2&&""==t.storeTraveller[s].gender?a("div",{staticClass:"error-message"},[t._v("Select Gender")]):t._e(),t._v(" "),a("v-select",{staticClass:"h55",attrs:{label:"Age",items:t.ageData,"item-text":"text","item-value":"text",required:""},model:{value:t.storeTraveller[s].age,callback:function(e){t.$set(t.storeTraveller[s],"age",e)},expression:"storeTraveller[index].age"}}),t._v(" "),t.submittedTab2&&""==t.storeTraveller[s].age?a("div",{staticClass:"error-message"},[t._v("Enter your Age")]):t._e()],1)})),t._v(" "),a("div",{staticClass:"r-module "},[a("p",{staticClass:"f500"},[t._v("Contact Details")]),t._v(" "),a("p",[t._v(t._s(t.userInfo.email))]),t._v(" "),a("p",[a("span",{staticClass:"isd"},[t._v(t._s(t.userInfo.mobileISD))]),t._v(" "),a("v-text-field",{ref:"registerPhone",staticClass:"pb0",staticStyle:{display:"inline-flex",width:"40%","margin-left":"10px"},attrs:{label:"",required:"",maxlength:"10",rules:t.submitted?t.Phone_rules:[]},on:{keypress:function(e){t.isNumber(e)}},model:{value:t.userInfo.mob,callback:function(e){t.$set(t.userInfo,"mob",e)},expression:"userInfo.mob"}})],1),t._v(" "),t.mobileValid?a("div",{staticClass:"error-message"},[t._v("Enter correct Mobile Number")]):t._e(),t._v(" "),a("p",{staticClass:"fs-12",staticStyle:{color:"slategrey"}},[t._v("Your ticket details will be sent here")])]),t._v(" "),a("div",{staticClass:"r-module"},[a("promo-code",{on:{promoCodeApplySuccess:function(e){t.appliDiscount(e)}}})],1),t._v(" "),a("div",{staticClass:"r-module"},[a("p",{staticClass:"f500"},[t._v("Fare Breakup")]),t._v(" "),a("div",{staticClass:"brd-btm w100 p010 fs-14"},[a("p",{staticStyle:{color:"slategrey"}},[a("span",[t._v("Basic Fare")]),a("span",{staticClass:"fr"},[t._v("₹"),a("vue-numeric",{attrs:{"read-only":"",separator:","},model:{value:t.reviewData.fareDetails.total,callback:function(e){t.$set(t.reviewData.fareDetails,"total",e)},expression:"reviewData.fareDetails.total"}})],1)]),t._v(" "),Object.keys(t.discountAmnt).length>=1?a("p",{staticStyle:{color:"slategrey"}},[a("span",[t._v("Promo Discount")]),t._v(" "),a("span",{staticClass:"fr"},[t._v("-₹"+t._s(t.discountAmnt))])]):t._e()]),t._v(" "),a("p",{staticClass:"brd-btm w100 p010"},[a("span",[t._v("Total Amount")]),a("span",{staticClass:"fr"},[t._v("₹"),a("vue-numeric",{attrs:{"read-only":"",separator:","},model:{value:t.reviewData.fareDetails.total-t.discountAmnt,callback:function(e){t.$set(t.reviewData.fareDetails,"total - discountAmnt",e)},expression:"reviewData.fareDetails.total - discountAmnt"}})],1)]),t._v(" "),a("p",{staticClass:"p010 fs-14",staticStyle:{color:"slategrey"}},[a("span",[t._v("You Earn")]),a("span",{staticClass:"fr"},[t._v("₹"+t._s(t.reviewData.fareDetails.ecash)),a("img",{staticClass:"img_ecash",attrs:{src:"/pwa/bus/static/img/icons/ecash.svg"}})])])]),t._v(" "),a("login-error-message",{attrs:{showLoginErrorDialog:t.showLoginErrorDialog}}),t._v(" "),a("gst-info-dialog-view",{attrs:{GSTInfoDialog:t.GSTInfoDialog},on:{GSTInfoDialogClose:function(e){t.GSTInfoDialog=!1}}}),t._v(" "),a("gst-form-details-view",{attrs:{GSTDetailsForm:t.GSTDetailsForm},on:{closeGSTFormDetails:function(e){t.GSTDetailsForm=!1}}}),t._v(" "),t.showProceedButton?a("v-layout",{staticClass:"pd15 rel gst",attrs:{row:"",wrap:"",name:"body"},on:{click:function(e){return e.stopPropagation(),t.openGSTDetailsForm(e)}}},[""!=t.getGSTDetailsForm.gst_details.number?a("v-icon",{staticStyle:{color:"green","margin-right":"5px","font-size":"20px"}},[t._v("done")]):t._e(),t._v(" "),a("span",{staticClass:"txt_terms gst-text"},[t._v("\n                       "+t._s(""!=t.getGSTDetailsForm.gst_details.number?"Review your GST Details":"Add your GST Details")+"\n                    ")]),t._v(" "),""==t.getGSTDetailsForm.gst_details.number?a("span",{staticClass:"display_value"},[t._v("\n                       (Optional)  "),a("v-icon",{staticClass:"hv_info_icon option",attrs:{slot:"activator"},on:{click:function(e){return e.stopPropagation(),t.openGSTInfoDialog(e)}},slot:"activator"},[t._v("info_outline")])],1):t._e(),t._v(" "),a("span",{staticClass:"pos-rel"},[a("v-icon",{staticClass:"fs20 mt5"},[t._v("keyboard_arrow_right")])],1)],1):t._e(),t._v(" "),t._m(0),t._v(" "),t.showProceedButton?a("div",{staticClass:"loginBtn redBtn",on:{click:function(e){return e.stopPropagation(),t.proceedToPay(e)}}},[t._v("PROCEED TO PAY")]):t._e(),t._v(" "),t.showLoader?a("div",{staticClass:"ajax-loader"},[t._m(1)]):t._e()],1):t._e(),t._v(" "),a("v-snackbar",{staticClass:"snacktxt",attrs:{timeout:t.timeout,bottom:"bottom"===t.y},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarText)+"\n            "),a("v-btn",{staticClass:"txt-ff",attrs:{flat:""},nativeOn:{click:function(e){t.snackbar=!1}}},[t._v("Close")])],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"termsCondition"},[a("span",[t._v("By clicking proceed, you agree to Yatra's "),a("a",{attrs:{target:"_blank",href:"https://www.yatra.com/fresco/online/bus-booking-tnc?withoutHeader=true"}},[t._v("Terms and Conditions")]),t._v(" & "),a("a",[t._v("Privacy Policy")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sk-wave"},[a("div",{staticClass:"sk-rect sk-rect1"}),t._v(" "),a("div",{staticClass:"sk-rect sk-rect2"}),t._v(" "),a("div",{staticClass:"sk-rect sk-rect3"}),t._v(" "),a("div",{staticClass:"sk-rect sk-rect4"}),t._v(" "),a("div",{staticClass:"sk-rect sk-rect5"})])}]}}});
//# sourceMappingURL=4.458a2ab80c3d975b09b7.js.map
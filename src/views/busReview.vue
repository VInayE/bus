<template>
    <div class="bus-r">
         <v-toolbar>
            <v-layout row wrap class="nav-bar side-padding">
                <v-flex xs2 @click="closeboardingDialog()"><v-icon>arrow_back</v-icon></v-flex>
                <v-flex xs10>Review Your Booking</v-flex>
            </v-layout>
        </v-toolbar>
        <div class="review-module" v-if="Object.keys(reviewData).length>0">
           <div class="r-module">
                <div>
                    <div>{{reviewData.OW.dc}}</div>
                    <div>{{reviewData.OW.dt}}</div>
                    <div class="fs-14">{{departDate}}</div>
                </div>
                <div>
                    <div >{{reviewData.OW.ac}}</div>
                    <div >{{reviewData.OW.at}}</div>
                    <div class="fs-14">{{arivalDate}}</div>
                </div>
                <div>
                    <span class="fs-14 c-dark">{{DurationFormat}}</span>
                </div>
            </div>
            <div class="r-module">
                <p class="f500">Boarding Details</p>
                <p class="fs-14">{{reviewData.OW.bp.name}}</p>
                <p class="fs-14 ">{{reviewData.OW.bp.bt}}</p>
            </div>
            <div class="r-module">
                <p class="f500">Bus Details</p>
                <p class="fs-14">{{reviewData.OW.opn}}</p>
                <div class=""><span class="fs-14">Sitting seat(s)</span>
                <span class="fs-14">{{seatsVal}}</span></div>
               
                  <div class="fr fs-14 bus-policy" @click="gotoCancellation">Cancellation Policy</div>
            </div>
            <!--        Traveller Details  start      -->  
            <div class="r-module">
            <div v-for="(seatNmbr,index) in seatCount.OW.seats" :key="index" class="w100 travel-form">
                <div class="f500">Traveller {{index + 1}}</div>
                        <v-select
                            v-bind:items="titleData"
                            v-model="storeTraveller[index].title"
                            label="Title"
                            single-line
                            bottom
                            item-text="text"
                            item-value="text"
                            class="h55"
                            required     
                        ></v-select>
                    <div class="error-message" v-if="submittedTab2 && storeTraveller[index].title == ''">Please Enter Title</div>                       
                <v-text-field
                    label="Full Name"
                    v-model="storeTraveller[index].name"
                    class="h55"
                    required
                ></v-text-field>
                <div class="error-message pabs" v-if="submittedTab2 &&storeTraveller[index].name == ''">Please Enter Full Name</div>
                <v-select
                        label="Gender"
                        v-model="storeTraveller[index].gender"
                        :items="genderData"
                        item-text="text"
                        item-value="text"
                        class="h55"
                        required
                ></v-select>
                <div class="error-message" v-if="submittedTab2 && storeTraveller[index].gender == ''">Select Gender</div>
                <v-select
                    label="Age"
                    v-model="storeTraveller[index].age"
                    :items="ageData"
                    item-text="text"
                    item-value="text"
                    class="h55"
                    required
                ></v-select>
                <div class="error-message" v-if="submittedTab2 && storeTraveller[index].age == ''">Enter your Age</div>
            </div>
        </div>
        <!--        Traveller Details End      -->
            <div class="r-module ">
                <p class="f500">Contact Details</p>
                <p>{{userInfo.email}}</p>
                <p><span class="isd">{{userInfo.mobileISD}}</span>
<!--                    <v-text-field style="display:inline-flex;width:40%;margin-left:10px;" v-model="userInfo.mob"></v-text-field>-->
                          <v-text-field label=""
                                          required
                                          v-model="userInfo.mob"
                                          maxlength="10"
                                          class="pb0"
                                          v-on:keypress="isNumber($event)"
                                          :rules="submitted ? Phone_rules:[]"
                                          ref= "registerPhone"  style="display:inline-flex;width:40%;margin-left:10px;">
                           </v-text-field></p>
                 <div class="error-message" v-if="mobileValid">Enter correct Mobile Number</div>
                <p style="color:slategrey;" class="fs-12">Your ticket details will be sent here</p>
            </div>
            <div class="r-module">
                <promo-code @promoCodeApplySuccess="appliDiscount($event)"></promo-code>
            </div>
            <div class="r-module">
                <p class="f500">Fare Breakup</p>
                <div class="brd-btm w100 p010 fs-14">
                <p style="color:slategrey;"><span>Basic Fare</span><span class="fr">₹<vue-numeric read-only separator="," v-model="reviewData.fareDetails.total"></vue-numeric></span></p>
                <p style="color:slategrey;"v-if="Object.keys(discountAmnt).length >= 1"><span>Promo Discount</span> <span class="fr">-₹{{discountAmnt}}</span></p>
                    </div>
                <p class="brd-btm w100 p010"><span>Total Amount</span><span class="fr">₹<vue-numeric read-only separator="," v-model="reviewData.fareDetails.total - discountAmnt"></vue-numeric></span></p>
                <p style="color:slategrey;" class="p010 fs-14"><span>You Earn</span><span class="fr">₹{{reviewData.fareDetails.ecash}}<img class="img_ecash" src="/pwa/bus/static/img/icons/ecash.svg"/>
                </span></p>
            </div>
             <login-error-message :showLoginErrorDialog="showLoginErrorDialog"></login-error-message>
             <gst-info-dialog-view :GSTInfoDialog="GSTInfoDialog" @GSTInfoDialogClose="GSTInfoDialog=false"></gst-info-dialog-view>
             <gst-form-details-view :GSTDetailsForm="GSTDetailsForm" @closeGSTFormDetails="GSTDetailsForm=false"></gst-form-details-view>
               <v-layout row wrap name="body" class="pd15 rel gst" @click.stop="openGSTDetailsForm" v-if="showProceedButton">
                    <v-icon v-if="getGSTDetailsForm.gst_details.number != ''" style="color:green;margin-right:5px;font-size:20px;">done</v-icon>
                    <span class="txt_terms gst-text">
                       {{getGSTDetailsForm.gst_details.number!=""? 'Review your GST Details' :'Add your GST Details'}}
                    </span>
                    <span class="display_value" v-if="getGSTDetailsForm.gst_details.number == ''">
                       (Optional)  <v-icon class="hv_info_icon option" slot="activator" @click.stop="openGSTInfoDialog">info_outline</v-icon>
                    </span>
                    <span class="pos-rel" >
                      <v-icon class="fs20 mt5">keyboard_arrow_right</v-icon>
                    </span>
                </v-layout>
        <div class="termsCondition"><span>By clicking proceed, you agree to Yatra's <a target="_blank" href="https://www.yatra.com/fresco/online/bus-booking-tnc?withoutHeader=true">Terms and Conditions</a> & <a>Privacy Policy</a></span></div>
           
             <div class="loginBtn redBtn" @click.stop="proceedToPay" v-if="showProceedButton">PROCEED TO PAY</div>
             <div class="ajax-loader" v-if="showLoader">
          <div class="sk-wave">
            <div class="sk-rect sk-rect1"></div>
            <div class="sk-rect sk-rect2"></div>
            <div class="sk-rect sk-rect3"></div>
            <div class="sk-rect sk-rect4"></div>
            <div class="sk-rect sk-rect5"></div>
          </div>
        </div>
        </div>
        <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
         </v-snackbar>
    </div>
    </template>
    <script>
        import { mapGetters,mapMutations } from 'vuex'
        import {getReview,getCancellationPolicy} from '../api/api'
        import * as types from '../store/types'
        import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
    export default {
        components:{
            PromoCode : () => import('../components/common/promoCode.vue'),
            GstInfoDialogView: () => import('../components/common/GSTInfoDialogView'),
            GstFormDetailsView : () => import('../components/common/GSTFormDetailsView'),
            LoginErrorMessage : () => import('../components/common/loginErrorMessage')
         },
        data () {
             return {
                 submitted:false,
                 GSTInfoDialog: false,
                 GSTDetailsForm: false,
                 boardingDialog:false,
                 boardingPoints:null,
                 showProceedButton:false,
                 snackbarText:'',
                 timeout: 3000,
                 showLoader:true,
                 apiUrlPath:types.GET_API_URL,
                 y: 'bottom',
                 seatsVal:'',
                 showBtn:false,
                 snackbar:false,
                 seatsSelected:{},
                 seatsSelectedTemp:{},
                 reviewData:null,
                 discountAmnt:0,
                 showLoginErrorDialog:false,
                 seatCount:null,
                 storeTraveller:[{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''}],
                  items: [],
                 storeTravellerDetails:[],
                 promoData:{'id':'','type':'','code':''},
                 genderData:[
                     { text: 'M' },
                     { text: 'F' }
                 ],
                 titleData: [
                        { text: 'Mr' },
                        { text: 'Mrs' },
                        { text: 'Ms' }              
                    ],
                    ageData: [
                        { text: '1' },
                        { text: '2' },
                        { text: '3' },
                        { text: '4' },
                        { text: '5' },
                        { text: '6' },
                        { text: '7' },
                        { text: '8' },
                        { text: '9' },
                        { text: '10' },
                        { text: '11' },
                        { text: '12' },
                        { text: '13' },
                        { text: '14' },
                        { text: '15' },
                        { text: '16' },
                        { text: '17' },
                        { text: '18' },
                        { text: '19' },
                        { text: '20' },
                        { text: '21' },
                        { text: '22' },
                        { text: '23' },
                        { text: '24' },
                        { text: '25' },
                        { text: '26' },
                        { text: '27' },
                        { text: '28' },
                        { text: '29' },
                        { text: '30' },
                        { text: '31' },
                        { text: '32' },
                        { text: '33' },
                        { text: '34' },
                        { text: '35' },
                        { text: '36' },
                        { text: '37' },
                        { text: '38' },
                        { text: '39' },
                        { text: '40' },
                        { text: '41' },
                        { text: '42' },
                        { text: '43' },
                        { text: '44' },
                        { text: '45' },
                        { text: '46' },
                        { text: '47' },
                        { text: '48' },
                        { text: '49' },
                        { text: '50' },
                        { text: '51' },
                        { text: '52' },
                        { text: '53' },
                        { text: '54' },
                        { text: '55' },
                        { text: '56' },
                        { text: '57' },
                        { text: '58' },
                        { text: '59' },
                        { text: '60' },
                        { text: '61' },
                        { text: '62' },
                        { text: '63' },
                        { text: '64' },
                        { text: '65' },
                        { text: '66' },
                        { text: '67' },
                        { text: '68' },
                        { text: '69' },
                        { text: '70' },
                        { text: '71' },
                        { text: '72' },
                        { text: '73' },
                        { text: '74' },
                        { text: '75' },
                        { text: '76' },
                        { text: '77' },
                        { text: '78' },
                        { text: '79' },
                        { text: '80' },
                        { text: '81' },
                        { text: '82' },
                        { text: '83' },
                        { text: '84' },
                        { text: '85' },
                        { text: '86' },
                        { text: '87' },
                        { text: '88' },
                        { text: '89' },
                        { text: '90' },
                        { text: '91' },
                        { text: '92' },
                        { text: '93' },
                        { text: '94' },
                        { text: '95' },
                        { text: '96' },
                        { text: '97' },
                        { text: '98' },
                        { text: '99' },
                        { text: '100' }
                    ],
                    states: [
   
                    ],
                 TravellerData:[],
                 submittedTab2:false,
                 paxData:{},
                 paxDataJson:{},
                 promoDataPayment:{'code':'',type:''},
                 reviewData:{},
                 userInfo:{},
                 departDate:'',
                 arivalDate:'',
                 DurationFormat:'',
                 Phone_rules:[
                    (v) => !!v || 'Phone Number is required',
                    (v) => (/^\d{10}$/.test(v)||v.length==0) || 'Please enter valid phone no'
                  ],
                 mobileValid:false,
                 UserProfileUrl:'/social/user/userProfile.htm' 
             }
        },
      computed:{
    ...mapGetters({
        //getUserInfo:JSON.parse(localStorage.getItem("userInfo")),
        getGSTDetailsForm:types.GET_GST_DETAILS,
        getSearchParams:types.GET_BUS_SEARCH_PARMAS
    })
  },
        methods:{
           openGSTInfoDialog () {
             this.GSTInfoDialog = true
           },
            isNumber (evt) {
                 evt = (evt) ? evt : window.event;
                 var charCode = (evt.which) ? evt.which : evt.keyCode;
                 if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                    evt.preventDefault();;
                 } else {
                    return true;
                 }
            },
            gotoCancellation(){
                localStorage.setItem('cancellationNavigation','Review')
                this.$router.push({name:'CancellationPolicy'})
            },
           openGSTDetailsForm () {
             this.GSTDetailsForm = true
           },
            appliDiscount(data){
                this.discountAmnt = parseInt(data.cash)
                this.paxData.promoid = data.promoId
                this.paxData.promoType = data.promoType
                this.paxData.promocode = data.promoCode
                this.promoDataPayment.code = data.promoCode
                this.promoDataPayment.type = data.promoType
            },
            closeboardingDialog () {
                var _self = this
                var checkLoginStatus = this.getCookie("userName")
                var isProd=false
                if (process.env.NODE_ENV && process.env.NODE_ENV.toString() === 'production') {
                    _self.isProd=true
                }
                if(checkLoginStatus !== null && checkLoginStatus !== '' && _self.isProd) {
                _self.checkUser()
                }else{
                     this.$router.push({name:'BusLogin'})
                }
            },
            getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
       },
        checkUser(){
                var self = this
                let postData = {
                                "includeOptionalParams": 'true',
                                "productId": 'pwa_bus',
                                "channel": 'b2c'
                            }
                var loginBackClickCheck = localStorage.getItem('loginBackClickStatus')
            
                Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                Vue.http.options.emulateJSON = true;
                this.$http.post(self.UserProfileUrl,postData).then(function (response) {
                    if (response.body.status == "SUCCESS") {
                        self.userEmail= response.body.responseData.userInfo.email
                        self.userMobile=response.body.responseData.userInfo.mobile
                        let userInfo = {
                        'email': response.body.responseData.userInfo.email,
                        'mobile': response.body.responseData.userInfo.mobile?response.body.responseData.userInfo.mobile:null,
                        'mobileISD': response.body.responseData.userInfo.mobileISD ? response.body.responseData.userInfo.mobileISD : null
                        }
                        //self.setUserInfo(userInfo)
                        localStorage.setItem('userInfo',JSON.stringify(userInfo))
                        self.$router.push({name:'BusDropingPoint'})
                    }
                    else {
                        if(!loginBackClickCheck) this.$router.push({name:'BusLogin'})
                    }
                })
            },
            getBoardingPoint(bName){
                var storeBP = JSON.parse(localStorage.getItem('seatMapData'))
                storeBP.OW.bp = bName
                localStorage.setItem('seatMapData',JSON.stringify(storeBP))
                this.$router.push({name:'BusDropingPoint'})
            },
            proceedToPay(){
                var self = this
                this.showLoader = true    
                var ageValidator = 0
                this.submittedTab2 = false
                localStorage.setItem('promoCodePayment',JSON.stringify(this.promoDataPayment))   
                for(let k=0;k<this.seatCount.OW.seats.length;k++) {
                    if(this.storeTraveller[k].title=='' || this.storeTraveller[k].name==''||
                        this.storeTraveller[k].gender ==''|| this.storeTraveller[k].age=='')
                        {
                            this.submittedTab2 = true
                            this.showLoader = false
                            self.snackbar = true
                            self.snackbarText = "Title, Full Name, Age cannot be blank."
                        }
                }
                if(this.userInfo.mob.length <= 9) {
                    this.submittedTab2 = true
                    this.mobileValid = true
                    this.showLoader = false                   
                }

                // age validation
                // for(let k=0; k < this.seatCount.OW.seats.length; k++) {
                //     if(self.storeTraveller[k].age > 12) {
                //         ageValidator = 1
                //     }
                // }

                // if(ageValidator == 0) {
                //     self.submittedTab2 = true
                //     self.showLoader = false
                //     self.snackbar = true
                //     self.snackbarText = "Title, Full Name, Age cannot be blank."
                // }
               
                try {
                    if(this.submittedTab2 == false) {
                        for(let k=0;k<this.seatCount.OW.seats.length;k++){
                            this.TravellerData.push({
                                'paxid':k,'title':this.storeTraveller[k].title,
                                'name':this.storeTraveller[k].name,'gender':this.storeTraveller[k].gender,
                                'age':this.storeTraveller[k].age,'idType':'','idNumber':'','rf':''
                            })
                        }
                        let busSuperPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
                        this.paxData.travellerDetails = this.TravellerData
                        localStorage.setItem('retainTravellerDetails',JSON.stringify(this.TravellerData))
                        this.paxData.userEmail = this.userInfo.email
                        this.paxData.userMobile = this.userInfo.mob
                        this.paxData.superPnr = busSuperPnr.superPNR
                        this.paxData.smid = JSON.parse(localStorage.getItem('storeSMID'))
                        this.paxData.tt = 'o'
                        this.paxData.userAddons=[]
                        this.paxDataJson=encodeURI(JSON.stringify(this.paxData))
                        Vue.http.options.emulateJSON = false;
                        let totalFare = this.reviewData.fareDetails.total - this.discountAmnt
   
                        if(this.getGSTDetailsForm.gst_details.address !=''){
                            var gstDetailsObject = {
                                gstn:this.getGSTDetailsForm.gst_details.number,
                                companyName:this.getGSTDetailsForm.gst_details.name,
                                companyEmail:this.getGSTDetailsForm.gst_details.email,
                                companyAddress:this.getGSTDetailsForm.gst_details.address,
                                city:this.getGSTDetailsForm.gst_details.city,
                                pinCode:this.getGSTDetailsForm.gst_details.pin_code,
                                state:this.getGSTDetailsForm.gst_details.state_code,
                                companyPhone:this.getGSTDetailsForm.gst_details.phone,
                                superPnr:this.paxData.superPnr
                            }
                            this.$http.post(self.apiUrlPath,gstDetailsObject).then(function (response) {
                                if(response.body.status){
                                    this.$http.post(self.apiUrlPath+`savePaxData?data=${this.paxDataJson}`).then(function (response) {
                                        if(response.ok){
                                            localStorage.setItem('TotalFare',totalFare)
                                            localStorage.setItem('UUID',response.body.uuid)
                                            self.showLoader = false    
                                            this.$router.push({name:'BusPaySwift'})
                                        }
                                    })
                                }
                            })
                        }else{
                            this.$http.post(self.apiUrlPath+`savePaxData?data=${this.paxDataJson}`).then(function (response) {
                                if(response.ok){
                                    localStorage.setItem('TotalFare',totalFare)
                                    localStorage.setItem('UUID',response.body.uuid)
                                    self.showLoader = false
                                    this.$router.push({name:'BusPaySwift'})
                                }
                            })
                        }
                    }
                }catch(e){
                    console.log("Error... "+e.message)
                }
   
            },
            format(time){
            return time.replace(/(?:0)?(\d+):(?:0)?(\d+).*/,'$1H $2M');
        }
        },
    created(){
          let self = this
          this.paxData.promoid = ''
          this.paxData.promoType = ''
          this.paxData.promocode = ''
          let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
          let busID= JSON.parse(localStorage.getItem('seatMapJson')).busID
          if(SPnr == null){
            this.showLoginErrorDialog = true
          }else{
             getReview(SPnr).then(response => {
             self.reviewData = response.body
             let frmatDate = new Date(self.reviewData.OW.dd)
             this.DurationFormat = this.format(self.reviewData.OW.dur)
             let frmatDateString = frmatDate.toString()
             this.departDate = frmatDateString.substr(0,3) +','+' '+frmatDate.getDate()+' '+frmatDateString.substr(4,3)
             let frmatDateAr = new Date(self.reviewData.OW.dd)
             let frmatDateArString = frmatDateAr.toString()
             this.arivalDate = frmatDateArString.substr(0,3) +','+' '+frmatDate.getDate()+' '+frmatDateArString.substr(4,3)     
             self.showProceedButton = true
             self.showLoader = false    
          }).catch(error => {});
              getCancellationPolicy(this.getSearchParams,busID).then(response => {
            localStorage.setItem('cancellationPolicy',JSON.stringify(response.data.cp))
          }).catch(error => {});
             this.seatCount = JSON.parse(localStorage.getItem('seatMapData'))
            if(this.seatCount.OW.seats.length==1){
                this.seatsVal =this.seatCount.OW.seats[0].sn
            }else{
                this.seatsVal = this.seatCount.OW.seats.map(function(elem){
                    return elem.sn;
                }).join(",");
            }
           
           
            adobeAnalyticsPageView("yt:bus:dom:checkout:travellers","bus","ios/pwa","business","bus checkout","domestic bus","travellers","")
        }

    },
    mounted(){
        this.storeTravellerDetails = (localStorage.getItem('retainTravellerDetails') && localStorage.getItem('retainTravellerDetails').length > 0) ? JSON.parse(localStorage.getItem('retainTravellerDetails')) : []
        for(var i=0;i<this.storeTravellerDetails.length;i++){
            this.storeTraveller[i].title=this.storeTravellerDetails[i].title
            this.storeTraveller[i].age=this.storeTravellerDetails[i].age
            this.storeTraveller[i].gender=this.storeTravellerDetails[i].gender
            this.storeTraveller[i].name=this.storeTravellerDetails[i].name
        }
        var userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if(userInfo.loginAs=='guest'){
           this.userInfo.email=userInfo.email
           this.userInfo.mobileISD=userInfo.mobileISD
           this.userInfo.mob=userInfo.mobile
           }
        else{
           this.userInfo.email=userInfo.email
           this.userInfo.mobileISD='+'+userInfo.mobileISD
           this.userInfo.mob=userInfo.mobile
        }
    }
}
</script>
    <style scoped lang="scss">
        .termsCondition{
                padding: 0px 14px 0px 16px;
                margin-bottom: 9px;
                font-size: 13px;
                line-height: 16px;
                display: inline-block;
        }
        .termsCondition a{
                color: royalblue;
                text-decoration: none;
        }
        .review-module{
            .r-module {
                padding: 16px;
                border-bottom: 5px solid #EEEEEE;
                &:last-child{
                    border-bottom: none;
                }
                & > div {
                    display: inline-block;
                    &:last-child {
                        margin-right: 0;
                    }
                    .fs-14 {
                        color: rgba(0,0,0,.54);
                    }
                    .c-dark {
                        color: rgba(0,0,0,.87) !important;
                    }
                }
                p {
                    margin-bottom: 5px;
                }
                .bus-policy {
                    color: #2196F3;
                    position: relative;
                }
            }
        }
    .link_register{
           text-align: left;
        }
        .cl_white_back{
        margin-left: 5px!important;
        font-size:25px;
        color:#616161!important;
      }
      .cd_header_white{
         font-weight: 500;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.87) !important;
        margin-left: 0px;
      }
        .p20 {
            padding: 20px;
        }
        .pb0 {
            padding-bottom: 0;
        }
        .logintxt {
            color: #fff;
            font-weight: 500;
        }
        .loginBtn {
            color: #fff;
            width: 100%;
            margin: 0;
        }
        .registerTab {
            margin: 0 20px;
            text-align: center;
        }
        .application--light .btn--disabled:not(.btn--icon):not(.btn--flat) {
            background-color: #F34747 !important;
            color: #fff;
        }
        .wlogin {
            padding: 20px 20px 0 20px;
        }
        .txt-w {
            font-weight: 500;
            font-size: 16px;
        }
        .facebookBlock {
            padding: 0 20px;
            width: 100%;
            margin-top:20px;
            bottom: 0;
        }
        .w100 {
            width: 100%;
        }
       
        .p010 {
            padding: 10px 0;
        }
        .gst {
                padding: 16px;
        margin-top: 10px;
            font-size: 14px;
        }
        .display_value {
            margin-left: 5px;
            color: #9e9e9e;
        }
        .pos-rel {
            position: absolute;
        right: 0;
        color: rgba(0,0,0,.54);
        }
        .error-message {
            font-size: 12px;
            color: #F34747;
            position: relative;
            top: 0px;
            }
            .h55 {
                height: 55px;
            }
        .travel-form .input-group {
            font-size: 14px;
        }
        .option {
            color: #1976d2;
        }
        .isd {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;
        }
    .f500 {
        font-weight: 500;
    }
        .img_ecash{
            width:50px;
            padding-right:2px;
            margin-left:6px;
            margin-top:6px;
        }

        .travel-form {
            margin-top: 20px;
        }
        .travel-form:first-child{
            margin-top: 0;
        }
    </style>


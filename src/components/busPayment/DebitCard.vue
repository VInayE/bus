<template>
   <v-dialog v-model="debitDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-toolbar dark class="white cd_fixed_header">
            <v-btn icon @click.native="closeDebitDialog" dark style="margin-left:0px;">
                    <v-icon class="cl_white_back payment_back">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="cd_header_white header_white">Debit Card</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="closeCreditDialog"></v-btn>
            </v-toolbar-items>
        </v-toolbar>
       <v-container class="p20 paycard bg-white" id="debitcard" v-if="DebitVisible">
            <v-layout row wrap>
                <v-flex xs12 prel>
                  <input id="input1_dc"
                         v-model="number"
                         type="text"
                         maxlength="30"
                         autocomplete="off"
                         name="cc-number"
                         placeholder="Card Number"
                         v-on:keypress = "cardSpace($event)"
                         @paste = "checkCardPaste"
                         @blur="checkCardDetails"/>
                         <img v-if="cardImg !=''" :src="'/pwa/bus/static/img/icons/'+cardImg+'.png'" class="pabs img-res">
                </v-flex>
                <v-flex xs12 errorMsg v-if="cardNumberErrorMsg">{{cardNumberErrorMsg}}</v-flex>
           </v-layout>
               <v-layout row wrap>
                <v-flex xs12>
                    <input id="input2_dc"
                           autocomplete="off"
                           v-model="paymentOpt.DebitCardDetails.name"
                           autocapitalize="none"
                           autocorrect="off"
                           name="name"
                           tabindex="0"
                           placeholder="Name On Card" />
                </v-flex>
                <v-flex xs12 errorMsg v-if="cardHolderErrorMsg">{{cardHolderErrorMsg}}</v-flex>
           </v-layout>
                <v-layout row wrap>
                   <v-flex xs7>
                    <input id="expirationMonth_dc"
                           class="flex-3 br-0"
                           v-model="paymentOpt.DebitCardDetails.mm"
                           maxlength="2" placeholder="MM"
                           autocomplete="cc-exp-month"
                           v-on:keyup="checkMonthLength"
                           v-on:keypress="onlyNumeric" />
                    <span class="flex-3 slash">/</span>
                    <input id="expirationYear_dc"
                           class="flex-3 bl-0"
                           ref="expiryYrs"
                           v-model="paymentOpt.DebitCardDetails.yy"
                           maxlength="2"
                           placeholder="YY"
                           autocomplete="cc-exp-year"
                           v-on:keypress="onlyNumeric" />
                    </v-flex>
                    
                    <v-flex xs4 offset-xs1 prel>
                        <input id="cvv_dc"
                            type="password"
                            v-model="paymentOpt.DebitCardDetails.cvv"
                            placeholder="CVV"
                            autocomplete="cc-exp-year"
                            v-on:keypress="onlyNumeric"
                            :maxlength="cardMaxLength"/>
                                <img :src="'/pwa/bus/static/img/icons/cvc_hint.png'" class="pabs cvv" />
                    </v-flex>
            	</v-layout>
                <v-layout row wrap>
                  <v-flex xs8 errorMsg v-if="cardExpiryDateErrorMsg">{{cardExpiryDateErrorMsg}}</v-flex>
                  <v-flex xs4 offset-xs8 errorMsg v-if="cardCVVErrorMsg">{{cardCVVErrorMsg}}</v-flex>
                </v-layout>
         </v-container>
         <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
         </v-snackbar>
         <div class="ajax-loader" v-if="showLoader">
              <div class="sk-wave">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
              </div>
          </div> 
         <div class="pricefixed"><button class="btn red"  @click.stop="submitPay">PROCEED TO PAY ₹{{totalPrice-redeemedamount}}</button></div>
         <payment-error :showPaymentDialog="showPaymentDialog" :paymentErrorMessage="paymentErrorMessage" @closePaymentError="showPaymentDialog = false"></payment-error>  
    </v-dialog>
</template>
<script>
  import { mapGetters,mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import {makePaymentCall} from '../../helpers/payment'
  import router from '../../router'
  import { adobeAnalyticsPageView } from '../../helpers/adobeAnalytics'
  export default {
      props:['openDebitDialog','debitCardOption','totalAmountPayble','redeemedAmountPayble','superPNR'],
      components:{
        LoaderView: () => import("../common/loader"),
        paymentError: () => import("./paymentError")
      },
      computed:{
        ...mapGetters({
            getUserInfo:types.GET_USER_INFO
        }),
      },
      data () {
          return {
              address:'',
              city:'',
              state_code:'',
              pin_code:'',
              number:'',
              timeout: 1500,
              snackbarText:'',
              snackbar:false,
              y: 'bottom',
              cardAddressErrorMsg:undefined,
              cardCityErrorMsg:undefined,
              cardStateErrorMsg:undefined,
              cardPinErrorMsg:undefined,
              cardPhoneErrorMsg:undefined,
              selectedTelephoneCode:'+91',
              phone:'',
              isInternationalCard:false,
              debitDialog: false,
              DebitVisible: true,
              cardMaxLength: '3',
              selectedCardForValidation: false,
              cardCVVErrorMsg:undefined,
              selectedCard: {},
              totalPrice:0,
              productCode:'pwa_bus',
              redeemedamount:0,
              cardExpiryDateErrorMsg: undefined,
              cardNumberErrorMsg: undefined,
              cardHolderErrorMsg: undefined,
              ajaxLoadingDialog:false,
              cardImg: '',
              createOrderResponse:{},
              paymentOpt:{
                DebitCardDetails:{
                  number:'',
                  name:'',       
                  mm:'',
                  yy:'',
                  cvv:'',
                  payop: 'dc'
                }
              },
              showLoader:false,
              paymentErrorMessage:{},
              showPaymentDialog: false
          }
      },
      created() {
          this.createOrderResponse = this.superPNR
      },      
       watch:{
       openDebitDialog(){
           this.debitDialog = this.openDebitDialog;
           this.totalPrice = this.totalAmountPayble
           this.redeemedamount = this.redeemedAmountPayble
           if(this.openDebitDialog){
               this.createOrderResponse = this.superPNR
               this.selectedCardForValidation = false
               this.cardImg = ''
               this.paymentOpt = {
                 DebitCardDetails:{
                  number:'',
                  name:'',       
                  mm:'',
                  yy:'',
                  cvv:'',
                  payop: 'dc'
                }  
               }
           }
		   adobeAnalyticsPageView("yt:bus:dom:checkout:payment:debit card","bus","ios/pwa","business","bus checkout","domestic bus","payment","debit card")
       },
        number($event){
            this.paymentOpt.DebitCardDetails.number = this.number
            let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
            let cardDetails= {
                'cno':this.paymentOpt.DebitCardDetails.number,
                'passthrough':false,
                'product': this.productCode,
                'superPnr':SPnr.superPNR,
            }
        }   
     },
     methods: {
	 	  navigateToSrp () {
              router.push({name:'BusSRP'})
          },
          checkMonthLength(){
            if(this.paymentOpt.DebitCardDetails.mm.length == 2){
             this.$refs.expiryYrs.focus()
            }
          },
           closeDebitDialog () {
             this.$emit('closeDebitDialog', false) 
           },
           validateCardRegex(cardDetails){
               let pattern = new RegExp(cardDetails.cardValidations.regex)
               return pattern.test(this.paymentOpt.DebitCardDetails.number.replace(/\s/g, ''))
           },
           checkCardDetails () {
              let adFilterCndt =this.debitCardOption.cardTypes.findIndex(this.validateCardRegex)
              if(adFilterCndt>=0){
               this.selectedCard = this.debitCardOption.cardTypes[adFilterCndt].cardValidations
               this.cardMaxLength = this.selectedCard.cvvLength
               this.selectedCardForValidation = true
                  this.cardImg = this.debitCardOption.cardTypes[adFilterCndt].logoURL
             } else {
               this.selectedCardForValidation = false 
               this.cardImg = ''
               this.cardMaxLength = '3'
             }
           },
            validateName () {
              if(this.paymentOpt.DebitCardDetails.name ==''){
                  this.cardHolderErrorMsg = 'Enter Card Holder Name'
                  let self = this
                  setTimeout(function(){
                      self.cardHolderErrorMsg = undefined
                  }, 3000);
                  return false
              }else{
                  this.cardHolderErrorMsg = undefined
                  return true
              }
          },
          validateExpiryDate () {
            this.cardExpiryDateErrorMsg = this.paymentOpt.DebitCardDetails.mm == '' || parseInt(this.paymentOpt.DebitCardDetails.mm) > 12 || this.paymentOpt.DebitCardDetails.yy == ''? 'Invalid Expiry Date' : parseInt(this.paymentOpt.DebitCardDetails.yy) > parseInt(new Date().getFullYear().toString().substr(-2)) ? undefined : parseInt(this.paymentOpt.DebitCardDetails.yy) == parseInt(new Date().getFullYear().toString().substr(-2)) && parseInt(this.paymentOpt.DebitCardDetails.mm) > parseInt(("0" + (new Date().getMonth() + 1)).slice(-2))  ? undefined: 'Invalid Expiry Date'
           if(this.cardExpiryDateErrorMsg == undefined) {
                return true
            }else {
              let self = this
              setTimeout(function(){
                      self.cardExpiryDateErrorMsg = undefined
              }, 3000);
              return false
            }                             
          },
          validateCVV () {
            if(this.selectedCard.cvv && this.selectedCard.cvv == "optional") return true
            this.cardCVVErrorMsg = this.paymentOpt.DebitCardDetails.cvv == '' ? 'Enter CVV number' : parseInt(this.paymentOpt.DebitCardDetails.cvv)>=0 && this.paymentOpt.DebitCardDetails.cvv.length === parseInt(this.selectedCard.cvvLength)?undefined : 'Enter Correct CVV no'
           if(this.cardCVVErrorMsg == undefined) {
               return true
            } else {
                let self = this
                setTimeout(function(){
                      self.cardCVVErrorMsg = undefined
                }, 3000);
                return false 
            }
          },
           submitPay() {
              if(!this.selectedCardForValidation){
                  this.cardNumberErrorMsg = 'Enter correct card details'
                  let self = this
                  setTimeout(function(){
                      self.cardNumberErrorMsg = undefined
                  }, 3000);
                  return false
              }else{
                  this.cardNumberErrorMsg = undefined
                  if(this.validateName() && this.validateExpiryDate() && this.validateCVV()){
                       this.paySwiftCall();
                  } else{
                      return false
                  }
              }
          },
          paySwiftCall(){
            let self = this
            this.showLoader = true
            Vue.http.headers.common['Content-Type'] = 'application/json';
            Vue.http.headers.common['YT-CHANNEL'] = 'PWA';
            Vue.http.headers.common['YT-TENANT-CODE'] = 'pwa_bus';
            Vue.http.options.emulateJSON = false;
            var localValues = JSON.parse(localStorage.getItem("userInfo"))  
            let Spnr = JSON.parse(localStorage.getItem('busReviewRequest'))
            let deDate = localStorage.getItem('departDate')
            var t = this.debitCardOption.cardTypes.findIndex(this.validateCardRegex);
            
            var payDetails={
                'patternMatch': new RegExp('^[1-9][0-9]?$'),
                'paymentModeType':'',
                'paymentAmount':this.totalPrice-this.redeemedamount,
                'tdate':deDate,
                'cno':this.paymentOpt.DebitCardDetails.number.replace(/\s/g, ''),
                'cardType':this.debitCardOption.cardTypes[t].code,
                'cardHolderName':this.paymentOpt.DebitCardDetails.name,
                'cardHolderNumber':this.paymentOpt.DebitCardDetails.number,
                'cardMM':this.paymentOpt.DebitCardDetails.mm,
                'cardYY':this.paymentOpt.DebitCardDetails.yy,
                'cardCvv':this.paymentOpt.DebitCardDetails.cvv,
                'payOptionType':this.paymentOpt.DebitCardDetails.payop,
                'productCode': 'pwa_bus'
            }
                
               let payswiftCardParams ={
                        amountDisplayed:payDetails.paymentAmount,
                        eCashRedemed:this.redeemedamount,
                        appVersion:'1.0',
                        client:'APP',
                        discount:0,
                        discountingStatus:false,
                        email:localValues.email,
                        merchant:'yatra',
                        mob:localValues.mobile,
                        otherDiscountingStatus:false,
                        paymentMode:'FULL',
                        paymentOptionParameters:'tdate='+payDetails.tdate+'|merchant=yatra|product='+
                        payDetails.productCode+'|payop='+payDetails.payOptionType+'|previousPayOp='+
                        payDetails.payOptionType+'|cno='+
                        payDetails.cno+'|ctype='+payDetails.cardType
                        +'|isCardInternational=false|address_check_rdo=Domestic|cardholder_name='+payDetails.cardHolderName
                        +'|cexpy=20'+payDetails.cardYY+'|cexpm='+payDetails.cardMM+'|ccsc='+payDetails.cardCvv+
                        '|client=APP|uuid='+localStorage.getItem('UUID'),
                        product:payDetails.productCode,
                        promoCode:JSON.parse(localStorage.getItem('promoCodePayment')).code,
                        promoType:JSON.parse(localStorage.getItem('promoCodePayment')).type,
                        superPnr:Spnr.superPNR,
                        ttid:parseInt('11'+Spnr.superPNR),
                        uuid:localStorage.getItem('UUID'),
                        amountToRedeem:this.redeemedamount
                    }
                    Vue.http.options.emulateJSON = true;                   
                    this.$http.post('https://www.yatra.com/PaySwift/payNow',payswiftCardParams).then(function (response) {
                        self.showLoader = false
                        self.showPaymentDialog = false
                        if(response.body && response.body.rurl) {
                            makePaymentCall(response.body)
                        }
                        else {
                            if(response.body && Object.keys(response.body.redirectMap)) {
                                self.paymentErrorMessage = response.body.redirectMap.errMsg || "Oops, we seem to have temporary hiccup. We apologise for the inconvenience caused and request you to try again."
                                self.showPaymentDialog=true
                            }
                            else {
                                //console.log('please check resonse body nodes')
                                self.navigateToSrp()
                            }
                        }
                    }).catch(function (error) {
                        self.showLoader = false
                        self.showPaymentDialog = false
                        setTimeout(function() {
                            self.paymentErrorMessage = "Oops, we seem to have temporary hiccup. We apologise for the inconvenience caused and request you to try again."
                            self.showPaymentDialog=true
                        }, 2000)
                    });
          },
          cardSpace(evt) {
              evt = (evt) ? evt : window.event;
              var charCode = (evt.which) ? evt.which : evt.keyCode;
              if ((charCode > 31 && (charCode < 48 || charCode > 57)) || this.paymentOpt.DebitCardDetails.number.replace(/\s/g, '').length >=19) {
                evt.preventDefault();
              } else {
                let cardNumber = this.paymentOpt.DebitCardDetails.number.replace(/\s/g, '')
                if(cardNumber.length !=0 && cardNumber.length % 4 == 0) {
                   this.paymentOpt.DebitCardDetails.number +=" "
                }
               return true;
              }
          },
          onlyNumeric(evt,option) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
          },
          checkCardPaste(e){
            let self = this
                setTimeout(function(){
                let data = e.target.value.replace(/[^0-9\.]+/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim()
                self.paymentOpt.DebitCardDetails.number = data
                e.preventDefault()
                e.stopPropagation()
                }, 10);
            }
      }
  }
</script>
<style scoped>
   .pricefixed {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        background-color: #f44336;
        height: 43px;
        font-size: 14px;
        font-weight: bold;
    }
    .pricefixed .btn{
        font-size:14px;
        margin-top:5px;
    }
    .errorMsg{
      margin-top:-2px;
      margin-bottom:5px;
      color: #f44336;
    }
    .img-res {
        right: 20px;
        top: 10px;
        width: 14%;
        height: auto;
        }
    .cvv {
        width: 25%;
        top: 11px;
        right: 10px;
    }
</style>
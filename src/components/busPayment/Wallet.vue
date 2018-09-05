<template>
     <v-dialog v-model="walletDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-toolbar dark class="white cd_fixed_header">
            <v-btn icon @click.native="closeWalletDialog" dark style="margin-left:0px;">
                    <v-icon class="cl_white_back payment_back">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="cd_header_white header_white">Wallet</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="closeCreditDialog"></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-layout class="wallet bg-white" row wrap>
            <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            Please Select Your Bank
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-flex xs12 p10>
            <div class="tabs" v-for="(item,index) in walletOption.suboptionList" v-bind:class="{lastTab:walletOption.suboptionList % 2 == 0}" @click="bankcode = item.subOption" v-if="item.status==='ENABLED'"  :key="index">
              <span class="left radio-btn prel">
                <v-radio-group v-model="bankcode" row>
                    <v-radio class="tab-bank tab-bank-wallet" :value="item.subOption" color="primary" :id="item.subOption"></v-radio>
                </v-radio-group>
                </span>
                <span class="left w100"><img :src="'/pwa/bus/static/img/icons/'+item.subOption+'.png'" class="img-resp"></span>
            </div>
            </v-flex>
            <v-flex xs12 p-20 content>
	          <p>We will redirect you to corresponding wallet page where you can make payment.</p>
	          <p>As per government norms, non-KYC customers can pay a maximum of <span>&#8377;</span> 20,000 in a month using wallets.</p>
            </v-flex>
         </v-layout>
         <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
         </v-snackbar>
         <payment-error 
         :showPaymentDialog="showPaymentDialog" 
         :paymentErrorMessage="paymentErrorMessage" @closePaymentError="showPaymentDialog = false"></payment-error>
         <div class="ajax-loader" v-if="showLoader">
              <div class="sk-wave">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
              </div>
         </div> 
         <div class="pricefixed"><button class="btn red" @click.stop="makePayment">PROCEED TO PAY ₹ {{totalPrice-redeemedamount}} </button></div>
    </v-dialog>
</template>
<script>
  import { mapGetters} from 'vuex'
  import * as types from '../../store/types'
  import {makePaymentCall} from '../../helpers/payment'
  import router from '../../router'
  import { adobeAnalyticsPageView } from '../../helpers/adobeAnalytics'
  export default {
      props:['openWalletDialog', 'walletOption','totalAmountPayble','redeemedAmountPayble','superPNR'],
      components:{
        LoaderView: () => import("../common/loader"),
        paymentError: () => import("./paymentError")
      },
      computed:{
        ...mapGetters({
            getUserInfo:types.GET_USER_INFO,
        }),
      },
      data(){
          return {
              timeout: 1500,
              snackbarText:'',
              snackbar:false,
              y: 'bottom',
              walletDialog: false,
              showLoader:false,
              createOrderResponse : {},
              bankcode: '',
              totalPrice:0,
              redeemedamount:0,
              snackbar: false,
              y: 'bottom',
              timeout: 3000,
              paymentErrorMessage:{},
              showPaymentDialog: false
          }
      },
       watch:{
       openWalletDialog(){
           this.walletDialog = this.openWalletDialog
           this.createOrderResponse = this.superPNR
           this.totalPrice = this.totalAmountPayble
           this.redeemedamount = this.redeemedAmountPayble
		   adobeAnalyticsPageView("yt:bus:dom:checkout:payment:wallet","bus","ios/pwa","business","bus checkout","domestic bus","payment","wallet")
       }
     },
     created() {
        this.createOrderResponse = this.superPNR
     },
     methods: {
	 	   navigateToSrp () {
              router.push({name:'BusSRP'})
          },
           makePayment() {
             if(this.bankcode == ''){
                 this.snackbar = true
                 return false
             } else{
                this.paySwiftCall();
             }
           },
           closeWalletDialog () {
             this.$emit('closeWalletDialog', false)
           },
           paySwiftCall(){
                let self = this
                var localValues = JSON.parse(localStorage.getItem("userInfo"))
                let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
                let deDate = localStorage.getItem('departDate')
                this.showLoader = true
                Vue.http.headers.common['Content-Type'] = 'application/json';
                Vue.http.headers.common['YT-CHANNEL'] = 'PWA';
                Vue.http.headers.common['YT-TENANT-CODE'] = 'pwa_cab_outstation'
                Vue.http.options.emulateJSON = false;
                var payDetails={
                    'patternMatch': new RegExp('^[1-9][0-9]?$'),
                    'paymentModeType':'FULL',
                    'paymentAmount':this.totalPrice-this.redeemedamount,
                    'tdate':deDate,
                    'payOptionType':'mw',
                    'bankcode':this.bankcode,
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
                    paymentMode:payDetails.paymentModeType,
                    paymentOptionParameters:'tdate='+payDetails.tdate+'|merchant=yatra|product='+
                    payDetails.productCode+'|payop='+payDetails.payOptionType+'|bankCode='+
                    payDetails.bankcode
                    +'|prBank='+payDetails.bankcode+'|client=APP|uuid='+
                    localStorage.getItem('UUID'),
                    product:payDetails.productCode,
                    promoCode:JSON.parse(localStorage.getItem('promoCodePayment')).code,
                    promoType:JSON.parse(localStorage.getItem('promoCodePayment')).type,
                    superPnr:SPnr.superPNR,
                    ttid:parseInt('11'+SPnr.superPNR),
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
            }
        }
  }
</script>
<style scoped>
     .content{
      padding-top: 0px;
      color: rgb(117, 117, 117);
      font-size: 14px;
      margin-top:-70px
     }
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
    .wallet .tabs {
        width: 50%;
        float: left;
        border: 1px solid #ccc;
        padding: 0 8px;
        height:56px;
}
    .tab-bank {
    padding: 12px 0;
}
    .wallet .w100 {
        width: 100px;
        margin-top: 13px;
        position: relative;
        left: 10px;
    }
    .wallet .w100>img{
       width:inherit;
       height:auto;
    }
    .p10 {
        padding: 10px;
    }
    .p20 {
        padding: 20px;
    }
     .wallet .lastTab:last-child{
       width: 100%;
       border-bottom: 2px solid #ccc;
     }
    .tab-bank i {
        color: #000;
    }
    .wallet .input-group {
        padding-top: 13px;
    }
    .p-20{
      padding: 0 20px;
    }
</style>

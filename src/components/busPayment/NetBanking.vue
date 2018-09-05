<template>
     <v-dialog v-model="netDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-toolbar dark class="white cd_fixed_header">
            <v-btn icon @click.native="closeNetDialog" dark style="margin-left:0px;">
                    <v-icon class="cl_white_back payment_back">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="cd_header_white header_white">Net Banking</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="closeCreditDialog"></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <div class="white">
            <v-layout row wrap class="default-bank">
            <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            Please Select Your Bank
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-flex xs12 p010 fb>Select your Bank</v-flex>
            <v-flex xs12 p10>
                <div xs6 class="tabs" v-for="(item,index) in popularBank" @click="bankcode = item.name">
                    <span class="left prel radio-btn">
                      <v-radio-group v-model="bankcode" row>
                            <v-radio class="tab-bank" color="primary" :value="item.name" :id="item.code"></v-radio>
                      </v-radio-group>
                    </span>
                    <span class="left w100"><img :src="'/pwa/bus/static/img/icons/'+item.url+'.png'" class="img-resp"></span>
                </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="net-banking"> 
            <v-flex xs12 p010 fb>Or Choose Another Bank</v-flex>  
               <v-radio-group v-model="bankcode" row radio-btn>
                   <v-flex xs12>
                     <div class="tabs" v-for="(item,index) in netBankingOption.banks" @click="bankcode = item.code">
                       <v-radio class="tab-bank" :label="item.displayText" :value="item.code" color="primary" :id="item.code"></v-radio>
                    </div>
                </v-flex>
               </v-radio-group>
               
            </v-layout>
        </div>
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
        <div class="pricefixed"><button class="btn red" @click.stop="makePayment">PROCEED TO PAY  ₹ {{totalPrice-redeemedamount}} </button></div>
    </v-dialog>
</template>
<script>
  import { mapGetters,mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import {makePaymentCall} from '../../helpers/payment'
  import router from '../../router'
  import { adobeAnalyticsPageView } from '../../helpers/adobeAnalytics'
  
  export default {
      props:['openNetDialog','netBankingOption','totalAmountPayble','redeemedAmountPayble','superPNR'],
      components:{
        LoaderView: () => import("../common/loader"),
        paymentError: () => import("./paymentError")
      },
      computed:{
        ...mapGetters({
            getUserInfo:types.GET_USER_INFO
        }),
      },
      data(){
          return {
              popularBank:[
                  {'name':'162','url':'162','code':'162'},
                  {'name':'ALB','url':'ALB','code':'ALB'},
                  {'name':'UTI','url':'UTI','code':'UTI'},
                  {'name':'CIT','url':'CIT','code':'CIT'},
                  {'name':'HDF','url':'HDF','code':'HDF'},
                  {'name':'icicinet','url':'icicinet','code':'icicinet'},
                  {'name':'IDB','url':'IDB','code':'IDB'},
                  {'name':'PNB','url':'PNB','code':'PNB'}
              ],
              netDialog: false,
              createOrderResponse:{},
              bankcode: '',
              totalPrice:0,
              redeemedamount:0,
              ajaxLoadingDialog: false,
              showPaymentDialog:false,
              y: 'bottom',
              timeout: 1500,
              snackbarText:'',
              snackbar: false,
              showLoader: false,
              paymentErrorMessage:{},
              showPaymentDialog: false
            }
          },
       created(){
         this.createOrderResponse = this.superPNR
       },
       watch:{
		   openNetDialog(){
			   this.netDialog = this.openNetDialog;
			   this.createOrderResponse = this.superPNR
			   this.totalPrice = this.totalAmountPayble
			   this.redeemedamount = this.redeemedAmountPayble
			   adobeAnalyticsPageView("yt:bus:dom:checkout:payment:netbanking","bus","ios/pwa","business","bus checkout","domestic bus","payment","netbanking")
		   }
      },
      methods: {
	  	  navigateToSrp () {
              router.push({name:'BusSRP'})
          },
           makePayment () {
             if(this.bankcode == ''){
                 this.snackbar = true
                 return false
             } else{
                this.paySwiftCall();
             }
           },
           closeNetDialog () {
             this.$emit('closeNetDialog', false)  
          },
          paySwiftCall(){
              let self = this
              this.showLoader = true
              var localValues = JSON.parse(localStorage.getItem("userInfo"))
              let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
              let deDate = localStorage.getItem('departDate')        
            var payDetails={
                'patternMatch': new RegExp('^[1-9][0-9]?$'),
                'paymentModeType':'FULL',
                'paymentAmount':this.totalPrice-this.redeemedamount,
                'payOptionType':'nb',
                'bankcode':this.bankcode,
                'productCode': 'pwa_bus',
                'tdate':deDate
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
                        paymentOptionParameters:'tdate='+payDetails.tdate+'|merchant=yatra|product='+payDetails.productCode
                        +'|payop='+payDetails.payOptionType+'|bankCode='+payDetails.bankcode+'|prBank='+payDetails.bankcode
                        +'|client=APP|uuid='+localStorage.getItem('UUID'),
                        product:payDetails.productCode,
                        promoCode:JSON.parse(localStorage.getItem('promoCodePayment')).code,
                        promoType:JSON.parse(localStorage.getItem('promoCodePayment')).type,   
                        superPnr:SPnr.superPNR,
                        ttid:parseInt('11'+SPnr.superPNR),
                        uuid:localStorage.getItem('UUID'),
                        amountToRedeem:this.redeemedamount
                    }
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
    .radio-btn {
        top: 12px;
    }
    .p20 {
        padding: 20px;
    }
    .tabs {
        border-bottom: 1px solid #ccc;
        padding: 0px 20px;
    }
    .tab-bank label {
    font-size: 14px;
}
    .default-bank .w100 {
        width: 100px;
        margin-top: 17px;
        position: relative;
        left: 10px;
    }
    .default-bank .tabs {
      width: 50%;
      float: left;
      border: 1px solid #ccc;
      padding: 0 8px;
      height: 56px;
    }
    .default-bank .tabs .img-resp{
        width:100%;
    }
    
    .p10 {
        padding: 10px;
    }
    .p010 {
        padding: 10px 10px 0 10px;
    }
    .fb {
       color: rgb(0,0,0);
       font-size: 16px;
       text-transform: capitalize;
       font-weight: 500;
    }
    .white {
        background: #fff;
    }
    .net-banking .tabs {
        padding: 20px;
        padding-top:27px;
    }
    .tab-bank i {
        color: #000;
    }
    .net-banking .input-group {
        padding-top: 0;
    }
    
</style>

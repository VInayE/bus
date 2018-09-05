<template>
    <v-dialog v-model="selectPaypalDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
           <v-toolbar dark class="white cd_fixed_header">
            <v-btn icon @click.native="closePaypalDialog" dark style="margin-left:0px;">
                    <v-icon class="cl_white_back payment_back">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="cd_header_white header_white">PayPal</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="closePaypalDialog"></v-btn>
            </v-toolbar-items>
        </v-toolbar>
           <v-layout class="paypal">
            <v-flex xs12>
                <div class="tabs">
                    <div class="paypal-logo-img"><img src="https://www.yatra.com/pwa/images/payments-svg/PayPal.svg" /> 
                        <span>Select your currency for payment</span></div>
            </div>
                <v-radio-group v-model="paypalcode">
                    <div class="block clearfix" v-for="(item,index) in paypalOption" @click="bankcode = item.code">
                       <v-flex xs12 row layout>
                           <v-flex xs1><v-radio class="tab-bank" :value="item.code" color="primary" :id="item.code"></v-radio></v-flex>
                            <v-flex xs7><span class="text-dark">{{item.code}}</span><span class="text-light ml5">{{item.name}}</span></v-flex>
                           <v-flex xs4 text-right text-dark><span v-html="convertIntoHTML(item.unicode,item.rate)"></span></v-flex>

                        </v-flex>
                    </div>
                
               </v-radio-group>
            </v-flex>
               <div v-if="currencycodeVal!=''">
                   <p class="text-center text-dark m0">INR ₹ {{totalPrice - redeemedamount}}</p>
                   <p class="text-center text-light">{{symbol}}1{{currencycodeVal}}=₹{{currencyValue}}INR</p>
        </div>
        </v-layout>
        
        <div class="pricefixed"><button class="btn red" @click.stop="makePayment">PROCEED TO PAY {{symbol}}{{finalAmount}} </button></div>
    </v-dialog>
</template>

<script>
 import { mapGetters,mapMutations } from 'vuex'
 import * as types from '../../store/types'    
 export default{ 
    props:['paypalOption','openPaypalDialog','totalAmountPayble','redeemedAmountPayble','superPNR'],
    data() {
        return{
            bankcode: '',
            selectPaypalDialog: false,
            paypalcode:'',
            totalPrice:0,
            redeemedamount:0,
            finalAmount:0,
            amountRadioDisplay:0,
            symbol:'₹',
            currencyValue:'',
            currencycodeVal:''
        }
    },computed:{
        ...mapGetters({
            getUserInfo:types.GET_USER_INFO
        }),
      },
       watch:{
       openPaypalDialog(){
           this.selectPaypalDialog = this.openPaypalDialog
           this.totalPrice = this.totalAmountPayble
           this.redeemedamount = this.redeemedAmountPayble
           this.finalAmount = this.totalPrice - this.redeemedamount
       },
        paypalcode(event){
            for(let i=0;i<this.paypalOption.length;i++){
                if(this.paypalOption[i].code==event){
                    this.calculatePrice(this.paypalOption[i].unicode,this.paypalOption[i].rate,this.paypalOption[i].code)
                }
            }
        }   
     },
    methods: {
        
         makePayment () {
                this.paySwiftCall()
           },
           
           paySwiftCall(){
              let self = this
              this.ajaxLoadingDialog = true
              let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
              let deDate = localStorage.getItem('departDate')        
            var payDetails={
                'patternMatch': new RegExp('^[1-9][0-9]?$'),
                'paymentModeType':'FULL',
                'paymentAmount':this.finalAmount,
                'payOptionType':'paypal',
                'bankcode':this.paypalcode,
                'productCode': 'pwamonumnets',
                'tdate':deDate
            }
             let payswiftCardParams ={
                        amountDisplayed:payDetails.paymentAmount,
                        eCashRedemed:this.redeemedamount,
                        appVersion:'1.0',
                        client:'APP',
                        discount:0,
                        discountingStatus:false,
                        email:this.getUserInfo.email,
                        merchant:'yatra',
                        mob:this.getUserInfo.mob,
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
                        makePaymentCall(response.body)
                         self.ajaxLoadingDialog = false
                    })  
          },
     calculatePrice (unicode,rateConversionValue,code){
         let amountRadioDisplay = 0
         amountRadioDisplay = (this.totalPrice - this.redeemedamount)/parseInt(rateConversionValue)
         let sbstring = unicode.split('+')[1]
         let currencySymbol = '&#x'+sbstring.toLowerCase()
         var t =  new DOMParser().parseFromString(currencySymbol,'text/html').body
         this.symbol = t.innerText
         this.currencyValue = rateConversionValue
         this.currencycodeVal = code
         this.finalAmount = Math.round(amountRadioDisplay * 100) / 100
     },
     closePaypalDialog () {
             this.$emit('closePaypalDialog', false)  
     },
     convertIntoHTML(unicode,rateConversion){
                let amountRadioDisplay = 0
                amountRadioDisplay = (this.totalPrice - this.redeemedamount)/parseInt(rateConversion) 
                let sbstring = unicode.split('+')[1]
                let currencySymbol = '&#x'+sbstring.toLowerCase()
                var t =  new DOMParser().parseFromString(currencySymbol,'text/html').body
                return t.innerText+Math.round(amountRadioDisplay * 100) / 100 
            }    
   }  
 } 
</script>


<style>
    .paypal{
    display: inline-block;
    background: #fff;
    height: 100vh;
        width: 100%;
    }
    .radio-btn {
        top: 12px;
    }
    
     .paypal .tabs {
        padding: 10px;
        padding-top:27px;
    }
    .tab-bank i {
        color: #000;
    }
    .paypal .input-group {
        padding-top: 0;
    }
    
    .block{
        border-bottom: 1px solid #ccc;
        padding:15px 10px;
    }
    .text-light{
        color: #999;
    } 
    .ml5{
        margin-left: 5px
    }
    .text-dark{
        color: #333;
    }
    .text-center{
        text-align: center;
    }
    .m0{
        margin: 0;
    }
    .paypal-logo-img{
        font-size: 12px; 
        display: flex; align-content: center;
    }
    .paypal-logo-img img {
        width: 70px;
    }
    .paypal-logo-img span{
        margin: 0 0 0 5px;
        display: flex;
        align-items: center;
        color: #666;
    }
</style>
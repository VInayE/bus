<template>
   <v-layout row wrap class="cd_search_dtls cd_vendor_details">
   <p class="f500">Promo Code </p>
       <v-layout row wrap>
        <v-flex xs10 class="inputHeight uppercase">
             <v-text-field
              label="ENTER CODE"
              v-model = "promoCode"
              class="promo-input"
              :disabled= "ApplyText == 'REMOVE'"
            ></v-text-field>
         </v-flex>
         <v-flex xs2 class="btn_apply" @click="validatePromoCode" v-bind:class="{ remove_btn: isApply }">{{ApplyText}}</v-flex>
       </v-layout>
         
         <v-flex xs12 v-if="errorCondition" class="txt_promoCode">Invalid Promo Code</v-flex>
         <v-flex xs12 v-if="successMessage.length>0" class="txt_promoCode" style="color:rgba(0, 150, 136, 0.99)">{{successMessage}}</v-flex>
   </v-layout>
</template>
<script>
  import { mapGetters,mapMutations} from 'vuex'
  import * as types from '../../store/types'
  import {getPromoCode} from '../../api/api'
  export default {
    components: {
    },
    data () {
      return {
        promoCode: '',
        successMessage: '',
        errorCondition: false,
        showLoader: false,
        showBothPromoDialog: false,
        bothPromoBody: {},
        ApplyText: 'APPLY',
        isApply:false,
        promocodeObject:{},
        prmTypeVal:'',
        prmAmount:0  
      }  
    },
    methods: {
      validatePromoCode () {
        if(this.ApplyText === 'APPLY') {
            if(this.promoCode.length == 0)
                return false
            let self = this
            let SPnr = JSON.parse(localStorage.getItem('busReviewRequest'))
            let promoCodeBody= {
           'superPNR': SPnr.superPNR,
           'promoCode': this.promoCode 
            }
            this.showLoader = true
            getPromoCode(promoCodeBody).then(function (response) {
                self.showLoader = false
                if (response.body.success === "true") {
                    self.ApplyText = 'REMOVE'
                    self.isApply = true
                    self.errorCondition = false
                    if(response.body.cashDiscount=='Y'){
                        self.prmTypeVal = 'cash'
                        self.prmAmount = response.body.cashValue
                        self.successMessage = response.body.promoMsg
                    
                            let tempPromoBody = {
                        'cash':self.prmAmount,
                        'promoCode':self.promoCode,
                        'promoId':response.body.promoId,
                        'promoType':self.prmTypeVal
                    }
                         self.$emit('promoCodeApplySuccess',tempPromoBody)
                    }
                    else if(response.body.ecashDiscount=='Y'){
                             self.prmTypeVal = 'Ecash'
                             self.prmAmount = response.body.ecashValue
                             self.successMessage = response.body.promoMsg
                            }
                      
              } else {
                 self.errorCondition = true
                 self.successMessage = ''
              }
            },function (response) {
                self.showLoader = false
                self.successMessage = ''
                self.errorCondition = true
            });
        }else{            
            this.promoCode= ''
            this.ApplyText = 'APPLY'
            this.isApply = false
            this.successMessage = ''
            let tempPromoBody = {
                'cash':0,
                'promoCode':this.promoCode,
                'promoId':'',
                'promoType':''
            }
            this.$emit('promoCodeApplySuccess',tempPromoBody)
        }
      }  
    }
  }
</script>
<style scoped>
   .txt_promoCode {
     margin-top:-11px;
     color:#F34747;
     font-size: 12px;
   }
   .btn_apply {
      line-height: 5;
      color: rgb(30, 136, 229);
   }
   .cd_search_dtls{
      background-color:white;
   }
   .cd_vendor_details{
     margin-top:10px;
   }
   .cl_black{
     color:black;
     font-size:16px;
     white-space: inherit;
       margin-bottom: 0;
   }
    .promo-input {
    padding-bottom: 0;
    }
    .uppercase{
      text-transform: uppercase;
    }
    .uppercase .application--light .input-group input{
          text-transform: uppercase;
    }
    .remove_btn{
        color: #f34f4f!important
    }
    p{
    margin-bottom: 0 !important;
    }
    .f500 {
    font-weight:500;
    }
</style>

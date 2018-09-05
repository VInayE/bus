<template>
  <v-app class="cd_bg">
      <div v-if="Object.keys(bookingsData).length>0">
          <v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateToDetails"><v-icon>arrow_back</v-icon></v-flex>
				<v-flex xs8>Make Payment</v-flex>
			</v-layout>
		</v-toolbar>

    <!-- <v-alert type="success" :value="true">
      This is a success alert.
    </v-alert> -->

      <v-layout row wrap tprice class="payment_view pt20">
          <v-flex xs12 class="txt-total_price">
              <v-flex xs6 left class="fs-md">Total Price</v-flex>
              <v-flex xs6 right class="fs-md">₹ {{bookingsData.totalAmount}}
              </v-flex>
          </v-flex>
      </v-layout>

      <!-- eCash section start  --> 

      <div class="ecash-section" v-if="eCashObjectLength && totalEcashAvailable>=1">
        <v-layout row wrap class="">
        <v-flex xs1>
          <div role="checkbox" aria-checked="true" class="input-group input-group--dirty input-group--hide-details checkbox input-group--selection-controls input-group--active primary--text" style="padding:10px 0 0;">
          <div class="input-group__input">
              <v-checkbox v-model="eCashCheckBox" light></v-checkbox>
              </div>
          </div>
        </v-flex>
        <v-flex xs7 v-if="totalEcashAvailable>=1">
          <div> <img class="img_ecash" src="/pwa/bus/static/img/icons/ecash.svg" /></div>
          <div class="lght-sm commasign">(Available eCash is ₹ {{totalEcashAvailable}})</div>
        </v-flex>

        <v-flex xs4 class="text-right pt10" v-if="eCashCheckBox && availCash>=1" style="padding-right:5px;">- ₹ {{availCash}} 
              <!--<v-icon class="hover" @click.stop="openEcashDialog = true">mode_edit</v-icon>-->
        </v-flex>
        </v-layout>
      </div>
      <ecash-dialog :openEcashDialog="openEcashDialog" :totalecashavailable="totalEcashAvailable" @updateRedeemedValue="updateRedeemValue"  @closeEcashDialog="openEcashDialog = false" @ecashDetails="creditCard($event)" :maxRedemeed="maxRedemeed" :totalAmnt="totalAmount">
      </ecash-dialog>

      <!-- eCash section end  -->

      <v-layout row wrap tprice class="payment_view">
          <v-flex xs12 class="balance-text">
              <v-flex xs6 left class="fs-md">Balance Payable</v-flex>
              <v-flex xs6 right class="fs-md">₹ {{bookingsData.totalAmount - availCash}}
              </v-flex>
          </v-flex>
      </v-layout>

      <div v-if="totalPrice - availCash">
          <bus-fare-breakup class="payment_view" :fareInfoDialog="fareInfoDialog" @fareInfoDialogClose="fareInfoDialog=false" :ttlAmnt="bookingsData.totalAmount"></bus-fare-breakup>
        <v-layout row wrap sltpay>
            <v-flex xs12>Select Payment Option</v-flex>
        </v-layout>
      </div>

      <div class="payment-option payment_view">
          <div @click.stop="openCreditDialog = true" class="tabs">Credit Card <v-icon class="right">keyboard_arrow_right</v-icon></div>
          <credit-card v-if="CreditCardData!={}" :creditCardOption="CreditCardData" :totalAmountPayble="bookingsData.totalAmount" :redeemedAmountPayble="availCash" 
                       :superPNR="createOrderSuperPnr" 
                       :productID="productID"
                       :openCreditDialog="openCreditDialog" 
                       @closeCreditDialog="openCreditDialog = false"
                       @creditCardDetails="creditCard($event)">
           </credit-card>
          <div @click.stop="openDebitDialog = true" class="tabs">Debit Card <v-icon class="right">keyboard_arrow_right</v-icon></div>
          <debit-card v-if="DebitCardOption!={}" :debitCardOption="DebitCardOption" :totalAmountPayble="bookingsData.totalAmount" :redeemedAmountPayble="availCash"
                      :superPNR="createOrderSuperPnr"
                      :productID="productID"
                      :openDebitDialog="openDebitDialog"                      
                      @closeDebitDialog="openDebitDialog = false"
                      @debitCardDetails="creditCard($event)">
          </debit-card>
          <div @click.stop="openNetDialog = true" class="tabs">Net Banking <v-icon class="right">keyboard_arrow_right</v-icon></div>
          <net-banking v-if="netBankingData!={}" :netBankingOption="netBankingData" :totalAmountPayble="bookingsData.totalAmount" :redeemedAmountPayble="availCash"
                       :superPNR="createOrderSuperPnr"
                       :openNetDialog="openNetDialog" 
                       @closeNetDialog="openNetDialog = false"
                       @selectedNetBanking="selectedNetBanking($event)">
          </net-banking>
          <div @click.stop="openWalletDialog = true" class="tabs">Wallet <v-icon class="right">keyboard_arrow_right</v-icon></div>
          <wallet v-if="walletData!={}" :walletOption="walletData" :totalAmountPayble="bookingsData.totalAmount" :redeemedAmountPayble="availCash"
                  :superPNR="createOrderSuperPnr"
                  :openWalletDialog="openWalletDialog" 
                  @closeWalletDialog="openWalletDialog = false"
                  @selectedWalletCode="selectedWallet($event)"
          ></wallet>
         <!-- div @click.stop="openPaypalDialog = true" class="tabs">Paypal <v-icon class="right">keyboard_arrow_right</v-icon></div>
          <paypal v-if="paypalData!=null" :paypalOption="paypalData" :totalAmountPayble="bookingsData.totalAmount" :redeemedAmountPayble="availCash"
                  :superPNR="createOrderSuperPnr"
                  :openPaypalDialog="openPaypalDialog" 
                  @closePaypalDialog="openPaypalDialog = false"
                  @selectedPaypalCode="selectedPaypal($event)"
          ></paypal> -->
      </div>
      
      <payment-error  
      :showPaymentDialog="showPaymentDialog" 
      :paymentErrorMessage="paymentErrorMessage" @closePaymentError="showPaymentDialog=false"></payment-error>  
<!--      <loader-view v-if="ajaxLoading"></loader-view>  -->
          <session-expire-message :showSessionErrorDialog="showSessionErrorDialog"></session-expire-message>
          <div class="timerCls">Your Session will expire in <span>{{timer}}</span></div>
      <div class="footerfixed">
          <img src="/pwa/bus/static/img/icons/img_secure_footer.png" class="footer-img">
      </div>
      <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
         </v-snackbar>
      </div>
  </v-app>
</template>
<script>
import { makePaymentCall } from "../helpers/payment";
import { calculateRedemmedAmount } from "../helpers/paymentHelper";
import { getbookingDetails } from "../api/api";
//import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'

export default {
  components: {
    CreditCard: () => import("../components/busPayment/CreditCard"),
    DebitCard: () => import("../components/busPayment/DebitCard"),
    NetBanking: () => import("../components/busPayment/NetBanking"),
    EcashDialog: () => import("../components/busPayment/ECashPopup"),
    Wallet: () => import("../components/busPayment/Wallet"),
    //Paypal : () => import('../components/busPayment/Paypal'),
    BusFareBreakup: () => import("../components/busPayment/BusFareBreakup"),
    LoaderView: () => import("../components/common/loader"),
    SessionExpireMessage: () => import("../components/common/sessionExpireMessage"),
    paymentError: () => import("../components/busPayment/paymentError")
  },
  data() {
    return {
      monumentReviewData: {},
      totalPrice: "",
      eCashCheckBox: true,
      availCash: 0,
      snackbarText:'',
      timeout: 3000,
      snackbar:false,
      showSessionErrorDialog: false,
      timer: 0,
      CreditCardData: {},
      DebitCardOption: {},
      openCreditDialog: false,
      openEcashDialog: false,
      openDebitDialog: false,
      fareInfoDialog: false,
      openPaypalDialog: false,
      createOrderSuperPnr: "",
      createOrderResponse: {},
      netBankingData: {},
      openNetDialog: false,
      openWalletDialog: false,
      walletData: {},
      paypalData: null,
      ajaxLoading: false,
      paymentErrorMessage:{},
      showPaymentDialog: false,
      totalEcashAvailable: 0,
      maxRedemeed: 0,
      eCashObjectLength: 0,
      bookingsData: {},
      productCode: "pwa_bus",
      response: {}
    };
  },
  watch: {
    eCashCheckBox() {
      this.createOrderResponse = this.superPNR;
      var self = this;
      if (!this.eCashCheckBox) {
        this.availCash = 0;
      } else {
        var storeRedemAmnt = calculateRedemmedAmount(
          self.totalAmount,
          this.eCashJSON
        );
        this.eCashObjectLength = Object.keys(this.eCashJSON).length;
        this.availCash = Math.ceil(storeRedemAmnt);
      }
    }
  },
  methods: {
    getPaymentJSON(superPNR) {
      var paymentJsonUrl = "";
      if (
        process.env.NODE_ENV &&
        process.env.NODE_ENV.toString() === "production"
      ) {
        paymentJsonUrl = "https://www.yatra.com/";
      } else {
        paymentJsonUrl = "/";
      }
      //Why we are not using it in this way ?
      Vue.http.headers.common["Content-Type"] = "application/json";
      Vue.http.headers.common["YT-CHANNEL"] = "PWA";
      Vue.http.headers.common["YT-TENANT-CODE"] = this.productCode;
      Vue.http.options.emulateJSON = true;
      var self = this;
      var product = this.productCode;

      if (
        process.env.NODE_ENV &&
        process.env.NODE_ENV.toString() === "production"
      ) {
        var superPnrId = superPNR.superPNR;
      } else {
        var superPnrId = superPNR.superPNR;
      }
      var payInfoParams = {
        merchantCode: "yatra",
        productCode: this.productCode,
        client: "APP",
        version: 10,
        superPnr: superPnrId
      };
      this.$http
        .post(`${paymentJsonUrl}PaySwift/getPaymentInfo`, payInfoParams)
        .then(function(response) {
          var len = response.body.paymentOptionJSON.paymentOptions.length;
          var jList = response.body.paymentOptionJSON.paymentOptions;

          for (var i = 0; i < len; i++) {
            if (jList[i].code == "cc") {
              self.CreditCardData =
                response.body.paymentOptionJSON.paymentOptions[i];
            } else if (jList[i].code == "dc") {
              self.DebitCardOption =
                response.body.paymentOptionJSON.paymentOptions[i];
            } else if (jList[i].code == "nb") {
              self.netBankingData =
                response.body.paymentOptionJSON.paymentOptions[i];
            } else if (jList[i].code == "mw") {
              self.walletData =
                response.body.paymentOptionJSON.paymentOptions[i];
            } else if (jList[i].code == "paypal") {
              self.paypalData = response.body.currencyConversionJSON.currencies;
            }
          }
          self.eCashJSON = response.body.eCashJSON;
          if (Object.keys(this.eCashJSON).length > 0) {
            var storeRedemAmnt = calculateRedemmedAmount(
              self.totalAmount,
              this.eCashJSON
            );
            self.eCashObjectLength = Object.keys(self.eCashJSON).length;
            self.availCash = Math.ceil(storeRedemAmnt);
            // if(self.availCash && self.availCash > 0) {
            //     self.openEcashDialog = true
            // }
            this.storeAvailcash = Math.ceil(storeRedemAmnt);
            if (this.eCashJSON.ECashList.length == 1) {
              self.totalEcashAvailable =
                parseInt(this.eCashJSON.ECashList[0].redeemableECashInPaisa) /
                100;
              if (this.eCashJSON.ECashList[0].eCashType == "EXPIRABLE") {
                this.maxRedemeed = Math.ceil(
                  this.eCashJSON.ECashList[0].redeemableECashInPaisa *
                    0.05 *
                    0.01
                );
              } else {
                this.maxRedemeed = Math.ceil(
                  this.eCashJSON.ECashList[0].redeemableECashInPaisa * 0.01
                );
              }
            } else {
              for (let k = 0; k < this.eCashJSON.ECashList.length; k++) {
                self.totalEcashAvailable = Math.ceil(
                  self.totalEcashAvailable +
                    parseInt(
                      this.eCashJSON.ECashList[k].redeemableECashInPaisa
                    ) /
                      100
                );
              }

              var expirableNodeIndex = this.eCashJSON.ECashList.findIndex(
                x => x.eCashType === "EXPIRABLE"
              );
              var non_expirableNodeIndex = this.eCashJSON.ECashList.findIndex(
                x => x.eCashType === "NON_EXPIRABLE"
              );
              if (
                this.eCashJSON.ECashList[non_expirableNodeIndex]
                  .redeemableECashInPaisa *
                  0.01 >
                1
              ) {
                this.maxRedemeed = Math.ceil(
                  parseInt(
                    this.eCashJSON.ECashList[expirableNodeIndex]
                      .redeemableECashInPaisa
                  ) *
                    0.05 *
                    0.01 +
                    parseInt(
                      this.eCashJSON.ECashList[non_expirableNodeIndex]
                        .redeemableECashInPaisa
                    ) *
                      0.01
                );
              } else {
                this.maxRedemeed = Math.ceil(
                  parseInt(
                    this.eCashJSON.ECashList[expirableNodeIndex]
                      .redeemableECashInPaisa
                  ) *
                    0.05 *
                    0.01
                );
              }
            }
          }
        })
        .catch(function(e) {
          //console.log('some error occured : ' +e.message)
        });
    },
    navigateToDetails() {
      this.$router.push({ name: "BusReview" });
    },
    openfareInfoDialog() {
      this.fareInfoDialog = true;
    },
    updateRedeemValue(val) {
      this.availCash = val;
    },
    dateConversion(date, time) {
      date = date.replace(/-/g, "/");
      let convertedTime = moment(time, ["h:mm A"]).format("HH:mm");
      let dateTime = new Date(date + " " + convertedTime);
      return Date.parse(dateTime);
    },
    submitPay() {
      let self = this;
      this.ajaxLoadingDialog = true;
      Vue.http.headers.common["Content-Type"] = "application/json";
      Vue.http.headers.common["YT-CHANNEL"] = "PWA";
      Vue.http.headers.common["YT-TENANT-CODE"] = this.productID;
      Vue.http.options.emulateJSON = false;
      var payDetails = {
        patternMatch: new RegExp("^[1-9][0-9]?$"),
        paymentModeType: "ew",
        paymentAmount: 0,
        tdate: this.getSearchParams.completeDropDate,
        productCode: this.productID
      };
      let payswiftCardParams = {
        amountDisplayed: 0,
        eCashRedemed: this.availCash,
        appVersion: "1.0",
        client: "APP",
        discount: 0,
        discountingStatus: false,
        email: self.getUserInfo.email,
        merchant: "yatra",
        mob: self.getUserInfo.mob,
        otherDiscountingStatus: false,
        paymentMode: payDetails.paymentModeType,
        paymentOptionParameters:
          "tdate=" +
          payDetails.tdate +
          "|merchant=yatra|product=" +
          payDetails.productCode +
          "|payop=ew|previousPayOp=cc|client=APP|uuid=" +
          self.createOrderSuperPnr.order.external_id,
        product: payDetails.productCode,
        promoCode:
          self.getPromoCode.code != undefined ? self.getPromoCode.code : "",
        promoType:
          self.getPromoCode.discount_type != undefined
            ? self.getPromoCode.discount_type
            : "",
        superPnr: self.createOrderSuperPnr.order.id,
        ttid: parseInt("11" + self.createOrderSuperPnr.order.id),
        uuid: self.createOrderSuperPnr.order.external_id,
        amountToRedeem: this.availCash
      };
      Vue.http.options.emulateJSON = true;
      this.$http
        .post("https://www.yatra.com/PaySwift/payNow", payswiftCardParams)
        .then(function(response) {
          makePaymentCall(response.body);
          self.ajaxLoadingDialog = false;
        });
    },
    startTimer() {
      var presentTime = this.timer;
      var timeArray = presentTime.split(/[:]+/);
      var m = parseInt(timeArray[0]);
      var s = this.checkSecond(parseInt(timeArray[1]) - 1);
      if (s == 59) {
        m = m - 1;
      }
      if (m == "0" && s == "00") {
        this.showSessionErrorDialog = true;
        return false;
      }

      this.timer = m + ":" + s;
      setTimeout(this.startTimer, 1000);
    },
    checkSecond(sec) {
      if (sec < 10 && sec >= 0) {
        sec = "0" + sec;
      } // add zero in front of numbers < 10
      if (sec < 0) {
        sec = "59";
      }
      return sec;
    }
  },
  mounted() {
    let self = this;
    this.timer = "19" + ":" + "00";
    this.startTimer();
     if(localStorage.getItem('failedPayment') || localStorage.getItem('failedPayment') == 'true'){
        self.snackbar = true
        self.snackbarText = "Please Try Payment Again"
        setTimeout(() => {
          localStorage.removeItem('failedPayment')
        }, 5000);
//       setTimeout(() => {
//         localStorage.removeItem('failedPayment')
//       }, 5000);
//      self.showPaymentDialog = true
//      self.paymentErrorMessage = 'Please Try Payment Again !'     
    }
    let reviewParams = JSON.parse(localStorage.getItem("busReviewRequest"));
    let UUIDs = localStorage.getItem("UUID");
    let bookingsParams = { spnr: reviewParams.superPNR, uuid: UUIDs };
   
    getbookingDetails(bookingsParams)
      .then(response => {
        self.bookingsData = response.body;
        self.productID = response.body.product;
        self.totalAmount = self.bookingsData.totalAmount;
        self.getPaymentJSON(reviewParams);
      })
      .catch(error => {});
    //adobeAnalyticsPageView("yt:bus:dom:checkout:payment","bus","ios/pwa","business","bus checkout","domestic bus","payment","")
  }
};
</script>
<style>
.tab-bank > label {
  color: rgb(0, 0, 0) !important;
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 500;
}
.payment-option {
  padding-top: 15px;
  font-weight: normal;
}
.payment-option > .tabs > i {
  color: rgb(224, 224, 224) !important;
}
.txt-total_price {
  font-size: 16px;
}
.payment_view {
  background-color: white;
}
.payment_back {
  font-size: 24px;
}
.cl_white_back {
  margin-left: 5px !important;
  font-size: 25px;
  color: #616161 !important;
}
.cd_header_white {
  font-weight: 500;
  font-size: 20px;
  color: #212121 !important;
  margin-left: 0px;
}
.header_white {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87) !important;
}
.footerfixed {
  position: fixed;
  bottom: 0;
  left: 12px;
}
.footer-img {
  width: calc(100vw - 30px);
  height: auto;
}
.tabs {
  border-bottom: 1px solid #ccc;
  padding: 12px 20px;
  text-transform: capitalize;
  font-weight: 500;
}
.paycard .flex-3 {
  float: left;
  width: 33.3%;
  text-align: center;
}
.paycard input {
  border: 1px solid #e0e0e0;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  outline: none;
  border-radius: 4px;
}
#expirationYear {
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
}
#expirationMonth {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
.p20 {
  padding: 20px;
}
.slash {
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.paycard .br-0 {
  border-right: none;
}
.paycard .bl-0 {
  border-left: none;
}
.tabs:last-child {
  border-bottom: 1px solid #ccc;
}
.tab-bank div:last-child {
  height: 0;
  min-height: 0;
}
.tprice {
  padding: 10px 16px;
}
.sltpay {
  background: white;
  padding: 12px 20px 8px 20px;
  margin-top: 10px;
  font-size: 13px;
  color: rgb(158, 158, 158);
}
.hv_info_icon {
  margin-left: 2px;
  color: rgb(30, 136, 229) !important;
  font-size: 20px;
  margin-top: -4px;
}
.input-ecash {
  padding: 5px 0 0;
}
.input-ecash input {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 98%;
  height: 38px;
  padding: 10px;
}
.lght-sm {
  color: rgb(158, 158, 158);
  font-size: 11px;
}
.hover:hover {
  cursor: pointer;
}
.footer-btn {
  text-align: center;
  padding: 10px 0;
}
.ecash-section {
  padding: 0 15px 0px;
  background: #fff;
}
.ecash-section > .input-group__details {
  display: none;
}
.input-group.input-group--selection-controls {
  padding: 0px 0 0;
}
.application .theme--light.input-group--selection-controls {
  color: rgb(30, 136, 299);
  padding: 0 !important;
}
.img_ecash {
  width: 40px;
  height: 12px;
}
.pt10 {
  padding: 10px 0 0;
}
.fs-md {
  font-size: 16px;
}
.pt20 {
  padding: 25px 15px 10px !important;
}
.nvDetails {
  margin-left: 0px;
  width: 15px;
  margin-right: 15px;
}
.pricefixed {
  z-index: 99;
  position: static;
}
.bg-white {
  background: #fff;
  height: 100%;
}

.timerCls {
  background-color: #444;
  color: white;
  font-size: 11px;
  text-align: center;
  padding: 8px;
  position: absolute;
  z-index: 20;
  width: 100%;
  bottom: 40px;
}
</style>

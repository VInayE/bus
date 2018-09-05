<template>
        <div class="login-view" v-model="loginDialog">
            <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
                {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
           </v-snackbar>
           <v-toolbar>
                <v-layout row wrap class="nav-bar side-padding">
                    <v-flex xs2 @click="navigateToBoarding"><i class="ico-sprite ico-back"></i></v-flex>
                    <v-flex xs8>Login to Yatra</v-flex>
                </v-layout>
            </v-toolbar>
            <div class="p20">
                <v-radio-group v-model="ex8" :mandatory="false" class="input-guest">
                    <v-layout wrap row>
                        <v-flex xs6>
                            <v-radio color="primary" label="Continue As Guest" value="guest" class="dib" small></v-radio>
                        </v-flex>
                        <v-flex xs6>
                            <v-radio  color="primary" label="I Have a Yatra Account" value="user" class="dib"></v-radio>
                        </v-flex>
                    </v-layout>
                </v-radio-group>
                <v-form v-model="valid" ref="form">
                    <v-text-field label="Email ID"
                                  v-model="emailId"
                                  class="pb0"
                                  ref="loginEmail"
                                  @keyup="toLowerCase"
                                  required
                                  :rules="submitted ? Email_rules:[]">
                   </v-text-field>
                    <v-layout row wrap>
                    <v-flex xs3 class="" v-if="ex8=='guest'">
                            <v-text-field label="ISD Code" v-model="selectedTelephoneCode" class="pb0" @click="telephoneDialog" v-on:keypress="telephoneDialog"></v-text-field>
                        </v-flex>
                        <v-flex xs8 offset-xs1 class="" v-if="ex8=='guest'">
                            <v-text-field label="Mobile Number"
                                          required
                                          v-model="phoneNumber"
                                          maxlength="10"
                                          class="pb0"
                                          v-on:keypress="isNumber($event)"
                                          :rules="submitted ? Phone_rules:[]"
                                          ref= "registerPhone">
                           </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-text-field v-if="ex8=='user'" name="input-10-2"
                                  label="Enter your password"
                                  hint=""
                                  min="8"
                                  ref="loginPassword"
                                  :rules="submitted ? password_rules:[]"
                                  :append-icon="e3 ? 'visibility_off' : 'visibility'"
                                  :append-icon-cb="() => (e3 = !e3)" :type="e3 ? 'text' : 'password'" v-model="password" required>
                   </v-text-field>
                    <div class="loginBtn redBtn" v-if="ex8=='guest'" @click.stop="submitGuest">CONTINUE AS GUEST</div>
                    <div class="loginBtn redBtn" v-if="ex8=='user'" @click.stop="submitLogin">LOGIN</div>
                </v-form>
            </div>
             <div class="registerTab">
                 <v-layout row wrap>
                     <v-flex xs5 class="txt_blue" @click="navigateToRegister()">Register</v-flex>
                     <v-flex xs7  class="txt_blue txt-r" @click="navigateToForgotPass()">Forgot Password</v-flex>
                 </v-layout>
            </div>
            <face-book-block @openLinkedAccount="openlinkedDialog = true"  @paymentRedirect="redirectToPayment"></face-book-block>
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
    </template>
    
    <script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "../store/types";
import { adobeAnalyticsPageView } from "../helpers/adobeAnalytics";
export default {
  components: {
    FaceBookBlock: () => import("../components/common/facebook.vue")
  },
  data() {
    return {
      emailId: "",
      valid: false,
      password: "",
      ex8: "guest",
      channel: "b2c",
      selectedTelephoneCode: "+91",
      phoneNumber: "",
      busProductId: "pwa_bus",
      password_rules: [v => !!v || "Password is required"],
      Email_rules: [
        v => !!v || "Email addresss is required",
        v =>
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            v
          ) ||
          v.length == 0 ||
          "Enter correct Email Address"
      ],
      Phone_rules: [
        v => !!v || "Phone Number is required",
        v =>
          /^\d{10}$/.test(v) || v.length == 0 || "Please enter valid phone no"
      ],
      submitted: false,
      e3: false,
      snackbar: false,
      snackbarText: "",
      timeout: 3000,
      y: "bottom",
      showLoader: false,
      showRegisterMessage: false,
      loginDialog: false  
    };
  },
  created() {
    localStorage.setItem("loginBackClickStatus", "false");
  },
  mounted() {
    adobeAnalyticsPageView(
      "yt:bus:dom:checkout:login",
      "bus",
      "ios/pwa",
      "business",
      "bus checkout",
      "domestic bus",
      "login",
      ""
    );
    localStorage.removeItem('retainTravellerDetails')
  },
  methods: {
    toLowerCase() {
      this.emailId = this.emailId.toLowerCase();
    },
    submitLogin() {
      this.submitted = true;
      if (this.$refs.form.validate() && this.$refs.form.value) {
        let postData = {
          emailId: this.emailId,
          password: this.password,
          includeOptionalParams: "true",
          productId: this.busProductId,
          channel: this.channel
        };
        Vue.http.headers.common["Content-Type"] =
          "application/x-www-form-urlencoded;charset=utf-8";
        Vue.http.options.emulateJSON = true;
        this.showLoader = true;
        let self = this;
        this.$http.post("/social/user/login.htm", postData).then(
          function(response) {
            if (response.body.authMode == "FACEBOOK") {
              if (response.body.responseCode == "104") {
                let userInfo = {
                  email: response.body.email,
                  mobile: response.body.responseData.mobileNum,
                  mobileISD: response.body.responseData.mobileISDCode,
                  loginAs: "registered"
                };
                //                                   self.setUserInfo(userInfo)
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                self.redirectToPayment(response.body.ssoToken);
              } else {
                self.snackbar = true;
                self.snackbarText = response.body.responseMessage;
                self.showLoader = false;
              }
            } else {
              if (response.body.status == "SUCCESS") {
                var userInfo = {
                  email: response.body.responseData.userInfo.email,
                  mobile: response.body.responseData.userInfo.mobile,
                  mobileISD: response.body.responseData.userInfo.mobileISD,
                  loginAs: "registered"
                };
                //                                   self.setUserInfo(userInfo)
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                self.showLoader = false;
                self.$router.push({ name: "BusReview" });
              } else {
                self.snackbar = true;
                self.snackbarText = response.body.responseMessage;
                self.showLoader = false;
              }
            }
          },
          function(response) {
            self.snackbar = true;
            self.snackbarText = response.body.responseMessage
              ? response.body.responseMessage
              : "Some Error occured . Try after sometimes";
            self.showLoader = false;
          }
        );
      }
    },

    formIsValid() {
      var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return (
        this.emailId !== "" &&
        this.phoneNumber !== "" &&
        emailPattern.test(this.emailId) &&
        this.phoneNumber.length == 10
      );
    },
    submitGuest() {
      this.submitted = true;
      if (
        this.$refs.form.validate() &&
        this.$refs.form.value &&
        this.formIsValid()
      ) {
        let postData = {
          email: this.emailId,
          mobile: this.phoneNumber,
          mobileISD: this.selectedTelephoneCode,
          includeOptionalParams: true,
          channel: this.channel,
          productId: this.busProductId,
          loginAs: "guest"
        };
        Vue.http.headers.common["Content-Type"] =
          "application/x-www-form-urlencoded;charset=utf-8";
        Vue.http.options.emulateJSON = true;
        this.showLoader = true;
        let self = this;
        this.$http.post("/social/user/createUser.htm", postData).then(
          response => {
            if (response.data.status == "SUCCESS") {
              //                          self.setUserInfo(postData)
              localStorage.setItem("userInfo", JSON.stringify(postData));
              self.$router.push({ name: "BusReview" });
            } else {
              self.snackbar = true;
              self.snackbarText = response.data.responseMessage;
              self.showLoader = false;
            }
          },
          function(response) {
            self.snackbar = true;
            self.snackbarText = response.data.responseMessage
              ? response.data.responseMessage
              : "Some Error occured . Try after sometimes";
            self.showLoader = false;
          }
        );
      }
    },
    navigateToBoarding() {
      localStorage.setItem("loginBackClickStatus", "true");
      this.$router.push({ name: "BusDropingPoint" });
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    telephoneDialog() {
      this.showTelephoneDialog = true;
    },
    navigateToRegister() {
      this.$router.push({ name: "BusRegister" });
    },
    navigateToForgotPass() {
      this.$router.push({ name: "BusForgotPassword" });
    },
    redirectToPayment() {
      if (this.loginOption == "p2p") {
        this.loginDialog = false;
        this.loginOption = "";
        this.showLoader = false;
        this.$emit("cabsPPLogin", {});
      } else {
        if (this.getCabFareDetails.fare_details.price.advance_charge) {
          this.showLoader = false;
          router.push({ name: "PaySwift" });
        } else {
          let createOrderDetails = {
            travel_type: this.getcabsSRPData.travel_type,
            search_id: this.getcabsSRPData.search_id,
            fare_id: this.getCabFareDetails.fare_id,
            gst_details:
              this.getGSTDetailsForm.gst_details.address != ""
                ? this.getGSTDetailsForm.gst_details
                : {}
          };
          let self = this;
          this.$http.post("cabs/v1/orders", createOrderDetails).then(
            function(response) {
              self.showLoader = false;
              if (response.status == 200) {
                router.push({ name: "CabsConfirmation" });
              }
            },
            function(response) {
              self.showLoader = false;
            }
          );
        }
      }
    }
  }
};
</script>
 <style lang="scss">
.m0 {
  margin: 0 !important;
}

.p20 {
  padding: 10px 16px 20px 16px;
}

.registerTab {
  padding: 0 20px;
  .txt_blue {
    color: #1976d2;
  }
  .txt-r {
    text-align: right;
  }
}
.input-guest {
  label {
    font-size: 11px;
    color: rgba(0, 0, 0, 54);
  }
  .input-group__details {
    display: none;
  }
}
.loginBtn {
  margin-top: 15px;
}
</style>
    
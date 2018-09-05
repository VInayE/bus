  <template>
     <div class="">
      <v-container fluid>
       <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
        <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
          <v-layout row wrap>
              <v-flex xs12 class="facebookbtn"
                :params="fbSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
                @click="FB_Login">
                Login with Facebook
              </v-flex>
             
          </v-layout>
      </v-container>
	  </div>
  </template>
  <script>
	  import {checkFacebook} from '../../api/api'
  export default {
    data() {
      return {
        fbSignInParams: {
          scope: 'email, user_likes',
          return_scopes: true
        },
        snackbar: false,
        snackbarText:'',
        timeout: 3000,
        y: 'bottom',
        showLoader: false,
      }
    },

    mounted () {
      window.fbAsyncInit = function() { 
      FB.init({ 
          appId : '1690000827931920', 
          cookie : true, 
          xfbml : true, 
          version : 'v2.8'
        }); 
      }; 
      (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }
        (document, 'script', 'facebook-jssdk'));
    },

    methods: {
      onSignInSuccess (response) {
        var self = this;
        this.showLoader = true
        FB.api('/me', dude => {
          if(response.status === "connected") {
             self.fblogin(response.authResponse.accessToken);
          }
        })
      },
	 FB_Login(){
           var self = this;
           FB.login(function(response) {
                FB.api('/me', dude => {
                    self.fblogin(response.authResponse.accessToken);
                })
            });
       },	
      onSignInError (error) {
        this.showLoader = false
        this.snackbar = true
        this.snackbarText = "Some Error has occured. Try after sometimes"
      },
      fblogin (accessToken) {
        let postData = {
            authMode: "FACEBOOK",
            loginStep: "ResponseCheck",
            accessToken: accessToken,
            sourcepage: "",
            includeOptionalParams: true,
            channel: "b2c",
            productId: "Flight"
          }
          Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          Vue.http.options.emulateJSON = true;
          let self = this
           this.$http.post('https://www.yatra.com/social/social/login.htm',postData).then(function (response) {
            if (response.body.customerDetails && Object.keys(response.body.customerDetails).length>0) {
              if(!response.body.isLinkedAccount) {
                let userInfo = {
                  'email': response.body.responseData.userInfo.email,
                  'mob': response.body.customerDetails.mobileNum ? response.body.customerDetails.mobileNum : null,
                  'mobileISD': response.body.customerDetails.mobileISDCode ? response.body.customerDetails.mobileISDCode : null
                 } 
                self.showLoader = false
                self.setUserInfo(userInfo)
                self.$emit('openLinkedAccount',true)
              } else{
                self.$emit('paymentRedirect')
              }
            } else {
              self.snackbar = true
              self.snackbarText = response.body.responseMessage
              self.showLoader = false
            }
           }, function (response) {
              self.snackbar = true
              self.snackbarText = 'Some Error occured . Try after sometimes'
              self.showLoader = false
          });
      }
    }
  }
  </script>

  <style scoped>
  .p15 {
      padding: 10px 0;
  }
       .facebookbtn {
        background-color: #3B5998;
        color: #fff;
        text-align: center;
        padding: 8px;
        border-radius: 3px;
        font-size: 15px;
        font-weight: 500;
           width: 100%;
    }
    .tc {
        font-size: 12px;
        text-align: center;
        margin: 10px 0;
    }
	  .container {
    padding: 20px 16px;
}
  </style>

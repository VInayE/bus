<template>
	<div class="forgot-pass">
        <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
        <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
       </v-snackbar>
       <v-toolbar>
       <v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateToLogin()"><i class="ico-sprite ico-back"></i></v-flex>
				<v-flex xs8>Forgot password</v-flex>
			</v-layout>
		</v-toolbar>
		 <v-flex xs12 style="background: rgb(250,250,250); padding: 20px 0 0;">
			<div class="lock-bg">
				<v-icon class="lock" style="padding: 8px 0 0 8px; color: #fff;">lock</v-icon>
			</div>
   		 </v-flex>
      <v-form v-model="valid" ref="form" class="forgot-popup">
		 <v-container>
			<v-layout row wrap>

				<v-flex xs12 class="f-desc">
				Get instructions sent to this email that explain how to reset your password.
				</v-flex>
				  <v-flex xs12 class="">
					<v-text-field label="Registered Email ID" ref= "registerEmail" v-model="emailId" class="pb0 lw" required :rules="submitted ? Email_rules:[]"></v-text-field>
				</v-flex>
				<v-flex xs12>
					<v-btn class="redBtn" @click.stop="reset">Submit</v-btn>
				</v-flex>
			</v-layout>
		</v-container>
    </v-form>
    <forgot-message :showForgotMessage="showForgotMessage"></forgot-message>
	</div>
</template>

<script>
	import {checkForgotPass} from '../api/api'
	export default {
		components:{
        ForgotMessage : () => import('../components/common/forgotMessage.vue')
     },
		data () {
           return {
			   showForgotMessage: false,
               timeout: 3000,
               y: 'bottom',
               snackbar: false,
		       snackbarText:'',
               valid: false,
               showLoader: false,
               emailId: '',
               submitted:false,
               forgotDialog: false,
               channel: 'b2c',
               productId: 'yatramonuments',
               Email_rules:[
                (v) => !!v || 'Email addresss is required',
                (v) => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(v) || 'Enter correct Email Address'
              ]
           }
       },
		methods: {
			formIsValid () {
               var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
               return this.emailId !== '' && emailPattern.test(this.emailId)
           	},
			 reset () {
             this.submitted = true
             if(this.$refs.form.validate()  && this.$refs.form.value && this.formIsValid() ) {
				 let postData = {
                  emailId: this.emailId,
				  includeOptionalParams : true,
				  channel :	 this.channel,
				  productId	: this.productId
                }
                Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                Vue.http.options.emulateJSON = true;
                this.showLoader = true
                let self = this
                  this.$http.get('/social/user/forgotPassword.htm?emailId='+this.emailId+'&includeOptionalParams=true&channel=B2c&productId=pwa_cab_outstation').then(response => {
                  if (response.data.status == "SUCCESS") {
                         self.showLoader = false
                         self.showForgotMessage = true
                  } else {
                    self.snackbar = true
                    self.snackbarText = response.data.responseMessage
                    self.showLoader = false
                 }
                }, function (response) {
                 self.snackbar = true
                 self.snackbarText =response.data.responseMessage ?response.data.responseMessage :  'Some Error occured . Try after sometimes'
                 self.showLoader = false
               });
             }
           },
			navigateToLogin(){
				this.$router.push({name:'BusLogin'})
			}
		}
	}
</script>
<style scoped="true">
.m0 {
    margin: 0 !important;
}
.primary--text{
	color: #333 !important;
}
.lock-bg {
	width: 40px;
	margin: 0 auto;
	background: #1e88e5;
	border-radius: 100%;
	height: 40px;
	position: relative;
	top: 20px;
}
.f-desc {
	text-align: center;
  font-size: 14px;
  color: rgb(158,158,158);
  font-weight: 400;
  line-height: 24px!important;
  padding-bottom: 20px;
  margin-top: 20px
}
.lw{
        text-transform: lowercase;
}
</style>

<template>
	<div class="register-block">
		<v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
        	<v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
      	</v-snackbar>
      	<v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateToLogin()"><i class="ico-sprite ico-back"></i></v-flex>
				<v-flex xs8>Register with Yatra</v-flex>
			</v-layout>
		</v-toolbar>
		<v-form v-model="valid" ref="form">
			 <v-container>
				<v-layout row wrap>
						<v-flex xs6 class="">
						<v-text-field label="First Name" ref="input" required  v-model="firstName" class="pb0" :rules="submitted1 ? Firstnames_rule : []"></v-text-field>
						</v-flex>
						<v-flex xs5 offset-xs1 class="">
						<v-text-field label="Last Name" required  v-model="lastName" class="pb0" :rules="submitted1 ? Lastnames_rule: []"></v-text-field>
						</v-flex>
					<v-flex xs4 class="">
						<v-text-field label="ISD Code" v-model="selectedTelephoneCode" class="pb0" @click="telephoneDialog" v-on:keypress="telephoneDialog"></v-text-field>
					</v-flex>
					<v-flex xs7 offset-xs1 class="">
						<v-text-field label="Mobile Number"
									  required
									  v-model="phoneNumber"
									  maxlength="10"
									  class="pb0"
									  v-on:keypress="isNumber($event)"
									  :rules="submitted1 ? Phone_rules:[]"
									  ref= "registerPhone">
					   </v-text-field>
					</v-flex>
					  <v-flex xs12 class="">
						<v-text-field label="Email ID" ref= "registerEmail" v-model="emailId"  class="pb0 lw" required :rules="submitted1 ? Email_rules:[]"></v-text-field>
					</v-flex>
					<v-flex xs12>
						<v-btn class="regbtn redBtn" @click.stop="register">Register</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
    	</v-form>
    	<register-message :showRegisterMessage="showRegisterMessage"></register-message>
	</div>
</template>

<script>
import {checkRegister} from '../api/api'
export default {
	components:{
        RegisterMessage : () => import('../components/common/registerMessage.vue')
     },
	data(){
		return {
			   showRegisterMessage: false,
			   showTelephoneDialog: false,
               selectedTelephoneCode: '+91',
               snackbar: false,
               snackbarText:'',
               timeout: 3000,
               y: 'bottom',
               valid: false,
               showLoader: false,
               firstName: '',
               lastName: '',
               emailId: '',
               registerDialog: false,
               phoneNumber: '',
               password: '',
               isd: '',
               channel: 'b2c',
               productId: 'yatramonuments',
               submitted1: false,
               Firstnames_rule:[
                (v) => !!v || 'First Name is Required',
               ],
               Lastnames_rule:[
                (v) => !!v || 'Last Name is Required',
               ],
               Email_rules:[
                (v) => !!v || 'Email addresss is required',
                (v) => (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(v)||v.length==0) || 'Enter correct Email Address'
              ],
               Phone_rules:[
                (v) => !!v || 'Phone Number is required',
                (v) => (/^\d{10}$/.test(v)||v.length==0) || 'Please enter valid phone no'
              ],
              Password_rules:[
                (v) => !!v || 'Password is required',
                (v) =>  /^(?=^.{8,}$)(?=.*[a-zA-Z])(?=.*[0-9]).+$/.test(v) || 'Please enter valid password'
              ]
		}
	},
		methods: {
           selectedTelephone (event) {
            this.selectedTelephoneCode = event && event != undefined && Object.keys(event).length >0 ? "+" + event.countryCode: '+91'
            this.showTelephoneDialog = false
            this.telephoneSelected = event
            },
           telephoneDialog () {
            this.showTelephoneDialog = true
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
           formIsValid () {
               var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
               return this.firstName !== '' && this.lastName !== '' && this.emailId !== '' && this.phoneNumber !== '' && emailPattern.test(this.emailId)
           },
           register () {
             this.submitted1 = true
             if(this.$refs.form.validate()  && this.$refs.form.value && this.formIsValid() ) {
                let postData = {
                  email: this.emailId,
                  mobile: this.phoneNumber,
                  mobileISD: this.selectedTelephoneCode,
                  includeOptionalParams: true,
                  channel: this.channel,
                  productId: this.productId
                }
                Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                Vue.http.options.emulateJSON = true;
                this.showLoader = true
                let self = this
                this.$http.post('/social/user/createUser.htm',postData).then(response => {
                  if (response.data.status == "SUCCESS") {
                     self.showRegisterMessage = true
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
.container {
    padding: 20px;
}
	.primary--text{
		color: #333 !important;
	}
  .lw{
        text-transform: lowercase;
    }
</style>

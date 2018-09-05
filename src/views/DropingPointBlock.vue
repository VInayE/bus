<template>
    <div>
        <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
       </v-snackbar>
        <v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="closeDropingDialog"><i class="ico-sprite ico-back"></i></v-flex>
				<v-flex xs10>Confirm Dropping Point</v-flex>
			</v-layout>
		</v-toolbar>
        <div v-for="dpName in dropingPoints" @click="getDropingPoint(dpName)" class="bord-point">
             <span>{{dpName.name}}</span>
             <span class="fr">{{dpName.bt}}</span>
        </div>
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
import { mapGetters,mapMutations } from 'vuex'
import * as types from '../store/types'
import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
export default {
    components: {
      LoaderView: () => import('../components/common/loader')
    },
    data () {
         return {
             dropingDialog:false,
             showLoader:false,
             dropingPoints:null,
             snackbarText:'',
             showLoader:false,
             timeout: 3000,
             y: 'bottom',
             showBtn:false,
             snackbar:false,
             dPointValue:'',
             seatsSelected:{},
             seatsSelectedTemp:{},
             UserProfileUrl:'/social/user/userProfile.htm',
             snackbarText:'',
			 apiUrlPath:types.GET_API_URL,
         }
    },
    created(){
        this.dropingPoints = JSON.parse(localStorage.getItem('dropingPointData'))
        //this.checkUser()
    },
	mounted(){
		adobeAnalyticsPageView("yt:bus:dom:checkout:dropping point","bus","ios/pwa","business","bus checkout","domestic bus","dropping point","")
        localStorage.removeItem('retainTravellerDetails')
	},
    methods:{
        closeDropingDialog () {
             this.$router.push({name:'BusBoardingPoint'}) 
        },
        getDropingPoint(dName) {
            var _self = this
            var checkLoginStatus = this.getCookie("userName")
            var isProd=false
            if (process.env.NODE_ENV && process.env.NODE_ENV.toString() === 'production') {
                _self.isProd=true
            }
            if(checkLoginStatus !== null && checkLoginStatus !== '' && _self.isProd) {
               _self.checkUser(dName)
            }else{
                this.dPointValue = dName
                this.showLoader = true
                Vue.http.headers.common['Content-Type'] = 'application/json';
                var storeDP = JSON.parse(localStorage.getItem('seatMapData'))
                storeDP.OW.dp = this.dPointValue
                localStorage.setItem('seatMapData',JSON.stringify(storeDP))
                this.seatsSelectedTemp=encodeURI(JSON.stringify(storeDP))
                Vue.http.options.emulateJSON = false; 
                this.$http.post(this.apiUrlPath+`saveSeatSelection?seatsSelected=${this.seatsSelectedTemp}`).then(function (response) {
                    if(response.data.isResult){
                        this.showLoader = false
                        this.dropingDialog = false
                        var reviewData = {
                            'smid': JSON.parse(localStorage.getItem('storeSMID')),
                            'superPNR': response.data.superPnr,
                            'tt': 'o'
                        }
                        localStorage.setItem('busReviewRequest',JSON.stringify(reviewData))
                        this.$router.push({name:'BusLogin'})
                    }
                })
           }
        },
        saveSeat(dName) {
            var self = this
            this.showLoader = true
            this.dPointValue = dName
            Vue.http.headers.common['Content-Type'] = 'application/json';
            var storeDP = JSON.parse(localStorage.getItem('seatMapData'))
            storeDP.OW.dp = this.dPointValue
            localStorage.setItem('seatMapData',JSON.stringify(storeDP))
            self.seatsSelectedTemp=encodeURI(JSON.stringify(storeDP))
            Vue.http.options.emulateJSON = false; 
            this.$http.post(self.apiUrlPath+`saveSeatSelection?seatsSelected=${this.seatsSelectedTemp}`).then(function (response) {
                if(response.data.isResult){
                    this.showLoader = false
                    this.dropingDialog = false
                    var reviewData = {
                        'smid':JSON.parse(localStorage.getItem('storeSMID')),
                        'superPNR':response.data.superPnr,
                        'tt':'o'
                    }
                    localStorage.setItem('busReviewRequest',JSON.stringify(reviewData))
                     self.$router.push({name:'BusReview'})
                }
            })
        },
        checkUser(dName){
            var self = this
            let postData = {
                            "includeOptionalParams": 'true',
                            "productId": 'pwa_bus',
                            "channel": 'b2c'
                        }
            var loginBackClickCheck = localStorage.getItem('loginBackClickStatus')
            
            Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            Vue.http.options.emulateJSON = true;
            this.$http.post(self.UserProfileUrl,postData).then(function (response) {
                if (response.body.status == "SUCCESS") {
                     self.userEmail= response.body.responseData.userInfo.email
                     self.userMobile=response.body.responseData.userInfo.mobile
                    let userInfo = {
                      'email': response.body.responseData.userInfo.email,
                      'mobile': response.body.responseData.userInfo.mobile?response.body.responseData.userInfo.mobile:null,
                      'mobileISD': response.body.responseData.userInfo.mobileISD ? response.body.responseData.userInfo.mobileISD : null
                     }
                    //self.setUserInfo(userInfo)
					localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    this.saveSeat(dName)
                } else {
                    if(!loginBackClickCheck) this.$router.push({name:'BusLogin'})
                }
            })
        },
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
       }
    }
}
</script>
<style scoped lang="scss">
.link_register{
       text-align: left;
    }
    .cl_white_back{
    margin-left: 5px!important;
    font-size:25px;
    color:#616161!important;
  }
  .cd_header_white{
     font-weight: 500;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.87) !important;
    margin-left: 0px;
  }
    .p20 {
        padding: 20px; 
    }
    .pb0 {
        padding-bottom: 0;
    }
    .logintxt {
        color: #fff;
        font-weight: 500;
    }
    .loginBtn {
        color: #fff;
        width: 100%;
        margin: 0;
    }
    .registerTab {
        margin: 0 20px;
        text-align: center;
    }
    .application--light .btn--disabled:not(.btn--icon):not(.btn--flat) {
        background-color: #F34747 !important;
        color: #fff;
    }
    .wlogin {
        padding: 20px 20px 0 20px;
    }
    .txt-w {
        font-weight: 500;
        font-size: 16px;
    }
    .facebookBlock {
        padding: 0 20px;
        width: 100%;
        margin-top:20px;
        bottom: 0;
    }    
	.bord-point {
		padding: 10px 16px;
   		border-bottom: 1px solid #ddd;
		font-size: 12px;
		.fr {
			color: #EA2330;
		}
		&:first-child{
			margin-top: 6px;
		}
		span {
			&:first-child{
				white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 75%;
					display: inline-block;
					vertical-align: bottom;
			}
		}
	}
	.btn-proceed {
		position: fixed;
		width: 100%;
		bottom: 0;
		.bg-red {
			background: #EA2330 !important;
		}
	}
</style>

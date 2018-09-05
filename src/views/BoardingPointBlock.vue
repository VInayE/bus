<template>
    <div>
        <v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="closeboardingDialog"><i class="ico-sprite ico-back"></i></v-flex>
				<v-flex xs10>Confirm Boarding Point</v-flex>
			</v-layout>
		</v-toolbar>
    <div v-for="bpName in boardingPoints" @click="getBoardingPoint(bpName)" :key="bpName.name" class="bord-point">
        <span>{{bpName.name}}</span>
        <span class="fr">{{bpName.bt}}</span>
    </div> 
    </div>    
</template>
<script>
import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
export default {
    data () {
         return {
             boardingDialog:false,
             boardingPoints:null,
             snackbarText:'',
             showLoader:false,
             timeout: 3000,
             y: 'bottom',
             showBtn:false,
             snackbar:false,
             seatsSelected:{},
             seatsSelectedTemp:{}             
         }},
    methods:{
        closeboardingDialog () {
             this.$router.push({name:'BusSeatMap'}) 
           },
        getBoardingPoint(bName){
            var storeBP = JSON.parse(localStorage.getItem('seatMapData'))
            storeBP.OW.bp = bName
            localStorage.setItem('seatMapData',JSON.stringify(storeBP))
            this.$router.push({name:'BusDropingPoint'})
        }
    },
    created(){
    this.boardingPoints = JSON.parse(localStorage.getItem('boardingPointData'))
},
	mounted(){
		adobeAnalyticsPageView("yt:bus:dom:checkout:boarding point","bus","ios/pwa","business","bus checkout","domestic bus","boarding point","")
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
</style>

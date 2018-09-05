<template>
	<div class="bus-home">
        <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
            {{snackbarText}}
            <v-btn flat class="txt_white" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
		<v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 ><i class="ico-sprite ico-back" @click.prevent="redirectToHomePWA()"></i></v-flex>
				<v-flex xs8>Search Buses</v-flex>
			</v-layout>
		</v-toolbar>
		<v-layout row wrap class="side-padding prel">
			<v-flex xs12 class="brd-btm">
				<p class="tlabel">FROM</p>
				<v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
					<input readonly type="text" slot="activator" v-if="pickupCity.name!='' && !dialog" :value="pickupCity.name +' ('+ pickupCity.stateName +')'" />
                    <input readonly type="text" slot="activator" v-if="pickupCity.name=='' && !dialog" />
					<v-card>
						<v-toolbar dark class="white city_header">
							<v-btn icon dark style="padding-left:14px;margin:0px;">
								<i class="ico-sprite ico-back"></i>
							</v-btn>
						</v-toolbar>
						<bus-city-list :displayedCityList="cityList" :focusAttr="dialog" @citySelected="pickupCity = $event;dialog=false" :pickupCitySelected="pickupCitySelected" :pickAdobeVar="pickAdobeVar"></bus-city-list>
					</v-card>
				</v-dialog>
			</v-flex>
			<v-flex xs2 arrow-center @click="changeCityLocation">
				<div class=" trend" id="changeCityIcon" v-bind:class="{ rotate: isRotate }">
					<i class="ico-sprite ico-trend"></i>
				</div>
			</v-flex>
			<v-flex xs12 Depart class="brd-btm">
				<p class="tlabel">TO</p>
				<v-dialog v-model="dialog1" fullscreen transition="dialog-bottom-transition" :overlay="false">
					<input readonly type="text" slot="activator" v-if="dropCity.name!='' && !dialog1" :value="dropCity.name +' ('+ dropCity.stateName+')'">
                    <input readonly type="text" slot="activator" v-if="dropCity.name=='' && !dialog1">
					<v-card>
						<v-toolbar dark class="white city_header">
							<v-btn icon @click.native="dialog1 = false" dark style="padding-left:14px;margin:0px;">
								<v-icon style="color:#616161;">arrow_back</v-icon>
							</v-btn>
						</v-toolbar>
						<bus-city-list :displayedCityList="cityList" :focusAttr="dialog1" @citySelected="dropCity = $event;dialog1=false" :dropCitySelected="dropCitySelected" :dropAdobeVar="dropAdobeVar"></bus-city-list>
					</v-card>
				</v-dialog>
			</v-flex>
		</v-layout>
		<v-layout row wrap class="side-padding brd-btm pb16">
			<v-flex xs12>
				<p class="tlabel">DEPART</p>
			</v-flex>
			<div class="right-sec flex xs4">
				<span class="date-txt" @click="navigateCalender">{{findDisplayDate(ddate)}}</span>
			</div>
			<v-flex xs8>
					<v-layout row wrap day-opt>
						<v-flex xs6><span @click="tommrowClick" v-bind:class="{ active: tmrw }">Tomorrow</span></v-flex>
						<v-flex xs6 text-xs-right><span @click="dayAftertommrowClick" v-bind:class="{ active: dayTmrw }">Day After</span></v-flex>
					</v-layout>
			</v-flex>
		</v-layout>
		<div class="side-padding">
			<v-btn class="btn-blue" @click="findBus">FIND BUSES</v-btn>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import * as types from '../store/types'
	import router from '../router'
	import Vue from 'vue'
	import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
	import { BusAdobeTrack } from '../helpers/adobeAnalyticsClick'
	var seatActive = 1
	export default {
		data: () => ({
			dropAdobeVar:true,
			pickAdobeVar:true,
            pickupCity:{},
			e3: null,
			modal: false,
			departDate: '',
			showLoader: false,
			dropCity: {},
			ddate: new Date(new Date().setDate(new Date().getDate())),
			isRotate: false,
			seatValue: 1,
			tmrw: false,
			dayTmrw: false,
            dropCitySelected:'dropCity',
            pickupCitySelected:'pickupCity',
			isActive: {
				isActive1: true,
				isActive2: false,
				isActive3: false,
				isActive4: false,
				isActive5: false,
				isActive6: false
			},
			ex1: true,
			dialog: false,
			dialog1: false,
			notifications: false,
			sound: true,
			searchParams: {
				qty: 1
			},
			closedDays: {},
			widgets: false,
			cityList: {
				"cities": [{
					"code": 'YTDelhi',
					"name": "Delhi",
					"stateName": "Delhi"
				}, {
					"code": 'YTMumbai',
					"name": "Mumbai",
					"stateName": "Maharashtra"
				}, {
					"code": 'YTBangalore',
					"name": "Bangalore",
					"stateName": "Karnataka"
				}, {
					"code": 'YTKolkata',
					"name": "Kolkata",
					"stateName": "West Bengal"
				}, {
					"code": 'YTChennai',
					"name": "Chennai",
					"stateName": "Tamil Nadu"
				}, {
					"code": 'YTHyderabad',
					"name": "Hyderabad",
					"stateName": "Telangana"
				}, {
					"code": 'YTPune',
					"name": "Pune",
					"stateName": "Maharashtra"
				}, {
					"code": 'YTChandigarh',
					"name": "Chandigarh",
					"stateName": "Punjab"
				}, {
					"code": 'YTAhmedabad',
					"name": "Ahmedabad",
					"stateName": "Gujarat"
				}, {
					"code": 183658,
					"name": "Gurgaon",
					"stateName": "Haryana"
				}, {
					"code": 141993,
					"name": "Noida",
					"stateName": "Uttar pradesh"
				}]
			},
            snackbarText:'',
            snackbar: false,
            timeout: 300000,
            y: 'bottom' 

		}),
		components: {
			busCityList: () =>
				import ('@/components/busHome/cityList'),
			CalenderView: () =>
				import ('./calender')
		},
		watch:{
			
		},
		   computed:{
			...mapGetters({
				getUpdatedDate:types.GET_UPDATED_DATE
			})
		  },
		mounted(){
			//clear all local and filtered data
                localStorage.removeItem('retainFilterAcNac')
                localStorage.removeItem('retainFilterSleeper')
                localStorage.removeItem('retainFilterPickup')
                localStorage.removeItem('retainFilterDropOff')
                localStorage.removeItem('retainFilterOperator')
                localStorage.removeItem('retainFilterTimeType')
                localStorage.removeItem('retainFilterIcon')
                localStorage.removeItem('retainSorting')
                this.ddate = this.getUpdatedDate
                let pickCity = JSON.parse(localStorage.getItem("pickCity"))
                if(pickCity) {
                  this.pickupCity = pickCity  
                }else{
					this.pickupCity.name = ''
					this.pickupCity.stateName = ''
            	}
            
                let dropCity = JSON.parse(localStorage.getItem("dropCity"))
                if(dropCity) {
                  this.dropCity = dropCity  
                }else{
					this.dropCity.name = ''
					this.dropCity.stateName = ''
            	}
			adobeAnalyticsPageView("yt:bus:home","bus","ios/pwa","business","bus home","","","")
			localStorage.removeItem("retainSorting");
			
		},
		methods: {
			...mapMutations({
				setBusSearchParams: types.SET_BUS_SEARCH_PARMAS,
                setUpdatedDate:types.SET_UPDATED_DATE,
                setUpdatedIndex:types.SET_UPDATED_INDEX
			}),
			findBus() {
                if(this.pickupCity.name == ''){
                    this.snackbar = true
                    this.snackbarText = 'Choose Pickup city'
                    return false
                 }
                if(this.dropCity.name == ''){
                    this.snackbar = true
                    this.snackbarText = 'Choose Drop city'
                    return false
                 }
				let frmatedDate = this.formatdate(this.ddate);
				if(localStorage.getItem("offline")=="true") {
					console.log('offline Mode')
					this.searchParams = {
						src: 'Delhi',
						dest: 'Chandigarh',
						srcID: 'YTDelhi',
						destID: 'YTChandigarh',
						ddate: '2018-07-04',
						tt: "o",
						qty: '2'
					}
                	localStorage.setItem('departDate',this.searchParams.ddate)	
				}else{
					console.log('prod')
					this.searchParams = {
						src: this.pickupCity.name,
						dest: this.dropCity.name,
						srcID: this.pickupCity.code,
						destID: this.dropCity.code,
						ddate: frmatedDate,
						tt: "o",
						qty: this.seatValue
					}
                	localStorage.setItem('departDate',this.searchParams.ddate)
				}	
				this.setBusSearchParams(this.searchParams)
				router.push({
					name: 'BusSRP'
				})
				let pickCity = JSON.parse(localStorage.getItem("pickCity"))
				let dropCity = JSON.parse(localStorage.getItem("dropCity"))
				let selectDate = localStorage.getItem("departDate")
				BusAdobeTrack.trackHomeSearch(pickCity.name,dropCity.name,"",selectDate)
			},
			redirectToHomePWA() {
				localStorage.clear();
				self.dialog = false;
				window.open("https://www.yatra.com/pwa", "_self");
			},
			formatdate(date) {
				date = date.getFullYear() + '-' + '0' + parseInt(parseInt(date.getMonth()) + 1) + '-' + ("0" + date.getDate()).slice(-2)
				return date
			},
			seatClick(val, val1) {
				for (var key in this.isActive) {
					if (this.isActive[key] == true) {
						this.isActive[key] = false
					}
				}
				this.isActive[val1] = true
				this.seatValue = val
			},
			changeCityLocation() {
				let self = this
				self.isRotate = !self.isRotate
				var storeDestName = this.pickupCity.name
				var storeDestState =  this.pickupCity.stateName
				this.pickupCity.name = this.dropCity.name
				this.pickupCity.stateName = this.dropCity.stateName
				this.dropCity.name = storeDestName
				this.dropCity.stateName = storeDestState
			},
			tommrowClick() {
//				if(Object.keys(this.getUpdatedDate).length != "0")
				this.dayTmrw = false
				this.tmrw = true
				this.ddate = new Date(new Date().setDate(new Date().getDate() + 1))
                this.setUpdatedDate(this.ddate)
                this.setUpdatedIndex(0)
			},
			dayAftertommrowClick() {
				this.dayTmrw = true
				this.tmrw = false
				this.ddate = new Date(new Date().setDate(new Date().getDate() + 2))
                this.setUpdatedDate(this.ddate)
                this.setUpdatedIndex(0)
			},
			findDisplayDate(date) {
				return date.getDate() + '/' + parseInt(parseInt(date.getMonth()) + 1) + '/' + date.getFullYear()
			},
			navigateCalender(){
				router.push({
				name: 'Calender'
				})
			}
		}
	}

</script>

<style scoped lang="scss">
	.bus-home {
		input {
			width: 100%;
			font-size: 15px;
		}
		.dialog__container {
			width: 100%;
		}
		.tlabel {
			font-size: 0.750em;
			color: #acacac;
		}
		.city-txt {
			font-size: 1.125em;
		}
		p {
			margin-bottom: 5px;
		}
		.trend {
			margin-top: 5px;
		}
		.day-opt {
			font-size: 0.750em;
			color: #1e88e5;
			cursor: pointer;
			font-weight: bold;
			.active {
				background: #ea2330;
				color: #fff;
				border: 1px solid #ea2330;
			}
			span {
				color: #acacac;
				padding: 5px;
				border-radius: 15px;
				border: 1px solid #acacac;
				width: 90px;
				font-size: 12px;
				display: inline-block;
				text-align: center;
			}
		}
		.seats {
			padding-bottom: 20px;
			font-size: 0.875em;
			margin-top: 8px;
			.active {
				color: #fff;
				background: #ea2330;
				border: 1px solid #ea2330;
			}
			span {
				width: 25px;
				height: 25px;
				padding-top: 2px;
				color: #acacac;
				border-radius: 50%;
				display: inline-block;
				text-align: center;
			}
		}
		.btn-blue {
			width: 100%;
			margin: 0;
			background: #ea2330;
			color: #fff;
			font-size: 0.875em;
		}
		.rotate .ico-trend {
			-webkit-transform: rotateZ(180deg);
      -moz-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
		}
	}

	.arrow-center {
		position: absolute;
		background: #fff;
		top: 16px;
		right: 0px;
	}

	.Depart {
		padding-top: 16px;
	}
	.pb16 {
		padding-bottom: 16px;
	}
	.day-opt{
		margin-top: -14px;
	}
	.ico-trend {
		background-position: -43px -31px;
		-webkit-transition: 0.2s ease-out;
		-moz-transition:  0.2s ease-out;
		transition:  0.2s ease-out;
	}
    .txt_white {
        position: relative;
        left: 20px;
    }
</style>

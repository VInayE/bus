<template>
<v-app class="seatmap-module">
  <div class="fixed">
    <v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateToSrp"><i class="ico-sprite ico-back"></i></v-flex>
				<v-flex xs8>Pick Seats</v-flex>
			</v-layout>
    </v-toolbar>
    <ul class="seat-info">
   		<li><span></span>Available</li>
   		<li><span class="book"></span>Booked</li>
   		<li><span class="ladies"></span>Ladies</li>
   		<li><span class="sel"></span>Selected</li>
    </ul>
  </div>
    <v-tabs dark fixed centered :scrollable="false" v-model="active" class="upper_lower_tab" style="padding:0px 0px;">
    <v-tabs-bar>
      <v-tabs-item href="#tab-lower">
        LOWER DECK
      </v-tabs-item>
      <v-tabs-item href="#tab-upper">
        UPPER DECK
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
     <div class="ico-sprite ico-driver"></div>
      <v-tabs-content id="tab-lower" class="mt30">
         <div class="seat-map-wrapper">
            <ul v-for="(seats,index) in busSeatData.slice().reverse()" :key="index" class="seat-map">
                 <li v-for="(seat,index) in seats"  @click="calculatePriceSeat(seat.sn,seat.f,$event,seat.avl,seat,seat.rf)" v-bind:class="[(seat.st=='SL' && seat.disabled)?'sleeper disabledClssSleeper':(seat.disabled)?'disabledClss':(seat.avl=='N' && seat.st=='SL' && seat.rf=='F')?'sleeper reservedFemaleSleeper':(seat.avl=='N' && seat.st=='SL' && seat.rf=='Male')?'sleeper reservedMaleSleeper':(seat.avl=='N' && seat.st=='SL')?'sleeper reservedSleeper':(seat.st=='SL' && seat.rf=='F')?'sleeper femaleAvailableSleeper':(seat.st=='SL' && seat.rf=='Male')?'sleeper maleAvailableSleeper':(seat.avl=='N' && seat.rf=='F')?'reservedFemale':(seat.avl=='N' && seat.rf=='Male')?'reservedMale':(seat.st=='SL' && seat.rf=='M')?'sleeper':(seat.avl=='N')?'reservedGeneral':(seat.rf=='F')?'femaleAvailable':(seat.rf=='Male')?'maleAvailable':'']">
                <i class="ico-sprite ico-default" v-if="seat.st"></i>
                <p class="seat" v-if="seat.st"><span class="srp-sprite">{{seat.sn}}</span><i></i></p>
               </li>
            </ul>
             
            <div class="ajax-loader" v-if="showLoader">
                <div class="sk-wave">
                    <div class="sk-rect sk-rect1"></div>
                    <div class="sk-rect sk-rect2"></div>
                    <div class="sk-rect sk-rect3"></div>
                    <div class="sk-rect sk-rect4"></div>
                    <div class="sk-rect sk-rect5"></div>
                </div>
            </div>    
            <div v-if="seatErrorMsgLower" class="seat-no">Seat layout not available!!</div>
        </div>
      </v-tabs-content>
      <v-tabs-content id="tab-upper" class="mt30">
          <div class="seat-map-wrapper">
            <ul v-for="(seats,index) in busSeatDataUpper.slice().reverse()" :key="index" class="seat-map">
                 <li v-for="(seat,index) in seats"  @click="calculatePriceSeat(seat.sn,seat.f,$event,seat.avl,seat,seat.rf)" v-bind:class="[(seat.st=='SL' && seat.disabled)?'sleeper disabledClssSleeper':(seat.disabled)?'disabledClss':(seat.avl=='N' && seat.st=='SL' && seat.rf=='F')?'sleeper reservedFemaleSleeper':(seat.avl=='N' && seat.st=='SL' && seat.rf=='Male')?'sleeper reservedMaleSleeper':(seat.avl=='N' && seat.st=='SL')?'sleeper reservedSleeper':(seat.st=='SL' && seat.rf=='F')?'sleeper femaleAvailableSleeper':(seat.st=='SL' && seat.rf=='Male')?'sleeper maleAvailableSleeper':(seat.avl=='N' && seat.rf=='F')?'reservedFemale':(seat.avl=='N' && seat.rf=='Male')?'reservedMale':(seat.st=='SL' && seat.rf=='M')?'sleeper':(seat.avl=='N')?'reservedGeneral':(seat.rf=='F')?'femaleAvailable':(seat.rf=='Male')?'maleAvailable':'']">
                <i class="ico-sprite ico-default" v-if="seat.st"></i>
                <p class="seat" v-if="seat.st"><span class="srp-sprite">{{seat.sn.substring(0,2)}}</span><i></i></p>
               </li>
            </ul>
            <div class="ajax-loader" v-if="showLoader">
                <div class="sk-wave">
                    <div class="sk-rect sk-rect1"></div>
                    <div class="sk-rect sk-rect2"></div>
                    <div class="sk-rect sk-rect3"></div>
                    <div class="sk-rect sk-rect4"></div>
                    <div class="sk-rect sk-rect5"></div>
                </div>
            </div>  
            <div v-if="seatErrorMsgUpper" class="seat-no">Seat layout not available!!</div>
        </div>
      </v-tabs-content>
    </v-tabs-items>
    <div class="fixed-btm">
		<ul class="seat-price" v-if="seatNumberArray1.length">
			<li><small>Seats</small> <br> {{finalSeats}}</li>
			<li class="fr"><small>Fare</small> <br>₹ <vue-numeric separator="," v-model="fares" style="width:38px;"></vue-numeric></li>
            
		</ul>
		<div class="c-policy">
			Bus Operator has the right to change seat allocations. By clicking “Proceed”, you agree to the <span href="#" @click="gotoCancellation" style="color:#1976d2">Cancellation Policy</span>
		</div>
		<div class="btn-proceed">
			<v-btn block class="bg-red" @click.stop="selectBoarding" v-bind:class="{ disabledClass: isDisabled }">
			   Proceed
			</v-btn>
		</div>
	</div>
  </v-tabs>         
</v-app>    
</template>
<script>
import { mapGetters,mapMutations} from 'vuex'
import * as types from '../store/types'
import VTooltip from 'v-tooltip'    
import {getSeatMapData} from '../api/api'
import router from '../router'
import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
 export default {
    data () {
      return {
          openBoardingDialog: false,
          busSeatData:[],
          openDropingDialog:false,
          seatNumber:'',
          openLoginDialog:false,
		  getInitalSeatAvailable:0,
          fares:'',
          active:'tab-lower',
          activeItem:null,
          isDisabled:true,
          isactive:false,
          showLoader:false,
          seatNumberArray:[],
          seatNumberArray1:[],
          fareArray:[],
          dropingPointData:null,
          busSeatDataUpper:[],
          allSelectedSeats:[],
          seatValues:[],
          saveSeatMapData:{},
          responseData:null,
          finalSeats:null,
          seatErrorMsgUpper:false,
          seatErrorMsgLower:false,
          response:{}
          
      }
    },
     active () { 
       if(this.active == 'tab-lower'){
            this.active = 'tab-upper'
//          router.push({name:'CabsHomeView',params:{option:'p2p'}})
       } else {
           this.active = 'tab-lower'
//          adobeAnalyticsPageView('yt:cab:book ride','cab','business','cab book ride','','','')
//          router.push({name:'CabsHomeView',params:{option:'rental'}})
       }
      },
     computed: {
      ...mapGetters({
          busSeatMapData:types.GET_BUS_SEAT_MAP_DATA
      }),
      classObject: function () {
        return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
  }
    },
    components: {
      BoardingPointBlock : () => import('./BoardingPointBlock'),
      DropingPointBlock : () => import('./DropingPointBlock')  
    },
	 mounted() {
		 adobeAnalyticsPageView("yt:bus:dom:select seats","bus","ios/pwa","business","bus select seats","domestic bus","","")
	 },
    created(){
             var self = this
             var tempCount = 0
             let seatMapJSONData = JSON.parse(localStorage.getItem('seatMapJson'))
                 self.showLoader = true
                 getSeatMapData(seatMapJSONData).then(response => {
                 self.showLoader = false
                 //self.seatErrorMsg = false
                 self.responseData = response.body.OW.seatMap
                 if(self.responseData.upperDeck==undefined){
                     self.busSeatDataUpper = []
                     self.seatErrorMsgUpper=true
                 }
					 else if(self.responseData.upperDeck.seats.length>1){
						 for(var i=0; i<self.responseData.upperDeck.seats.length;i++){
							 for(var j=0;j<self.responseData.upperDeck.seats[i].length;j++) {
								 if(Object.keys(self.responseData.upperDeck.seats[i][j]).length != 0) {
                                     tempCount++
								 }
							 }
						 }
                         if(tempCount==0){
                             self.busSeatDataUpper = []
                             self.seatErrorMsgUpper=true
                         }
                          else{
                    self.busSeatDataUpper = response.body.OW.seatMap.upperDeck.seats
                 }
					 }
					
                 if(self.responseData.lowerDeck==undefined || typeof(self.responseData.lowerDeck)=='undefined'){
                     self.busSeatData = []
                     self.seatErrorMsgLower=true
                 }else{
                    self.busSeatData = response.body.OW.seatMap.lowerDeck.seats
                 }
            
                 localStorage.setItem('storeSMID',JSON.stringify(response.body.OW.seatMap.smid))
                 localStorage.setItem('boardingPointData',JSON.stringify(response.body.OW.seatMap.boardingPoints.bp))
                 localStorage.setItem('dropingPointData',JSON.stringify(response.body.OW.seatMap.droppingPoints.dp))
                 localStorage.setItem('cancellationPolicy',JSON.stringify(response.body.OW.seatMap.cancellationPolicy.cp))
            }).catch(error => {
                 self.seatErrorMsg=true
             });
    },
    methods:{
            navigateToSrp () {
                router.push({name:'BusSRP'})
            },
		    calculateInnerDiv(st){
				if(st){
					this.getInitalSeatAvailable += 1
				}
			},
            gotoCancellation(){
                localStorage.setItem('cancellationNavigation','SeatMap')
                router.push({name:'CancellationPolicy'})
                
            },    
            openingLoginDialog(){
             this.openLoginDialog = true
             this.openDropingDialog = false
            },
            closingLoginDialog(){
             this.openLoginDialog = false
             this.openDropingDialog = true
            },
            closingDropingDialog(){
             this.openDropingDialog = false
             this.openBoardingDialog = true
            },
            openingDropingDialog(data){
             this.openBoardingDialog = false
             this.openDropingDialog=true
             this.saveSeatMapData.OW.bp = data
            },
                
             selectBoarding(){
                 if(this.seatNumberArray1.length>0){
                 var self = this;
                 this.seatValues = []
                 for(let g=0;g<this.allSelectedSeats.length;g++){
                     this.seatValues.push({'sn':this.allSelectedSeats[g].sn,'rn':this.allSelectedSeats[g].rn,'cn':this.allSelectedSeats[g].cn,'st':this.allSelectedSeats[g].st,'avl':this.allSelectedSeats[g].avl,'rf':this.allSelectedSeats[g].rf,'f':this.allSelectedSeats[g].f,'stax':this.allSelectedSeats[g].stax,'seatTypeId':this.allSelectedSeats[g].seatTypeId})
                }
                 let tempObject = {
                     'seats':this.seatValues,
                     'smid':this.responseData.smid,
                     'tt':'o',
                     'tentativeSeats':this.responseData.tentativeSeats,
                     'sluid':this.responseData.sluid
                 }
                 this.saveSeatMapData.OW = tempObject
                 localStorage.setItem('seatMapData',JSON.stringify(this.saveSeatMapData))
                 self.$router.push({name:'BusBoardingPoint'})
                 
               } 
            },
            calculatePriceSeat(seat,fare,e,seatStatus,seatObject,reservedFor){
                if(seatStatus == 'Y'){
                    let keyValue = 20
                    this.seatNumberArray = []
                    if(this.seatNumberArray1.length==0){
                        if(reservedFor == "F"){
                            e.currentTarget.className='activeFemaleAvailable'
                        }
                        else if(reservedFor == "Male"){
                            e.currentTarget.className='activeMaleAvailable'
                        }
                        else if(seatObject.st == 'SL' && reservedFor == "M"){
                                e.currentTarget.className='sleeper activeMaleAvailable'
                                }
                        else{
                            e.currentTarget.className='active'
                        }
                        
                        this.seatNumberArray1.push(seat);
                        this.fareArray.push(fare);
                        this.allSelectedSeats.push(seatObject); 
                    }else{
                        for(var j=0;j<this.seatNumberArray1.length;j++){
                            this.seatNumberArray.push(this.seatNumberArray1[j]);
                        }
                        for(var k=0;k<this.seatNumberArray.length;k++){
                            if(this.seatNumberArray[k]==seat) keyValue =  k
                        }
                        if(keyValue == 20) {
                            if(this.seatNumberArray1.length<6){
                                if(reservedFor == 'F'){
                                e.currentTarget.className='activeFemaleAvailable'
                            }
                            else if(reservedFor == 'Male'){
                                e.currentTarget.className='activeMaleAvailable'
                            }
                            else if(seatObject.st == 'SL' && reservedFor == "M"){
                                e.currentTarget.className='sleeper activeMaleAvailable'
                                }
                            else{
                                e.currentTarget.className='active'
                            }
                                this.seatNumberArray1.push(seat)
                                this.allSelectedSeats.push(seatObject);  
                                this.fareArray.push(fare);
                                if(this.seatNumberArray1.length == 6){
                                    for(let d=0;d<this.busSeatData.length;d++){
                                        for(let p=0;p<this.busSeatData[d].length;p++){
                                            let count=0
                                            for(let p1=0;p1<this.seatNumberArray1.length;p1++){
                                                if(this.seatNumberArray1[p1]==this.busSeatData[d][p].sn) {
                                                    count++
                                                }
                                            }
                                            if(count==0){
                                                this.busSeatData[d][p].disabled=true
                                            }else{
                                                this.busSeatData[d][p].disabled=false
                                            }
                                        }
                                    }
                                    if(this.busSeatDataUpper.length != 0){
                                        for(let d=0;d<this.busSeatDataUpper.length;d++){
                                            for(let p=0;p<this.busSeatDataUpper[d].length;p++){
                                                let count=0
                                                for(let p1=0;p1<this.seatNumberArray1.length;p1++) {
                                                    if(this.seatNumberArray1[p1]==this.busSeatDataUpper[d][p].sn) {
                                                        count++
                                                    }
                                                }
                                                if(count==0){
                                                    this.busSeatDataUpper[d][p].disabled=true
                                                }else{
                                                    this.busSeatDataUpper[d][p].disabled=false
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            for(let d=0;d<this.busSeatData.length;d++){
                                for(let p=0;p<this.busSeatData[d].length;p++){
                                    this.busSeatData[d][p].disabled=false
                                }
                            }
                            if(this.busSeatDataUpper.length != 0){
                                for(let d=0;d<this.busSeatDataUpper.length;d++){
                                    for(let p=0;p<this.busSeatDataUpper[d].length;p++){
                                        this.busSeatDataUpper[d][p].disabled=false
                                    }
                                }
                            }
                            if(e.currentTarget.className == 'sleeper activeMaleAvailable'){
                                e.currentTarget.className='sleeper'
                                }
                            else{
                                e.currentTarget.className=''
                            }
                            
                            this.seatNumberArray1.splice(keyValue,1);
                            this.fareArray.splice(keyValue,1);
                            this.allSelectedSeats.splice(keyValue,1);
                        }
                    }
                    this.seatNumber = ''
                    this.fares = 0
                    if(this.seatNumberArray1.length == 1){
                        this.seatNumber = this.seatNumberArray1[0]
                        this.fares = fare
                    }else{
                        for(var f=0;f<this.seatNumberArray1.length;f++){
                            this.seatNumber = this.seatNumber + ',' + this.seatNumberArray1[f]
                            this.fares = parseInt(this.fares)+parseInt(this.fareArray[f])
                        }
                    }
                }
                if(this.seatNumber.charAt( 0 ) === ',' ){
                    this.finalSeats = this.seatNumber.slice(1)
                }else{
                    this.finalSeats = this.seatNumber
                }

                if(this.seatNumberArray1.length == 0) {
                    this.isDisabled = true
                }else{
                    this.isDisabled = false 
                }
            }
         }
    }
</script>
<style lang="scss">
    .disabledClass{
        background: #dddddd !important;
    }
  .seatmap-module{
     background-color:#fff;
   }
	.ico-driver {
		position: absolute;
		right: 10px;
		top: 180px;
		background-position: 0 -0;
	}
    .sleeper {
        height: 75px !important;
    }
	.ico-default {
		background-position: 1px -40px;
	}
	.active .ico-default{
		background-position: 1px -77px;
	}
	.disabledClss .ico-default{
		opacity: .4;
	}
	.reservedGeneral .ico-default {
		background-position: 1px -115px;
	}
	.femaleAvailable .ico-default {
		background-position: 1px -264px;
	}
    .activeFemaleAvailable .ico-default {
        background-position: 0 -224px;
    }
    .maleAvailable .ico-default {
		background-position: 1px -151px;
	}
	.sleeper .ico-default {
		background-position: -189px -2px;
    	height: 73px;
	}
	.sleeper.active .ico-default {
		background-position: -232px -1px;
    	height: 65px;
	}
	.sleeper.reservedSleeper .ico-default{
        background-position: -190px -84px;
        height: 70px;
	}
    .sleeper.reservedFemaleSleeper .ico-default{
		background-position: -233px -247px;
        height: 70px;
	}
    .sleeper.maleReservrdSlepper .ico-default{
		background-position: -189px -2px;
    	height: 65px;
	}
    .sleeper.activeMaleAvailable .ico-default {
        background-position: -232px -2px;
    }
    .sleeper.femaleAvailableSleeper .ico-default {
         background-position: -189px -2px;
    }
    .sleeper.disabledClssSleeper .ico-default {
        opacity: .4;
    }
    
	.seat-map {
		float: left;
		padding-left: 10px;
	}
	/*.seat-map:nth-child(5),.seat-map:nth-child(6) {
		float: right;
		padding-left: 0;
		padding-right: 10px;
	}*/
	.seat-map li {
		list-style-type: none;
		height: 45px;
        width: 37px;
	}
	.seat {
		display: none;
	}
	.mt30 {
		margin-top: 180px;
	}
	.seatmap-module .tabs__bar {
	background: #fff;
	box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12);
	position: fixed;
    top: 103px;
    z-index: 9;
}
	.seatmap-module .toolbar {
		margin-bottom: 8px;
	}
	.seatmap-module.application .theme--dark.tabs  .tabs__item.tabs__item--active {
		color: #EA2330 !important;
		border-bottom: 1px solid #EA2330;
	}
	.seatmap-module.application .theme--dark.tabs .tabs__item {
		color: #333;
	}
	.seatmap-module .tabs__items{
		margin-bottom: 200px;
	}
	.seat-info {
		display: flex;
		border-bottom: 1px solid #ddd;
		padding: 10px;
		font-size: 12px;
		li {
			flex: 1 0;
			list-style-type: none;
			span {
				height: 10px;
				width: 10px;
				border-radius: 50px;
				margin-right: 4px;
				border: 1px solid #ddd;
				display: inline-block;
				margin-left: 2px;
				:first-child {
					margin-left: 0;
				}
			}
		}
		.book {
			background: #bdbdbd;
			border: 1px solid #bdbdbd;
		}
		.ladies {
			background: #F06292;
			border: 1px solid #F06292;
		}
		.sel {
			background: #8BC34A;
			border: 1px solid #8BC34A;
		}
	}
	.seat-price {
		padding: 10px 16px;
		border-top: 1px solid #ddd;
		background: #fff;
		li {
			font-size: 14px;
			display: inline-block;
			small {
				color: rgba(0,0,0,.34);
				font-size: 12px;
			}
		}
	}
	.c-policy {
		padding: 8px 16px;
		background: #EEEEEE;
		color: #9E9E9E;
		font-size: 12px;
		text-align: center;
		a {
			color: #2196F3;
		}
	}
	.fixed-btm {
		position: fixed;
		bottom: 0;
	}
	.btn-proceed {
		width: 100%;
		float: left;
		.bg-red {
			background: #EA2330 !important;
			width: 100%;
			color: #fff;
			margin: 0;
            &.disabledClass {
                background: #f5f5f5 !important;
				color: rgba(0,0,0,.15)
            }
		}
	}
	.fixed {
		position: fixed;
		z-index: 9;
		top: 0;
		width: 100%;
		background: #fff;
	}
	.seat-no {
	background: #fff;
    width: 100%;
    z-index: 999;
    text-align: center;
    position: relative;
    min-height: 270px;
    padding-top: 110px;
	}
    
    .seat-map-wrapper{
    float: left;
    margin-left: 30px;
    }
    .seat-map {
        float: left;
        padding-left: 10px;
    }
    .seat-map .sleeper {
    margin-top: 12px
}
    

</style>

<template>
  <v-app class="bus-srp-list-view">
    <v-layout row wrap class="srp-filter-option">
      <v-flex xs4 @click="sortByDeparture" v-bind:class="{ active:isDept,inc:inc1 }">Departure <i class="ico-sprite ico-filter"></i></v-flex>
      <v-flex xs4 @click="sortByDuration" v-bind:class="{ active:isDuration ,inc:inc2}">Duration <i class="ico-sprite ico-filter"></i></v-flex>
      <v-flex xs4 @click="sortByPrice" v-bind:class="{ active:isPrice, inc:inc }">Price <i class="ico-sprite ico-filter"></i></v-flex>
    </v-layout>
    
    <div v-for="(listData,index) in busListData" :key="index" @click="navigateToSeatMap(index)">
    <v-layout class="srp-list-data" row wrap>
      <v-flex xs9>
       <v-layout row wrap class="srp-time">
          <v-flex xs3 class="srp-dt">
            {{listData.dt | fullTimeFilter}}
          </v-flex>
           <v-flex xs3>
             <i class="ico-sprite icon-forward"></i>
          </v-flex>
          <v-flex xs3 class="srp-at">
             {{listData.at | fullTimeFilter}}
          </v-flex>
          <v-flex xs3 class="srp-du">
             {{listData.du | durationFilter}}
          </v-flex>
        </v-layout>
        <v-layout row wrap class="srp-op-name">
           {{listData.opNm}}
        </v-layout>
        <v-layout row wrap class="srp-btype">
          {{listData.bType}}
        </v-layout>
      </v-flex>
      <v-flex xs3 class="srp-price-seat">
        <v-layout row wrap class="srp-price">
      ₹ <vue-numeric read-only separator="," v-model="listData.fare"></vue-numeric>
        </v-layout>
         <v-layout row wrap class="srp-seat">
          {{listData.as}} seats left
        </v-layout>
      </v-flex>
    </v-layout>
   </div>      
  </v-app>
</template>
<script>
   import { mapGetters,mapMutations } from 'vuex'
   import * as types from '../../store/types'
   import router from '../../router'
   import { BusAdobeTrack } from '../../helpers/adobeAnalyticsClick'
   export default {
     name:'bus-srp-list-view',
     props:{
       busSrpListViewData:{
         type:Array,
         required:true,
         optionSorted:null,
         sortType:null 
       },
        busSrpSearchID:{
            type:String,
            required:true
        } 
     },
     watch:{
       busSrpListViewData(){
        this.busListData =  this.busSrpListViewData  
       }  
     },
     data () {
       return {
         busListData:null,
         inc: false,
         inc1: false,
         inc2: false,
         sortType1:'desc',
         sortType2:'desc',
         sortType:'desc'   
       }  
     },
     created(){
      this.busListData =  this.busSrpListViewData
      let srtngData = JSON.parse(localStorage.getItem("retainSorting"))
      if(srtngData!=null){
          if(srtngData.optionSorted=='departure'){
          this.retainSortByDeparture(srtngData.sortType,srtngData.optionSorted)
      }
      else if(srtngData.optionSorted=='duration'){
          this.retainSortByDuration(srtngData.sortType,srtngData.optionSorted)
      }
      else{
          this.retainSortByPrice(srtngData.sortType,srtngData.optionSorted)
      }  
      }
      
      else{
          this.sortByPrice()
      }     
         
     },
     methods:{
         ...mapMutations({
           setBusFareDetails: types.SET_BUS_FARE_DETAILS,
           setBusSeatMapData: types.SET_BUS_SEAT_MAP_DATA     
        }),
       navigateToSeatMap(index){
         let seatData={
         'searchID':this.busSrpSearchID,
         'idProof':this.busListData[index].idProof,
         'busID':this.busListData[index].bId
         }
         localStorage.setItem('seatMapJson',JSON.stringify(seatData))
         this.setBusFareDetails(this.busListData[index])
         this.setBusSeatMapData(seatData)
         router.push({name:'BusSeatMap'})
		 let pickCity = JSON.parse(localStorage.getItem("pickCity"))
		 let dropCity = JSON.parse(localStorage.getItem("dropCity"))
		 let selectDate = localStorage.getItem("departDate")
		 let srpLength = Object.keys(this.busListData).length
		 BusAdobeTrack.trackSrpSearch(pickCity.name,dropCity.name,"1",selectDate,srpLength)
       },     
       sortByDeparture(){
        this.optionSorted ='departure'
        this.sortType1 = this.optionSorted != 'departure' ? 'inc' : this.sortType1 == 'inc' ? 'desc' : 'inc'
        this.isDept=true,
        this.isDuration=false,
        this.isPrice=false
        if(this.sortType1 == 'inc'){
            this.inc1 = true
        }
           else{
               this.inc1 = false
           }
		
        let sortingData = {
            'sortType':this.sortType1,
            'optionSorted':this.optionSorted    
        }   
        localStorage.setItem('retainSorting',JSON.stringify(sortingData))   
        this.busListData.sort(this.sortDeparture) 
       },
        retainSortByDeparture(sortType,optionSorted){
        this.sortType1 = sortType
        this.optionSorted =optionSorted
        this.isDept=true,
        this.isDuration=false,
        this.isPrice=false
		 if(this.sortType1 == 'inc'){
            this.inc1 = true
        }
           else{
               this.inc1 = false
           }
        this.busListData.sort(this.sortDeparture) 
       },   
       sortByDuration(){ 
          this.optionSorted ='duration'
          this.sortType2 = this.optionSorted != 'duration' ? 'inc' : this.sortType2 == 'inc' ? 'desc' : 'inc'
          this.isDept = false
          this.isDuration = true
          this.isPrice = false
		   if(this.sortType2 == 'inc'){
            this.inc2 = true
        }
           else{
               this.inc2 = false
           }
          let sortingData = {
            'sortType':this.sortType2,
            'optionSorted':this.optionSorted    
          }   
          localStorage.setItem('retainSorting',JSON.stringify(sortingData))     
          this.busListData.sort(this.sortDuration)
           
       },
        retainSortByDuration(sortType,optionSorted){ 
          this.sortType2 = sortType
          this.optionSorted = optionSorted
          this.isDept = false
          this.isDuration = true
          this.isPrice = false
		  if(this.sortType2 == 'inc'){
            this.inc2 = true
        }
           else{
               this.inc2 = false
           }    
          this.busListData.sort(this.sortDuration)
           
       },
       sortByPrice(){
         this.optionSorted = 'price'
         this.sortType = this.optionSorted == null || this.optionSorted != 'price' ? 'inc' : this.sortType == 'inc' ? 'desc' : 'inc' 
         this.isDept = false
         this.isDuration = false
         this.isPrice = true
		 if(this.sortType == 'inc'){
            this.inc = true
        }
           else{
               this.inc = false
           }
		 this.desc = true
         let sortingData = {
            'sortType':this.sortType,
            'optionSorted':this.optionSorted    
          }   
         localStorage.setItem('retainSorting',JSON.stringify(sortingData))   
         this.busListData.sort(this.sortPrice)  
       },
        retainSortByPrice(sortType,optionSorted){
         this.sortType = sortType
         this.optionSorted = optionSorted
         this.isDept = false
         this.isDuration = false
         this.isPrice = true
		 if(this.sortType == 'inc'){
            this.inc = true
        }
           else{
               this.inc = false
           }
		 this.desc = true 
         this.busListData.sort(this.sortPrice)  
       },
       sortDeparture(a,b){
         if(this.$options.filters.fullTimeFilter(a.dt) < this.$options.filters.fullTimeFilter(b.dt))
           return  this.sortType1 == 'inc' ? -1 : 1
         if(this.$options.filters.fullTimeFilter(a.dt) >  this.$options.filters.fullTimeFilter(b.dt))
             return this.sortType1 == 'inc' ? 1 :-1
         return 0   
       },
       sortDuration(a,b){
         if(this.$options.filters.durationFilter(a.du) < this.$options.filters.durationFilter(b.du))
           return  this.sortType2 == 'inc' ? -1 : 1
         if(this.$options.filters.durationFilter(a.du) >  this.$options.filters.durationFilter(b.du))
             return this.sortType2 == 'inc' ? 1 :-1
         return 0  
       },
       sortPrice(a,b){
        if(this.$options.filters.srpPriceFilter(a.fare) < this.$options.filters.srpPriceFilter(b.fare))
           return  this.sortType == 'inc' ? -1 : 1
         if(this.$options.filters.srpPriceFilter(a.fare) >  this.$options.filters.srpPriceFilter(b.fare))
            return this.sortType == 'inc' ? 1 :-1
         return 0 
       }
     }
   }
</script>
<style lang="scss">
  .bus-srp-list-view{
     background:white!important;
      .srp-filter-option{
          border-bottom : 1px solid rgb(235,235,235);
		  font-size: 12px;
          div {
            padding: 8px 10px;
            text-align: center;
            background: #f8f8f8;
            &:hover{
              cursor: pointer;
            }
          }
           .active{
              background: rgba(0,0,0,.12);
            }
      }
      .srp-list-data{
        border-bottom : 1px solid rgb(235,235,235);
        padding:10px;
        .srp-op-name{
          color:rgb(33,33,33);
			font-size: 12px;
			padding-top: 10px;
        }
        .srp-btype{
          color:rgb(158,158,158);
          font-size:12px;
          padding-bottom:5px;
        }
        .srp-time{
          padding-top:5px; 
		  border-bottom: 1px solid rgb(245,245,245);
    	  padding-bottom: 5px;
           .srp-dt{
            color:rgba(0,0,0,.84);
			   font-size: 14px;
          } 
          .icon-forward{
             font-size: 20px;
          }
          .srp-at{
            color:rgba(0,0,0,.54);
			  font-size: 14px;
          }
          .srp-du{
            color:rgba(0,0,0,.54);
            font-size:11px;
			margin-top: 3px;
          }
        }
        .srp-price-seat{
          .srp-price{
             color:rgb(234,35,48);
             float:right;
             font-size:18px;   
          } 
          .srp-seat{
             color:rgb(117,117,117);
             font-size:11px;
             float:right; 
              clear: both;
          }
        }
        
      }
	  .icon-forward {
		 background-position: -72px -3px;
    height: 22px;
    width: 49px;
	  }
  }

	.active.inc .ico-filter {
		background-position: -160px -96px;
		width: 10px;
		height: 19px;
		margin-left: 5px;
	}
	.active .ico-filter {
		background-position: -161px -115px;
		width: 10px;
		height: 19px;
		margin-left: 5px;
	}
	.ico-filter {
		width: 0;
		height: 0
	}
	.srp-price input {
		width: 55px;
	}
</style>

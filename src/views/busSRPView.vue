<template>
  <v-app class="bus-srp-view" v-show="tabActive != null">
    <filter-side-nav-view v-if="filterResultData !=null" 
                          :drawerRight="drawerRight" 
                           :filterResultData="filterResultData" 
                           @closeSideNav="drawerRight = $event"
                           @busSRPFilterList="setFilteredResult($event)"
                           @filterIconNumber="addFilterNumberIcon($event)"></filter-side-nav-view>
    <v-tabs dark grow v-model="tabActive" class="srp-date-tab" style="padding : 0px 0px">
      <div class="fixed">
        <v-toolbar class="white fixed_header" dark grow>
           <v-layout row wrap class="layout_header m16">
           <v-flex xs2 class="lh56" @click="navigateToHome">
             <i class="ico-sprite ico-back"></i>
           </v-flex>
           <v-flex xs8 class="header-text">
              <v-flex xs12 class="header_title_txt roboto-400">{{searchParams.src}} - {{searchParams.dest}}</v-flex>
              <v-flex xs12 class="header_subtitle_txt roboto-400">{{searchParams.qty}} seat(s)  | {{busCount}} Buses</v-flex>
           </v-flex>
           <v-flex xs1>
             <v-toolbar-side-icon v-if="filterResultData !=null" @click.stop="drawerRight = !drawerRight" ></v-toolbar-side-icon>
             <div v-if="filterResultData !=null"  @click.stop="drawerRight = !drawerRight" class="filterIcon"></div>
               <i class="ico-sprite ico-tick" v-if="filterNumber"></i>
           </v-flex>
         </v-layout>
        </v-toolbar>
        <v-tabs-bar class="srp_toolbar">
          <v-tabs-item class="srp-tabs" v-for="dates in allowedDates" :key="dates.tabIndex"  :href="'#' + dates.tabIndex">
            {{dates.displayDate.split(' ')[0]}}<br/>
            {{dates.displayDate.substring(dates.displayDate.split(' ')[0].length+1,dates.displayDate.length)}}
          </v-tabs-item>
        </v-tabs-bar>
      </div>
      <v-tabs-items class="mt102">
        <v-tabs-content  v-for="dates in allowedDates" :key="dates.tabIndex"  :id="dates.tabIndex">
          <div v-if="dates.ajaxDate == searchParams.ddate && busSRPData">
            <bus-srp-list-view :busSrpListViewData="busSRPData" :busSrpSearchID="searchID"></bus-srp-list-view>
          </div>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
      <div class="err" v-if="showError">{{errorMssg}}</div>
    <div class="ajax-loader" v-if="showLoader">
      <div class="sk-wave">
        <div class="sk-rect sk-rect1"></div>
        <div class="sk-rect sk-rect2"></div>
        <div class="sk-rect sk-rect3"></div>
        <div class="sk-rect sk-rect4"></div>
        <div class="sk-rect sk-rect5"></div>
      </div>
	</div>
   <v-snackbar class="snacktxt" :timeout="timeout" :bottom="y === 'bottom'" v-model="snackbar">
      {{snackbarText}}
      <v-btn flat class="txt-ff" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
  import { mapGetters,mapMutations} from 'vuex'
  import * as types from '../store/types' 
  import {getSRPDataAPI} from '../api/api'
  import router from '../router'
  import {getallowedDates, findSRPActiveTab ,scrollSRPTab} from '@/helpers/busSrpHelpers'
  import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
  export default {
    name:'bus-srp-view',
    components:{
      busSrpListView : () => import('@/components/busSRP/busSRPListView'),
      FilterSideNavView : () => import('@/components/busSRP/filterSideNavView')
    },
    data () {
      return {
        timeout: 2000,
        snackbarText:'',
        snackbar:false,
        y: 'bottom',
        searchParams:{},
        tabActive:null,
        showLoader:true,
        allowedDates : getallowedDates(),
        selectedIndex : null,
        busSRPData:null,
        busCount:0,  
        drawerRight: false,
        showError:false,
        errorMssg:'',  
        filterResultData:null,
        searchID:'',
        filterCounter:0,
        filterNumber:false,
        sleeperBusType: 0,
        seaterBusType: 0, 
        semiSeaterBusType:0,
        bus_type_code:'st',
        bus_type_ST:'ST',
        bus_type_SL:'SL'  
      }
    },
    watch:{
      tabActive() {
        this.showLoader = true
        this.searchParams.ddate = this.allowedDates[parseInt(this.tabActive.split('-')[1])-1].ajaxDate
        this.setBusSearchParams(this.searchParams)
        this.getBusSRPData()
        this.clickTabs()        
        if(this.filterCounter >= 1) {
          this.resettingLocalFilter()
        }
        this.filterCounter = this.filterCounter + 1
        if(localStorage.getItem('retainFilterIcon') == "true"){
             this.filterNumber = true
        }
        else{
            this.filterNumber = false
        }
      }
    },
    computed: {
      ...mapGetters({
          getSearchParams:types.GET_BUS_SEARCH_PARMAS
      }),
    },
    methods:{
      ...mapMutations({
        setBusSearchParams : types.SET_BUS_SEARCH_PARMAS
      }),
      setFilteredResult(data) {
        this.busSRPData = null
        console.log('data ' + data.length)
        localStorage.setItem('storeFilterResult',JSON.stringify(data))
        this.busSRPData = data
        this.busCount = data.length
        this.showError = false
        this.errorMssg =  ''
        if(data.length==0){
          this.showError = true
          this.errorMssg =  'No Results Found'
        }
      },      
      clickTabs(){
        var storeCUrrentDate = new Date()
        var firstDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,0)
        var secondDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,1)
        var thirdDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,2)
        if (
            this.searchParams.ddate != firstDay &&
            this.searchParams.ddate != secondDay &&
            this.searchParams.ddate != thirdDay
          ) {
            setTimeout(function() {
              var elementStyle = document.getElementsByClassName(
                "tabs__item tabs__item--active"
              )[0];
              var ofset = elementStyle.offsetLeft;
              var windowOfset = window.outerWidth;
              var finalOffset = -1 * ( windowOfset / 2.5 - ofset); //to get scroll x position

              // removing to remove vuetify transform issue
              // document.getElementsByClassName(
              //   "tabs__container"
              // )[0].style.transform =
              //   "translate(" + finalOffset + "px)";

              document.getElementsByClassName("tabs__container")[0].classList.add("removingTransform")
              document.getElementsByClassName("tabs__container")[0].scrollTo(finalOffset, 0)          
            }, 200);
        }
      },      
      addFilterNumberIcon(showIcon){
          this.filterNumber = showIcon
      },
      navigateToHome () {
        router.push({name:'BusHome'})
      },      
      getBusSRPData () {
          var t0 = performance.now()
          let self = this
          this.busSRPData = null
          this.filterResultData = null
          this.showError = false
          getSRPDataAPI(this.searchParams).then(response => {
             this.showLoader = false
             self.busSRPData = response.data.result.buses
             self.busCount =  response.data.result.buses.length 
             self.searchID = response.data.searchid  
             self.filterResultData = response.data      
          }).catch(error => {
                this.showError = true
                this.errorMssg =  'No Results Found'
          });
      },
      getDate(d,n) {
				return (d.getDate() < 10 ? '0' + (d.getDate() + n) : (d.getDate() + n))
			},
      getMonths(d) {
				return (d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
			},
      setReloadData(data) {
        this.busSRPData = data
        this.busCount = data.length
        this.showError = false
        this.errorMssg =  ''
        if(data.length==0) {
          this.showError = true
          this.errorMssg =  'No Results Found'
        }
      },
      resettingLocalFilter() {
        //clear all local and filtered data
        localStorage.clear();
        this.snackbar = true;
        this.snackbarText = "Your filtered data can't be restored"
      }
    },
    created () {
      this.searchParams = this.getSearchParams
      this.selectedIndex = findSRPActiveTab(this.searchParams.ddate, this.allowedDates)
    },
    mounted() {
       var self = this     
       //scrollSRPTab(this.selectedIndex)
       // filterCounter -> To check wheather we need to reset filter or not
       this.filterCounter = 0
       this.tabActive=`tab-${this.selectedIndex}`
       // adding click tabs func here
       var storeCUrrentDate = new Date()
       var firstDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,0)
       var secondDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,1)
       var thirdDay = storeCUrrentDate.getFullYear()+'-'+this.getMonths(storeCUrrentDate)+'-'+this.getDate(storeCUrrentDate,2)
        if (
            this.searchParams.ddate != firstDay &&
            this.searchParams.ddate != secondDay &&
            this.searchParams.ddate != thirdDay
          ) {
            setTimeout(function() {
              var elementStyle = document.getElementsByClassName(
                "tabs__item tabs__item--active"
              )[0];
              var ofset = elementStyle.offsetLeft;
              var windowOfset = window.outerWidth;
              var finalOffset = -1 * ( windowOfset / 2.5 - ofset); //to get scroll x position

              // removing to remove vuetify transform issue
              // document.getElementsByClassName(
              //   "tabs__container"
              // )[0].style.transform =
              //   "translate(" + finalOffset + "px)";

              document.getElementsByClassName("tabs__container")[0].classList.add("removingTransform")
              document.getElementsByClassName("tabs__container")[0].scrollTo(finalOffset, 0)          
            }, 200);
        }
        // failed to remove transform issue with touch event
        //someElement.addEventListener('touchstart', this.process_touchstart, false)

        //fetching filtered data
        if(localStorage.getItem('storeFilterResult')) {
          let relData = JSON.parse(localStorage.getItem('storeFilterResult'))
          self.setReloadData(relData)
        }
        if(localStorage.getItem('retainFilterIcon') == "true"){
             this.filterNumber = true
        }
        else{
            this.filterNumber = false
        }

        setTimeout(function() {
          adobeAnalyticsPageView("yt:bus:dom:srp","bus","ios/pwa","business","bus srp","domestic bus","","")
        }, 300)
        
    },
     destroyed (){
         var d = document.getElementsByTagName('html')
 	   d[0].style.overflow = 'auto' 
     }
  }
</script>
<style>

 ul.tabs__container.removingTransform {
  -webkit-transform:unset !important;
  transform: unset !important;
  overflow-x: scroll;
 } 
    
   .header-text{
     padding-top:6px;
     margin-left:10px;
     padding-bottom:6px;
   }
   .header_title_txt{
    font-size:16px;
    margin-top:0px;
    color:rgba(0, 0, 0, 0.87)
  }

  .header_subtitle_txt{
    font-size:12px!important;
    color:rgb(158, 158, 158)!important;
  }
  
.header_arrow_back{
    margin-left:0px!important;
    margin-right:12px!important;
    padding:12px!important;
    font-size:24px!important;
    margin-top:-10px;
    padding-right:0px!important;
    padding-left:10px!important;
  }
  .header_arrow_back > i{
    color:rgb(117,117,117);
  }
  .srp-date-tab{
    position:absolute!important;
  }
	.fixed {
		z-index: 9;
		position: fixed;
		top: 0;
		width: 100%;
	}
	.mt102 {
		margin-top: 104px;
	}
	.m16 {
		margin: 16px !important;
	}
	.lh56 {
		line-height: 56px;
	}
	.ico-tick {
    position: absolute;
    top: 3px;
    right: 10px;
	}
  .err{
    margin-top:66%;
    margin-left:32%;
      position:absolute;
  }
</style>
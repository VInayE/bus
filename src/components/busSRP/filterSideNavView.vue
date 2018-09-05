<template>
  <v-app class="filter-side-nav-bar">
    <v-navigation-drawer
      persistent
      v-model="right"
      light
      right
      enable-resize-watcher
      overflow
      absolute 
      class="filter_side_nav"
      v-bind:class="{ fullWidth: drawerRight, zeroWidth:!drawerRight }">
      <v-layout row wrap class="filter_btn optn_filter">
           <v-flex xs7 class="txt_filters">
              <span class="icon_arrow_back"><v-icon class="cl_white_back" @click="closeDrawer">arrow_back</v-icon></span>
              Filter Results</v-flex>
           <v-flex xs3>
             <v-btn class="hv_book_btn" light @click="resetFilters">RESET</v-btn>
          </v-flex>
           <v-flex xs2 @click="closeDrawer" class="apply-btn">APPLY</v-flex>
      </v-layout> 
      <v-layout row wrap>
        <v-flex xs3 class="filter_option_selection">
             <v-layout row wrap class="filterOptionSelected prel" @click="filterSelected = 'time_type'" v-bind:class="{selectedTab:filterSelected == 'time_type'}">
             <i class="ico-sprite ico-tick pabs" v-if="time_type1"></i>
              <i class="ico-sprite ico-time pabs"></i>
               <p class="txt_bus_operator" >Time & Type</p>
           </v-layout>
           <v-layout row wrap class="filterOptionSelected prel" @click="filterSelected = 'operator'" v-bind:class="{selectedTab:filterSelected == 'operator'}">
              <i class="ico-sprite ico-tick pabs" v-if="operator"></i>
               <i class="ico-sprite ico-bus pabs"></i>
               <p class="txt_bus_operator" >Bus Operator</p>
           </v-layout>
           <v-layout row wrap class="filterOptionSelected prel" @click="filterSelected = 'pickup'"  v-bind:class="{selectedTab:filterSelected == 'pickup'}">
               <i class="ico-sprite ico-tick pabs" v-if="pickup"></i>
               <i class="ico-sprite ico-loc pabs"></i>
               <p class="txt_bus_operator">Pickup Points</p>
           </v-layout>
           <v-layout row wrap class="filterOptionSelected prel" @click="filterSelected = 'dropoff'" v-bind:class="{selectedTab:filterSelected == 'dropoff'}">
               <i class="ico-sprite ico-tick pabs" v-if="dropoff"></i>
               <i class="ico-sprite ico-loc pabs"></i>
               <p class="txt_bus_operator" >Drop Off Points</p>
           </v-layout>
           <v-layout row wrap>
               <v-flex xs12>
                   <div class="iodo-wrapper">
                   <span class="digit2" v-if="digit21">{{digit2}}</span>
                   <span class="digit3" v-if="digit31">{{digit3}}</span>
                   <span class="digit4" v-if="digit41">{{digit4}}</span>
                   <span class="digit1">{{filterCount}}</span>
                   </div>
                    <p class="iodo-result">Results Left</p>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs9 class="filter-option-data">
			<div class="time_type_checkbox" v-show="filterSelected == 'time_type'">
				<v-layout row wrap>
					<v-flex xs12 class="t-head">Air Conditioning</v-flex>
					<v-flex xs12 v-if="seatType!='NAC'" v-for="seatType in filterResultData.result.filter.amenities" :key="seatType">
					  <input type="checkbox" color="red" :label="seatType" :value="seatType" v-model="ex3" light class="premium" checked="checked">
            {{seatType}}
            <span class="count" style="top:98px">({{acBusType}})</span>
				  </v-flex>
		      <v-flex xs12 v-if="seatType=='NAC'" v-for="seatType in filterResultData.result.filter.amenities" :key="seatType">		
            <input type="checkbox" color="red" label="NAC" :value="seatType" v-model="ex3" light class="premium">
            Non AC
            <span class="count" style="top:124px">({{nonACBusType}})</span>
          </v-flex>
				</v-layout>
				<v-layout row wrap class="seat-type">
					<v-flex xs12 class="t-head">Bus Seating Type</v-flex>
					<v-flex xs12 v-for="filterType in filterResultData.result.filter.busType" v-if="filterType=='SL'" :key="filterType" class="prel"><input type="checkbox" label="Sleeper" :value="filterType" color="red" v-model="ex4" light class="premium" >Sleeper<span class="count">({{sleeperBusType}})</span></v-flex>
					<v-flex xs12 v-for="filterType in filterResultData.result.filter.busType" v-if="filterType=='ST'" :key="filterType" class="prel"><input type="checkbox" label="Seater" :value="filterType" color="red" v-model="ex4" light class="premium">Seater
					 <span class="count">({{seaterBusType}})</span></v-flex>
					<v-flex xs12 v-for="filterType in filterResultData.result.filter.busType" v-if="filterType=='SS'" :key="filterType" class="prel"><input type="checkbox" label="Semi-Sleeper" :value="filterType" color="red" v-model="ex4" light class="premium">Semi Sleeper<span class="count">({{semiSeaterBusType}})</span></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs12 class="t-head">Departure Time</v-flex>
					<v-flex xs12>
						<ul class="time-filter">
						 <li @click="timeData('0-11',$event)" v-bind:class="{active: first}"><i class="ico-sprite ico-early"></i>Before 11 am</li>
						 <li @click="timeData1('11-17',$event)" v-bind:class="{active: second}"><i class="ico-sprite ico-sun"></i>11 am - 5 pm</li>
						 <li @click="timeData2('17-19',$event)" v-bind:class="{active: third}"><i class="ico-sprite ico-sunset"></i>5 pm - 9 pm</li>
						 <li @click="timeData3('19-24',$event)" v-bind:class="{active: fourth}"><i class="ico-sprite ico-moon"></i>After 9 pm</li>
						</ul>
					</v-flex>
				</v-layout>
			</div>

			<div class="operator-checkbox-div" v-show="filterSelected == 'dropoff'">
                <v-text-field append-icon="search" name="input-2-3" label="Search Drop" class="input-group--focused srcOpt"  single-line v-model="searchDrop"></v-text-field>
				<span v-for="filterData in filteredDrop" style="display:block">
				<input type="checkbox" class="operator-checkbox" color="red" :id="filterData.id" v-model="ex6" :label="filterData.name" :value="filterData.id">{{filterData.name}}
				</span>
			</div> 


			<div class="operator-checkbox-div" v-show="filterSelected == 'pickup'">
                <v-text-field append-icon="search" name="input-2-3" label="Search Board" class="input-group--focused srcOpt"  single-line v-model="searchBoard"></v-text-field>
				<span v-for="filterData in filteredBoard" style="display:block">
				<input type="checkbox" class="operator-checkbox" color="red" :id="filterData.id" v-model="ex5" :label="filterData.name" :value="filterData.id">{{filterData.name}}</span>
			</div>  

			<div class="operator-checkbox-div" v-show="filterSelected == 'operator'">
				<v-text-field append-icon="search" name="input-2-3" label="Search Operator" class="input-group--focused srcOpt"  single-line v-model="searchOper"></v-text-field>
				<span v-for="filterData in filteredOperators" style="display:block">
				<input type="checkbox" class="operator-checkbox" color="red" :id="filterData.id" v-model="ex7" :label="filterData.name" :value="filterData.id">{{filterData.name}}   ({{frst[filterData.id]}})</span>
			</div>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import { filterBusSRPResult } from "@/helpers/busSrpHelpers";
import { adobeAnalyticsPageView } from "../../helpers/adobeAnalytics";
export default {
  name: "filter-side-nav-bar",
  props: {
    drawerRight: {
      type: Boolean,
      required: true
    },
    filterResultData: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {
      right: null,
      ex5: [],
      ex3: [],
      ex4: [],
      ex6: [],
      ex7: [],
      ex10: false,
      digit1: 0,
      digit21: true,
      digit31: true,
      digit41: true,
      digit2: 0,
      digit3: 0,
      digit4: 0,
      filterCount: 0,
      time_type1: false,
      operator: false,
      pickup: false,
      dropoff: false,
      first: false,
      second: false,
      third: false,
      fourth: false,
      timeDataSelected: [],
      filterSelected: "time_type",
      filterOption: {
        operator: [],
        boardingPoint: [],
        droppingPoint: [],
        seatType: [],
        busType: [],
        timeType: []
      },
      ex1: [],
      ex2: [],
      timeDataSelected: [],
      filterBusOperatorResetVal: [],
      filterPickUpPointResetVal: [],
      filterDropResetVal: [],
      searchOper: "",
      searchBoard: "",
      searchDrop: "",
      operatorResult: [],
      boardResult: [],
      dropResult: [],
      sleeperBusType: 0,
      seaterBusType: 0,
      semiSeaterBusType: 0,
      bus_type_code: "st",
      bus_type_ST: "ST",
      bus_type_SL: "SL",
      filterDatas: null,
      amenitiy_type_code: "amenities",
      acBusType: 0,
      nonACBusType: 0,
      frst:{}    
    };
  },
  created() {
    this.right = this.drawerRight;
    this.operatorResult = this.filterResultData.result.filter.operatorNames;
    this.boardResult = this.filterResultData.result.filter.boardingPoints;
    this.dropResult = this.filterResultData.result.filter.droppingPoints;
    this.filterCount1 = this.filterResultData.result.buses.length;
    this.filterDatas = this.filterResultData.result.buses;
    this.frst = {} 
    var cnt = 0;
    for (var t = 0; t < this.operatorResult.length; t++ ) {
        cnt = 0
        for(var j=0; j<this.filterDatas.length; j++){
            if(this.operatorResult[t].id == this.filterDatas[j].opId){
                cnt++
            }
        }
        if(cnt>0){
             this.frst[this.operatorResult[t].id] = cnt
           }
        else{
             this.frst[this.operatorResult[t].id] = 1
        }
        
      if (this.filterDatas[t][this.amenitiy_type_code][0] === "AC") {
        this.acBusType++;
      } else {
        this.nonACBusType++;
      }
      if (this.filterDatas[t][this.bus_type_code] === this.bus_type_ST) {
        this.seaterBusType++;
      } else if (this.filterDatas[t][this.bus_type_code] === this.bus_type_SL) {
        this.sleeperBusType++;
      } else {
        this.semiSeaterBusType++;
      }
    }  
      
    if (this.filterCount1 >= 0 && this.filterCount1 <= 9) {
      this.filterCount = this.filterResultData.result.buses.length;
    }
    if (this.filterCount1 >= 10 && this.filterCount1 < 100) {
      this.digit4 = this.filterCount1.toString()[0];
      this.filterCount = this.filterCount1.toString()[1];
    } else if (this.filterCount1 >= 100) {
      this.digit3 = this.filterCount1.toString()[0];
      this.digit4 = this.filterCount1.toString()[1];
      this.filterCount = this.filterCount1.toString()[2];
    }
  },
  watch: {
    drawerRight() {
      this.right = this.drawerRight;
      this.searchOper = "";
      this.searchBoard = "";
      this.searchDrop = "";
      adobeAnalyticsPageView(
        "yt:bus:dom:srp:filter",
        "bus",
        "ios/pwa",
        "business",
        "bus srp",
        "domestic bus",
        "filter",
        ""
      );
    },
    ex5() {
      if (this.ex5.length > 0) {
        this.pickup = true;
      } else {
        this.pickup = false;
      }
      this.applyPickUpFilter(this.ex5);
    },
    ex4() {
      if (
        this.ex3.length > 0 ||
        this.ex4.length > 0 ||
        this.timeDataSelected.length > 0
      ) {
        this.time_type1 = true;
      } else {
        this.time_type1 = false;
      }
      this.applyBusTypeFilter(this.ex4);
    },
    ex3() {
      console.log(this.ex3)
      if (
        this.ex3.length > 0 ||
        this.ex4.length > 0 ||
        this.timeDataSelected.length > 0
      ) {
        this.time_type1 = true;
      } else {
        this.time_type1 = false;
      }
      this.applySeatTypeFilter(this.ex3);
    },
    timeDataSelected() {
      if (
        this.ex3.length > 0 ||
        this.ex4.length > 0 ||
        this.timeDataSelected.length > 0
      ) {
        this.time_type1 = true;
      } else {
        this.time_type1 = false;
      }
      this.applyBusTimeFilter(this.timeDataSelected);
    },
    ex6() {
      if (this.ex6.length > 0) {
        this.dropoff = true;
      } else {
        this.dropoff = false;
      }
      this.applyDropOffFilter(this.ex6);
    },
    ex7() {
      if (this.ex7.length > 0) {
        this.operator = true;
      } else {
        this.operator = false;
      }
      this.applyOperatorFilter(this.ex7);
    }
  },
  computed: {
    filteredOperators: function() {
      var self = this;
      return this.operatorResult.filter(function(cust) {
        return cust.name.toLowerCase().indexOf(self.searchOper.toLowerCase()) >= 0;
      });
    },
    filteredBoard: function() {
      var self = this;
      return this.boardResult.filter(function(cust) {
        return cust.name.toLowerCase().indexOf(self.searchBoard.toLowerCase()) >= 0;
      });
    },
    filteredDrop: function() {
      var self = this;
      return this.dropResult.filter(function(cust) {
        return cust.name.toLowerCase().indexOf(self.searchDrop.toLowerCase()) >= 0;
      });
    }
  },
  mounted(){
      this.ex3 = (localStorage.getItem('retainFilterAcNac') && localStorage.getItem('retainFilterAcNac').length > 0) ? JSON.parse(localStorage.getItem('retainFilterAcNac')) : []
      this.ex4 = (localStorage.getItem('retainFilterSleeper') && localStorage.getItem('retainFilterSleeper').length > 0) ? JSON.parse(localStorage.getItem('retainFilterSleeper')) : []      
      this.ex5 = (localStorage.getItem('retainFilterPickup') && localStorage.getItem('retainFilterPickup').length > 0) ? JSON.parse(localStorage.getItem('retainFilterPickup')) : []     
      this.ex6 = (localStorage.getItem('retainFilterDropOff') && localStorage.getItem('retainFilterDropOff').length > 0) ? JSON.parse(localStorage.getItem('retainFilterDropOff')) : []      
      this.ex7 = (localStorage.getItem('retainFilterOperator') && localStorage.getItem('retainFilterOperator').length > 0) ? JSON.parse(localStorage.getItem('retainFilterDropOff')) : []      
      this.timeDataSelected = (localStorage.getItem('retainFilterTimeType') && localStorage.getItem('retainFilterTimeType').length > 0) ? JSON.parse(localStorage.getItem('retainFilterTimeType')) : []      
  },
  methods: {
    closeDrawer() {
      localStorage.setItem('retainFilterAcNac',JSON.stringify(this.ex3))
      localStorage.setItem('retainFilterSleeper',JSON.stringify(this.ex4))
      localStorage.setItem('retainFilterPickup',JSON.stringify(this.ex5))
      localStorage.setItem('retainFilterDropOff',JSON.stringify(this.ex6))
      localStorage.setItem('retainFilterOperator',JSON.stringify(this.ex7))
      localStorage.setItem('retainFilterTimeType',JSON.stringify(this.timeDataSelected))
      this.right = false;
      if (this.operator || this.dropoff || this.time_type1 || this.pickup) {
        localStorage.setItem('retainFilterIcon',true)  
        this.$emit("filterIconNumber", true);
      } else {
        localStorage.setItem('retainFilterIcon',false)  
        this.$emit("filterIconNumber", false);
      }

      this.$emit("closeSideNav", false);
    },
    resetFilters() {
      this.ex5 = [];
      this.filterOption = {
        operator: [],
        boardingPoint: [],
        droppingPoint: [],
        seatType: [],
        busType: [],
        timeType: []
      };
      this.ex3 = [];
      this.ex4 = [];
      this.timeDataSelected = [];
      this.ex6 = [];
      this.ex7 = [];
      this.timeDataSelected = [];
      this.first = false;
      this.second = false;
      this.fourth = false;
      this.third = false;
      this.$emit("filterIconNumber", false);
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );
      this.$emit("busSRPFilterList", filterlist);
    },
    restCounters(filterCount1) {
      if (filterCount1 >= 0 && filterCount1 <= 9) {
        this.digit21 = true;
        this.digit31 = true;
        this.digit3 = 0;
        this.digit4 = 0;
        this.filterCount = filterCount1;
      } else if (filterCount1 >= 10 && filterCount1 < 100) {
        this.digit21 = true;
        this.digit3 = 0;
        this.digit4 = filterCount1.toString()[0];
        this.filterCount = filterCount1.toString()[1];
      } else if (filterCount1 >= 100) {
        this.digit21 = true;
        this.digit31 = true;
        this.digit3 = filterCount1.toString()[0];
        this.digit4 = filterCount1.toString()[1];
        this.filterCount = filterCount1.toString()[2];
      }
    },
    applyPickUpFilter(data) {
      this.filterOption.boardingPoint = data;
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );
      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;
            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );
      this.$emit("busSRPFilterList", filterlist);
    },
    applyDropOffFilter(data) {
      this.filterOption.droppingPoint = data;
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );
      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;

            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );

      this.$emit("busSRPFilterList", filterlist);
    },

    applyOperatorFilter(data) {
      this.filterOption.operator = data;
      var filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );

      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;

            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );

      this.$emit("busSRPFilterList", filterlist);
    },
    applySeatTypeFilter(data) {
      this.filterOption.seatType = data;
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );

      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;

            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );

      this.$emit("busSRPFilterList", filterlist);
    },
    applyBusTypeFilter(data) {
      this.filterOption.busType = data;
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );
      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;
            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );

      this.$emit("busSRPFilterList", filterlist);
    },
    applyBusTimeFilter(data) {
      this.filterOption.timeType = data;
      let filterlist = filterBusSRPResult(
        this.filterResultData.result.buses,
        this.filterOption
      );
      clearInterval(this.interval);
      if (this.filterCount1 == filterlist.length) {
        return;
      }
      this.interval = window.setInterval(
        function() {
          if (filterlist.length != this.filterCount1) {
            var change = (filterlist.length - this.filterCount1) / 10;

            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            this.filterCount1 = this.filterCount1 + change;

            this.restCounters(this.filterCount1);
          }
        }.bind(this),
        20
      );

      this.$emit("busSRPFilterList", filterlist);
    },
    timeData(time, e) {
      var count = 0;
      var spliceIndex = 0;
      if (this.timeDataSelected.length == 0) {
        this.timeDataSelected.push(time);
      } else {
        for (var tm1 = 0; tm1 < this.timeDataSelected.length; tm1++) {
          if (time == this.timeDataSelected[tm1]) {
            spliceIndex = tm1;
            count = count + 1;
          }
        }
        if (count == 0) {
          this.timeDataSelected.push(time);
        } else {
          this.timeDataSelected.splice(spliceIndex, 1);
        }
      }

      this.$emit("applyBusTimeFilter", this.timeDataSelected);

      if (this.first == false) {
        this.first = true;
      } else {
        this.first = false;
      }
    },
    timeData1(time, e) {
      var count = 0;
      var spliceIndex = 0;
      if (this.timeDataSelected.length == 0) {
        this.timeDataSelected.push(time);
      } else {
        for (var tm2 = 0; tm2 < this.timeDataSelected.length; tm2++) {
          if (time == this.timeDataSelected[tm2]) {
            spliceIndex = tm2;
            count = count + 1;
          }
        }
        if (count == 0) {
          this.timeDataSelected.push(time);
        } else {
          this.timeDataSelected.splice(spliceIndex, 1);
        }
      }

      this.$emit("applyBusTimeFilter", this.timeDataSelected);

      if (this.second == false) {
        this.second = true;
      } else {
        this.second = false;
      }
    },
    timeData2(time, e) {
      var count = 0;
      var spliceIndex = 0;
      if (this.timeDataSelected.length == 0) {
        this.timeDataSelected.push(time);
      } else {
        for (var tm3 = 0; tm3 < this.timeDataSelected.length; tm3++) {
          if (time == this.timeDataSelected[tm3]) {
            spliceIndex = tm3;
            count = count + 1;
          }
        }
        if (count == 0) {
          this.timeDataSelected.push(time);
        } else {
          this.timeDataSelected.splice(spliceIndex, 1);
        }
      }

      this.$emit("applyBusTimeFilter", this.timeDataSelected);

      if (this.third == false) {
        this.third = true;
      } else {
        this.third = false;
      }
    },
    timeData3(time, e) {
      var count = 0;
      var spliceIndex = 0;
      if (this.timeDataSelected.length == 0) {
        this.timeDataSelected.push(time);
      } else {
        for (var tm4 = 0; tm4 < this.timeDataSelected.length; tm4++) {
          if (time == this.timeDataSelected[tm4]) {
            spliceIndex = tm4;
            count = count + 1;
          }
        }
        if (count == 0) {
          this.timeDataSelected.push(time);
        } else {
          this.timeDataSelected.splice(spliceIndex, 1);
        }
      }

      this.$emit("applyBusTimeFilter", this.timeDataSelected);

      if (this.fourth == false) {
        this.fourth = true;
      } else {
        this.fourth = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.selectedTab {
  p {
    color: rgb(234, 35, 48) !important;
  }
  .ico-time {
    background-position: -150px -4px;
  }
  .ico-bus {
    background-position: -141px -56px;
  }
  .ico-loc {
    background-position: -141px -34px;
  }
}
.txt_bus_operator {
  width: 100%;
  text-align: center;
  color: rgb(143, 142, 148);
  font-size: 11px;
}
.filter-option-data {
  background-color: rgb(238, 238, 238);
  margin-top: 2px;
}
.filter_side_nav {
  position: fixed !important;
  height: auto !important;
}
.filterOptionSelected {
  background-color: white;
  padding-left: 0 !important;
  height: 100px;
  border-bottom: 2px solid rgb(238, 238, 238);
  padding-top: 70px;
}
.filter_option_selection {
  height: calc(100vh - 56px);
  margin-top: 5px;
}
.filter_option_selection .pabs {
  left: 35%;
  top: 30px;
}
.filter_side_nav {
  position: fixed !important;
  height: auto !important;
}
.fullWidth {
  width: 100% !important;
}
.zeroWidth {
  width: 0% !important;
}
.filter_btn {
  background-color: white;
}
.optn_filter {
  height: 56px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
.txt_filters {
  font-size: 16px;
  font-weight: 500;
  margin-top: 15px;
  color: #333;
}
.icon_arrow_back {
  padding-left: 14px;
}
.cl_white_back {
  font-size: 24px;
  margin-right: 10px;
}
.txt_reset {
  font-size: 14px;
  font-weight: 500;
  position: relative;
  top: 8px;
}
.hv_book_btn {
  background-color: white !important;
  color: #ea2330 !important;
  box-shadow: none;
  height: 25px;
  border-radius: 5px;
  margin-top: 16px;
  float: right;
  margin-right: 0px !important;
}
.ico-time {
  background-position: -120px -4px;
  width: 30px;
  height: 30px;
}
.ico-bus {
  background-position: -111px -56px;
  width: 30px;
  height: 30px;
}
.ico-loc {
  background-position: -111px -34px;
  width: 30px;
  height: 30px;
}
.apply-btn {
  position: relative;
  top: 18px;
  font-weight: 500;
  font-size: 14px;
  color: #ea2330;
}

.time_type_checkbox {
  margin-left: 10px;
}
.t-head {
  margin: 10px 0;
  font-size: 12px;
}
.active {
  border-bottom: 1px solid #ea2330 !important;
  color: #ea2330 !important;
  .ico-early {
    background-position: -50px -180px;
  }
  .ico-sun {
    background-position: -50px -150px;
  }
  .ico-sunset {
    background-position: -50px -260px;
    height: 30px;
  }
  .ico-moon {
    background-position: -100px -147px;
    height: 30px;
  }
}
.time-filter {
  padding-left: 0;
  li {
    list-style-type: none;
    padding: 13px;
    color: #666;
    font-size: 12px;
    background: #fff;
    transition: ease out 0.5s;
    float: left;
    width: 24%;
    &:last-child {
      border-bottom: none;
    }
  }
}
.ico-early {
  background-position: -50px -210px;
  height: 30px;
}
.ico-sun {
  background-position: -50px -120px;
  height: 30px;
}
.ico-sunset {
  background-position: -50px -237px;
  height: 30px;
}
.ico-moon {
  background-position: -100px -120px;
  height: 30px;
}

.filter-bus-operator {
  padding-bottom: 20px;
}
.operator-checkbox {
  margin-left: 10px;
  margin-right: 8px;
  width: 30px;
  height: 15px;
  vertical-align: sub;
}
.operator-checkbox-div {
  height: 90vh;
  overflow: auto;
  margin-bottom: 10px;
  padding-bottom: 10px;
  margin-top: 16px;
   span {
       text-transform: capitalize;
       padding: 5px 2px;
       font-size: 15px;
   }
}
.filter-bus-operator label {
  margin-left: 10px;
}

.filter_option_selection .ico-tick {
  top: 0px;
  left: 65px;
}
.seat-type > div {
  height: 35px;
}
.seat-type > div:first-child {
  height: 18px;
}

.iOdometer {
  text-align: center;
  display: inline-block;
  width: 84%;
  margin-top: 30px;
  margin: 10px;
  background: #333;
  color: #fff;
  padding: 2px 0;
}
.odometer-inside {
  background: #333;
  min-width: 50px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
  margin-top: 50px;
  height: 30px;
  color: #fff;
  max-width: 100px;
}
.iodo-wrapper {
  background: #999;
  text-align: center;
  margin: 5px 10px;
  color: #fff;
}
.iodo-wrapper span {
  padding: 0 2px;
}

.iodo-wrapper span:last-child {
  border-right: none;
}

.iodo-result {
  margin-top: 2px;
  margin-left: 14px;
  font-size: 12px;
  color: #999;
}

.count {
  position: absolute;
  right: 16px;
  top: 3px;
  font-size: 12px;
}

.operator-checkbox-div span {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 99%;
  overflow: hidden;
}

srcOpt {
  padding-left: 10px;
  padding-right: 10px;
}
.premium {
  margin-right: 8px;
}

@media screen and (max-width: 360px) {
  .time-filter {
    padding-left: 0;
    li {
      font-size: 9px;
    }
  }
}
</style>

<template>
	<div>
	<div class="fixed">
		<v-toolbar v-if="showCalenderToolbar">
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateHome"><v-icon>arrow_back</v-icon></v-flex>
				<v-flex xs8>Select Date</v-flex>
			</v-layout>
		</v-toolbar>
		<ul class="days">
			<li>Mon</li>
			<li>Tue</li>
			<li>Wed</li>
			<li>Thu</li>
			<li>Fri</li>
			<li>Sat</li>
			<li>Sun</li>
		</ul>
		</div>
		<div class="calender prel">
			<div class="calender_div" v-if="showCalender">
				<div class="date-arrow" >
					<div v-for="(calender,index) in calenderLength" :key='index'>
						<datepicker :full-month-name="true" :maximum-view="'day'" v-on:selected="changeDateOnSelection($event,index)" v-bind:class="{ selectedDate: getSelectedDateIndex(index) , unselectedDate : getSelectedDateIndex(index) }" :value="calculateDate(index)" :inline="true" :monday-first="true" :disabled="index ==0 ?state.disabled:state.disabled_2 " class="input-grp date_picker"></datepicker>
					</div>
				</div>
			</div>
<!--			<i class="ico-sprite ico-cal"></i>-->
		</div>
	</div>
</template>
<script>
	import { mapGetters,mapMutations } from 'vuex'
	import * as types from '../store/types'
	import Datepicker from 'vuejs-datepicker'
	import router from '../router'
	import Vue from 'vue'
	import { adobeAnalyticsPageView } from '../helpers/adobeAnalytics'
	export default {
		components: {
			Datepicker
		},
		computed:{
			...mapGetters({
				 getUpdatedDate:types.GET_UPDATED_DATE,
                 getUpdatedIndex:types.GET_UPDATED_INDEX
			})
		  },
		data() {
			return {
				calenderLength: 2,
				selectedCalenderIndex: this.getUpdatedIndex,
				showCalender: true,
				showCalenderToolbar:true,
				ddate:this.getUpdatedDate,
				state: {
					disabled: {
						days: [],
						to: new Date(new Date().setDate(new Date().getDate() - 1)),
						dates: [],
					},
					disabled_2: {
						days: [],
						from: '',
						dates: []
					}
				}
            }
		},
		methods: {
			 ...mapMutations({
             setUpdatedDate:types.SET_UPDATED_DATE,
             setUpdatedIndex:types.SET_UPDATED_INDEX
           
         }),
            getSelectedDateIndex(index1){
			   let date1 = new Date()
			   let date2 = date1.setMonth(date1.getMonth()+index1)
			   date2 = new Date(date2)
			   if(new Date(this.ddate).getMonth() == date2.getMonth()){
				   return false
			   }else{
				   return true
			   }
			},
			calculateDate(index) {
                var abc = index
				if (index == this.selectedCalenderIndex) {
					return this.ddate
				} else {
					var today = new Date()
					return new Date(today.getFullYear(), today.getMonth() + index, today.getDate()-1)
				}
			},
			findDisplayDate(date) {
				return date.getDate() + '/' + parseInt(parseInt(date.getMonth()) + 1) + '/' + date.getFullYear()
			},
			navigateHome(){
				router.push({
					name: 'BusHome'
				})
			},
			changeDateOnSelection(event, index) {
				this.ddate = event
				this.selectedCalenderIndex = index
                localStorage.setItem('calenderDate',event)
                localStorage.setItem('calenderIndex',index)
				this.setUpdatedDate(this.ddate)
                this.setUpdatedIndex(index)
                
				router.push({
					name: 'BusHome'
				})
			},
			 getDate (date) {
			 var d = new Date(date)
			 return (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
		  }
		},
        created(){
          this.ddate = this.getUpdatedDate
          this.selectedCalenderIndex = this.getUpdatedIndex  
          var currentDate = new Date().getMonth()
          var twoMonthsDate = new Date(new Date().setDate(new Date().getDate()+61))
          var differMonths = parseInt(twoMonthsDate.getMonth()) - parseInt(currentDate)
          this.calenderLength = differMonths+1
        },
		 mounted(){
			 adobeAnalyticsPageView("yt:bus:home:calendar","bus","ios/pwa","business","bus home","calendar","","")
             
		 }
	}

</script>
<style  scoped lang="scss">
.calender {
	margin-top: 105px;
		.calender_div {
			.date-arrow {
				overflow-y: auto;
				overflow-x: hidden;
				width: 100%;
				box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.11);
				top: 50px;
				z-index: 9;
				margin-top: 10px;
				box-shadow: none!important;
			}
            
		}
    span.cell.day.selected.disabled {
    color: #ddd!important;
}
		.date_picker {
			background: none!important;
			border: 0px !important;
			margin-top: 0px!important;
			height: 100%!important;
		}
		.date-txt {
			float: left;
			margin-top: 8px;
			color: #666666;
			font-size: 14px;
		}
	}
	.days{
		background: #F5F5F5;
		padding: 0px;
		margin-top: 10px;
		box-shadow: none;
		width: 100vw;
		display: flex;
		li {
			display: inline-block;
			list-style-type: none;
			width: calc(100vw / 7);
			text-align: center;
			padding: 10px;
			color: #9E9E9E;
		}
	} 
	.fixed {
		position: fixed;
		top: 0;
		z-index: 9;
		background: #fff;
	}
</style>
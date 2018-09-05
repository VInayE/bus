<template>
  <div>
      <v-toolbar>
			<v-layout row wrap class="nav-bar side-padding">
				<v-flex xs2 @click="navigateSeatMap"><v-icon>arrow_back</v-icon></v-flex>
				<v-flex xs8>Cancellation Policy</v-flex>
			</v-layout>
		</v-toolbar>
     <table class="cancel">
     		<tr>
     			<th>Cancellation Time</th>
     			<th>Refund</th>
     		</tr>
		  <tr v-for="cpName in cancellationData" :key='cpName.text'>
			  <td>{{cpName.text}}</td>
			  <td>{{cpName.amount}}%</td>
		  </tr>
      </table>
  </div>
</template>
<script>
  import router from '../router'
  export default {
    methods: {
     navigateSeatMap(){
         let cancelBack = localStorage.getItem('cancellationNavigation')
         if(cancelBack == 'SeatMap'){
            router.push({name:'BusSeatMap'})
            }
            else{
            router.push({name:'BusReview'})
            }
         
     }
    },
    created(){
      this.cancellationData = JSON.parse(localStorage.getItem('cancellationPolicy'))
    },
    data () {
      return {
        cancellationData:null
      }
    }
  }
</script>
<style scoped>
  .card__title{
    padding: 16px 16px 0; font-size: 22px !important;
  }
  .card__text{
    padding: 16px 16px 0;
  }
  .cancel{
    width: 98%;
  }
  .cancel td, .cancel th {
    border: 1px solid #ddd;
    padding: 8px;
    font-size: 14px;
  }
	.cancel {
		margin:5px 0 0 5px;
	}
  .cancel tr:nth-child(even){
    background-color: #f2f2f2;
  }
  .cancel tr:hover {
    background-color: #ddd;
  }
  .cancel th {
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: left;
    background-color: #ea2330;
    color: white;
	  font-size: 16px;
  }
</style>
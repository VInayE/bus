<template>
  <v-app class="filter-time-type-view">
    <div class="time_type_checkbox">
      <v-layout row wrap>
       <v-flex xs12 class="t-head">Air Conditioning</v-flex>
       <v-flex xs12 v-for="seatType in busFilterAmenities" :key="seatType"><v-checkbox color="red" :label="seatType" :value="seatType" v-model="ex3" light class="premium">{{seatType}}</v-checkbox></v-flex>
    </v-layout>
     <v-layout row wrap>
       <v-flex xs12 class="t-head">Bus Seating Type</v-flex>
       <v-flex xs12 v-for="filterType in busFilterBusType" :key="filterType"><v-checkbox :label="filterType" :value="filterType" color="red" v-model="ex4" light class="premium">{{filterType}}</v-checkbox></v-flex>
    </v-layout>
     <v-layout row wrap>
         <v-flex xs12><ul class="time-filter">
             <li @click="timeData('0-11',$event)"><i class="ico-sprite ico-early"></i>Before 11 am</li>
             <li @click="timeData1('11-17',$event)"><i class="ico-sprite ico-sun"></i>11 am - 5 pm</li>
             <li @click="timeData2('17-19',$event)"><i class="ico-sprite ico-sunset"></i>5 pm - 9 pm</li>
             <li @click="timeData3('19-24',$event)"><i class="ico-sprite ico-moon"></i>After 9 pm</li>
         </ul></v-flex>
    </v-layout>
    </div>   
  </v-app>    
</template>
<script>
 export default {
    name:"filter-time-type-view",
    props:{
      filterBusType:{
         type:Array,
         required:true 
      },
      filterAmenities:{
        type:Array,
        required:true  
      },
      resetFiltersEX1:{
          type:Array,
          required:true
      },
      resetFiltersEX2:{
          type:Array,
          required:true
      },
      resetFiltersTimeType:{
          type:Array,
          required:true
      }    
    },
    data(){
      return {
        busFilterAmenities:null,
        busFilterBusType:null,
        ex3:[],
        ex4:[],
        busTypeName:[],
        timeDataSelected:[]  
      } 
    },
    created(){
       this.busFilterAmenities = this.filterAmenities
       this.busFilterBusType = this.filterBusType
    },
     watch:{
      resetFiltersEX1(){
         this.ex3 = this.resetFiltersEX1
       },
      resetFiltersEX2(){
         this.ex4 = this.resetFiltersEX2
       },
      resetFiltersTimeType(){
         this.timeDataSelected = this.resetFiltersTimeType
       },
        ex4(){
            this.$emit('applyBusTypeFilter',this.ex4)
        },
        ex3(){
            this.$emit('applyBusTypeFilter',this.ex3)
        },
        timeDataSelected(){
            this.$emit('applyBusTypeFilter',this.timeDataSelected)
         }
    },
     methods:{
         timeData(time,e){
             var count = 0
             var spliceIndex = 0
             if(this.timeDataSelected.length==0){
                 this.timeDataSelected.push(time)
             }
             else{
                 for(var tm1=0;tm1<this.timeDataSelected.length;tm1++){
                     if(time==this.timeDataSelected[tm1]){
                         spliceIndex = tm1
                         count = count+1
                     }
                 }
                 if(count==0)
                     {
                          this.timeDataSelected.push(time)
                     }
                 else{
                     this.timeDataSelected.splice(spliceIndex,1)
                 }
             }
             
                this.$emit('applyBusTimeFilter',this.timeDataSelected)
                
             if(e.currentTarget.className=='active'){
                 e.currentTarget.className=''
             }
             else{
                 e.currentTarget.className='active'
             }
             
         },
         timeData1(time,e){
             var count = 0
             var spliceIndex = 0
             if(this.timeDataSelected.length==0){
                 this.timeDataSelected.push(time)
             }
             else{
                 for(var tm2=0;tm2<this.timeDataSelected.length;tm2++){
                     if(time==this.timeDataSelected[tm2]){
                         spliceIndex = tm2
                         count = count+1
                     }
                 }
                   if(count==0)
                     {
                          this.timeDataSelected.push(time)
                     }
                 else{
                     this.timeDataSelected.splice(spliceIndex,1)
                 }
             }
            
                this.$emit('applyBusTimeFilter',this.timeDataSelected)
                
              if(e.currentTarget.className=='active'){
                 e.currentTarget.className=''
             }
             else{
                 e.currentTarget.className='active'
             }
         },
         timeData2(time,e){
             var count = 0
             var spliceIndex = 0
            if(this.timeDataSelected.length==0){
                 this.timeDataSelected.push(time)
             }
             else{
                 for(var tm3=0;tm3<this.timeDataSelected.length;tm3++){
                     if(time==this.timeDataSelected[tm3]){
                         spliceIndex = tm3
                         count = count+1
                     }
                 }
                 if(count==0)
                     {
                          this.timeDataSelected.push(time)
                     }
                 else{
                     this.timeDataSelected.splice(spliceIndex,1)
                 }
             }
            
                this.$emit('applyBusTimeFilter',this.timeDataSelected)
                
              if(e.currentTarget.className=='active'){
                 e.currentTarget.className=''
             }
             else{
                 e.currentTarget.className='active'
             }
         },
         timeData3(time,e){
             var count = 0
             var spliceIndex = 0
            if(this.timeDataSelected.length==0){
                 this.timeDataSelected.push(time)
             }
             else{
                 for(var tm4=0;tm4<this.timeDataSelected.length;tm4++){
                     if(time==this.timeDataSelected[tm4]){
                         spliceIndex = tm4
                         count = count+1
                     }
                 }
                 if(count==0)
                     {
                         this.timeDataSelected.push(time)
                     }
                 else{
                       this.timeDataSelected.splice(spliceIndex,1)
                 }
             }
             
            
                this.$emit('applyBusTimeFilter',this.timeDataSelected)
                
             if(e.currentTarget.className=='active'){
                 e.currentTarget.className=''
             }
             else{
                 e.currentTarget.className='active'
             }
         }
     }
 }
</script>
<style scoped lang="scss">
  .time_type_checkbox{
    margin-left:10px;  
  }
	.t-head {
		margin: 10px 0;
		font-size: 12px;
	}
    .active{
        border-left: 4px solid #EA2330 !important;
		color: #EA2330 !important;
		.ico-early {
			background-position: -50px -180px;
		}
		.ico-sun {
			background-position: -50px -150px;
		}
		.ico-sunset {
			background-position: -50px -262px;
			height: 30px;
		}
		.ico-moon {
			background-position: -100px -147px;
			height: 30px;
		}
    }
	.time-filter{
		padding-left: 0;
		li {
			list-style-type: none;
			padding: 10px;
			border-bottom: 1px solid #ddd;
			color: #666;
			font-size: 12px;
			background: #fff;
			transition: ease out .5s;
			border-left: 4px solid #fff;
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
</style>

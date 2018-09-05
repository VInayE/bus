<template>
  <v-app class="filter-boarding-points">
    <div class="operator-checkbox-div">
      <v-checkbox class="operator-checkbox" color="red" v-for="(filterData,index) in filterPickUpPoints" :key="index" :id="filterData.id" v-model="ex5" :label="filterData.name" :value="filterData.id"></v-checkbox>
    </div>       
  </v-app>
</template>
<script>
  export default {
    name:"filter-boarding-points",
    props:{
      filterPickUpPoints:{
        type:Array,
        required:true  
      },
      filterPickUpPointReset:{
          type:Array,
          required:true
      }  
    },
    data () {
      return {
        busBoardingFilterData:null,
        ex5:[]
      }  
    },
    watch:{
       ex5(){
         this.$emit('applyPickUpFilter',this.ex5)
       },
       filterPickUpPointReset(){
          this.ex5=this.filterPickUpPointReset
      } 
    },
    created(){
      this.busBoardingFilterData = this.filterPickUpPoints
    } 
  }
</script>
<style scoped>
  .filter-boarding-points{
    padding-bottom:20px;
  }
  .operator-checkbox{
    margin-left:10px;
  }
  .operator-checkbox-div{
    height:500px;
    overflow:auto;
    margin-bottom:10px;
    padding-bottom:10px;
	  margin-top: 15px;
  }
</style>
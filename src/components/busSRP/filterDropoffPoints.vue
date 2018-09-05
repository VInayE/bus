<template>
  <v-app class="filter-drop-points">
    <div class="operator-checkbox-div">
      <v-checkbox class="operator-checkbox" color="red" v-for="(filterData,index) in busDropFilterData" :key="index" :id="filterData.id" v-model="ex5" :label="filterData.name" :value="filterData.id"></v-checkbox>
    </div>       
  </v-app>
</template>
<script>
  export default {
    name:"filter-drop-points",
    props:{
      filterDropoffPoints:{
        type:Array,
        required:true  
     },
      filterDropReset:{
          type:Array,
          required:true
      }    
    },
    data () {
      return {
        busDropFilterData:null,
        ex5:[]
      }  
    },
    watch:{
       ex5(){
         this.$emit('applyDropOffFilter',this.ex5)
       },
       filterDropReset(){
          this.ex5=this.filterDropReset
      } 
    },
    created(){
      this.busDropFilterData = this.filterDropoffPoints
    } 
  }
</script>
<style scoped>
  .filter-drop-points{
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
<template>
  <v-app class="filter-bus-operator">
     <v-text-field style="padding-left:10px;padding-right:10px;" append-icon="phone" name="input-2-3"  label="Search Operator"  class="input-group--focused"  single-line v-model="search"></v-text-field>
    <div class="operator-checkbox-div">
      
      <v-checkbox class="operator-checkbox" color="red" v-for="(filterData,index) in filteredOperators" :key="index" :id="filterData.id" v-model="ex5" :label="filterData.name" :value="filterData.id"></v-checkbox>
    </div>       
  </v-app>
</template>
<script>
  export default {
    name:"filter-bus-operator",
    props:{
      filterBusOperator:{
        type:Array,
        required:true  
      },
      filterBusOperatorReset:{
        type:Array,
        required:true  
      }
     
    },
    data () {
      return {
        busOperatorFilterData:null,
        ex5:[],
        search:''  
      }  
    },
    watch:{
       ex5(){
         this.$emit('applyOperatorFilter',this.ex5)
       },
       filterBusOperatorReset(){
          this.ex5=this.filterBusOperatorReset
      }         
    },
    created(){
      this.busOperatorFilterData = this.filterBusOperator
    },
    computed:{
        filteredOperators:function()
    {
    	 var self=this;
       return this.busOperatorFilterData.filter(function(cust){return cust.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
    }
    }  
  }
</script>
<style scoped>
  .filter-bus-operator{
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
  }
	.filter-bus-operator label {
		margin-left: 10px;
	}
</style>

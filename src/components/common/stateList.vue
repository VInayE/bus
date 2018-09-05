<template>
   <transition name="modal" v-if="priceDialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
               Select State
            </slot>
          </div>
          <div class="modal-body" style="height:300px;overflow-y:auto;overflow-x:hidden">
            <v-radio-group class="rental_packages" v-model="selectectedSateCode" row>
             <v-layout row wrap @click="closeDialog('set')">
               <v-flex xs12 class="state_data" v-for="(state,index) in states.stateList" :key="index">
                 <v-radio :label="state.stateName" :value="state.stateCode" color="primary"></v-radio>
               </v-flex>
             </v-layout>
            </v-radio-group>
          </div>
        </div>
      </div>
    </div>
   </transition>
</template>
<script>
   import data from '../../data/stateCode.js'
   export default {
     props: ['showStateListdialog','selectedGSTStateCode'],
     data: function () {
       return {
         priceDialog: false,  
         states: data,
         selectectedSateCode:'',
         selectedState: {}
       }
     },
     watch: {
       showStateListdialog: function () {
         this.priceDialog = this.showStateListdialog
         if(this.showStateListdialog){
          this.selectectedSateCode = this.selectedGSTStateCode
         }
       }
     },
     methods: {
       closeDialog (option) {
         let matchedIndex, selectedState = [] 
         if (option === 'set') {
           matchedIndex = this.states.stateList.findIndex(x => x.stateCode === this.selectectedSateCode)
           selectedState = data.stateList[matchedIndex]
         }
         this.priceDialog = false
         this.$emit('closeStateDialog', selectedState)
       }
     }
   }
</script>
<style scoped>
  .state_data {
     height: 40px; 
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
 }

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
    font-size: 20px;
    font-weight: 500;
    color: black;
    height: 20px;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

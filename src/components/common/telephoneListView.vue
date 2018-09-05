<template>
   <transition name="modal" v-if="priceDialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
               Select ISD Code
            </slot>
          </div>
          <div class="modal-body" style="height:300px;overflow-y:auto;overflow-x:hidden">
            <v-radio-group class="rental_packages" v-model="selectedCode" row>
              <v-layout row wrap  @click="closeDialog('set')">
                 <v-flex xs12 class="state_data" v-for="(telephoneCode,index) in telephoneCodeDetails" :key="index">
                    <v-radio color="primary" :label="'+'+telephoneCode.countryCode +' -  ' +telephoneCode.countryName"  :value="telephoneCode.countryCode"></v-radio>
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
   import data from '../../data/telephoneCode.js'
   export default {
     props: ['showTelephoneDialog','selectedtGSTISD'],
     data () {
       return {
         priceDialog: false,
         telephoneCodeDetails: data.telephoneCode,
         selectedCode: ''
       }
     },
     watch: {
       showTelephoneDialog: function () {
         this.priceDialog = this.showTelephoneDialog
         this.selectedCode = this.selectedtGSTISD
       }
     },
     methods: {
       closeDialog (option) {
         let matchedIndex = 0, selectedTelephone = [] 
         if (option === 'set') {
           matchedIndex = this.telephoneCodeDetails.findIndex(x => x.countryCode == this.selectedCode)
           selectedTelephone = data.telephoneCode[matchedIndex]
         }
         this.priceDialog = false
         this.$emit('closeTelephoneDialog', selectedTelephone)
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

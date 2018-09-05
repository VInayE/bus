
<template>
   <transition name="modal" v-if="fareDialog">
    <div class="modal-mask dfb_div_layout">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
               Fare Details
            </slot>
          </div>
          <div class="modal-body">
            <v-layout row wrap pd7 name="body" v-for="(charges,index) in fareBreakup.price.charges" :key="index" >
                <v-flex xs9 sm6  class="font_roboto_400 dfb_cl_grey">
                   {{charges.display_name}}
                </v-flex>
                <v-flex xs3  class="font_roboto_400 display_value">
                   {{charges.display_value}}
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap pd7 name="body">
                <v-flex xs9 sm6 dfb_cl_grey>
                   {{fareBreakup.price.total_charge.display_name}}
                </v-flex>
                <v-flex xs3 display_value>
                   {{fareBreakup.price.total_charge.display_value}}
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap name="body" class="line_height_30 text-large">
                <v-flex xs8 sm6 class="font_roboto_400 ">
                   You Pay
                </v-flex>
                <v-flex xs4 class="font_roboto_400 txt_right">
                   {{fareBreakup.price.total_charge.display_value}}
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap pd7 name="body" v-if="fareBreakup.price.advance_charge">
                <v-flex xs9 sm6 dfb_cl_grey>
                   {{fareBreakup.price.advance_charge.display_name}}
                </v-flex>
                <v-flex xs3 display_value>
                   {{fareBreakup.price.advance_charge.display_value}}
                </v-flex>
            </v-layout>
            <v-divider class="total" v-if="fareBreakup.price.advance_charge"></v-divider>
            <v-layout row wrap pd7 name="body" v-if="fareBreakup.price.ecash && fareBreakup.price.ecash.ecash_earn.value">
                <v-flex xs7 sm6 dfb_cl_grey>
                   You Earn
                </v-flex>
                <v-flex xs5 display_value font-bold>
                   {{fareBreakup.price.ecash.ecash_earn.display_value}}
                   <img class="img_ecash" src="/pwa/bus/src/img/ecash.svg"/>
                </v-flex>
            </v-layout>
            <v-divider v-if="fareBreakup.price.ecash && fareBreakup.price.ecash.ecash_earn.value"></v-divider>
          </div>
          
          <div class="modal-footer">
            <slot name="footer">
                <a class="txt_blue font-bold darken-2" flat="flat"  @click="closefareInfoDialog">CLOSE</a>
            </slot>
          </div>
        </div>
      </div>
    </div>
   </transition>
</template>
<script>
   import { mapGetters} from 'vuex'
   import * as types from '../../store/types'
   export default {
     props: ['fareInfoDialog','ttlAmnt'],
     watch: {
         fareInfoDialog(){
             this.fareDialog = this.fareInfoDialog
             if(this.fareInfoDialog){
               setBodyProperty()
             }
         }
     }, 
     data () {
       return {
         fareBreakup: '',
         fareDialog: false
       }
     },
     created (){
       this.fareBreakup = this.ttlAmnt
     },
     methods: {
       closefareInfoDialog () {
        this.fareDialog = false  
        removeBodyProperty()     
        this.$emit('fareInfoDialogClose', false)
      }
     }
   }
</script>
<style scoped>
   .img_ecash{
     width: 50px;
    margin-left: 5px;
    margin-top: 5px;
    position: relative;
    top: 1px;

  }
   .lh2{
     line-height:2;
   }
   .fs20{
     font-size:20px;
   }
  .hv_info_icon{
    margin-left:2px;
    color: #F34747;
    font-size:20px;
    margin-bottom: 5px;
  }
  .dfb_gst_header{
    font-size: 15px;
    color: black;
  }
  .dfb_header{
    font-size: 16px;
    color: black;
    margin-left: 8px;
  }
  .dfb_div{
    width:100%;
    margin-bottom:10px;
  }
  .dfb_div_layout{
    padding:7px;
  }
  .dfb_cl_grey{
     font-size: 14px;
     color: rgba(0, 0, 0, 0.55);
  }
  .display_value{
    font-size:14px;
    text-align:right
  }
  .dfb_divider{
    border-bottom:1px solid #e0e0e0;
  }
  .pd7{
    padding:7px 0px !important;
  }
    
    .img_ecash{
     width: 50px;
    margin-left: 5px;
    margin-top: 5px;
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
  padding: 20px 18px 0;
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
  height:inherit;
  overflow-y:auto;
  overflow-x:hidden;

}

.modal-footer{
    width: 275px;
    margin: 0 auto;
    background: #fff;
    text-align: right;
    padding: 10px 20px 15px 0;
}
.modal-body .line_height_30{
  padding: 8px 0;
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

.text-large{
    font-size: 18px;
    padding: 5px 0;
    color: #000;
}

.txt_right {
    text-align: right;
}
</style>


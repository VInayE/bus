<template>
 <div>      
            <div>Add Visitor Details</div>
            <div v-for="(seatNmbr,index) in seatCount.OW.seats" :key="index">
                            <v-layout row wrap>
                                <v-flex>
                                    <v-select
                                     v-bind:items="titleData"
                                     v-model="storeTraveller[index].title"
                                     label="Title"
                                     single-line
                                     bottom
                                     item-text="text"
                                     item-value="text"
                                    ></v-select>
                                </v-flex>
                                <div class="error-message pabs" v-if="submittedTab2 && storeTraveller[index].title == ''">Please Enter Title</div>
                            </v-layout>                        
                            <v-text-field
                             label="Visitor Name"
                             v-model="storeTraveller[index].name"
                            ></v-text-field>
                            <div class="error-message pabs" v-if="submittedTab2 &&storeTraveller[index].name == ''">Please Enter Visitor Name</div>
                
                             <v-select
                             label="Gender"
                             v-model="storeTraveller[index].gender"
                             :items="genderData"
                             item-text="text"
                             item-value="text"
                             required
                            ></v-select>
                            <div class="error-message" v-if="submittedTab2 && storeTraveller[index].gender == ''">Select Gender</div>
                
                            <v-select
                             label="Age"
                             v-model="storeTraveller[index].age"
                             :items="ageData"
                             item-text="text"
                             item-value="text"
                             required
                            ></v-select>
                            <div class="error-message" v-if="submittedTab2 && storeTraveller[index].age == ''">Enter your Age</div>
            </div>
     <button @click="Check()">Click</button>
    </div>

</template>
<script>
    import Vue from 'Vue'
    export default {
        created(){
            this.seatCount = JSON.parse(localStorage.getItem('seatMapData'))
        },
        methods:{
            Check(){
                this.submittedTab2 = true
            },
      validateTab_1Form () {
             var test = this.traveller.email_id != '' && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.traveller.email_id) && this.traveller.telephone_no != '' && this.traveller.telephone_no.length == 10
             return test
      }, 
      validateContinueTab_2 (){
           return this.paxInfoData.gender == 'TITLE' &&  this.paxInfoData.identityType =='IDENTITY TYPE' &&  this.paxInfoData.identityNumber == '' && this.paxInfoData.name == '' && this.paxInfoData.age == 'AGE' && this.paxInfoData.countryName == 'COUNTRY' && this.paxInfoData.countryGroup == 'COUNTRY GROUP'
      },  
      saveTravellerDetails(){
            var self = this
            this.submittedForm1 = true
            if(this.validateTab_1Form()){
               this.submittedForm1 = false 
               this.savePaxDetails.email = this.traveller.email_id
               this.savePaxDetails.phone = {
                  'isd' :'91',
                  'number':this.traveller.telephone_no  
                }
                //need to be done
                this.savePaxDetails.monumentPaxSummary = {
                  [self.monumentId] : {}
                }
            } else {
               return false 
            }
            if(this.savedPaxInfo.length > 0){
                 if(this.validateContinueTab_2 ()) {
                    this.submittedTab2 = false
                    this.savePaxDetailsAPI ()
                 } else if(this.validateForm2()){
                    this.addTravellerListData ()
                    this.submittedTab2 = false
                    this.savePaxDetailsAPI()
               } else {
                    this.submittedTab2 = true
               }
            } else if(this.savedPaxInfo.length ==0){
            this.submittedTab2 = true
            if(this.validateForm2()){
                this.addTravellerListData ()
                this.submittedTab2 = false
                this.savePaxDetailsAPI() 
              }
            }  
          },
          savePaxDetailsAPI (){
           let self = this
           let adultCount = 0,childCount = 0 ;
               for(let i=0 ; i < this.savedPaxInfo.length ; i++){
               if(this.savedPaxInfo[i].paxType == "CHILD") {
                 childCount += 1
               } else {
                 adultCount +=1 
               }
             }
             this.savePaxDetails.monumentPaxSummary[self.monumentId].adultCount = adultCount
             this.savePaxDetails.monumentPaxSummary[self.monumentId].childCount = childCount
             this.savePaxDetails.monumentPaxSummary[self.monumentId].paxInfo = this.savedPaxInfo 
             this.savePaxDetails.monumentPaxSummary[self.monumentId].visitDate = self.availableDate
              
              this.isAPICompleted = true
              this.showTravellerAPIError = ''
              savePaxDetailsAPI(self.superPnr,self.savePaxDetails).then(function (response) {
               self.$router.push({name:'ReviewTravellersView'})
              }).catch(function (error) {
                 self.showTravellerAPIError = error.body.responseInfo.errors
                 self.isAPICompleted = false
              })
          },
          validateTelephone(evt,option){
             var regex = new RegExp("^[0-9]+$");
             var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
             if (!regex.test(key)) {
               event.preventDefault();
               return false;
              }
          },     
         restrictSpecialChar(event) {
            var theEvent = event.htmlEvent || window.event;
            var regex = new RegExp("^[-_@.a-zA-Z0-9]+$");
            var key = String.fromCharCode(!theEvent.charCode ? theEvent.which : theEvent.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
           
          },  
          validateForm2(){
            return this.paxInfoData.gender != 'TITLE' &&  this.paxInfoData.name != '' && this.paxInfoData.age != 'AGE' && this.paxInfoData.countryName != 'COUNTRY' && this.paxInfoData.countryGroup != 'COUNTRY GROUP'
          }, 
           addTravellerListData(){
            this.paxInfoData.identityType = this.paxInfoData.identityType == 'IDENTITY TYPE' ? '' : this.paxInfoData.identityType
            this.paxInfoData.identityNumber = this.paxInfoData.identityType == 'IDENTITY TYPE' ? '' : this.paxInfoData.identityNumber
            this.paxInfoData.paxType = parseInt(this.paxInfoData.age) >= 15 ? 'ADULT':'CHILD'
            this.savedPaxInfo.push(Vue.util.extend({}, this.paxInfoData))
            this.selectedGender = 'MALE'
            this.paxInfoData = {
              'countryGroup':'COUNTRY GROUP',
              'countryName':'COUNTRY',
              'gender' :'TITLE',
              'age':'AGE',
              'paxType':'',
              'name':'',
              'identityType':'IDENTITY TYPE',
              'identityNumber':''  
             }
          }, 
          addTravellerList() {
           this.submittedTab2 = true   
           if(this.validateForm2()){
             this.submittedTab2 = false  
             this.addTravellerListData() 
            } 
          }
        },
        data () {
            return {
                monumentId:'',
                storeTraveller:[{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''},{'title':'','name':'','gender':'','age':''}],
                superPnr:'',
                seatCount:null,
                availableDate:'',
                savedPaxInfo:[],
                submittedForm1:false,
                openSaveList:false,
                traveller :{
                  email_id :'',
                  telephone_no :'' 
                },
                savePaxDetails :{},
                submittedTab2:false,
                paxInfoData : {
                    'countryGroup':'COUNTRY GROUP',
                    'countryName':'COUNTRY',
                    'gender' :'TITLE',
                    'age':'AGE',
                    'paxType':'',
                    'name':'',
                    'identityType':'IDENTITY TYPE',
                    'identityNumber':''  
                },
                e1: null,
                cg: null,
                name:null,
                openOptionView: false,
                select:null,
                masterData: {},
                monumentListData: {},
                items: [],
                titleData: [
                    { text: 'Mr' },
                    { text: 'Mrs' },
                    { text: 'Ms' }               
                ],
                ageData: [
                    { text: '0' },
                    { text: '1' },
                    { text: '2' },
                    { text: '3' },
                    { text: '4' },
                    { text: '5' },
                    { text: '6' },
                    { text: '7' },
                    { text: '8' },
                    { text: '9' },
                    { text: '10' },
                    { text: '11' },
                    { text: '12' },
                    { text: '13' },
                    { text: '14' },
                    { text: '15' },
                    { text: '16' },
                    { text: '17' },
                    { text: '18' },
                    { text: '19' },
                    { text: '20' },
                    { text: '21' },
                    { text: '22' },
                    { text: '23' },
                    { text: '24' },
                    { text: '25' },
                    { text: '26' },
                    { text: '27' },
                    { text: '28' },
                    { text: '29' },
                    { text: '30' },
                    { text: '31' },
                    { text: '32' },
                    { text: '33' },
                    { text: '34' },
                    { text: '35' },
                    { text: '36' },
                    { text: '37' },
                    { text: '38' },
                    { text: '39' },
                    { text: '40' },
                    { text: '41' },
                    { text: '42' },
                    { text: '43' },
                    { text: '44' },
                    { text: '45' },
                    { text: '46' },
                    { text: '47' },
                    { text: '48' },
                    { text: '49' },
                    { text: '50' },
                    { text: '51' },
                    { text: '52' },
                    { text: '53' },
                    { text: '54' },
                    { text: '55' },
                    { text: '56' },
                    { text: '57' },
                    { text: '58' },
                    { text: '59' },
                    { text: '60' },
                    { text: '61' },
                    { text: '62' },
                    { text: '63' },
                    { text: '64' },
                    { text: '65' },
                    { text: '66' },
                    { text: '67' },
                    { text: '68' },
                    { text: '69' },
                    { text: '70' },
                    { text: '71' },
                    { text: '72' },
                    { text: '73' },
                    { text: '74' },
                    { text: '75' },
                    { text: '76' },
                    { text: '77' },
                    { text: '78' },
                    { text: '79' },
                    { text: '80' },
                    { text: '81' },
                    { text: '82' },
                    { text: '83' },
                    { text: '84' },
                    { text: '85' },
                    { text: '86' },
                    { text: '87' },
                    { text: '88' },
                    { text: '89' },
                    { text: '90' },
                    { text: '91' },
                    { text: '92' },
                    { text: '93' },
                    { text: '94' },
                    { text: '95' },
                    { text: '96' },
                    { text: '97' },
                    { text: '98' },
                    { text: '99' },
                    { text: '100' }
                ],
                states: [

                ]
            }
        }
    }
</script>
<style scoped="true">
	.m0 {
		margin-left: 0 !important;
	}
	.container {
		padding: 0px;
	}
	.input-group {
		border-bottom: 1px solid #E0E0E0;
		margin-top: 15px;
	}
	.option {
		margin-top: 30px;
	}
	.red-trans {
		width: 100%;
		background: transparent !important;
		color: #EA2330;
		border: 1px solid #EA2330;
		margin: 20px 0;
		box-shadow: none;
	}
	.contact-d .input-group {
		margin-top: 0;
	}
	.dialog__container {
		margin-right: 0 !important;
	}
</style>

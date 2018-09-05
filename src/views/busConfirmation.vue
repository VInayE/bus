<template>
    <div>
        <v-toolbar>
            <v-layout row wrap class="nav-bar side-padding">
                <v-flex xs2 @click="closeboardingDialog()">
                    <v-icon>arrow_back</v-icon>
                </v-flex>
                <v-flex xs10>Booking Details</v-flex>
            </v-layout>
        </v-toolbar>
        <div class="conf-book" v-if="Object.keys(confirmationData).length>0">
            <div class="c-module">
                <ul>
                    <li>
                        <i class="ico"></i>
                    </li>
                    <li>
                        <div class="c-g">Bus Booking {{confirmationData.confirmationDetails.status}}</div>
                        <div class="fs-14 cgrey">Yatra booking Ref No: {{confirmationData.confirmationDetails.bookingRefNo}}</div>
                    </li>
                </ul>
                <ul class="brd" v-if="confirmationData.confirmationDetails!=null">
                    <li>Booking details have been sent to</li>
                    <li>
                        <i class="ico"></i>
                        <span>{{confirmationData.confirmationDetails.userInfo.mobile}}</span>
                    </li>
                    <li>
                        <i class="ico"></i>
                        <span>{{confirmationData.confirmationDetails.userInfo.email}}</span>
                    </li>
                </ul>
            </div>
            <div class="c-module loc" v-if="confirmationData.bookingDetails!=null">

                <v-layout row wrap>
                    <v-flex xs4>
                        <div>{{confirmationData.bookingDetails.itinerary.ow.dc}}</div>
                        <div>{{confirmationData.bookingDetails.itinerary.ow.dt}}</div>
                        <div class="fs-14">{{reverseDeparture}}</div>
                    </v-flex>
                    <v-flex xs4>
                        <div>{{confirmationData.bookingDetails.itinerary.ow.ac}}</div>
                        <div>{{confirmationData.bookingDetails.itinerary.ow.at}}</div>
                        <div class="fs-14">{{reverseArrival}}</div>
                    </v-flex>
                    <v-flex xs4>
                        <div>Duration</div>
                        <div class="fs-14 c-dark">{{DurationFormat}}</div>
                    </v-flex>
                </v-layout>
                <ul class="brd">
                    <li>
                        <p class="f500">Boarding Details</p>
                        <p class="fs-14">{{confirmationData.bookingDetails.itinerary.ow.bp.address}}</p>
                        <!--<p class="fs-14">Time : {{confirmationData.bookingDetails.itinerary.ow.bp.time}}</p>-->
                    </li>
                </ul>
                <ul class="brd">
                    <li>
                        <p class="f500">Dropping Details</p>
                        <p class="fs-14">{{confirmationData.bookingDetails.itinerary.ow.dp.address}}</p>
                        <!--<p class="fs-14 ">Time : {{confirmationData.bookingDetails.itinerary.ow.dp.time}}</p>-->
                    </li>
                </ul>

                <ul class="mt15 brd">
                    <li>
                        <p class="f500">Bus Details</p>
                        <span class="fs-14">{{confirmationData.bookingDetails.itinerary.ow.supplier}}</span>
                        <!--  <span class="fs-14">Sitting seat(s)</span>-->
                        <div class="">
                            <span class="fs-14">{{confirmationData.bookingDetails.itinerary.ow.btn}}</span>
                            <!--
                                <span class="fs-14" v-if="seat.st=='SL'">Sleeper</span>
                                <span class="fs-14" v-if="seat.st=='ST'">Seater</span>
                            -->
                            <div>
                                <span>Seat Number:</span>
                                <span>
                                    <span class="fs-14">{{seatsVal}}</span>
                                </span>
                            </div>
                            <p>
                                <span>Bus Pnr : {{confirmationData.bookingDetails.itinerary.ow.buspnr}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <ul class="brd">
                    <li>
                        <p class="f500">Traveller Name</p>
                        <p v-for="pessenger in confirmationData.bookingDetails.passengerInfo.passengers" :key="pessenger.name">
                            {{pessenger.name}}
                        </p>
                    </li>
                </ul>
            </div>
            <div class="c-module">
                <p class="f500">Fare Breakup</p>
                <div class="brd-btm w100 p010 fs-14">
                    <p style="color:slategrey;">
                        <span>Basic Fare</span>
                        <span class="fr">₹<vue-numeric read-only separator="," v-model="totalFare"></vue-numeric></span>
                    </p>
                    <p style="color:slategrey;" v-if="parseInt(confirmationData.paymentDetails.discountDetails.amount)>0">
                        <span>Promo Discount</span>
                        <span class="fr">₹{{parseInt(confirmationData.paymentDetails.discountDetails.amount)}}</span>
                    </p>
                </div>
                <p class="brd-btm w100 p010">
                    <span>Total Amount</span>
                    <span class="fr">
                        ₹<vue-numeric read-only separator="," v-model="totalFinalAmount"></vue-numeric>
                    </span>    
                </p>
                <p style="color:slategrey;" class="p010 fs-14">
                    <span>You Earn</span>
                    <span class="fr">₹{{parseInt(confirmationData.paymentDetails.eCashEarn)}} 
                        <img class="img_ecash" src="/pwa/bus/static/img/icons/ecash.svg" />
                    </span>
                </p>
            </div>
            <confirmation-error :showPaymentDialog="showPaymentDialog" :paymentErrorMessage="paymentErrorMessage" @closePaymentError="showPaymentDialog = false"></confirmation-error>
        </div>
        <div class="ajax-loader" v-if="showLoader">
            <div class="sk-wave">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getConfirmation } from '../api/api'
    import router from '../router'
    export default {
        data() {
            return {
                searchParams: {},
                confirmationData: {},
                paymentErrorMessage: '',
                showPaymentDialog: false,
                DurationFormat: '',
                reverseDeparture: '',
                reverseArrival: '',
                seatsVal: '',
                showLoader: false,
                totalFinalAmount:0,
                totalFare:0
            }
        },
        components: {
            confirmationError: () => import("./confirmationError")
        },
        created() {
            this.searchParams.ttid = this.$route.query.ttid
            this.searchParams.suc = this.$route.query.suc
            this.showLoader = true
            getConfirmation(this.searchParams).then(response => {
                console.log(response.body);
                if(response && response.body && typeof response.body === 'string' && response.body.indexOf('suc:false') >= 0) {
                    // redirect to payment page
                    localStorage.setItem('failedPayment',true);
                    this.$router.push({name:'BusPaySwift'});                
                }
                else{
                    this.confirmationData = response.body
                    this.DurationFormat = this.format(this.confirmationData.bookingDetails.itinerary.ow.dur)
                    let dep = this.confirmationData.bookingDetails.itinerary.ow.dd
                    let deprt = dep.split('-')
                    let reDeprt = deprt.reverse()
                    this.reverseDeparture = reDeprt.join('-')

                    let arr = this.confirmationData.bookingDetails.itinerary.ow.ad
                    let arrvi = arr.split('-')
                    let reArrival = arrvi.reverse()
                    this.reverseArrival = reArrival.join('-')

                    if (this.confirmationData.bookingDetails.itinerary.ow.seats.length == 1) {
                        this.seatsVal = this.confirmationData.bookingDetails.itinerary.ow.seats[0].sn
                    } else {
                        this.seatsVal = this.confirmationData.bookingDetails.itinerary.ow.seats.map(function (elem) {
                            return elem.sn;
                        }).join(",");
                    }
                    this.totalFinalAmount=parseInt(this.confirmationData.paymentDetails.totalFare)-parseInt(this.confirmationData.paymentDetails.discountDetails.amount)
                    this.totalFare=parseInt(this.confirmationData.paymentDetails.totalFare)
                }
                this.showLoader = false;
            }).catch(error => {
                this.showPaymentDialog = true
                this.showLoader = false
                this.paymentErrorMessage = error.body.Message
            });  
        },
        methods: {
            closeboardingDialog() {
                router.push({ name: 'BusPaySwift' })
            },
            format(time) {
                return time.replace(/(?:0)?(\d+):(?:0)?(\d+).*/, '$1H $2M');
            }
        }
    }

</script>
<style scoped lang="scss">
    li {
        list-style: none;
    }

    ul {
        padding-left: 0;
    }

    .conf-book {
        .c-module {
            padding: 16px;
            border-bottom: 5px solid #EEEEEE;
            &:last-child {
                border-bottom: none;
            }
            &>div {
                &:last-child {
                    margin-right: 0;
                }
                .fs-14 {
                    color: rgba(0, 0, 0, .54);
                }
                .c-dark {
                    color: rgba(0, 0, 0, .87) !important;
                }
            }
            p {
                margin-bottom: 5px;
            }
            .bus-policy {
                color: #2196F3;
                position: relative;
            }
        }
    }

    .w100 {
        width: 100%;
    }

    .p010 {
        padding: 10px 0;
    }

    .brd {
        border-top: 1px solid #eee;
        padding-top: 15px;
        margin-top: 15px;
    }

    .f500 {
        font-weight: 500;
    }

    .mt15 {
        margin-top: 15px;
    }

    .c-g {
        color: #6CAC6F;
    }

    .cgrey {
        color: rgba(0, 0, 0, 0.54);
    }

    .img_ecash {
        width: 50px;
        padding-right: 2px;
        margin-left: 6px;
    }
</style>
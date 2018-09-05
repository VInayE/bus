import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	scrollBehavior: () => ({
		x: 0,
		y: 0
	}),
	base: '/pwa/bus/',
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'BusHome',
			component: function (resolve) {
				require(['@/views/busHomeView'], resolve)
			}
    },
		{
			path: '/srp',
			name: 'BusSRP',
			component: function (resolve) {
				require(['@/views/busSRPView'], resolve)
			}
    },
		{
			path: '/busSeatMap',
			name: 'BusSeatMap',
			component: function (resolve) {
				require(['@/views/busSeatMap'], resolve)
			}
    },
		{
			path: '/busRegister',
			name: 'BusRegister',
			component: function (resolve) {
				require(['@/views/registerBlock'], resolve)
			}
    }, {
			path: '/busBoardingPoint',
			name: 'BusBoardingPoint',
			component: function (resolve) {
				require(['@/views/BoardingPointBlock'], resolve)
			}
    }, {
			path: '/busDropingPoint',
			name: 'BusDropingPoint',
			component: function (resolve) {
				require(['@/views/DropingPointBlock'], resolve)
			}
    }, {
			path: '/busLogin',
			name: 'BusLogin',
			component: function (resolve) {
				require(['@/views/loginBlock'], resolve)
			}
    },
		{
			path: '/busForgotPassword',
			name: 'BusForgotPassword',
			component: function (resolve) {
				require(['@/views/forgotPasswordBlock'], resolve)
			}
    }, {
			path: '/busReview',
			name: 'BusReview',
			component: function (resolve) {
				require(['@/views/busReview'], resolve)
			}
    },{
			path: '/calender',
			name: 'Calender',
			component: function (resolve) {
				require(['@/views/calender'], resolve)
			}
    },{
			path: '/busPaySwift',
			name: 'BusPaySwift',
			component: function (resolve) {
				require(['@/views/busPaySwift'], resolve)
			}
    },
        {
			path: '/cancellationPolicy',
			name: 'CancellationPolicy',
			component: function (resolve) {
				require(['@/views/cancellationPolicy'], resolve)
			}
    },
		 {
			path: '/confirmation',
			name: 'confirmation',
			component: function (resolve) {
				require(['@/views/busConfirmation'], resolve)
			}
    },
		{
			path: '/',
			redirect: '/search'
    },
		{
			path: '*',
			redirect: '/'
    },
  ]
})

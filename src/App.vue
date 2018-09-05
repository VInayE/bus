<template>
<div class="bus-pwa" id="bus-app" >
	<router-view v-if="browserNotSupport"></router-view>
    <div v-if="!browserNotSupport">
    <div class="browser-ok">
            <img src="Browser_Icon.png">
            <p>Oops!</p>
            <p>Yatra Bus is not supported on this browser!</p>
            <p @click="openYatraApp()">Download Yatra App</p>
    </div>
</div>
</div >
</template>
<script>
	import {
		getSetSessionVuex
	} from '@/storage/sessionStorage'
	export default {
		name: "bus-pwa",
		data() {
			return {
				browserMode: navigator.onLine,
                browserNotSupport :true 

			}
		},
		beforeCreate() {
			getSetSessionVuex(this.$store)
		},
		methods: {
			updateOnlineStatus(event) {
				this.browserMode = navigator.onLine
			},
            openYatraApp (){
                window.open ('https://play.google.com/store/apps/details?id=com.yatra.base&hl=en','_blank')  
              } 
		},
		mounted() {
			window.addEventListener('online', this.updateOnlineStatus);
			window.addEventListener('offline', this.updateOnlineStatus);
		},
        created (){
          var _il = ['tablet','ucbrowser','iPad','Windows Phone','Firefox']
          var _ua = navigator.userAgent
          for(var a in _il){
           if(_ua.indexOf(_il[a]) !== -1) {
              self.browserNotSupport = false
           }
        };
    }
	}

</script>
<style lang="stylus">
	 @import url('https://fonts.googleapis.com/css?family=Rubik:400,500');
	@require '../node_modules/vuetify/src/stylus/app'
	body {
		min-height: 100vh;
		padding: 0 !important;
		font-family: Rubik;
		margin: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
		font-size: 16px;
		margin:0;
		-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
	}
	.material-icons {
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
	}

@font-face {
		font-family: 'Material Icons';
		font-style: normal;
		font-weight: 400;
		src: url(./fonts/google_fonts.eot);
		src: url(./fonts/google_fonts.woff2) format('woff2'),
		url(./fonts/google_fonts.woff) format('woff'),
		url(./fonts/google_fonts.ttf) format('truetype')
	}
	.Banner {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.Banner img {
		width: 32%;
	}
	.ico-sprite {
        background-image: url(assets/sprite.png);
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
		width: 40px;
		height: 40px;
    }
	.ico-back {
		background-position: -54px -1px;
		height: 22px;
		width: 19px;
	}
	.ico-tick {
		background-position: -159px -141px;
		height: 18px;
		width: 17px;
	}
.fr {
	float: right;
}
	.overflow-hidden {
		overflow: hidden;
	}

	body.incognito:before {
		content: attr(data-before);
		width: 100vw;
		height: 100vh;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		position: fixed;
		z-index: 9999;
		display: block;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 30vh;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		color: #fff;
		background-color: #000;
	}

	@media screen and (orientation: landscape) and (min-width: 568px) {
		body:before {
			content: "Please rotate your device";
			width: 100vw;
			height: 100vh;
			background: #f1f1f1 url("./assets/smartphone.svg") no-repeat 50% 15%;
			background-size: 20%;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			position: fixed;
			z-index: 9999;
			display: block;
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 50vh;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			color: #666;
		}
		body:after {
			content: "We don't support landscape mode yet. Please go back to potrait mode for best experience";
			width: 90vh;
			height: 25vh;
			text-align: center;
			font-size: 16px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 5vh;
			z-index: 10000;
			display: block;
			margin: auto;
			color: #666;
		}
	}

	.offline_mode {
		position: fixed;
		width: 100%;
		height: 100vh;
		background-color: rgba(245, 245, 245, 0.84);
		z-index: 9;
	}

	.offline_text {
		position: relative;
		top: 40%;
		text-align: center;
		font-size: 16px;
		color: #000;
		padding: 16px;
   		background: #ddd;
	}

	.text-right {
		text-align: right;
	}

	.srp_toolbar>.tabs__wrapper--scrollable>ul,
	.srp_toolbar>.tabs__wrapper--scrollable {
		background: rgb(51, 51, 51);
		color: #fff;
	}

	.srp_toolbar>.tabs__wrapper--scrollable>ul li>a {
		color: rgb(194, 194, 194)!important;
		text-transform: capitalize
		font-size: 12px;	
	}

	.srp_toolbar>.tabs__wrapper--scrollable>ul li>.tabs__item--active {
		color: white!important;
		border-bottom: 3px solid rgb(234, 35, 48)!important
	}

	.srp_toolbar .tabs__li {
		background: rgb(51, 51, 51)!important
	}

	.brd-btm {
		border-bottom: 1px solid #eee;
	}

	.side-padding {
		margin: 16px !important;
	}

	.picker__title {
		background: #1976d2;
	}

	.picker__body {
		background: #fff;
	}

	.picker--date__header-selector-date strong {
		font-size: 1.5em;
	}

	input {
		outline: none;
	}

	.fs-12 {
		font-size: 0.750em;
	}
	.fs-14 {
		font-size: 14px;
	}
	#bus-app .nav-bar {
		color: #000;
		font-size: 1.250em;
	}

	#bus-app .depart-cal .input-group {
		padding: 0;
		height: 40px;
	}

	#bus-app .depart-cal .input-group--text-field input {
		color: rgba(0, 0, 0, 0.87);
	}

	#bus-app .premium .input-group__details {
		min-height: 15px;
	}

	#bus-app .premium label {
		color: #000;
		font-size: 0.875em;
	}

	#bus-app .txt-grey {
		color: #acacac;
	}

	.filterIcon {
		background: url(./assets/filter-icon.svg) no-repeat;
		height: 20px;
		width: 20px;
		position: absolute;
		right: 0px;
		top: 15px;
		margin-right: 15px;
	}

	.operator-checkbox>label {
		color: black!important;
		margin-left: 5px;
		font-size: 12px !important;
		opacity: .86;
	}

	.operator-checkbox>.input-group__details {
		display: none;
	}

	.red--text {
		color: rgb(234, 35, 48)!important;
	}
    
     .odometer-digit {
        border-right: 1px solid #fff;
        padding: 0 6px;
    }
    
    .odometer-digit:last-child {
        border-right: none;
    }

	.bus-srp-list-view {
		min-height: 0vh!important;
	}

    .vdp-datepicker__calendar .cell.day.selected.disabled {
        color: #ddd!important;
    }
	.sk-wave {
		width: 100%;
		height: 30px;
		text-align: center;
		font-size: 10px;
		display: inline-block;
		position: absolute;
	}

	.sk-wave .sk-rect {
		background-color: #dbdbdb;
		height: 100%;
		width: 4px;
		margin: 0 1px 0 0;
		display: inline-block;
		-webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
		animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
	}

	.sk-wave .sk-rect1 {
		-webkit-animation-delay: -1.2s;
		animation-delay: -1.2s;
	}

	.sk-wave .sk-rect2 {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}

	.sk-wave .sk-rect3 {
		-webkit-animation-delay: -1s;
		animation-delay: -1s;
	}

	.sk-wave .sk-rect4 {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}

	.sk-wave .sk-rect5 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}

	@-webkit-keyframes sk-waveStretchDelay {
		0%,
		40%,
		100% {
			-webkit-transform: scaleY(0.4);
			transform: scaleY(0.4);
		}
		20% {
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
		}
	}

	@keyframes sk-waveStretchDelay {
		0%,
		40%,
		100% {
			-webkit-transform: scaleY(0.4);
			transform: scaleY(0.4);
		}
		20% {
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
		}
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upper_lower_tabs>.tabs__wrapper>.tabs__container>li>.tabs__item.tabs__item--active {
		color: #EA2330!important;
		border-bottom: 2px solid #EA2330!important;
	}

	.upper_lower_tabs>.tabs__wrapper>.tabs__container,
	.cab_vendor_option>.tabs__wrapper>.tabs__container,
	.cab-operator>.tabs__wrapper>.tabs__container {
		transform: unset!important;
		transition: none!important;
	}

	.cab-operator>.tabs__wrapper>.tabs__container {
		overflow-y: auto!important
	}


	.theme--dark.tabs .tabs__item.tabs__item--active {
		color: #333 !important;

	}

	.upper_lower_tabs>.tabs__wrapper>.tabs__container>.tabs__li,
	.cab_vendor_option>.tabs__wrapper>.tabs__container>.tabs__li {
		flex: 1!important;
	}

	.cab-operator>.tabs__wrapper>.tabs__container {
		justify-content: unset!important;
		text-align: center!important;
	}

	.cab-operator>.tabs__wrapper>.tabs__container>.cabsProduct {
		display: inline-block;
		margin: 0 auto;
	}

	.dialog__content {
		z-index: 20!important;
	}

	.prel {
		position: relative;
	}

	.pabs {
		position: absolute;
	}

	.vdp-datepicker .vdp-datepicker__calendar .next,
	.vdp-datepicker .vdp-datepicker__calendar .prev {
		display: none!important;
	}
	.vdp-datepicker__calendar {
		width: 100% !important;
    border-bottom: 1px solid #ddd !important;
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
	padding-bottom: 16px;
	}
	.vdp-datepicker__calendar .cell.selected, .vdp-datepicker__calendar .cell.selected.highlighted, .vdp-datepicker__calendar .cell.selected:hover {
		background: #f34f4f !important;
		color: #fff !important;
	}
	.vdp-datepicker__calendar .day-header {
		display: none !important;
	}
	.vdp-datepicker .vdp-datepicker__calendar header span:nth-child(2) {
		width: 100%!important;
		padding: 16px 0;
	}
	.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
		border: 1px solid #f34f4f !important;
	}
	.unselectedDate .vdp-datepicker__calendar .cell.selected {
    color: #000 !important;
    background: #fff!important;
}
.theme--dark.tabs .tabs__item.tabs__item--active {
	color: #fff !important;
}
.filter_side_nav {
	z-index: 99 !important;
}
.input-group--text-field label {
	left: 10px !important;
}
.application--light .toolbar {
	background: #fff !important;
}
.login-view .primary--text{
			color: rgba(0,0,0,.54) !important;
		}
.review-module .primary--text{
	color: rgba(0,0,0,.87) !important;
}
.operator-checkbox-div .input-group--text-field label {
top: 0 !important;
}
.operator-checkbox-div .input-group {
padding: 0 !important;
}
.login-view .input-group--text-field label{
	font-size: 15px;
	left: 0 !important;
}
.login-view .icon--radio ,.login-view .icon--selection-control{
	font-size: 21px;
    color: #1976d2;
    padding-top: 3px;
}
.input-group__details:before {
	background: #e0e0e0;
}
.redBtn
	box-shadow 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)
	width 100%
	background-color #ea2330
	color #fff
	padding 10px
	text-align center
	margin 0

.input-group.input-group--error .input-group__input .icon, .input-group.input-group--error label {
	color: rgba(0,0,0,.87)!important;
}
.error--text input, .login-view .error--text textarea {
    color: rgba(0,0,0,.87);
}
    .review-module .menu .menu__content {
        left: 0 !important;
        top: 35px !important;
    }
    .review-module .menu{
        position: absolute;
    }
    .review-module .card{
            background: #fff;
    }
    .review-module .input-group--text-field label {
        left: 0 !important;
    }
    .net-banking label {
        margin-top: -18px;
    }
    .gst-detail .primary--text {
        color: rgba(0,0,0,.87) !important;
    }
   .gst-detail .input-group--text-field label {
        left: 0 !important;
    }
	.input-group--focused.primary--text {
		color: #1976d2 !important;
	}
    .gst-detail .gst_form_div {
            max-width: 96% !important;
    }
 .card{
    background-color: #fff;
    color: rgba(0,0,0,.87);
}
	.gst-form .input-group label{
		font-size: 14px;
	}
	.travel-form .card .list a{
		color: #333;
		height: 32px;
	}
	.input-group__input {
			input {
				color: rgba(0,0,0,0.87);
			}
		}
    @media screen and (orientation: landscape) and (min-width: 568px) {
    body:before {
        content: "Please rotate your device";
        width: 100vw;
        height: 100vh;
        background: #f1f1f1 url("./assets/smartphone.svg") no-repeat 50% 15%;
        background-size: 20%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        position: fixed;
        z-index: 9999;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
        padding-top: 50vh;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #666;
    }
    body:after {
        content: "We don't support landscape mode yet. Please go back to potrait mode for best experience";
        width: 90vh;
        height: 25vh;
        text-align: center;
        font-size: 16px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 5vh;
        z-index: 10000;
        display: block;
        margin: auto;
        color: #666;
    }
}

.ajax-loader{
	position: fixed;
	width: 100%;
	background: rgba(0, 0, 0, 0.8);
	border-radius: 5px;
	line-height: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	min-height: 200px;
	top: 0px;
	z-index: 9999;
	left:0;
}
.bur-r .snack__content {
	font-size:11px;
}
</style>

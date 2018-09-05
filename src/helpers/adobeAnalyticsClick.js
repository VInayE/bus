export const BusAdobeTrack = {
	initialize : false,
    init: function () {
        var _self = this;
        if (yt_adobe && typeof yt_adobe == 'object') {
			_self.initialize = true;
        }
    },
    trackHomeSearch: function (searchOrigin, searchDestination,paxCount,departureDate) {
        window.digitalData.search = {
				searchOrigin: searchOrigin,
				searchDestination:searchDestination,
				paxCount: paxCount,
				departureDate: departureDate
		}
         yt_adobe.track("search for buses", window.digitalData);
    },
	trackSrpSearch: function (searchOrigin, searchDestination,paxCount,departureDate,searchResult) {
        window.digitalData.search = {
				searchOrigin: searchOrigin,
				searchDestination:searchDestination,
				paxCount: paxCount,
				departureDate: departureDate,
				searchResult: searchResult
		}
         yt_adobe.track("find buses", window.digitalData);
    },
	trackSeatMap: function (busNum, bookingItinerary,busDetails,seatNumber,bookingPaxCount,tripDuration,daystoTravelDate,cheapestFareDifference,searchResultRank,seatType) {
        window.digitalData.bus.busInfo = {
				busNum: busNum,
				bookingItinerary:bookingItinerary,
				busDetails: busDetails,
				seatNumber: seatNumber,
				bookingPaxCount: bookingPaxCount,
			    tripDuration: tripDuration,
				daystoTravelDate: daystoTravelDate,
				cheapestFareDifference: cheapestFareDifference,
				searchResultRank: searchResultRank,
				seatType: seatType
		}
         yt_adobe.track("book bus", window.digitalData);
    }
	
};

(function(){
    BusAdobeTrack.init();
})();

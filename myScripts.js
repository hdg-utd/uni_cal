///// Special Thanks to this repository https://github.com/matthiasanderer/icsFormatter for the calendar formater //////

///////// ICS CODE
var icsFormatter = function() {
    'use strict';

    if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser');
        return;
    }

    var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
    var calendarEvents = [];
    var calendarStart = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
    ].join(SEPARATOR);
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';

    return {
        /**
         * Returns events array
         * @return {array} Events
         */
        'events': function() {
            return calendarEvents;
        },

        /**
         * Returns calendar
         * @return {string} Calendar in iCalendar format
         */
        'calendar': function() {
            return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
        },

        /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
         */
        'addEvent': function(subject, description, location, begin, stop) {
            // I'm not in the mood to make these optional... So they are all required
            if (typeof subject === 'undefined' ||
                typeof description === 'undefined' ||
                typeof location === 'undefined' ||
                typeof begin === 'undefined' ||
                typeof stop === 'undefined'
            ) {
                return false;
            }

            //TODO add time and time zone? use moment to format?
            var start_date = new Date(begin);
            var end_date = new Date(stop);

            var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
            var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
            var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
            var start_hours = ("00" + (start_date.getHours().toString())).slice(-2);
            var start_minutes = ("00" + (start_date.getMinutes().toString())).slice(-2);
            var start_seconds = ("00" + (start_date.getMinutes().toString())).slice(-2);

            var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
            var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
            var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
            var end_hours = ("00" + (end_date.getHours().toString())).slice(-2);
            var end_minutes = ("00" + (end_date.getMinutes().toString())).slice(-2);
            var end_seconds = ("00" + (end_date.getMinutes().toString())).slice(-2);

            // Since some calendars don't add 0 second events, we need to remove time if there is none...
            var start_time = '';
            var end_time = '';
            if (start_minutes + start_seconds + end_minutes + end_seconds !== 0) {
                start_time = 'T' + start_hours + start_minutes + start_seconds;
                end_time = 'T' + end_hours + end_minutes + end_seconds;
            }

            var start = start_year + start_month + start_day + start_time;
            var end = end_year + end_month + end_day + end_time;

            var calendarEvent = [
                'BEGIN:VEVENT',
                'CLASS:PUBLIC',
                'DESCRIPTION:' + description,
                'DTSTART;VALUE=DATE:' + start,
                'DTEND;VALUE=DATE:' + end,
                'LOCATION:' + location,
                'SUMMARY;LANGUAGE=en-us:' + subject,
                'TRANSP:TRANSPARENT',
                'END:VEVENT'
            ].join(SEPARATOR);

            calendarEvents.push(calendarEvent);
            return calendarEvent;
        },

        /**
         * Download calendar using the saveAs function from filesave.js
         * @param  {string} filename Filename
         * @param  {string} ext      Extention
         */
        'download': function(filename, ext) {
            if (calendarEvents.length < 1) {
                return false;
            }

            ext = (typeof ext !== 'undefined') ? ext : '.ics';
            filename = (typeof filename !== 'undefined') ? filename : 'calendar';
            var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
            window.open( "data:text/calendar;charset=utf8," + escape(calendar));
        }
    };
};

if (typeof define === "function" && define.amd) {
  /* AMD Format */
  define("icsFormatter", [], function() {
    return icsFormatter();
  });
} else if (typeof module === "object" && module.exports) {
  /* CommonJS Format */
  module.exports = icsFormatter();
} else {
  /* Plain Browser Support */
  this.myModule = icsFormatter();
}
///////// END OF ICS CODE










var trArray = document.querySelectorAll('tbody tr');

for (var i = 0; i < trArray.length; i++) {
	
	// Creating the new node
	var newNode = document.createElement("a");
	var nodeText = document.createTextNode("Unical");
	newNode.appendChild(nodeText);
	// Adding CSS to the node
	newNode.style.color = "blue";
	newNode.style.fontWeight = "bold";
	// Adding attributes to anchor tag
	newNode.setAttribute("id", i.toString());

	// Adding Line break after a tag
	var lineBreak = document.createElement("br");



	// Finding the right place and prepending the nodes
	var tdElem = trArray[i].children[6];
	var firstElem = tdElem.querySelector('a');
	tdElem.insertBefore(lineBreak, firstElem);
	var newFirstElem = tdElem.querySelector('br');
	tdElem.insertBefore(newNode, newFirstElem);
	// firstElem = tdElem.querySelector('a');
	// console.log(firstElem);

	// Add click code
	tdElem.firstChild.addEventListener('click', function() {

		var mainRow = document.getElementById(this.id).parentNode.parentNode;
		var classNameChild = mainRow.children[1].querySelector('a').innerHTML;

		var daysChild = mainRow.children[4].innerHTML.split("<")[0];

		// Collect what days the class is on
		var dayArray = [];

		if(daysChild.search("Sun") != -1) {
			dayArray.push(0);
		}
		if(daysChild.search("Mon") != -1) {
			dayArray.push(1);
		}
		if(daysChild.search("Tues") != -1) {
			dayArray.push(2);
		}
		if(daysChild.search("Wed") != -1) {
			dayArray.push(3);
		}
		if(daysChild.search("Thurs") != -1) {
			dayArray.push(4);
		}
		if(daysChild.search("Fri") != -1) {
			dayArray.push(5);
		}

		// Collect the timings of each day
		var timingChild = daysChild.split(";");
		var timeStringArr = timingChild[timingChild.length - 1].split("-");
		var startCFTime = [];
		var endCFTime = [];

		// Correct format of start time
		var splitStartTimeArr = timeStringArr[0].split(":");
		var adjustmentfactor = 0;
		if(timeStringArr[0].search("12") != -1) {
			adjustmentfactor = 0;
		} else if(timeStringArr[0].search("pm") != -1) {
			adjustmentfactor = 12;
		}
		adjustmentfactor = parseInt(splitStartTimeArr[0]) + adjustmentfactor;
		startCFTime.push(adjustmentfactor);
		startCFTime.push(parseInt(splitStartTimeArr[1].substring(0,2)));
		console.log(startCFTime);

		// Correct format of end time
		var splitEndTimeArr = timeStringArr[1].split(":");
		var adjustmentfactor = 0;
		if(timeStringArr[1].search("12") != -1) {
		} else if(timeStringArr[1].search("pm") != -1) {
			adjustmentfactor = 12;
		}
		adjustmentfactor = parseInt(splitEndTimeArr[0]) + adjustmentfactor;
		endCFTime.push(adjustmentfactor);
		endCFTime.push(parseInt(splitEndTimeArr[1].substring(0, 2)));
		console.log(endCFTime);


		// Creating Calendar entry
		var calEntry = icsFormatter();

		var semesterStartDate = new Date(2017, 0, 9);
		var semesterStartDay = semesterStartDate.getDay();
		var semesterEndDate = new Date(2017, 3, 30);

		var title = classNameChild;
		var place = mainRow.children[4].querySelector('a').innerHTML;
		var description = '';

		var begin = new Date(2017, 0, 9);
		var end = new Date(2017, 0, 9);
		var dateAdjust = 9 + (dayArray[0] - semesterStartDay);
		begin.setDate(dateAdjust);
		end.setDate(dateAdjust);
		begin.setHours(startCFTime[0]);
		begin.setMinutes(startCFTime[1]);
		end.setHours(endCFTime[0]);
		end.setMinutes(endCFTime[1]);

		calEntry.addEvent(title, description, place, begin.toUTCString(), end.toUTCString());
		calEntry.download('Class Schedule');

	});
};
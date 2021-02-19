(function($) {
  "use strict"; // Start of use strict

  // greeting based on time of day
  var greeting;
  var timeOfDay = new Date().getHours();

  if (timeOfDay < 12) {
    greeting = "Good morning!";

  } else if (timeOfDay < 17) {
    greeting = "Good afternoon!";

  } else {
    greeting = "Good evening!";

  }

  // show greeting always on
  document.getElementById("greeting").innerHTML = greeting;





  // neighborhood day, message, and background image for each day of week
  var scheduleCurrentDate = new Date();
  var map = document.getElementById('masthead');
  var scheduleAllDays = [
    {
      day: "Sunday",
      neighborhood: "there is no curbside trash or recycling pickup scheduled on weekends.",
      image:
      "../img/bmr-continuity.jpg"
    },
    {
      day: "Monday",
      neighborhood: " <strong>West Bangor</strong> and <strong>Fairmount</strong>.",
      image:
      "../img/bmr-waterfront.jpg"
    },
    {
      day: "Tuesday",
      neighborhood: " <strong>Hayford Park</strong> and <strong>Whitney Park</strong>.",
      image:
      "../img/bmr-stevenkinghouse.jpg"
    },
    {
      day: "Wednesday",
      neighborhood: " <strong>North Bangor</strong>, <strong>East Bangor</strong>, <strong>Six Mile Falls</strong>, <strong>Capehart</strong>, <strong>Colonial Pines</strong>, <strong>Outer Ohio</strong>, and <strong>Judson Heights</strong>.",
      image:
      "../img/bmr-standpipe.jpg"
    },
    {
      day: "Thursday",
      neighborhood: " <strong>Broadway Historic District</strong>, <strong>Bangor Gardens</strong>, and <strong>Little City</strong>.",
      image:
      "../img/bmr-norumbegapark.jpg"
    },
    {
      day: "Friday",
      neighborhood: " the <strong>Tree Streets</strong>, <strong>Stillwater Avenue</strong>, and <strong>Mount Hope</strong>.",
      image:
      "../img/bmr-westmarket.jpg"
    },
    {
      day: "Saturday",
      neighborhood: "there is no curbside trash or recycling pickup scheduled on weekends.",
      image:
      "../img/bmr-westmarket2.jpg"
    }
  ];

  // show background image based on day of the week, always on
  map.style.background = "url('" + scheduleAllDays[scheduleCurrentDate.getDay()].image + "') no-repeat center"; 





  // if it's not the weekend, automatically highlight the neighborhood on the map and show the description
  var scheduledForToday = scheduleCurrentDate.getDay();
  var isWeekend = (scheduledForToday === 6) || (scheduledForToday === 0); // 6 = Saturday, 0 = Sunday

  if (isWeekend === false) { 
    // highlight neighborhood based on day during work week
    scheduledForToday = scheduledForToday > 0 ? scheduledForToday - 1 : 6;
    $('.map-region-group').eq(scheduledForToday).addClass('map-region-selected');
    $('.map-legend-item').eq(scheduledForToday).addClass('map-region-selected');
    $('.map-region-description').eq(scheduledForToday).addClass('map-region-selected');
  } else {
    // highlight full map on weekend
    $("svg.bangor > .map-region-group").addClass("map-region-selected");
    $(".map-legend-item").removeClass("map-region-selected");
    $(".map-region-description").removeClass("map-region-selected");
    $("#allDaysDesc").addClass("map-region-selected");
    $("#showall").addClass("map-region-selected");
  }





  // calculate bi-weekly schedule - this required some mathematical Jiu-Jitsu
  function treatAsUTC(date) {
      var result = new Date(date);
      result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
      return result;
  }

  function daysBetween(startDate, endDate) {
      var millisecondsPerDay = 24 * 60 * 60 * 1000;
      return Math.floor((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay);
  }

  var demarcationdate = new Date("March 13, 2017 00:00:00"); // start date based on previously scheduled recycling week
  var showTodaysDate = document.getElementById('todaysDate');
  var showNeighborhood = document.getElementById('neighborhood');
  var showFutureDate = document.getElementById('futureDate');
  var nextWeekBegins = document.getElementById('followingWeek');
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = new Date();
  var days = daysBetween(demarcationdate,today);
  var daystill = 14 - days%14;
  // var recursToday = days%14==0; // testing bi-weekly occurrence - ok to delete
  var nextStartDate = new Date();

  // add remaining days to current date to get next recycling week start date
  nextStartDate.setDate(today.getDate() + daystill); 

  // format dates to make them easy to read
  var currentDate = (dayNames[today.getDay()] + ", " +  monthNames[today.getMonth()] + " " +  today.getDate() + ", " +  today.getFullYear());
  var nextDate = (dayNames[nextStartDate.getDay()] + ", " +  monthNames[nextStartDate.getMonth()] + " " +  nextStartDate.getDate());

  // Conditional display rules
  var date1 = new Date(today); // today's date
  var date2 = new Date(nextStartDate); // day next recycling week starts
  var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // caluclate time between two dates
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert that time to days

  // show current date, always on
  showTodaysDate.innerHTML="Today is " + currentDate.toString() + ", and "; 

  // show start date of next recycling week and days remaining, always on
  nextWeekBegins.innerHTML="The next recycling week starts " + nextDate + " (" + daystill + " day" + ((daystill != 1) ? "s" : "") + " from now)."

  // conditionally show daily/weekly message
  if (isWeekend === true) { 
    // if it's the weekend, get the weekend message
    showNeighborhood.innerHTML = scheduleAllDays[scheduleCurrentDate.getDay()].neighborhood; 

  } else if (diffDays <= 7) { 
    // if it is not a recycling week, show trash-only message
    showFutureDate.innerHTML="this is a <strong>trash-only</strong> week. Curbside trash pickup will run according to the regular neighborhood schedule. See map below for details."; 
    
  } else {
    // if it is a recycling week, show neighborhood scheduled for recycling pickup
    showNeighborhood.innerHTML = "this is a recycling week. Curbside pickup for both recycling and regular trash is scheduled for " + scheduleAllDays[scheduleCurrentDate.getDay()].neighborhood; 
  }





  // indicate which day of the week map is on below map legend
  // 0=sun, 1=mon, 2=tue, 3=wed, 4=thu, 5=fri, 6=sat
  var currentWeekday = new Date().getDay();
  var currentMon = document.getElementById('currentDay1');
  var currentTue = document.getElementById('currentDay2');
  var currentWed = document.getElementById('currentDay3');
  var currentThu = document.getElementById('currentDay4');
  var currentFri = document.getElementById('currentDay5');

  // conditionally tack on "today" if current day is scheduled
  if (currentWeekday == 1) {
    currentMon.innerHTML = "(today)"; 

  } else if (currentWeekday == 2) {
    currentTue.innerHTML = "(today)"; 

  } else if (currentWeekday == 3) {
    currentWed.innerHTML = "(today)"; 

  } else if (currentWeekday == 4) {
    currentThu.innerHTML = "(today)"; 

  } else if (currentWeekday == 5) {
    currentFri.innerHTML = "(today)"; 
  }





  // pull neighborhoods and add them to the map legend
  var currentNeighborhoodMon = document.getElementById('currentNeighborhood1');
  var currentNeighborhoodTue = document.getElementById('currentNeighborhood2');
  var currentNeighborhoodWed = document.getElementById('currentNeighborhood3');
  var currentNeighborhoodThu = document.getElementById('currentNeighborhood4');
  var currentNeighborhoodFri = document.getElementById('currentNeighborhood5');

  // pull neighborhoods and add them to the map legend
  currentNeighborhoodMon.innerHTML = "Neighborhoods scheduled for Monday pickup are " + scheduleAllDays[1].neighborhood + " Notable landmarks include the Bangor Fairgrounds, Bass Park, Cross Insurance Center, the Bangor Municipal Golf Course, and the statue of Paul Bunyan.";
  currentNeighborhoodTue.innerHTML = "Neighborhoods scheduled for Tuesday pickup are " + scheduleAllDays[2].neighborhood + " This area includes the Fourteenth Street corridor, Mansfield Sports Complex, Beth Pancoe Aquatic Center, the Thomas Hill Standpipe, and Stephen King's house.";
  currentNeighborhoodWed.innerHTML = "Neighborhoods scheduled for Wednesday pickup are " + scheduleAllDays[3].neighborhood + " This area includes the Brown Woods, Union Street Rec Park, Airport Mall, and the Walden-Parke Preserve.";
  currentNeighborhoodThu.innerHTML = "Neighborhoods scheduled for Thursday pickup are " + scheduleAllDays[4].neighborhood + " This area is where you can find the Bangor Public Library, John Bapst, Broadway Park, St. Joseph Hospital, and City Hall.";
  currentNeighborhoodFri.innerHTML = "Neighborhoods scheduled for Friday pickup are " + scheduleAllDays[5].neighborhood + " This area includes the Bangor City Forest, EMMC, EMCC, Cascade Park, Mount Hope Cemetery, the Mall, and about fifty car dealerships.";



})(jQuery); // End of use strict

// Main element and working hours array
var mainEl = $(".main");
var workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Function to check and update time block status
function checkTime(hourBlockEl, hour) {
  var currentHour = dayjs().format("HH");
  if (currentHour > hour) {
    hourBlockEl.attr("class", "row time-block past");
  } else if (currentHour < hour) {
    hourBlockEl.attr("class", "row time-block future");
  } else if (currentHour == hour) {
    hourBlockEl.attr("class", "row time-block present");
  }
}

// Function to display current day and date
function displayCurrentDayAndDate() {
  var currentDayEl = $("#currentDay");
  var currentDateEl = $("#currentDate");
  currentDayEl.text(dayjs().format("dddd"));
  currentDateEl.text(dayjs().format("DD/MM/YYYY"));
}

// Function to handle alert flash
function alertFlash() {
  var alertEl = $("<div>");
  alertEl.attr("class", "saveFlash");
  alertEl.text("Event set into Local Storage");
  setTimeout(function () {
    alertEl.remove();
  }, 3000);

  mainEl.append(alertEl);
}

// Function to handle button clicks and local storage
function checkClicks() {
  $("body").on("click", ".saveBtn", function () {
    var hourIndex = $(this).data("hour");
    localStorage.setItem(
      "hour-" + hourIndex + " event",
      $("#input-" + hourIndex).val()
    );
    alertFlash();
  });
}

// Load hour blocks
for (var i = 0; i < workingHours.length; i++) {
  var hourBlockEl = $("<article>").attr("id", "hour-" + i);
  checkTime(hourBlockEl, workingHours[i]);

  var hourNumberEl = $("<div>")
    .attr("class", "col-2 col-md-1 hour text-center py-3")
    .text(workingHours[i] > 12 ? workingHours[i] - 12 : workingHours[i])
    .append(workingHours[i] >= 12 ? "PM" : "AM");

  var textInputEl = $("<textarea>")
    .attr("id", "input-" + i)
    .attr("class", "col-8 col-md-10 description")
    .text(localStorage.getItem("hour-" + i + " event"));

  var saveBtn = $("<button>")
    .attr("class", "btn saveBtn col-2 col-md-1")
    .attr("aria-label", "save")
    .attr("id", "sButton-" + i)
    .data("hour", i);

  var saveIcon = $("<i>").attr("class", "fas fa-save");

  saveBtn.append(saveIcon);
  hourBlockEl.append(hourNumberEl, textInputEl, saveBtn);
  mainEl.append(hourBlockEl);
}

// Initialize script
$(window).on("load", function () {
  displayCurrentDayAndDate();
  checkClicks();
});

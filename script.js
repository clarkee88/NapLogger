var timepickerStarts = document.getElementsByClassName("timepicker-start");
for (var i = 0; i < timepickerStarts.length; i++) {
    timepickerStarts.item(i).addEventListener("input", function() {
        UpdateNapDuration();
        UpdateWakeWindow ()
    }, false);
}

var timepickerEnds = document.getElementsByClassName("timepicker-end");
for (var i = 0; i < timepickerEnds.length; i++) {
    timepickerEnds.item(i).addEventListener("input", function() {
        UpdateNapDuration();
        UpdateWakeWindow ()
    }, false);
}

function UpdateNapDuration (){
    //get all items to update
    var napDurations = document.getElementsByClassName("napDuration");
    for (var i = 0; i < napDurations.length; i++) {
        //calculate nap duration (End time - Start time)
        var targetElement = napDurations.item(i);
        var startTime = targetElement.closest(".row").querySelector(".timepicker-start").value;
        var endTime = targetElement.closest(".row").querySelector(".timepicker-end").value;
        // console.log("start time is: " + startTime);
        // console.log("end time is: " + endTime);

        if(startTime.length > 0 && endTime.length > 0){
            var start = startTime.split(":");
            var end = endTime.split(":");
            var startDate = new Date(0, 0, 0, start[0], start[1], 0);
            var endDate = new Date(0, 0, 0, end[0], end[1], 0);
            var diff = endDate.getTime() - startDate.getTime();
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);

            var duration = (hours < 9 ? "0" : "") + hours + "h " + (minutes < 9 ? "0" : "") + minutes + "m";
            targetElement.innerHTML = "Nap duration: " + duration;
        }
     }
}

function UpdateWakeWindow () {
    //get all items to update
    var wakeWindows = document.getElementsByClassName("wakeWindow");
    for (var i = 0; i < wakeWindows.length; i++) {
        //calculate wake window (next start time - current end time)
        var targetElement = wakeWindows.item(i);
        var currentEndTime = targetElement.closest(".row").querySelector(".timepicker-end").value;
        var nextStartTime = targetElement.closest(".row").nextElementSibling.querySelector(".timepicker-start").value;

        if(currentEndTime.length > 0 && nextStartTime.length > 0){
            var start = currentEndTime.split(":");
            var end = nextStartTime.split(":");
            var startDate = new Date(0, 0, 0, start[0], start[1], 0);
            var endDate = new Date(0, 0, 0, end[0], end[1], 0);
            var diff = endDate.getTime() - startDate.getTime();
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);

            var duration = (hours < 9 ? "0" : "") + hours + "h " + (minutes < 9 ? "0" : "") + minutes + "m";
            targetElement.innerHTML = "Wake window: " + duration;
        }

    }
}
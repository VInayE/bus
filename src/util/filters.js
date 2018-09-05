export function fullTimeFilter (time) {
  let hours = Number(time.match(/^(\d+)/)[1]);
  let minutes = Number(time.match(/:(\d+)/)[1]);
  let AMPM = time.match(/\s(.*)$/)[1];
  if(AMPM == "PM" && hours<12) hours = hours+12;
  if(AMPM == "AM" && hours==12) hours = hours-12;
  let sHours = hours.toString();
  let sMinutes = minutes.toString();
  if(hours<10) sHours = "0" + sHours;
  if(minutes<10) sMinutes = "0" + sMinutes;
  return sHours + ":" + sMinutes
}

export function durationFilter (duration){
    duration = duration.split(':')
    return duration[0] + "h " + duration[1] + 'm'
}

export function srpPriceFilter(price){
  return parseInt(price)  
}
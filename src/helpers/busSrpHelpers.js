export {getallowedDates, findSRPActiveTab, scrollSRPTab , filterBusSRPResult}

function getallowedDates (){
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let allowedDate = []
  for(let i=0 ; i< 60 ; i++){
    let day = new Date(year, month , date + i).toString().split(' ')
    let today = new Date(year, month , date + i)
    let ajaxDate = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2)
    let selected = {
      displayDate: day[0]+ " " + day[2] + " "+ day[1],
      ajaxDate: ajaxDate,
      tabIndex:`tab-${i+1}`
    }
    
    allowedDate.push(selected)
 }
 return allowedDate
}

function findSRPActiveTab(ddate, allowedDate) {
  let index = allowedDate.findIndex(x => x.ajaxDate === ddate)
  if(index >=0){
    return index+1
  } else {
    return '1'
  }
}

function scrollSRPTab(index) {
  if(index > 4){
    document.getElementsByClassName('tabs__container')[0].style.transform=`translateX(-${64*parseInt(index-1)}px)`
  }
}

function filterBusSRPResult(list,filterOption){
  let filterList = []
  for(let i=0 ;i < list.length;i++){
    if((filterOption.boardingPoint.length == 0 || intersect(list[i].BP,filterOption.boardingPoint)) && 
       (filterOption.droppingPoint.length == 0  || intersect(list[i].DP,filterOption.boardingPoint)) && 
       (filterOption.operator.length == 0 || intersect([list[i].opId],filterOption.operator)) && (filterOption.seatType.length == 0 || intersect(list[i].amenities,filterOption.seatType)) && (filterOption.busType.length == 0 || intersect([list[i].st],filterOption.busType)) && (filterOption.timeType.length == 0 || checkDurationFilter([list[i].dt24],filterOption.timeType))){
      filterList.push(list[i])
    }
  }
  return filterList
}

function checkDurationFilter(a,b){
    var count = 0
    var arr2 = a[0].split(":")
    for(let k=0;k<b.length;k++){
        var arr1 = b[k].split("-")
        if(parseInt(arr2[0])>parseInt(arr1[0]) && parseInt(arr2[0])<parseInt(arr1[1])){
           count = count +1
           }
    }
    if(count == 0){
       return false
       }
    else{
        return true
    }
}

function intersect(a,b){
  a = new Set(a)
  b = new Set(b)
  let intersection = new Set([...a].filter(x => b.has(x)))
  return Array.from(intersection).length > 0 ? true :false
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

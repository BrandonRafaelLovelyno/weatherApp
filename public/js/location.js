let url='/jsonData?'

function success({coords}){
  console.log('success function',coords.latitude,coords.longitude)
  url+=`latitude=${coords.latitude}&longitude=${coords.longitude}`
  console.log(url)
  return url
}

function error(){
  console.log('error function')
    alert('Cannot find your location. Using the latitude and longitude of 10')
    url+=`latitude=10&longitude=10`
    console.log(url)
    return url
}
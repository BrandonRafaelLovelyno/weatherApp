let url='/jsonData?'

function success({coords}){
  console.log('success function',coords.latitude,coords.longitude)
  url+=`latitude=${coords.latitude}&longitude=${coords.longitude}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      main(data)
      document.body.classList.remove('blurred')
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function error(){
  console.log('error function')
    alert('Cannot find your location. Using the latitude and longitude of 10')
    url+=`latitude=10&longitude=10`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        main(data)
        document.body.classList.remove('blurred')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('calling navigator')
    navigator.geolocation.getCurrentPosition(success,error)
      .then(data=>{
        success(data)
      })
      .catch(data=>{
        error(data)
      })
});

function main(data){
  renderCurrentHeader(data.current)
  renderDailySection(data.daily)
  renderHourlyTable(data.hourly)
}

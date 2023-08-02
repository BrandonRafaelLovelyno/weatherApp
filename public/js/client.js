document.addEventListener('DOMContentLoaded', async function() {
  console.log('calling navigator')
    navigator.geolocation.getCurrentPosition(success,error)
    setTimeout(() => {
      console.log(url)
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
    }, 1000);
});

function main(data){
  renderCurrentHeader(data.current)
  renderDailySection(data.daily)
  renderHourlyTable(data.hourly)
}

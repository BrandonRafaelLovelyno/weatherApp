document.addEventListener('DOMContentLoaded', function() {
    fetch('/jsonData')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        main(data)
        document.body.classList.remove('blurred')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
});

function main(data){
renderCurrentHeader(data.current)
}

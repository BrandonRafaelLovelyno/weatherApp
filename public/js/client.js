document.addEventListener('DOMContentLoaded', function() {
    fetch('/jsonData')
      .then(response => response.json())
      .then(data => {
        document.body.classList.remove('blurred')
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
});

//data adalah object dengan properti curremt, daily, dan hourly

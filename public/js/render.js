function pairCodewithIcon(values,iconName){
    values.forEach(code => {
        ICON_MAP.set(code,iconName)
    });
}
  
function renderCurrentHeader(current){
    document.querySelector('img').src=pickIconUrl(current.weatherCode)
}
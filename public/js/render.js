const DAY_FORMATTER = new Intl.DateTimeFormat(undefined,{'weekday':'long'})

function renderProperty(property,value,{parent=document}={}){
    parent.querySelector(`[data-${property}]`).textContent=value;
}

function renderCurrentHeader(current){
    document.querySelector('img').src=pickIconUrl(current.weatherCode);
    renderProperty('current-temp',current.currentTemp);
    renderProperty('current-high',current.highTemp);
    renderProperty('current-low',current.lowTemp);
    renderProperty('current-feels-high',current.feelsHigh);
    renderProperty('current-feels-low',current.feelsLow);
    renderProperty('current-precip',current.precipitation);
}

function renderDailySection(daily){
    const dailySection=document.querySelector('.day-section')
    const dailyCardTemplate=document.querySelector('.day-card-template')
    dailySection.innerHTML='';
    daily.forEach((d)=>{
        const card=dailyCardTemplate.content.cloneNode(true)
        renderProperty('card-temp',d.temperature,{parent:card})
        renderProperty('card-day',DAY_FORMATTER.format(d.timeStamp),{parent:card})
        const elementIcon=card.querySelector('[data-card-icon]')
        elementIcon.src=pickIconUrl(d.weatherCode)
        console.log(elementIcon.src)
        dailySection.append(card)
    })
}

function renderHourlyTable(hourly){
    const HOUR_FORMATTER= new Intl.DateTimeFormat(undefined,{'hour':'numeric'})
    const hourSection=document.querySelector('.hour-section')
    const hourTemplate=document.querySelector('.hour-row-template')

    hourSection.innerHTML=''
    hourly.forEach((hour)=>{
        const row=hourTemplate.content.cloneNode(true)
        renderProperty('row-day',DAY_FORMATTER.format(hour.timeStamp),{parent:row})
        renderProperty('row-hour',HOUR_FORMATTER.format(hour.timeStamp),{parent:row})
        renderProperty('row-temp',hour.temperature,{parent:row})
        renderProperty('row-feels-temp',hour.feelsHigh,{parent:row})
        renderProperty('row-wind',hour.wind,{parent:row})
        renderProperty('row-precip',hour.precipitation,{parent:row})
        const elementIcon=row.querySelector('.weather-icon')
        elementIcon.src=pickIconUrl(hour.weatherCode)
        hourSection.append(row)
    })
}


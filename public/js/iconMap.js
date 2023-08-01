const ICON_MAP = new Map()

pairCodewithIcon([0,1],'sunny')
pairCodewithIcon([2],'cloud_sun')
pairCodewithIcon([3],'cloud')
pairCodewithIcon([45,48],'smog')
pairCodewithIcon([51,53,55,56,57,61,63,65,66,67,80,81,82],'heavy_rain')
pairCodewithIcon([71,73,75,77,85,86],'snowflake')
pairCodewithIcon([95,96,99],'cloud_bolt')


function pairCodewithIcon(values,iconName){
    values.forEach(code => {
        ICON_MAP.set(code,iconName)
    });
}

function pickIconUrl(code){
    return `${ICON_MAP.get(code)}.png`
}

function pickIconUrl(code){
    console.log(`${ICON_MAP.get(code)}.png`)
    return `/images/${ICON_MAP.get(code)}.png`
  }
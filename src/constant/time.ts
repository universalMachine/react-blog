export const formatDate = (localDateTime:any)=>{
    const {year,monthValue,dayOfMonth,hour,minute} = localDateTime
    return `${year}/${monthValue}/${dayOfMonth}  ${hour}:${minute.toString().length>1?minute:"0"+minute}`
}
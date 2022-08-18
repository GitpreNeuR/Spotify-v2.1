function milliToMinAndSec(milli){
    const minutes=Math.floor(milli/60000);
    const seconds=((milli % 60000)/1000).toFixed(0);
    return seconds==60 
    ? minutes + 1 + ":00" 
    : minutes + ":"+(seconds < 10 ? "0" : "" ) + seconds; 
}

export default milliToMinAndSec
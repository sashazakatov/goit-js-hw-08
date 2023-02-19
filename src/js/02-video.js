import Player  from '@vimeo/player'
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const vimeoPlayerRef = document.querySelector('#vimeo-player');
const player = new Player(vimeoPlayerRef);

setCurrentTime();

player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

function onPlayerTimeupdate(data){
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}
function setCurrentTime(){
    const time = localStorage.getItem(LOCALSTORAGE_KEY);
    if(!time){
        return ;
    }
    try{
       const { seconds } = JSON.parse(time);
       player.setCurrentTime(seconds);
       console.log(seconds);
    }
    catch(error){
        console.log('name error:', error.name);
        console.log('message error:', error.message);
    }
}
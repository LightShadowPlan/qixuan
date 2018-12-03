
const render = () => {

    let topTitle = document.querySelector('#topTitle');

    //头部渐变title
    function randomColor() {
        let R = parseInt(Math.random() * 255);
        let G = parseInt(Math.random() * 255);
        let B = parseInt(Math.random() * 255);
        return 'rgb(' + R + ',' + G + ',' + B
        ')';
    }
    setInterval(function () {
        topTitle.style.color = randomColor();
    }, 5000)

    //导航栏

    //函数节流
    function throttle(callback,duration,content){
        var lasttime = 0;
        return function(){
            var now = new Date().getTime();
            if(now-lasttime>duration){
                callback.call(content);
                lasttime = new Date().getTime();
            }
        }
    }
}

module.exports = {
    render
}
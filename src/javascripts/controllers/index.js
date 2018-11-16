
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
    // 侧边栏定位
    $('.left').on('click', '.left-list', function () {
        let index = $(this).index()
        let scrollY = $('.center .center-list').eq(index).offset().top
        $('html').animate({scrollTop: scrollY})
        $(this).addClass('leftSelected').siblings().removeClass('leftSelected')
    })
    //页面滚动改变侧边栏状态
    let scrollArray = []
    for( let i=1; i<$('.left .left-list').length; i++){
        scrollArray.push($('.center .center-list').eq(i).offset().top)
    }
    let timer = null
    $(window).on('scroll', throttle(function(){
        let htmlScroll = $(window).scrollTop() + 130
        for(let i = 0; i< scrollArray.length; i++){
            if( htmlScroll < scrollArray[i] ){
                $('.left .left-list').eq(i).addClass('leftSelected').siblings().removeClass('leftSelected')
                break;
            } else if( i === scrollArray.length-1 ){
                $('.left .left-list').eq(i+1).addClass('leftSelected').siblings().removeClass('leftSelected')
            }


        }
    },100))
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
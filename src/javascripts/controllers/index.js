import { htmlList } from "./template";

const render = () => {

    let topTitle = document.querySelector('#topTitle');

    //头部渐变title
    function randomColor() {
        let R = parseInt(Math.random() * 255);
        let G = parseInt(Math.random() * 255);
        let B = parseInt(Math.random() * 255);
        return 'rgb(' + R + ',' + G + ',' + B +')';
    }
    //点击头部清除页面主体内容
    $('.Header').click(function(){
        $('.container-view').html('')
    })
    setInterval(function () {
        topTitle.style.color = randomColor();
    }, 5000)

    //导航栏
    $('.Navigation-box').on('click','.nav-list-box li',function(){
        let that = $(this).attr('class')
        let thatHtml = template.render(htmlList[that])
        $('.container-view').html(thatHtml)
    })

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

export default render
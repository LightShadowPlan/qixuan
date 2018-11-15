
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
}

module.exports = {
    render
}
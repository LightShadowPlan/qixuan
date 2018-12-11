
    //头部渐变title
    function randomColor() {
        let R = parseInt(Math.random() * 255);
        let G = parseInt(Math.random() * 255);
        let B = parseInt(Math.random() * 255);
        return 'rgb(' + R + ',' + G + ',' + B +')';
    }
    setInterval(function () {
        topTitle.style.color = randomColor();
    }, 5000)


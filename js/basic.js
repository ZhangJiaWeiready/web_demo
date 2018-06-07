(function (w) {
    w.mario = {};
    w.mario.basic = function () {
        var now = 0;
        var nowY = 0;
        var wrapNode = document.querySelector('#wrap');
        var topNode = document.querySelector('#wrap > .top');
        var bottomNode = document.querySelector('#wrap > .bottom');
        var letGo = document.querySelector('#wrap .letGo');
        letGo.addEventListener('click',function () {
            xuelu.css(bottomNode,'translateY',0);
            xuelu.css(topNode,'translateY',0);
            setTimeout(function () {
                letGo.style.display = 'none';
            },1000)
            now = 0;
        });
        if (wrapNode.addEventListener) {
            wrapNode.addEventListener('DOMMouseScroll', function (event) {
                event = event || window.event;
                fn(event)
            })
        }
        wrapNode.onmousewheel = function (event) {
            event = event || window.event;
            fn(event)
        };
        function fn(event) {
            nowY = xuelu.css(topNode,'translateY');
            console.log(nowY);
            event = event || window.event;
            var dir = '';
            if (event.wheelDelta) {
                    dir = event.wheelDelta > 0 ? 'up' : 'down'
                } else if (event.detail) {
                    dir = event.detail > 0 ? 'down' : 'up'
                }
                switch (dir) {
                    case 'up':
                        now++;
                        if (now > 0) {
                            now = 0;
                        }
                        console.log('向上');
                        move(now);
                        break;
                    case 'down':
                        if(nowY <= -4500){
                            return;
                        }
                        now--;
                        console.log('向下');
                        move(now);
                        break;
                }
        }
        function move(now) {
            var topIndex = 120;
            var bottomIndex = 50;
            var disT = (topIndex * now);
            var disB = (bottomIndex * now);
            topNode.style.transform = xuelu.css(topNode, 'translateY', disT);
            bottomNode.style.transform = xuelu.css(bottomNode, 'translateY', disB);
            if(nowY >= -3000 && nowY <= -2850){
                crance.starts();
            }
            if(nowY <= -480){
                letGo.style.display = 'block';
            }else{
                letGo.style.display = 'none';
            }
            console.log(xuelu.css(bottomNode,'translateY'));
            console.log(xuelu.css(topNode,'translateY'));
        }
        // 第三屏js
        setWidth();
        function setWidth() {
            var imgNode = document.querySelectorAll('#wrap .top .projects .content #projects2 .listTop li img');
            var liTopNode = document.querySelectorAll('#wrap .top .projects .content #projects2 .listTop > li');
            var liBottomNode = document.querySelectorAll('#wrap .top .projects .content #projects2 .listbottom > li');
            var imgHeight = imgNode[0].clientHeight;
            for (var i = 0; i < liTopNode.length; i++) {
                liTopNode[i].style.height = imgHeight + 'px';
            }
            for (var i = 0; i < liBottomNode.length; i++) {
                liBottomNode[i].style.height = imgHeight + 'px'
            }
        }
        //第四屏js
        $('.carousel').carousel({
            interval: 2000, /*2s 切换轮播*/
            pause: null, /*默认hover时停止，null 为hover时并不停止*/
            wrap: true /*不进行无缝循环 注：首页向上翻是废掉的*/
        });
        var beforeNode = document.querySelector('#wrap .top .short .content #short2 .prenext');
        var afterNode = document.querySelector('#wrap .top .short .content #short2 .next');

        beforeNode.addEventListener('click', function () {
            $('.carousel').carousel('prev');
        });
        afterNode.addEventListener('click', function () {
            $('.carousel').carousel('next');
        });
    }
    w.mario.screen = function (wrapNode,topNode,bottomNode,letGo) {
        var now = 0;
        var nowY = 0;
        letGo.addEventListener('click',function () {
            xuelu.css(bottomNode,'translateY',0);
            xuelu.css(topNode,'translateY',0);

            now = 0;
            setTimeout(function () {
                letGo.style.display = 'none';
            },1000);
        });
        if (wrapNode.addEventListener) {
            wrapNode.addEventListener('DOMMouseScroll', function (event) {
                event = event || window.event;
                fn(event)
            })
        }
        wrapNode.onmousewheel = function (event) {
            event = event || window.event;
            fn(event)
        };
        function fn(event) {
            nowY = xuelu.css(topNode,'translateY');
            console.log(nowY);
            event = event || window.event;
            var dir = '';
            if (event.wheelDelta) {
                dir = event.wheelDelta > 0 ? 'up' : 'down'
            } else if (event.detail) {
                dir = event.detail > 0 ? 'down' : 'up'
            }
            switch (dir) {
                case 'up':
                    now++;
                    if (now > 0) {
                        now = 0;
                    }
                    move(now);
                    break;
                case 'down':
                    if(nowY <= -2500){
                        return;
                    }
                    now--;
                    console.log('向下');
                    move(now);
                    break;
            }
        }
        function move(now) {
            var topIndex = 120;
            var bottomIndex = 50;
            var disT = (topIndex * now);
            var disB = (bottomIndex * now);
            topNode.style.transform = xuelu.css(topNode, 'translateY', disT);
            bottomNode.style.transform = xuelu.css(bottomNode, 'translateY', disB);
            if(nowY <= -480){
                letGo.style.display = 'block';
            }else{
                letGo.style.display = 'none';
            }
            console.log(xuelu.css(bottomNode,'translateY'));
            console.log(xuelu.css(topNode,'translateY'));
        }
    };
})(window);
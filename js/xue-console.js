(function (w) {
    w.xuelu = {};
    xuelu.css = function (node,type,val) {
        if(typeof node === 'object' && typeof node.transform === 'undefined'){
            node.transform = {};
        }
        if(arguments.length >= 3) {
            var text = '';
            node.transform[type] = val;
            for(item in node.transform){
                if(node.transform.hasOwnProperty(item)){
                    switch(item){
                        case 'translateX':
                        case 'translateY':
                        case 'translateZ':
                            text += type +'('+node.transform[type]+'px)';
                            break;
                        case 'scale':
                            text += type+'('+node.transform[type]+')';
                            break;
                        case 'rotate':
                            text += type+'('+node.transform[type]+'deg)';
                            break;
                    }
                    node.style.transform = node.style.webkitTransform = text;
                }
            }
        }else  if(arguments.length === 2){
            val = node.transform[type];
            if(typeof val === 'undefined'){
                switch (type){
                    case 'translateX':
                    case 'translateY':
                    case 'rotate':
                        val = 0;
                        break;
                    case 'scale':
                        val = 1;
                        break;
                }
            }
            return val;
        }

    };
    xuelu.dragNav = function () {
        var wrap = document.querySelector('.xuelu-nav');
        var listNode = wrap.querySelector('.list-nav');
        var mixDis = wrap.clientWidth - listNode.offsetWidth;
        var element = {};
        var handStart = {};
        //快速滑屏参数
        var lastTime = 0;
        var lastPoint = 0;
        var timeDis = 1;
        var pointDis = 0;
        wrap.addEventListener('touchstart',function (event) {
            event = event || window.event;
            var touchC = event.changedTouches[0];
            handStart = {clientX:touchC.clientX,clientY:touchC.clientY};
            //手指移动到当前屏幕上的时间，和手指位置，元素位置
            lastTime = new Date().getTime();
            lastPoint = handStart.clientX;
            element.x = xuelu.css(listNode,'translateX');
            pointDis = 0;
            listNode.handMove = false;
            listNode.style.transition = 'none';
        });
        wrap.addEventListener('touchmove',function (event) {
            event = event || window.event;
            var touchC = event.changedTouches[0];
            var handNow = touchC;
            //手指的偏移量
            var dis ={};
            dis.x = handNow.clientX - handStart.clientX;
            dis.y = handNow.clientY - handStart.clientY;
            //手指移动到当前屏幕上的时间，和手指位置
            var nowTime = new Date().getTime();
            var nowPoint = handNow.clientX;
            //差值
            timeDis = nowTime - lastTime;
            pointDis = nowPoint - pointDis;
            //实时更新
            lastTime = nowTime;
            lastPoint = nowPoint;
            // 元素应该处的位置
            var translateX = element.x + dis.x;
            //手动橡皮筋
            if(translateX > 0){
                listNode.hasMove = true;
                var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth + translateX)*1.5);
                translateX = xuelu.css(listNode,'translateX') + pointDis*scale;
            }else if(translateX < mixDis){
                listNode.hasMove = true;
                var over = mixDis - translateX;
                var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth + over)*1.5);
                translateX = xuelu.css(listNode,'translateX') + pointDis * scale;
            }
            xuelu.css(listNode,'translateX',translateX);
        });
        wrap.addEventListener('touchend',function (event) {
            event = event || window.event;
            var translateX = xuelu.css(listNode,'translateX');
            if(!listNode.hasMove){
                var speed = pointDis / timeDis;
                speed = Math.abs(speed) < 0.5 ? 0 : speed;
                var targetX = translateX + speed *200;
                var time = Math.abs(speed) * 0.2;
                time = time < 0.8 ? 0.8:time;
                time = time > 2 ? 2:time;
                var bsr = '';
                if(targetX > 0){
                    targetX = 0;
                    bsr = 'cubic-bezier(.26,1.51,.68,1.54)';
                }else if(targetX < mixDis){
                    targetX = mixDis;
                    bsr = 'cubic-bezier(.26,1.51,.68,1.54)'
                }
                listNode.style.transition = time + 's' + bsr + 'transform';
                xuelu.css(listNode,'translateX',targetX);
            }
            //解决手动橡皮筋和自动橡皮筋之间的冲突
            else{
                listNode.style.transition = '.8s  transform';
                if(translateX > 0){
                    translateX = 0;
                    xuelu.css(listNode,'translateX',translateX);

                }else if(translateX < mixDis){
                    translateX = mixDis;
                    xuelu.css(listNode,'translateX',translateX)
                }

            }
            // listNode.style.transaction = '1s transform';

        })

    }
    xuelu.screen = function (wrapNode,topNode,bottomNode,letGo,num,top) {
            var now = 0;
            var nowY = 0;
            letGo.addEventListener('click',function () {
                xuelu.css(bottomNode,'translateY',0);
                xuelu.css(topNode,'translateY',0);
                setTimeout(function () {
                    letGo.style.display = 'none';
                },1000);
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
                        move(now);
                        break;
                    case 'down':
                        if(nowY <= -num){
                            return;
                        }
                        now--;
                        console.log('向下');
                        move(now);
                        break;
                }
            }
            function move(now) {
                var topIndex = 100;
                var bottomIndex = 50;
                var disT = (topIndex * now);
                var disB = (bottomIndex * now);
                topNode.style.transform = xuelu.css(topNode, 'translateY', disT);
                bottomNode.style.transform = xuelu.css(bottomNode, 'translateY', disB);
                if(nowY <= -top){
                    letGo.style.display = 'block';
                }else{
                    letGo.style.display = 'none';
                }
                console.log(xuelu.css(bottomNode,'translateY'));
                console.log(xuelu.css(topNode,'translateY'));
            }
        };
})(window);
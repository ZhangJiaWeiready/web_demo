(function (w) {
    w.zjw = {};
    zjw.firstView = function () {
        var liNodes = document.querySelectorAll("#wrap .top .home .content nav .list li");
        var dropDown =document.querySelector("#wrap .top .home .content nav .list li .dropdown")
        navTab();
        function navTab() {
            for (var i=0;i<liNodes.length;i++){
                // liNodes[0].classList.add("active");
                liNodes[i].onclick=function () {
                    for (var i=0;i<liNodes.length;i++){
                        liNodes[i].classList.remove("active");
                    }
                    this.classList.add("active");
                };
            }
            var isopen = false;
            console.log(liNodes[3]);
            liNodes[3].addEventListener("click",function (ev) {
                ev=ev||event;
                console.log(1111);
                if(!isopen){
                    dropDown.style.display="block";
                }else{
                    dropDown.style.display="none";
                }
                isopen =!isopen;
                ev.stopPropagation();
                ev.preventDefault();
            })
            document.addEventListener("click",function () {
                if(isopen){
                    dropDown.style.display="none";
                    // isopen=!isopen;
                    isopen=false;
                }
            });
        }
    }
})(window);

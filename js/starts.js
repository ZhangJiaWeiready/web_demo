(function (w) {
    w.crance = {};
    w.crance.starts = function () {
        var ps = document.querySelectorAll('.starts .starts_an .starts_an_grid p');
        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var time1 = setInterval(function () {
            t1 = t1+6;
            t2 = t2+1;
            t3 = t3+3;
            ps[0].innerHTML = t1;
            ps[1].innerHTML = t2;
            ps[2].innerHTML = t3;
            ps[3].innerHTML = t2;
            if(t2>=165){
                clearInterval(time1);
                ps[0].innerHTML = 1045;
                ps[1].innerHTML = 165;
                ps[2].innerHTML = 563;
                ps[3].innerHTML = 245;
            }
        },10);
    }
})(window);
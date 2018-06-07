	var wrapNode = document.querySelector('#wrap');
    var topNode = document.querySelector("#wrap>.top");
    var downNode = document.querySelector("#wrap>.down");
    var letGo = document.querySelector('#wrap>.letGo');
	xuelu.screen(wrapNode,topNode,downNode,letGo,1400,200);
	//第四个按钮切换
	changeBtn();
	function changeBtn(){
		var linode = document.querySelector("#wrap .top .head nav ul li:nth-of-type(4)");
		var ulNode = document.querySelector("#wrap .top .head nav ul li:nth-of-type(4) .dropdown-menu")
		var smalllis = document.querySelectorAll("#wrap .top .head nav ul li:nth-of-type(4) .dropdown-menu li")	
			//console.log(linode)
			var flag = false;
			linode.onclick=function(ev){
				ev = ev || event
				if(!flag){
					tools.addClass(ulNode,'show')
					ulNode.style.visibility='visible'
				}else{
					tools.removeClass(ulNode,'show')
					ulNode.style.visibility = 'hidden';
				}
				flag = !flag
				ev.stopPropagation();
			}
			document.onclick = function(){
				if(flag){
					tools.removeClass(ulNode,'show')
					ulNode.style.visibility = 'hidden';
					flag = !flag
				}	
			}
			
	//导航切换
	changeColor();
	function changeColor(){
		var lis = document.querySelectorAll('#wrap .top .head nav ul li');
		for(var i =0;i<lis.length;i++){
			 lis[i].addEventListener('click',function(){
			 	for(var i =0;i<lis.length;i++){
			 		tools.removeClass(lis[i],'active')
			 	}
			 	
				tools.addClass(this,'active')
				preindex =this;
		})
			
		}

	}
			for(var i =0;i<smalllis.length;i++){
				smalllis[i].onclick = function(ev){
				ev = ev || event;
				ev.stopPropagation();
				}
			}
			
	}

window.onload=function () {
    //拿到左盒子
    var leftBox=document.querySelector(".ct_left");
    //拿到左父盒子的高度
    var leftHeight=leftBox.offsetHeight;
   // console.log(leftHeight);
   //拿到ul盒子  和他的高度
   var ulBox=leftBox.querySelector("ul:first-of-type");
    var ulBoxHeight=ulBox.offsetHeight;
    var lis=ulBox.querySelectorAll("li");
    // 静止区间:
    // 	最大静止区间值= 0;
    var maxTop=0;
    // 	最小静止值:父盒子的高度 - 子盒子的高度
    var minTop=leftHeight - ulBoxHeight;
	// 滑动区间:
    // 	最小静止滑动区间:最小静止值-100
    var minhuadong=minTop-100;
    // 	最大静止滑动区间:最大静止值+100
    var maxhuadong=maxTop+100;
    //添加滑动事件
    var startY=0;
    var moverY=0;
    var distanceY=0;
    //记录当前滑动距离
    var currentY=0;
   // console.log(ulBoxHeight);
    
    ulBox.addEventListener("touchstart",function (e) {
        //获取手指的起始位置
       startY= e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove",function (e) {
        moverY=e.targetTouches[0].clientY;
        //计算距离的差异
        distanceY=moverY-startY;
        //console.log(distanceY);
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        // console.log(maxhuadong);
        // console.log(minhuadong);
        //console.log(distanceY);
        
        
        
        if(currentY+distanceY > maxhuadong || currentY+distanceY < minhuadong){
            console.log("超出范围了");
            return;   
        }
        //将先添加的过度效果请空掉
        ulBox.style.transition="none";
        ulBox.style.top=(currentY+distanceY)+"px";
      })
    ulBox.addEventListener("touchend",function (e) {
         /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
         if(currentY+distanceY < minTop){
             //重置
             currentY=minTop;
             //回到mintop位置
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=minTop+"px";
        
         }else if(currentY+distanceY > maxTop){
             currentY=maxTop;
             //回到maxtop位置
             ulBox.style.transition="top 0.5s";
             ulBox.style.top=maxTop+"px";
         }else{
            currentY+=distanceY
            currentY=currentY+distanceY;
         }
    })
    var index;
    // 为每一个li元素设置一个索引
    for(var i = 0; i < lis.length;i++){
        lis[i].index=i;
       // console.log(lis[i].index)
    }
   /*绑定fastclick*/
   if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
        FastClick.attach(document.body);
    }, false);
}
/*fastclick使用的时候就是来绑定添加click事件*/
ulBox.addEventListener("click",function(e){
     /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
     for(var i = 0; i < lis.length;i++){
         lis[i].classList.remove("active");
     }
     var li=e.target.parentNode;
    var liHeight=li.offsetHeight;
    //console.log(liHeight);
        li.classList.add("active");
        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        /*获取当前li元素的索引值*/
        var index=li.index;
        //开启过度效果
        ulBox.style.transition="top 0.5s";
        /*设置偏移*/
        if(-index*liHeight < minTop){
            ulBox.style.top=minTop+"px";
            currentY=minTop;
        }else{
            ulBox.style.top=-index*liHeight+"px";
            currentY=-index*liHeight;
        }
})
   

    
    
    
   
    
  }
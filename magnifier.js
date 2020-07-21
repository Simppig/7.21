//获取元素，对要操作的元素添加事件，设置当前图片的索引
let smallImg, bigImg, mask, iconImgList, leftBn, rightBn;
let firstP, lastP, pre;
//将商品图片放入一个数组
let list = ["1_icon.jpg", "2_icon.jpg", "3_icon.jpg", "4_icon.jpg", "5_icon.jpg", "6_icon.jpg"];
init();

function init() {
    //获取小图片的容器
    smallImg = document.querySelector(".small_img");
    //在小图片上移动的方块
    mask = document.querySelector(".mask");
    //获取大图片的容器
    bigImg = document.querySelector(".big_img");
    //获取下方商品列表的容器
    iconImgList = document.querySelector(".iconImgList");


    //遍历图片，拿到当前图片
    for (let i = 0; i < list.length; i++) {
        let img = new Image();
        img.src = "imgs/" + list[i];
        iconImgList.appendChild(img);
        if (i === 0) {
            selectImg(img);
        }
    }
    setImage("imgs/" + list[0].replace("_icon", ""));
    console.log(list[0]);
    firstP = 0;
    lastP = 4;
    //给小图片添加鼠标事件
    smallImg.addEventListener("mousemove", mouseHandler);
    smallImg.addEventListener("mouseleave", mouseLeaveHandler);
    smallImg.addEventListener("mouseenter", mouseLeaveHandler);
    iconImgList.addEventListener("mouseover", imgSelectHandler);
    //给左右按钮添加点击事件

}

//设置当前选中的图片以及实现放大镜的效果，使放大镜随着鼠标移动。
function imgSelectHandler(e) {
    //判断当前事件源是不是商品列表中选中的图片
    if (e.target === iconImgList) return;
    selectImg(e.target);
    setImage(e.target.src.replace("_icon", ""));

}

function setImage(src) {
    //设置当前选中的图片
    if (smallImg.children.length === 1) {
        let img = new Image();
        img.src = src;
        img.style.width = "350px";
        img.style.height = "350px";
        img.style.position = "absolute";
        smallImg.insertBefore(img, smallImg.firstElementChild);
    } else {
        smallImg.firstElementChild.src = src;
    }
    bigImg.style.backgroundImage = `url(${src})`;
}

function mouseLeaveHandler(e) {
    //鼠标进入大图显示，离开隐藏
    if (e.type === "mouseenter") {
        bigImg.style.display = "block";
    } else if (e.type === "mouseleave") {
        bigImg.style.display = "none";
    }
}

function mouseHandler(e) {
    //设置当前方块移动的距离
    mask.style.left = e.x - mask.offsetWidth / 2 + "px";
    mask.style.top = e.y - mask.offsetHeight / 2 + "px";
    //实现小方块移动时的边界限定
    if (mask.offsetLeft < 0) {
        mask.style.left = "0px";
    }
    if (mask.offsetTop < 0) {
        mask.style.top = "0px";
    }
    if (mask.offsetLeft + mask.offsetWidth > smallImg.offsetWidth) {

        mask.style.left = smallImg.offsetWidth - mask.offsetWidth + "px";
    }
    if (mask.offsetTop + mask.offsetHeight > smallImg.offsetHeight) {
        mask.style.top = smallImg.offsetHeight - mask.offsetHeight + "px";
    }
    bigImg.style.backgroundPositionX = -mask.offsetLeft * (800 / 350) + "px";
    bigImg.style.backgroundPositionY = -mask.offsetTop * (800 / 350) + "px";
}
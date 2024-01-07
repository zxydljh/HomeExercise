window.addEventListener('load', function () {
    // 主体颜色
    // 1.获取所有按钮元素
    var lis = document.getElementById("background").getElementsByTagName("li");
    // lis得到的是伪数组  里面的每一个元素 lis[i]
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            // (1) 先把所有的按钮背景颜色去掉
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.borderColor = '';
            }
            this.style.borderColor = 'gold';
            // (2) 然后让当前的元素背景颜色改变
            document.body.style.backgroundColor = this.style.backgroundColor;
        }
    }

    // 导航栏
    var nav = document.getElementById('nav');
    var lis = nav.getElementsByTagName('li');

    // for循环绑定点击事件
    for (var i = 0; i < lis.length; i++) {
        // 给li 设置索引号
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            // 干掉所有人  其余的li清除 class 这个类
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            // 留下我自己
            this.className = 'current';
        }
    }

    // 视频添加 鼠标事件 播放
    var video = document.getElementsByTagName("video");
    for (let i = 0; i < video.length; i++) {
        video[i].addEventListener('mouseenter',
            function (e) {
                video[i].play();
                video[i].controls='controls';
            })
        video[i].addEventListener('mouseout',
            function (e) {
                video[i].pause();
                video[i].controls = '';
            })
    }
});
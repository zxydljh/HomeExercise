window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过focus 
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3.动态生成小圆圈 有几张图片就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建小li 
        var li = document.createElement('li');
        // 通过自定义属性 记录当前小圆圈的索引号
        li.setAttribute('index', i);
        // 把li插入到ol 里面
        ol.appendChild(li);
        // 排他思想 绑定事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈 移动图片
            var index = this.getAttribute('index');
            // 解决点击某个小圆圈 在点右边按钮 不是当前图片下一张的bug 
            num = index;
            // 解决点击某个小圆圈 在点右边按钮 小圆圈不是当前图片的小圆圈的 bug 
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li设置类名为 current
    ol.children[0].className = 'current';
    // 克隆第一张图(li) 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    // ciecle 控制小圆圈的播放
    var circle = 0;
    // 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
             // 无缝滚动
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; // 打开节流阀
        });
        // 点击右侧按钮 小圆圈跟随变化
        circle++;
        // 最后一张克隆图 复原
        if (circle == ol.children.length) {
            circle = 0;
        }

        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
       }
    });

    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 无缝滚动
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth, function () {
            flag = true; // 打开节流阀
    });
        // 点击右侧按钮 小圆圈跟随变化
        circle--;
        // 最后一张克隆图 复原
        if (circle < 0) {
            circle = ol.children.length - 1;
        }

        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
        }
    });
    // 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
});
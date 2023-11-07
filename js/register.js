
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

  // 验证码
  var content = document.querySelector('.get_code');
  document.getElementById('get_codes').onclick = function () {
    var code = "";
    //所有候选组成验证码的字符，当然也可以用中文的
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环组成验证码的字符串
    for (var i = 0; i < 4; i++) {
      //获取随机验证码下标
      var charNum = Math.floor(Math.random() * 62);
      //组合成指定字符验证码
      code += codeChars[charNum];
    }
    let n = content.innerHTML = code;
  }

  document.getElementById('submit').addEventListener('click', function submit() {
    // 用户登录页面
    var username = document.getElementById("username").value;
    if (username == "") {
      document.getElementById('thisUsername').innerHTML = "*用户名不能为空";
      return false;
    } else {
      document.getElementById("thisUsername").innerHTML = "";
    }

    var email = document.getElementById("email").value;
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])/;
    //test() 方法是正则表达式的一个方法，用于检测一个字符串是否匹配某个模式
    if (!reg.test(email)) {
      document.getElementById("thisEmail").innerHTML = "*邮箱格式错误";
      return false;
    } else {
      document.getElementById("thisEmail").innerHTML = "";
    }

    var pwd = document.getElementById("pwd").value;
    if (pwd == "") {
      document.getElementById("thisPwd").innerHTML = "*密码不能为空";
      return false;
    } else {
      document.getElementById("thisPwd").innerHTML = "";
      var reg = /^[0-9]{6}$/;
      if (!reg.test(pwd)) {
        document.getElementById("thisPwd").innerHTML = "*密码只能为6位数字";
        return false;
      }
    }

    var repwd = document.getElementById("repwd").value;
    if (pwd != repwd) {
      document.getElementById("thisRepwd").innerHTML = "*两次密码不一样";
      return false;
    }
  })

});
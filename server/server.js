let express = require('express');
let path = require('path');
let app = express();
const db = require('../database/index')

let regSchema = (request, response) => {
    console.log(request.body);
    console.log(regUser);
    // 解构赋值
    const { username, email, password, repassword, code } = request.body;
    // 利用正则表达式  检验数据的合法性
    const usernameReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordReg = /^[a-zA-Z0-9_#]{6,16}$/
    const codeReg = /^\d{4}$/
    if (!usernameReg.test(username)) {
        response.send('电话输入不合法')
    } else if (!emailReg.test(email)) {
        response.send('邮件输入不合法')
    } else if (!passwordReg.test(password)) {
        response.send('密码输入不合法，应为6-16位字符，不包含特殊字符')
    } else if (password !== repassword) {
        response.send('两次输入的密码不一致')
    } else if (!codeReg.test(code)) {
        response.send('验证码不合法')
    } else {
        return response.send('符合')
    }
};

let logSchema = (request, response) => {
    console.log(request.body);
    console.log(regUser);
    // 解构赋值
    const { username, email, password } = request.body;
    // 利用正则表达式  检验数据的合法性
    const usernameReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordReg = /^[a-zA-Z0-9_#]{6,16}$/
    if (!usernameReg.test(username) || !emailReg.test(email)) {
        response.send('用户名/邮件 不合法')
    } else if (!passwordReg.test(password)) {
        response.send('密码输入不合法，应为6-16位字符，不包含特殊字符')
    } else {
        return response.send('登录符合')
    }
};

let regUser = (request, response) => {
    // 接收表单数据
    const userinfo = request.body
    console.log(userinfo);
    // 定义 SQL 语句
    const sql = `select * from tb_users where username=?`;
    // 执行 SQL 语句并根据结果判断用户名是否被占用
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return response.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        if (results.length > 0) {
            return response.send({ status: 1, message: '用户名被占用，请更换！' })
        }

        // 定义插入新用户的 SQL 语句
        const sql = 'insert into tb_users set ?'
        // 调用 db.query() 执行 SQL 语句，插入新用户
        db.query(sql, { username: userinfo.username, email: userinfo.email, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return response.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return response.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            } else {
                response.redirect('../html/login.html')
            }
        })
    })
}

let logUser = (request, response) => {
    // 接收表单数据：
    const userinfo = request.body;
    // 定义 SQL 语句：
    const sql = `select * from tb_users where username=?`;
    // 执行 SQL 语句，查询用户的数据
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return response.send({ status: 1, message: err.message })
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return response.send('登录失败');

        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = (userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return response.send('登录失败');
        } else {
            response.redirect('../index.html');
        }
    })
}

// 解析传入的请求 解析 URL-encoded 格式的请求体数据
app.use(express.urlencoded({ extended: true }));

app.post('/html/register.html', (regSchema, regUser));

app.post('/html/login.html', (logSchema, logUser));


app.get('/html/login.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../html/login.html'));
});

app.get('/html/register.html', (request, response) => {
    response.sendFile(path.join(__dirname, '../html/register.html'));
});

// 托管静态资源
app.use('/index.html', express.static('../index.html'));
app.use('/css', express.static('../css'));
app.use('/html', express.static('../html'));
app.use('/upload', express.static('../upload'));
app.use('/images', express.static('../images'));
app.use('/video',express.static('../video'))
app.use('/js', express.static('../js'));

app.listen(8888, (err) => {
    if (!err) {
        console.log('服务器已启动 8888 端口监听中....');
    } else {
        console.log(err);
    }
})
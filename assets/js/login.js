$(function () {

    $('#goReg').click(function () {
        $('.loginBox').hide();
        $('.regBox').show()
    })
    $('#goLogin').click(function () {
        $('.loginBox').show();
        $('.regBox').hide()
    })

    var form = layui.form;
    form.verify({
        surepsw: function (value) { //value：表单的值、item：表单的DOM对象
            if ($('.regBox [name="password"]').val() != value) {
                return "密码不一致"
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // $.post('http://ajax.frontend.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
        $.post('http://ajax.frontend.itheima.net/api/reguser', $(this).serialize(), function (res) {
            layer.msg(res.message);
            if (res.status != 0) {
                return;
            }
            $('#goLogin').click();
        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status != 0) {
                    return;
                }
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })

})
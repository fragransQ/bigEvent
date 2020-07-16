layui.form.verify({
    repsw: function (value) { //value：表单的值、item：表单的DOM对象
        if (value !== $('[name=newPwd]').val()) {
            return "两次密码不一致"
        }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    , psw: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ]
});
$('form').submit(function (e) {
    e.preventDefault();
    $.post('http://ajax.frontend.itheima.net/my/updatepwd', $(this).serialize(), function (res) {
        console.log(res)
        layui.layer.msg(res.message);
    })
})


$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    var newPwd = $(this).serialize()
    // 发起请求
    console.log(newPwd)
    $.post('/my/updatepwd', newPwd, function (res) {
        if (res.status !== 0) {
            return layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        // 更新成功之后，重置表单
        $('.layui-form')[0].reset()
    })
})
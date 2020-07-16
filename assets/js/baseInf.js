layui.form.verify({
    nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
        if (value.length < 1 || value.length > 6) {
            return '要求昵称在1~6个字符'
        }
    }
})


function userinfoInit() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            layui.form.val("baseInf", res.data);
        }
    })
}
userinfoInit();
$('#resetBtn').click(function (e) {
    e.preventDefault();
    userinfoInit();
})

$('form').on('submit', function (e) {
    e.preventDefault();
    $.post('/my/userinfo', $(this).serialize(), function (res) {
        if (res.status == 0) {
            layui.layer.msg(res.message);
            window.parent.renderAwater()
        }
    })
})
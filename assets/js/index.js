function renderAwater() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') },
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message);
                // location.href = '../../login.html';
                return;
            }
            var username = res.data.nickname || res.data.username;
            $('#welcome').html('欢迎  ' + username);
            if (res.data.user_pic) {
                $('.testAwater').hide();
                $('.user_pic').prop('src', res.data.user_pic).show();
            } else {
                $('.user_pic').hide();
                $('.testAwater').html(username[0]).show()
            }
        },
        complete: function (res) {
            console.log(res)
            if (res.responseJSON.status != 0) {
                location.href = '../../login.html'
            }

        }
    })
}
renderAwater()
$('#logout').click(function () {
    layui.layer.confirm('确认退出', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token');
        location.replace('../../login.html')
        layer.close(index);
    });
})

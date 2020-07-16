$.ajaxPrefilter(function (e) {
    if (e.url.indexOf('http') == -1) {
        e.url = 'http://ajax.frontend.itheima.net' + e.url
    };
    if (e.url.indexOf('/my/') != -1) {
        e.headers = { Authorization: localStorage.getItem('token') }
    };
    // e.complete = function (res) {
    //     if (res.status == 200 && res.responseJSON.status != 0) {
    //         location.href = '../../login.html'
    //     }
    // }
})

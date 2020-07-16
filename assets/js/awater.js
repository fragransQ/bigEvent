// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#upload').click(function () {
    $('#fileInput').click()
})

$('#fileInput').change(function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域

})


$('#sureBtn').click(function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png');
    $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
        layui.layer.msg(res.message);
        console.log(res.status);
        if (res.status == 0) {
            window.parent.renderAwater();

        }
    })
})








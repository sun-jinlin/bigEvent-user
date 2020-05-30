$(function () {
    var $image = $('#image');
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    $image.cropper(options);
    $('.upload').on('click', function () {
        $('#file').click();
    });
    $('#file').on('change', function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', url).cropper(options);
    });
    $('.sure').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    window.parent.getuserinfo();
                }
            }
        })
    })
});
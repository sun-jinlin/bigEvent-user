$(function () {
    var form = layui.form;
    form.render('select');

    //---------------- 初始化富文本---------------
    initEditor();

    //--------------- 根据id获取文章信息------------

    let id = new URLSearchParams(location.search).get('id');




    //-----------------获取分类------------
    $.ajax({
        url: '/my/category/cates',
        success: function (res) {
            if (res.status === 0) {
                $('select').html(template('tmp-category', res));
                form.render('select')
                $.ajax({
                    url: '/my/article/' + id,
                    success: function (res) {
                        if (res.status === 0) {
                            form.val('edit-form', res.data);
                            $image.cropper('destroy')
                                .attr('src', 'http://localhost:3007/' + res.data.cover_img)
                                .cropper(options);
                        }
                    }
                })
            }
        }
    })

    // ----------------配置预览-------------------
    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
        autoCropArea: 1
    }
    $image.cropper(options);

    //----------------点击按钮，更换图片--------------
    $('#chooseImage').on('click', function () {
        $('#file').click();
    })
    $('#file').on('change', function () {
        var url = URL.createObjectURL(this.files[0]);
        $image.cropper('destroy').attr('src', url).cropper(options);
    })
    // ----------------状态----------------------
    var state;
    $('#publish').on('click', function () {
        state = '已发布'
    });
    $('#draft').on('click', function () {
        state = '草稿'
    })

    //----------------提交数据----------------
    $('form').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        data.append('state', state);
        $image.cropper('getCroppedCanvas', {
            width: 420,
            height: 280
        }).toBlob(function (blob) {
            data.append('cover_img', blob);
            data.append('Id', id);
            $.ajax({
                type: 'POST',
                url: '/my/article/edit',
                data: data,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status === 0) {
                        location.href = '/article/article.html'
                    }
                }
            })
        })

    })






















})
$(function () {
    //--------------------切换登录注册------------
    $('.goto_register').on('click', function () {
        $('#register').show().prev().hide();
    });
    $('.goto_login').on('click', function () {
        $('#register').hide().prev().show();
    });
    //-----------------注册-------------------
    $('#register form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: 'http://localhost:3007/api/reguser',
            data: data,
            success: function (res) {
                alert(res.message)
                if (res.status === 0) {
                    $('#register').hide().prev().show();
                }
            }
        });
    })
    //------------------注册表单验证----------------

    var form = layui.form;
    form.verify({
        len: [/^\w{6,12}$/, '请输入6-12位密码'],
        same: function (value) {
            var password = $('#reg_password').val();
            if (password !== value) {
                return '两次密码不一致'
            }
        }
    })


    //-------------------实现登录功能----------
    $('#login form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                alert(res.message);
                if (res.status === 0) {
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        })
    })
})
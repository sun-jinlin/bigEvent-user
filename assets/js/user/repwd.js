$(function () {
    var form = layui.form;
    form.verify({
        len: [/^\w{6,12}$/, '请输入6-12位密码，密码不能为空格'],
        diff: function (value) {
            var oldPwd = $('input[name="oldPwd"]').val()
            if (oldPwd === value) {
                return '新密码不能与旧密码相同';
            }
        },
        same: function (value) {
            var newPwd = $('input[name="newPwd"]').val()
            if (newPwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {

                layer.msg(res.message);
                if (res.status === 0) {
                    $('form')[0].reset();
                }
            }
        })
    })
})
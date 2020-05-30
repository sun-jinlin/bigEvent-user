$(function () {
    var form = layui.form;
    function getFromData() {



        $.ajax({
            url: ('/my/userinfo'),
            success: function (res) {
                if (res.status === 0) {
                    form.val('data', res.data)
                }
            }
        });
    }
    getFromData();
    $('form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {

                    window.parent.getuserinfo();
                }
            }
        })
    });

    $('button[type="reset"]').on('click', function (e) {
        e.preventDefault();
        getFromData();
    })

})
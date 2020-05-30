//---------------------获取用户信息并渲染------------------

$(function () {
    getuserinfo();
    $('.logout').on('click', function () {
        layer.confirm('确定退出吗', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });

    })
})


function getuserinfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {

                var name = res.data.nickname || res.data.username;
                $('.left_text').html('欢迎&nbsp;&nbsp' + name);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic);
                    $('.text_img').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.text_img').css('display', 'inline-block').text(name.substr(0, 1).toUpperCase());

                }

            }
        }
    })
};









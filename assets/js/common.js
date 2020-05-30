if (!localStorage.getItem('token')) {
    location.href = '/login.html'
}
$(function () {

    $.ajaxPrefilter(function (options) {
        options.url = 'http://localhost:3007' + options.url;
        options.headers = {
            Authorization: localStorage.getItem('token')
        };
        options.beforeSend = function () {
            NProgress.start();
        };
        options.complete = function (xhr) {
            NProgress.done()
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        };
    })

})
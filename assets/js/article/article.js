$(function () {
    var form = layui.form;
    let laypage = layui.laypage;
    form.render('select');




    let data = {
        pagenum: 1,
        pagesize: 2
    }
    //----------------获取文章渲染---------------
    function renderArticle() {
        $.ajax({
            url: '/my/article/list',
            data: data,
            success: function (res) {
                if (res.status === 0) {
                    $('tbody').html(template('tmp-article', res))
                    mypage(res.total)
                }
            }
        })
    }
    renderArticle();

    // 分页
    function mypage(t) {
        laypage.render({
            elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
            , count: t, //数据总数，从服务端得到
            limit: data.pagesize,
            limits: [data.pagesize, 2, 5, 8, 10],
            curr: data.pagenum,
            layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：

                //首次不执行
                if (first === undefined) {
                    data.pagesize = obj.limit;
                    data.pagenum = obj.curr;

                    renderArticle();

                }
            }

        });

    }


    // 获取文章分类
    $.ajax({
        url: '/my/category/cates',
        success: function (res) {

            let str = template('tpl_category', res);
            $('#category').html(str);
            form.render('select');
        }
    })
    $('form').on('submit', function (e) {
        e.preventDefault();
        let cate_Id = $('#category').val();
        let state = $('#state').val();

        data.pagenum = 1;
        if (cate_Id) {
            data.cate_id = cate_Id;
        } else {
            delete data.cate_id;
        }

        if (state) {
            data.state = state;
        } else {
            delete data.state;
        }
        renderArticle();
    })


    // 删除文章
    $('body').on('click', '.delete', function () {
        let id = $(this).attr('data-id');
        layer.confirm('你确定吗删除吗？', function (index) {


            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderArticle();
                    }
                }
            })
            layer.close(index);
        })

    })

    // 编辑文章

    $('body').on('click', '.edit', function () {

    })
    // 过滤器时间
    template.defaults.imports.formatDate = function (date) {
        let d = new Date(date);
        let y = d.getFullYear();
        let m = addZero(d.getMonth() + 1);
        let day = addZero(d.getDate());
        let h = addZero(d.getHours());
        let mm = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        return y + '-' + m + '-' + day + ' ' + h + ':' + mm + ':' + s;
    }

    // 补零
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

})
$(function () {
    var addIndex;
    var editIndex;
    var form = layui.form;
    renderCategory();
    //-----------获取数据渲染页面-----------------
    function renderCategory() {
        $.ajax({
            url: '/my/category/cates',
            success: function (res) {
                if (res.status === 0) {
                    $('tbody').html(template('tmp-list', res))
                }
            }
        })
    };

    //---------------点击添加弹出添加框----------------
    $('#showAdd').on('click', function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tmp-add').html(),
            area: ['500px', '250px']
        });

    })
    //------------------提交添加框，渲染页面-----------------
    $('body').on('submit', '#formAdd', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/category/addcates',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory();
                    layer.close(addIndex)
                }
            }
        })
    });

    //------------------点击删除----------------
    $('body').on('click', '.delete', function () {
        var id = $(this).data('id');
        //eg1
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/category/deletecate/' + id,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderCategory();
                    }
                }
            })
            layer.close(index);
        });

    });


    //------------------点击编辑弹出框获取信息-------------

    $('body').on('click', '.edit', function () {
        var obj = this.dataset;
        editIndex = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#tmp-edit').html(),
            area: ['500px', '250px'],
            success: function () {
                form.val('data', JSON.parse(JSON.stringify(obj)));
            }
        });

    })
    //---------------提交修改编辑-----------------
    $('body').on('submit', '#formEdit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        data[0].name = 'Id';
        $.ajax({
            type: 'POST',
            url: '/my/category/updatecate',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    layer.close(editIndex);
                    renderCategory();
                }
            }
        })
    })
})
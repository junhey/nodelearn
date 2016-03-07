$.fn.dataTable = function(opt) {
    var my = this,
        thead = my.find('thead'),
        tbody = my.find('tbody'),
        form = my.find('.data-table-form'),
        pager = my.find('.data-table-pager').hide(),
        tpl = my.find('.body-tpl').text(),
        empty = opt.empty || '<tr><td>什么任何记录</td></tr>';


    var callback = opt.callback || _.noop;
    var filter = opt.filter;

    var defaults = {
        page_no: 1,
        page_size: 20
    };



    var settings = _.defaults(opt.param, defaults);


    $(document)
        .on('click', '.page-a', function() {
            var page = $(this).attr('page');
            if (Number(page) !== Number(settings.page_no)) {
                settings.page_no = Number(page);
                post(form.serializeObject());
            }
            return my;
        })
        .on('submit', form, function(e) {
            settings.page_no = 1;
            post(form.serializeObject());
            return false;
        })
        .on('click', '.datatable-refresh', function() {
            post(form.serializeObject());
            return false;
        });

    if (my.length) {
        form.submit();
    }


    return {
        init: function() {
            settings.page_no = 1;
            form.submit();
        }
    };


    function post(serialize) {
        tbody.html('<tr><td><div class="ui active inverted dimmer"><div class="ui medium text loader">Loading</div></div></td></tr>');

        $.ajax({
            url: opt.url,
            data: _.extend({}, settings, serialize),
            timeout: 10000,
            error: function(jqXHR, textStatus, errorThrown) {
                tbody.html('<td>' + errorThrown + '</td>');
            }
        }).done(function(res) {
            var html = renderBody(res);
            var footer = renderFooter(settings.page_no, settings.page_size, res.total_count);
            tbody.html(html || empty);
            pager.html(footer).show();
            callback.call(this, res, tbody);
        });
    }



    //生成body
    function renderBody(res) {
        return _.reduce(res.list, function(memo, v, i, l) {
            //数据过滤
            if (filter) {
                v = filter(v, res);
            }

            return memo + _.template(tpl)(v);
        }, '');
    }

    //生成分页
    //生成分页html
    function renderFooter(page, pageSize, total) {



        var lastPage = Math.ceil(total / pageSize),
            prevPage = page - 1,
            nextPage = page + 1;

        var currHtml = '<span class="page-curr-page">' + page + '/' + lastPage + '页</span>';
        var totalHtml = '<span class="page-total-span">共' + total + '条</span>';
        var firstHtml = _ahtml(1, '首页', 'page-a');
        var lastHtml = _ahtml(lastPage, '尾页', 'page-a');
        var prevHtml = nextHtml = centerHtml = '';

        //上一页
        if (prevPage) {
            prevHtml = _ahtml(prevPage, '<i class="left chevron icon"></i>', 'page-a');
        }

        //下一页
        if (nextPage <= lastPage) {
            nextHtml = _ahtml(nextPage, '<i class="right chevron icon"></i>', 'page-a');
        }

        //中间段分页
        var prev5 = Math.min(page - 4, lastPage - 9);
        prev5 = Math.max(prev5, 1);
        var next5 = Math.min(prev5 + 9, lastPage);

        for (var i = prev5; i <= next5; i++) {
            var className = i === Number(page) ? 'page-a active' : 'page-a';
            centerHtml += _ahtml(i, i, className);
        }

        function _ahtml(n, text, className) {
            return _.template('<a class="item {{ className }}" href="javascript:;" page="{{n}}">{{text}}</a>')({
                n: n,
                text: text,
                className: className
            });
        }

        return firstHtml + prevHtml + centerHtml + nextHtml + lastHtml;
    }
};
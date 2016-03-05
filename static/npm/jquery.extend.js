//序列化为对象
$.fn.serializeObject = function() {
    var o = {};
    $.each(this.serializeArray(), function(i, v) {
        o[v.name] = v.value;
    });
    return o;
};

//对象深取值
$.fn.getDeepVal = function(key) {
    var obj = this[0];
    var keys = key.split('.');

    for (var i = 0; i < keys.length; i++) {
        obj = obj[keys[i]];
    }

    return obj;
};

//模板
$.fn.template = function(data) {
    return this.each(function() {
        this.innerHTML = this.innerHTML.replace(/#{(.*?)}/g, function(a, b) {
            return $(data).getDeepVal(b);
        });
    });
};
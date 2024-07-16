//解析DY视频链接
function xhrHttpDyVideo(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // JSON.parse 不执行攻击者的脚本。
            obj = JSON.parse(xhr.responseText);
            var video = obj.aweme_detail.video.bit_rate;
            var height = 0;//视频高度
            var cache = null;
            var format = null;
            for (var i = 0; i < video.length; i++) {
                var obj = video[i];
                if (obj.play_addr.height > height && obj.is_h265 != 1) { //obj.is_h265 = 1 猜测是音频
                    height = obj.play_addr.height;
                    cache = obj.play_addr;
                    format = obj.format; //后缀
                }
            }
            url = cache.url_list[cache.url_list.length - 1];
            // console.log(url);
            window.open(url, "_blank");
        }
    }
    xhr.send();
}

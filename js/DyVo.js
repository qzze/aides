//DY视频解析
function DyVideo(Url) {
    aiDesRequest(Url, "GET", (res) => {
        if (res != null) {
            obj = JSON.parse(res);
            var video = obj.aweme_detail.video.bit_rate;
            var height = 0;//视频高度
            var cache = null;
            var format = null;
            for (var i = 0; i < video.length; i++) {
                var obj = video[i];
                if (obj.play_addr.height > height && obj.is_h265 != 1) { //obj.is_h265 = 1 猜测是音频
                    height = obj.play_addr.height;
                    cache = obj.play_addr;
                }
            }
            url = cache.url_list[cache.url_list.length - 1];
            // console.log(url);
            window.open(url, "_blank");
        }
    });
}

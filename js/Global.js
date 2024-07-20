function xhrAidesUrl(details) {
    switch (details.domain) {
        case "douyin.com":
            DyVideo(details);//抖音
            break;
        case "bilibili.com": //打开MEDIA资源
            BiVideo(details);
            break;
        default:
            navigator.clipboard.writeText(document.title.replace("|", " "));
            window.open(details.url, "_blank");
    }
}

//DY视频解析
function DyVideo(details) {
    if (details.tabs.url.includes("douyin.com/video")) {
        navigator.clipboard.writeText(document.querySelector('h1').innerText.replace("|", " "));
        aiDesRequest(details.url, "GET").then(res => {
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
        }).catch();
    } else {
        alert("请右击视频进入详情页，再获取视频源！");
    }
}

//视频解析
function BiVideo(details) {
    if (details.tabs.url.includes("bilibili.com/video")) {
        navigator.clipboard.writeText(document.title.replace("|", " "));
        aiDesRequest(details.url, "GET").then(res => {
            obj = JSON.parse(res);
            console.log(obj)
            url = obj.data.durl[0].url;
            // console.log(url);
            window.open(url, "_blank");
        }).catch();
    } else {
        alert("请先进自媒体视频播放页，再获取视频源！");
    }
}
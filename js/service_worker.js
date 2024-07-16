// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：', request, sender);
    sendResponse('我是service_worker，我已收到你的消息：' + JSON.stringify(request));
});

//获取请求源
chrome.webRequest.onBeforeRequest.addListener(function (data) {

    //缓存时间
    var time = (new Date()).getTime() / 1000 + (3600 * 1);
    // console.log(data.url);
    if (data.url.includes("douyin.com")) {
        //发现长时间不操作，变量会失效，存COOKIES
        chrome.cookies.set({
            url: "https://www.douyin.com",
            name: "dy2kUrl",
            value: data.url,
            domain: ".douyin.com",
            path: "/",
            // secure: false,
            // httpOnly: false,
            // SameSite: None,
            expirationDate: time
        });
        return;
    }
    if (data.url.includes("kwaicdn.com")) {
        //发现长时间不操作，变量会失效，存COOKIES
        chrome.cookies.set({
            url: "https://www.kuaishou.com",
            name: "ks2kUrl",
            value: data.url,
            domain: ".kuaishou.com",
            path: "/",
            expirationDate: time
        });
        return;
    }
}, { 'urls': ["https://www.douyin.com/aweme/v1/web/aweme/detail/*", "https://*.kwaicdn.com/ksc2/*"] });

//按钮
chrome.runtime.onInstalled.addListener(function () {
    // 当获取到当前标签页的信息后，会调用这个回调函数
    chrome.contextMenus.create({
        contexts: ['all'],
        title: "打开视频链接",
        id: "net.rsyncd.dy2k",
        documentUrlPatterns: ["https://www.douyin.com/video/*"],
    });
    // 当获取到当前标签页的信息后，会调用这个回调函数
    chrome.contextMenus.create({
        contexts: ['all'],
        title: "打开视频链接",
        id: "net.rsyncd.ks2k",
        documentUrlPatterns: ["https://www.kuaishou.com/new-reco", "https://www.kuaishou.com/short-video/*"],
    });
});


//点击回调都放到了统一一个地方监听。
chrome.contextMenus.onClicked.addListener((info, tab) => {
    //douyin
    if (info.menuItemId == "net.rsyncd.dy2k") {
        //从cookies中读，存变更会消失
        chrome.cookies.get({
            url: "https://www.douyin.com",
            name: "dy2kUrl",
        }, function (cookies) {
            if (cookies != null) {
                Url = cookies.value
                // console.log(cookies.value);
                // 查询匹配的标签页
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    // 向Content Scripts发送消息
                    chrome.tabs.sendMessage(tabs[0].id, { from: "aweme", menuItemId: info.menuItemId, url: Url });
                });
            } else {
                // 查询匹配的标签页
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    // 向Content Scripts发送消息
                    chrome.tabs.sendMessage(tabs[0].id, { from: info.menuItemId, menuItemId: info.menuItemId });
                });
            }
        })
        return;
    }
    //kuaishou 2024年7月15日 22:17:36
    if (info.menuItemId == "net.rsyncd.ks2k") {
        //从cookies中读，存变更会消失
        chrome.cookies.get({
            url: "https://www.kuaishou.com",
            name: "ks2kUrl",
        }, function (cookies) {
            if (cookies != null) {
                Url = cookies.value
                // console.log(cookies.value);
                // 新建一个tab
                chrome.tabs.create({
                    url: Url,
                    active: true
                })
            }
        })
        return;
    }
});


// 通过唯一id确定选择的项，再进行操作。info.*中参数有：
// menuItemId:单机的菜单项唯一标示id
// parentMenuItemId：单机的菜单项的父菜单id
// mediaType：如果右击是在图片，视屏或者音频上则值对应为“image”，“video”或“audio”
// linkUrl：激活的元素是链接，则为链接地址
// srcUrl：激活元素src属性指向的url地址
// pageUrl：当前打开的页面的url地址
// frameUrl：当前框架的url地址
// selectionText：当前选中的文本内容（如果有）
// editable：是否可编辑
// wasChecked：表示单机前当前复选框或者单选框是否是选中状态
// checked：表示单机后复选框或者单选框状态

// tab.*中参数有：
// id：当前标签页id
// index：标签页所在窗口索引
// windowId：标签页所在窗口的id
// url：当前标签页地址
// title：标签页标题
//获取请求源
chrome.webRequest.onBeforeRequest.addListener((details) => {
    //缓存时间
    var time = (new Date()).getTime() / 1000 + (3600 * 1);
    if (details.url.includes("douyin.com/aweme/v1/web/aweme/detail")) {
        //发现长时间不操作，变量会失效，存COOKIES
        chrome.cookies.set({
            url: "https://www.douyin.com",
            name: "aidesUrl",
            value: details.url,
            domain: ".douyin.com",
            path: "/",
            expirationDate: time
        }, () => {
            if (chrome.runtime.lastError) {
                // console.error(chrome.runtime.lastError.message);
            }
        });
        MenuAdd();
    } else if (details.type == "media" && (!details.initiator.includes("douyin"))) {
        // console.log(details.url);
        //发现长时间不操作，变量会失效，存COOKIES
        chrome.cookies.set({
            url: details.initiator,
            name: "aidesUrl",
            value: details.url,
            domain: details.initiator.slice(details.initiator.indexOf(".")),
            path: "/",
            expirationDate: time
        }, () => {
            if (chrome.runtime.lastError) {
                // console.error(chrome.runtime.lastError.message);
            }
        });
        MenuAdd();
    }
}, { 'urls': ["<all_urls>"] });
//首次安装扩展程序、将扩展程序更新到新版本触发
chrome.runtime.onInstalled.addListener((details)=> {
});

//动态创建菜单，先清理所有菜单，如果有cookies，则建立菜单，2024年7月17日 13:34:04
function MenuAdd() {
    // 查询匹配的标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // console.log(tabs);
        //清理掉菜单
        chrome.contextMenus.removeAll();
        if (tabs.length > 0 && tabs[0].url.includes("http")) {
            //正则域名
            var match = tabs[0].url.match(/https?:\/\/[^\/]+/);
            //从cookies中读，存变更会消失
            chrome.cookies.get({
                url: match[0],
                name: "aidesUrl",
            }, function (cookies) {
                if (cookies != null) {
                    // console.log(cookies.value);
                    chrome.contextMenus.create({
                        contexts: ['all'],
                        title: "获取音视频源",
                        id: "net.rsyncd.aides2k",
                    }, () => {
                        if (chrome.runtime.lastError) {
                            // console.error(chrome.runtime.lastError.message);
                        }
                    });
                }
            });
        }
    });
}

//创建标签页时触发
chrome.tabs.onCreated.addListener(() => {
    MenuAdd();
})

//在窗口中的活动标签页发生变化时触发
chrome.tabs.onActivated.addListener(() => {
    MenuAdd();
})

//当标签页与窗口分离时触发；例如，由于标签页在窗口之间移动。
chrome.tabs.onDetached.addListener(() => {
    MenuAdd();
})

//点击回调都放到了统一一个地方监听。
chrome.contextMenus.onClicked.addListener((info) => {
    // console.log(tab)
    // 查询匹配的标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //douyin
        if (tabs[0].url.includes("douyin.com")) {
            //进入详情页去处理视频源
            if (tabs[0].url.includes("douyin.com/video")) {
                //从cookies中读，存变更会消失
                chrome.cookies.get({
                    url: "https://www.douyin.com",
                    name: "aidesUrl",
                }, function (cookies) {
                    //cookies 不为空则去获取高清视频源
                    if (cookies != null) {
                        // 向Content Scripts发送消息
                        chrome.tabs.sendMessage(tabs[0].id, { from: "aweme", url: cookies.value});
                    } else {
                        // COokies 获取失败提示 向Content Scripts发送消息
                        chrome.tabs.sendMessage(tabs[0].id, { from: "dy2k"});
                    }
                })
            } else {
                //非视频详情页，比如说首页等直接报提醒
                chrome.tabs.sendMessage(tabs[0].id, { from: "dy2kE" });
            }
        } else {
            //正则域名
            var match = tabs[0].url.match(/https?:\/\/[^\/]+/);
            //从cookies中读，存变更会消失
            chrome.cookies.get({
                url: match[0],
                name: "aidesUrl",
            }, function (cookies) {
                if (cookies != null) {
                    chrome.tabs.sendMessage(tabs[0].id, { from: "aidesUrl", url: cookies.value });
                }
            });
        }
    });
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
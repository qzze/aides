# Aides chrome浏览器插件：

#### 介绍
    通过浏览器NetWork获取音乐和视频公共播放源，现支持抖音，快手等一切返回数据类型为Media的音视频，注：本插件暂不支持m3u8音视频！

#### 软件架构
chrome plugin:
    manifest_version: 
    
#### 下载地址
    gitee：https://gitee.com/qzze/aides
    
#### 安装教程

1.  下载或获取插件压缩包：‌首先，‌你需要从可信赖的来源下载或获取用于本地安装的谷歌插件扩展压缩包。‌确保来源的安全性，‌以避免下载恶意软件。‌

2.  解压插件压缩包：‌下载完成后，‌右键点击压缩包并选择解压。‌

3.  打开谷歌浏览器的扩展管理页面：‌打开谷歌浏览器，‌按照下方截图打开扩展管理页面。‌你可以通过点击浏览器右上角的三个垂直点，‌选择“更多工具” > “扩展程序”，‌或者直接在地址栏输入 chrome://extensions/ 并按 Enter 键。‌

4.  打开“开发模式”开关：‌在扩展管理页面中，‌打开“开发模式”开关。‌如果不打开“开发模式”，‌可能就不会出现下一步的按钮。‌如果第4步的按钮没有出现，‌可以关掉，‌重新进入这个管理扩展程序的界面。‌

5.  点击“加载已解压的扩展程序”：‌在扩展管理页面中，‌点击“加载已解压的扩展程序”。‌

6.  选择解压好的文件夹：‌选择一开始解压好的文件夹。‌只需要选到那个插件总目录展示出来的文件夹下就可以了。‌千万不要没进入总目录展示的文件夹，‌或者进入到子文件夹下面，‌都会不成功。‌

7.  安装成功后，‌请刷新需要获取视频的页面，你可以在浏览器的工具栏中找到并使用插件。‌

#### 插件使用说明

1.  在视频详情播放页，https://www.douyin.com/video/* ，右击选择打开视频链接，便打开1080P的高清视频，注：晚上抖音只返回720P的视频链接。
2.  快手等的视频只要在播放页面右击选择打开视频链接就可以打开NetWork返回的视频源了。
3.  插件可以获取一切网站的media类型的数据源，无论是音频，还是视频。

#### 插件实现原理
1.  打开浏览器按键盘上F12按键，选择Network选项卡，然后选择下方media.
2.  在浏览器上方URL地址栏中输入或刷新包含有视频或音频的链接页面，下面media选项卡中便会出现相应的视频源，本插件打开的就是在这里获取的这个链接，你也可以照这方法手动获取。

#### Chrome 商业插件开发
    微信：538016

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 声明
    本插件完全免费，请勿用于非法用途，一切后果由用户自行承担！
#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)

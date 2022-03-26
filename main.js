function init() {
    const { Realtime, TextMessage, TypedMessagesPlugin, ImageMessage } = AV;

    const realtime = new Realtime({
        appId: 'uEG1HlFLyWVsS62pM3mRr36c-MdYXbMMI',
        appKey: '1pXTrH4HODiUJkz6IYgBIyGz',
        // 初始化即时通讯服务时需要指定富媒体消息插件
        plugins: [TypedMessagesPlugin],
    });
    // 需要同时初始化存储服务
    AV.init({
        appId: 'uEG1HlFLyWVsS62pM3mRr36c-MdYXbMMI',
        appKey: '1pXTrH4HODiUJkz6IYgBIyGz',
    });

    localStorage.setItem('debug', 'LC*');//启用Debug模式


    //测试
    const TestObject = AV.Object.extend('TestObject');
    const testObject = new TestObject();
    testObject.set('words', 'Hello world!');
    testObject.save().then((testObject) => {
        console.log('保存成功。')
    })
}

windows.addEventListener("load", function () {
    init();
})
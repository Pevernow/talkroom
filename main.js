function init() {

    realtime = new AV.Realtime({
        appId: 'uEG1HlFLyWVsS62pM3mRr36c-MdYXbMMI',
        appKey: '1pXTrH4HODiUJkz6IYgBIyGz',
        // 初始化即时通讯服务时需要指定富媒体消息插件
        plugins: [AV.TypedMessagesPlugin],
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

function login(name){
    realtime.createIMClient(name).then(function(user_IMClient) {
        Client = user_IMClient;
        // 成功登录
        Client.getConversation('CONVERSATION_ID').then(function(conversation) {
            return conversation.join();
        }).then(function(conversation) {
            gConversation = conversation
            console.log('加入成功', conversation.members);
            Client.on(Event.MESSAGE, onMessageGet);
            }).catch(console.error.bind(console));
        }).catch(alert);
}

function sendMessage(message){
    gConversation.send(new TextMessage('大家好，欢迎来到我们的群聊对话'));
}

function onMessageGet(message, conversation){
// 请按自己需求改写
  var file;
  switch (message.type) {
    case TextMessage.TYPE:
      console.log('收到文本消息，内容：' + message.getText() + '，ID：' + message.id);
      break;
    case FileMessage.TYPE:
      file = message.getFile(); // file 是 AV.File 实例
      console.log('收到文件消息，URL：' + file.url() + '，大小：' + file.metaData('size'));
      break;
    case ImageMessage.TYPE:
      file = message.getFile();
      console.log('收到图像消息，URL：' + file.url() + '，宽度：' + file.metaData('width'));
      break;
    case AudioMessage.TYPE:
      file = message.getFile();
      console.log('收到音频消息，URL：' + file.url() + '，长度：' + file.metaData('duration'));
      break;
    case VideoMessage.TYPE:
      file = message.getFile();
      console.log('收到视频消息，URL：' + file.url() + '，长度：' + file.metaData('duration'));
      break;
    case LocationMessage.TYPE:
      var location = message.getLocation();
      console.log('收到位置消息，纬度：' + location.latitude + '，经度：' + location.longitude);
      break;
    case 1:
      console.log('OperationMessage 是自定义消息类型');
    default:
      // 未来可能添加新的自定义消息类型，新版 SDK 也可能添加新的消息类型。
      // 因此别忘了在默认分支中处理未知类型，例如提示用户升级客户端至最新版本。
      console.warn('收到未知类型消息');
  }
}

window.addEventListener("load", function () {
    init();
    var name="Test";
    login(name);
})

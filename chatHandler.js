import XMPP from 'react-native-xmpp';

class XmppStore {
  xmppObject = XMPP

  constructor(settings) {
    this.settings = {...settings}
  }

  _getUserName(name){
    return name + '@' + this.settings.domain + "/" + this.settings.schema;
  }

  // fetchRoster() {
  //   return this.xmppObject.fetchRoster()
  // }
  //
  //
  // sendMessage(message,receiver){
  //   this.xmppObject.message(message.trim(),receiver)
  // }
  //
  // onReceiveMessage(data){
  // let {from,body} = data
  //   // extract username from this.xmppObject UID
  //   if (!from || !body){
  //     return;
  //   }
  //   let name = from.match(/^([^@]*)@/)[1];
  //   console.log("onReceiveMessage ", data)
  // }
  //
  // onLoginError(text){
  //   store.dispatch({type:'LOGIN_FAILED',payload: text})
  // }
  //
  // onError(message){
  //   console.log(' xmpp error: ',message)
  // }
  //
  // onDisconnect(message){
  //   console.log('disconnected')
  // }

  sendMessage(text,to) {
    this.xmppObject.message(text, to)
  }

  login(user, password){
    const {settings} = this


    /*
    * VALIDATION
    * */
    //console.log('TRY ', username,password,settings)
    this.xmppObject.connect(this._getUserName(user),password,settings.authType,settings.host,settings.port)

  }

}

export default XmppStore;
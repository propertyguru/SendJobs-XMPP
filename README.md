# SendJobs XMPP

## Usage

 To use this component, you'll need to have installed this
 packages on your react native project
 
 - [react-native-xmpp] [rnx]
 - [gifted-chat(forked)] [fgc]
 
 Please make sure you follow the proper installation process of
  [react-native-xmpp] [rnx]. The `RNXMPP` Native Modules need to be accessible in your project
  otherwise, this package wont work
  
  **hint**: To install a package from a git source, run
  ```
  npm install  --save your-public-project-github-url
  or
  yarn add your-public-project-github-url
  ```
  
  
 This package comes with 3 exports modules serving different 
 purposes
 
 - XmppStore
 - XMPPMessenger
 - a reducer object (optional)
 
 
 ### XmppStore
 
 xmppstore uses `react-native-xmpp` object in behind and expects you to initialize with 
 your ejabberd/xmpp server settings
 
 ```jsx harmony
 import xmpp from 'sendjobs-xmpp/chatHandler'
 
 // .... 
const config = {
  domain : 'mydomain',
  host: 'localhost',
  port: 5222,
  schema: 'mobile',
  authType: 0 // 0 -> plain auth, 1-> scram, 2-> md5digest
}

// ...
let xmpp = new xmpp(config)
``` 
#### XmppStore - available methods
 -- --
 ```
- xmpp.login(
      'xxxx', // only the jid. no need to put @domain
      'xxxx' // password
    )
    
- xmpp.sendMessage('message here', 'toJID')
```

You'll have to add your own event listener in your component
to make everything work. `xmpp.xmppObject` lets you access `on`
callback of native `RNXMPP` object. for more information
click [here] [index]
 
 
  ### XMPPMessenger
  
  available props
  
  ```javascript
XMPPMessenger.propTypes = {
  xmpp: PropTypes.object,
  chat: PropTypes.object,
  chattingWith: PropTypes.string,
  onSend: PropTypes.func,
  user: PropTypes.object,
  parsePatterns: PropTypes.func,
  systemMessageParsePatterns: PropTypes.func

}
```
 - **xmpp:**  the xmpp object you initialized in your component
 - **chat:** this is the primary object that will store messages,logged in
 jid. see the structure [here] [reducer]
 - **chattingWith:** jid of the person you are chatting with
 - other props will be passed down to gifted-chat component
 
 **a working example has been attached in the repo**
  
  
  [rnx]: <https://github.com/aksonov/react-native-xmpp/>
  [fgc]: <https://github.com/faysal515/react-native-gifted-chat>
  [index]: <https://github.com/aksonov/react-native-xmpp/blob/master/index.js>
  [reducer]: <https://github.com/sendhelper/SendJobs-XMPP/blob/master/reducer.js>
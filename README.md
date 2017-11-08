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
 
 
  
  
  [rnx]: <https://github.com/aksonov/react-native-xmpp/>
  [fgc]: <https://github.com/faysal515/react-native-gifted-chat>
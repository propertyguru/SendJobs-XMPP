import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'

import {SystemMessage} from 'react-native-gifted-chat'
import XMPPMessenger from 'sendjobs-xmpp'

class Messenger extends Component {


  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      hasMore: true
    };

    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.onSend = this.onSend.bind(this)
    this.props.screenProps.xmpp.xmppObject.on('iq', this.onIq.bind(this))
    this.props.screenProps.xmpp.xmppObject.on('messageSend', this.messageSend.bind(this))
  }

  // componentDidMount() {
  //   // console.log('... ', user)
  //   // var xml = "<root>Hello xml2js!</root>"
  //
  // }

  onIq(iq) {
    console.log('... ', iq)
    //this.setState({past: iq, hasMore : Boolean(iq.query.set.first)}) // require for chat pagination
  }


  loadEarlierMessage() {
    //<value>b2bea690-65d0-4b4a-93b9-d9bbec9cd6c2@sendjobs.co</value>
    console.log('STATE ', this.state)
    const { xmpp } = this.props.screenProps
    const { user } = this.props.navigation.state.params
    const third =
      `<iq type='set' id='get_archive_user1'>
  <query xmlns='urn:xmpp:mam:0'>
    <x xmlns='jabber:x:data' type='submit'>
      <field var='FORM_TYPE' type='hidden'>
        <value>urn:xmpp:mam:0</value>
      </field>
      <field var='with'>
        <value>${user.publicKey}@sendjobs.co</value>
      </field>
    </x>
    <set xmlns='http://jabber.org/protocol/rsm'>
     <max>3</max>
     ${this.state.past ? `<before>${this.state.past.fin.set.first}</before>`: `<before/>`}
    </set>
  </query>
</iq>`

    // <set xmlns='http://jabber.org/protocol/rsm'>
    //  <max>50</max>
    // </set>
    console.log('*** ', third)
    xmpp.xmppObject.sendStanza(third)
  }


  onReceiveMessage(text) {
    console.log('>> ', text)
    //b2bea690-65d0-4b4a-93b9-d9bbec9cd6c2@sendjobs.co

    if (Platform.OS === 'ios' && text.fin && text.fin.set) {
      this.setState({past: text, hasMore : Boolean(text.fin.set.first)})

    }

    if( Platform.OS === 'android' && !text.body) {
      const regex = /<fin (.+)>(<first>(.+)<\/first><last>(.+)<\/last>|<last>(.+)<\/last><first>(.+)<\/first>)<\/fin>|<fin.+><\/fin>/g
      const result = regex.exec(text.src)
      // const result2 = regex2.exec(text.src)
      console.log('REGEX ', result)
      // console.log('2222  ', result2)
      // if the first portion of the regex match, then there will be at least 3 group capture
      if(result !== null) {
        const past = {
          fin: {
            set: {
              first: result[2],
              last: result[3]
            }
          }
        }
        this.setState({past, hasMore: Boolean(result[2])})
      }
    }
    if (!text.body && !text.result)
      return

    if(text.result) {
      const { message, delay } = text.result.forwarded
      let {params} = this.props.navigation.state
      this.props.fetchMessage({
        _id: message.id,
        text: message.body,
        createdAt: new Date(delay.stamp),
        user: {
          _id: message.from.split('@')[0]
        },
        recipient: params.user.publicKey
      })
    }

    if(text.body) {
      console.log('here i should do seen....')
      this.props.screenProps.xmpp.xmppObject.sendSeenNotif(text.src)
      this.props.receiveMessage({
        _id: text.id,
        text: text.body,
        createdAt: new Date(),
        user: {
          _id: text.from.split('@')[0]
        }
      })
    }

  }

  messageSend(msgId) {
    console.log('sending msg id ', msgId)
    const {message} = this.state
    message._id = msgId
    this.props.sendMessage(message)
    this.setState({message: null})
  }

  onSend(msg) {
    console.log('sending ... ', msg)
    let {params} = this.props.navigation.state
    msg.recipient = params.user.publicKey
    // this.props.sendMessage(msg)
    this.setState({message: msg})
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 25,
          // textDecorationLine: 'underline'
        }}
      />
    );
  }



  onPressPhoneNumber() {
    console.log('click ulr')
  }

  render() {
    //b2bea690-65d0-4b4a-93b9-d9bbec9cd6c2
    const { user } = this.props.navigation.state.params
    return (
      <XMPPMessenger
        xmpp={this.props.screenProps.xmpp}
        chat={this.props.chat}
        chattingWith={user.publicKey}
        messageIdGenerator={() => new Date().getTime()}
        onSend={this.onSend}
        onReceiveMessage={this.onReceiveMessage.bind(this)}
        loadEarlier={this.state.hasMore}
        onLoadEarlier={() => this.loadEarlierMessage()}
        user={{
          _id: this.props.chat.jid
        }}
        renderSystemMessage={this.renderSystemMessage}
        parsePatterns={(linkStyle) => [
          {type: 'url', style: {...linkStyle}, onPress: this.onPressPhoneNumber},
        ]}
        systemMessageParsePatterns={
          (currentMessage) => [
            {
              pattern: /[a-zA-Z0-9]+ applied for the job/,
              style: {backgroundColor: 'black', color: 'yellow'},
              onPress: (x) => console.log('QQQ ', x, this.props,currentMessage) // url opener function here
            },
          ]
        }
      />
    )
  }
}


const mapStateToProps = (store, ownProps) => {
  return {
    chat: store.chat
  }
}

const mapDisPatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (msg) => dispatch({type: 'MESSAGE_SENT', payload: msg}),
    receiveMessage: (msg) => dispatch({type: 'MESSAGE_RECEIVED', payload: msg}),
    fetchMessage: (msg) => dispatch({ type: 'MESSAGE_FETCHED', payload: msg})
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Messenger)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },

});


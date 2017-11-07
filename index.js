import React, {Component} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'

import PropTypes from 'prop-types';


class XMPPMessenger extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {xmpp} = this.props
    xmpp.xmppObject.on('message', this.onReceiveMessage.bind(this))
  }

  onReceiveMessage(text) {
    this.props.onReceiveMessage(text)
  }


  onSend(messages = []) {
    const {xmpp} = this.props
    const {settings} = this.props.xmpp
    const {chattingWith} = this.props

    xmpp.sendMessage(messages[0].text, `${chattingWith}@${settings.domain}`)
    this.props.onSend(messages[0])

    // ^^ gifted chat push an array of message. we require the first
    // one. thus sending only one
  }

  render() {
    let {chat, chattingWith} = this.props,
      key = `${chat.jid}:${chattingWith}`,
      {user, parsePatterns,systemMessageParsePatterns, ...rest} = this.props
    return (
      <GiftedChat
        {...rest}
        messages={chat.messages[key] || []}
        onSend={(messages) => this.onSend(messages)}
        user={this.props.user}
        parsePatterns={this.props.parsePatterns}
        systemMessageParsePatterns={this.props.systemMessageParsePatterns}
      />
    )
  }
}

XMPPMessenger.propTypes = {
  xmpp: PropTypes.object,
  chat: PropTypes.object,
  chattingWith: PropTypes.string,
  onSend: PropTypes.func,
  user: PropTypes.object,
  parsePatterns: PropTypes.func,
  systemMessageParsePatterns: PropTypes.func

}


export default XMPPMessenger

/*
* props
* chat: chat object that contains usually a redux reducer
* chattingWith: xmpp id of the person chatting with
*
* */
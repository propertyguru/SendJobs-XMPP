/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
//import * as test from '@faysal/gifted-xmpp'
import {StackNavigator, TabNavigator} from 'react-navigation'

import {Provider} from 'react-redux'
import Login from './js/components/login'
import JobListView from './js/components/jobListView'
import Messenger from './js/components/messenger'
import store from './js/store'
import xmpp from 'sendjobs-xmpp/chatHandler'

const config = {
  domain : 'sendjobs.co',
  host: 'jabber.sendjobs.co',
  port: 5222,
  schema: 'mobile',
  authType: 'PLAIN' // 0 -> plain auth, 1-> scram, 2-> md5digest
}
const Main = StackNavigator({
  Login: {
    screen: Login
  },
  JobList: {
    screen: JobListView
  },
  Messenger: {
    screen: Messenger
  },
})

export default class App extends Component<{}> {
  //xmpp = null
  componentDidMount() {
    ///this.xmpp = new xmpp(config)
  }

  componentWillUnmount() {
    //XMPP.removeListeners();
    //XMPP.removeListener('message');
  }

  render() {

    return (
      <Provider store={store}>
        <View style={styles.container} >
          <Main screenProps={{xmpp:new xmpp(config)}}/>
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

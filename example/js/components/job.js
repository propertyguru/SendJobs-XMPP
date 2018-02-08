import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import {connect} from 'react-redux'
import axios from 'axios'

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#4488A7',
  },
  text: {
    color: '#132d3d',
  }
})

export default class Job extends React.PureComponent {
  onPress() {
    let jobCreator = this.props.job.createdBy.objectId
    axios.get(`http://localhost:1337/parse/classes/_User/${jobCreator}`, {
      headers: {
        'X-Parse-Application-Id': 'sendjob'
      }
    }).then(user => {
      console.log('USER FOUND ', user.data)
      //this.props.screenProps.xmpp.sendMessage('Hi, I applied for this job!!', `${user.data.username}@sendjob`)
      this.props.navigation.navigate('Messenger',{title:'chatting with',user:user.data})
    })
      .catch(err => {
        console.log('user fetch err ', err)
      })

  }

  render() {
    return (

      <View style={styles.itemContainer}>
        <Text style={styles.text}>{this.props.job.title}</Text>
        <Button
          title="Apply"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => this.onPress()}
        />
      </View>

    )
  }
}

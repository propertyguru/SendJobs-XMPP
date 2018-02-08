import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  Alert
} from 'react-native';
import {connect} from 'react-redux'
import Job from './job'
import axios from 'axios'


class JobListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: (new Map(): Map<string, boolean>),
      jobs: []
    };
    this.props.screenProps.xmpp.xmppObject.on('error', this.showAlert.bind(this))

    this.props.screenProps.xmpp.xmppObject.on('message', this.onM.bind(this))
  }


  onM(m) {
    console.log('>>>> ', m)
  }

  onIq(iq) {
    console.log('... ', iq)
  }
  showAlert(e) {
    Alert.alert(
      'Could not send message',
      '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  componentDidMount() {
    console.log('>> ',this.props)
    const {xmpp} = this.props.screenProps

    const customXML =
      `<iq type='get' id='past_chat'>
        <query xmlns='urn:xmpp:mam:tmp'>
          <x xmlns='jabber:x:data' type='submit'>
            <field var='FORM_TYPE' type='hidden'>
              <value>urn:xmpp:mam:2</value>
            </field>
            <field var='with'>
              <value>${'zibon@sendjob'}</value>
            </field>
          </x>
        </query>
       </iq>`

    const second =
      `<iq type='set' id='sendjob'>
            <query xmlns='urn:xmpp:mam:2' queryid='f27' />
        </iq>`

    const third =
      `<iq type='get' id='get_archive_user1'>
        <query xmlns='urn:xmpp:mam:tmp'>
          <with>zibon@sendjob</with>
          <set xmlns='http://jabber.org/protocol/rsm'>
            <max>2</max>
          </set>
        </query>
      </iq>`




    console.log('sendin stanza')
    xmpp.xmppObject.sendStanza(third)
    // xmpp.sendMessage('qwe qwe qwe','zibon@sendjob')

    /*axios.get(`http://localhost:1337/parse/classes/job`, {
      headers: {
        'X-Parse-Application-Id': 'sendjob'
      }
    }).then(res => {
      console.log('data fetch ', res.data)
      this.setState({jobs: res.data.results.filter(x => x.createdBy)})
    })
      .catch(err => console.log('fetch err ', err))*/

    /*fetch('http://api.sendjobs.co:1337/parse/classes/job',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': '1'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('done ', responseJson)
      })
      .catch((error) => {
        console.log('... ',error);
      });*/


  }

  _keyExtractor = (item, index) => item.objectId;

  _onPressItem(id: string) {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };


  _renderItem = ({item}) => (

    <Job
      id={item.objectId}
      job={item}
      {...this.props}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );


  render() {
    return (
      <View>
        <Text>{`Only the job with createdBy property are shown.`.toUpperCase()}</Text>
        <FlatList
          data={this.state.jobs}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>

    )
  }
}

export default JobListView
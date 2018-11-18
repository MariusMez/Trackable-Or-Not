import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import PropTypes from 'prop-types'

import { NavigationActions } from 'react-navigation'

import BackgroundImage from '../../components/BackgroundImage'
import AnswerNotification from '../../components/AnswerNotification'
import CaptureAndShare from '../../components/CaptureAndShare'
import XPButton from '../../components/XPBouton'

import styles from './styles'

class PredictScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      result: '',
    }

    this._cancel = this._cancel.bind(this)
  }

  componentDidMount() {
    
    process.nextTick = setImmediate // RN polyfill

    const url = 'https://tbscanner.com/api/v1/trackableornot'
    const { uri } = this.props.navigation.state.params.image
    console.log(uri)
    // const file = { base64: data }
    
    const form_data = new FormData();
    form_data.append('image', {
        uri: uri,
        type: 'image/jpeg', 
        name: 'imageTBScannerApp.jpg'
    });
    fetch(url, {
        method: 'POST',
        body: form_data
    }).then(response => response.json())
      .then(response => {
        const { trackable, probability } = response.prediction_result
        console.log(trackable)
        console.log(probability)
        if (trackable === 'TRACKABLE' && probability >= 0.95) {
           return this.setState({ loading: false, result: 'TRACKABLE' })
        }
        else {
           return this.setState({ loading: false, result: 'NOT TRACKABLE' })
        }
      }).catch(e => {
        Alert.alert(
          'Erreur',
          e,
          [
            { text: 'OK', onPress: () => this._cancel() },
          ],
          { cancelable: false }
        )
      });
  }

  _cancel() {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  render() {
    const { uri } = this.props.navigation.state.params.image

    return (
      <BackgroundImage source={{uri: uri}} resizeMode='cover'>
        <StatusBar hidden />
        { 
          this.state.loading ?
            <View style={styles.loader}>
              <ActivityIndicator size='large' color='#95a5a6' />
              <Text style={styles.loaderText}>Analyse en cours...</Text>
            </View> :
            <View style={styles.container}>
              <AnswerNotification answer={this.state.result} />
              <CaptureAndShare
                title='Partager'
                image={uri}
                onCancel={this._cancel}
              />
              <XPButton
                title='Non merci'
                color='white'
                textOnly
                onPress={this._cancel}
              />
            </View>
        }
      </BackgroundImage>
    )
  }
}

PredictScreen.propTypes = {
  navigation: PropTypes.object,
}

export default PredictScreen

import React, { Component } from 'react'
import { View, ActivityIndicator, Text, Alert, } from 'react-native'
import PropTypes from 'prop-types'
import { Share } from 'react-native'
import { captureScreen } from 'react-native-view-shot'
import XPButton from '../XPBouton'

class CaptureAndShare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this._onShareClick = this._onShareClick.bind(this)
  }

  _onShareClick() {
    this.setState({loading: true})
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => {      
      const shareOptions = {
        title: 'TrackableOrNot',
        subject: 'Des news de mes TB !',
        message: 'Analyse très pertinente avec TrackableOrNot !',
        url: uri
      }

      Share.share(shareOptions, {
        // Android only:
        dialogTitle: 'Des news de mes TB !',
      }).then(info => {
          if(info.message === 'OK') {
            this.props.onCancel()
          }
        }).catch((err) => { console.log(err); });
    })
    .catch(e => {
      console.log(e);
      Alert.alert(
        'Une erreur est survenue',
        'Le partage du résultat est indisponible actuellement. Réessaye plus tard !',
        [
          {text: 'OK', onPress: () => {
            this.props.onCancel()
          }},
        ],
        { cancelable: false }
      )
    })
    this.setState({loading: false})
  }

  render() {
    return (
      <View>
        { 
          !this.state.loading ? 
            <XPButton
              title={this.props.title}
              color={this.props.color}
              onPress={this._onShareClick}
            /> :
              <View>
                <ActivityIndicator size="large" color="#3498db" />
                <Text>Préparation de la capture d'écran...</Text>
              </View>
        }
      </View>
    )
  }
}

CaptureAndShare.propTypes = {
  onCancel: PropTypes.func,
  title: PropTypes.string,
  color: PropTypes.string,
}

export default CaptureAndShare

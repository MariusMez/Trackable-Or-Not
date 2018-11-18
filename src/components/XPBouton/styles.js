import { StyleSheet, Platform } from 'react-native'

const colors = {
  red: '#e74c3c',
  green: '#03874D',
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)'
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      backgroundColor: colors.green,
      borderRadius: 5
    },
    android: {
      elevation: 4,
      backgroundColor: colors.green,
      borderRadius: 5
    }
  }),
  textOnly: Platform.select({
    ios: {
      backgroundColor: 'transparent',
    },
    android: {
      backgroundColor: 'transparent',
      elevation: 0
    }
  }),
  text: Platform.select({
    ios: {
      color: colors.white,
      textAlign: 'center',
      padding: 20,
      fontSize: 22
    },
    android: {
      color: colors.white,
      textAlign: 'center',
      padding: 20,
      fontWeight: '500'
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf'
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd'
    },
    android: {
      color: '#a1a1a1'
    }
  }),
})

export default styles

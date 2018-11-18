import { StyleSheet } from 'react-native'

const colors = {
  red: '#e74c3c',
  green: '#03874D',
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)'
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'center'
  },
  titleWrapper: {
    height: 80,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.black
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold'
  },
  subtitleWrapper: {
    height: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.black
  },
  subtitle: {
    color: colors.green,
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default styles
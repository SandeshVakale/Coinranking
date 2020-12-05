import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    paddingVertical: 20,
    marginVertical: 5,
    textAlign: 'center',
    color: Colors.charcoal,
    marginTop: 14,
    marginBottom: 14
  }
})

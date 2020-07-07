import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: Colors.coal,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.7,
    shadowRadius: 60
  }
})

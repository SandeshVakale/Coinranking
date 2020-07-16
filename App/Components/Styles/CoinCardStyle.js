import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    borderRadius: 15,
    shadowColor: Colors.coal,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    alignSelf: 'center',
    padding: 10,
    width: '95%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 10
  }
})

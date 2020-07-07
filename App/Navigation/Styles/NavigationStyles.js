import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  appBottomBarStyle: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: 'lightgray',
    borderWidth: 1,
    zIndex: 5,
    width: '95%',
    shadowColor: Colors.coal,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.6,
    shadowRadius: 60
  }
})

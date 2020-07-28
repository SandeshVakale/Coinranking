import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  graphContainer: {
    height: '90%',
    width: '95%',
    flexDirection: 'row',
    shadowOffset: {
      width: 5,
      height: 15
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 20
  }
})

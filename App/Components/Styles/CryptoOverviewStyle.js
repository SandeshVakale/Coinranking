import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  graphContainer: {
    height: 300,
    flexDirection: 'row',
    shadowOffset: {
      width: 5,
      height: 15
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84
  },
  textContainer: {flexDirection: 'column', alignItems: 'center'},
  textMain: {fontWeight: 'bold', color: Colors.charcoal},
  textSub: {fontWeight: 'bold', color: Colors.charcoal}
})

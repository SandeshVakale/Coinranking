import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.background
  },
  listItemContainer: {
    margin: Metrics.smallMargin,
    backgroundColor: Colors.background,
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15
  }
})

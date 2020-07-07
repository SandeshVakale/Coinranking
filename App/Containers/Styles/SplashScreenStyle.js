import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.facebook,
    fontFamily: Fonts.type.bold
  },
  vLine: {
    height: 35,
    width: 1,
    marginHorizontal: 20,
    backgroundColor: Colors.coal
  },
  subTitle: {
    fontSize: 18,
    color: colors.banner,
    fontFamily: Fonts.type.base
  }
})

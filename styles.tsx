import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a3b3a3",
        flex: 1,
        paddingTop: Constants.statusBarHeight
      },
      heading: {
        fontSize: 20,
        marginTop: 25,
        fontWeight: "bold",
        textAlign: "center"
      },
      flexRow: {
        flexDirection: "row"
      },
      input: {
        borderColor: "#000",
        backgroundColor: "#fff",
        borderRadius: 4,
        borderWidth: 2,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8
      },
      button: {
        backgroundColor: "#f22",
        borderColor: "#000",
        borderWidth: 1,
        padding: 18,
        marginBottom: 30,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
        height: 54
      },
      listArea: {
        backgroundColor: "#a3b3a3",
        flex: 1,
        paddingTop: 16
      },
      deleteBox: {
        backgroundColor: "#f22",
        borderColor: "#000",
        borderWidth: 1,
        padding: 8,
        marginBottom: 6,
        marginTop: -18,
        width: 60
      },
      deleteText: {
        color: "#fff",
        padding: 0,
        marginBottom: 0,
        marginTop:0
      },
      showList: {
        backgroundColor: "#fff",
        flex: 1,
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        paddingTop: 24
      },
      listText: {
        color: "#000",
        padding: 8,
        marginBottom: 2,
        marginTop:-18,
        width: 250,
        fontFamily: 'serif',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic'
      },
      sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16
      },
      sectionHeading: {
        fontSize: 18,
        marginBottom: 8
      }
    });
  export default styles;
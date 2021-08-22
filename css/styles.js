import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 350,
  },
  specialContainer: {
    flex: 1,
    backgroundColor: '#1B1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1/2,
    padding: 3,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#1B1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col1: {
    width: '20%',
  },
  col2: {
    width: '80%',
  },
  text: {
    color: '#fff',
  },
  name: {
    width: "100%",
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  },
  details: {
    color: '#8d8c8c',
    textTransform: 'capitalize',
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  description: {
    color: '#fff',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  line: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 147,
    borderColor: '#fff',
    padding: 10,
    margin: 20, 
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonModal: {
    width:'50%',
    borderRadius: 147,
    padding: 2,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonConfirm: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input:{
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    minWidth:60
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButtonArea:{
    flexDirection: 'row',
  },
  buttonArea: {
    height: "20%",
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  pagination:{
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 40,
  },
  header: {
    width: "100%", 
  },
  content: {
    height: "80%",
  },
  smallContent:{
    width: "70%"
  },
  flatList:{
    flexGrow: 0, 
    minHeight: "30%"
  }
});


  

export default styles;
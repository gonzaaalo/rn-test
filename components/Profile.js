import React, { useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import styles from "../css/styles.js";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [dataCharacter, setDataCharacter] = useState(route.params.dataCharacter);
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onEdit = () => { setEditable(true)};

  const  onChange = (param, value) => {
    setDataCharacter({...dataCharacter, [param]: value});
    if(param==="favorite") onSave()
  }

  const onSave = () => {
      dispatch({ type: "UPDATE_CHARACTER", data: dataCharacter, idCharacter: route.params.idCharacter })
      setEditable(false)
  };

  const  onFav = (value) => {
    const newCharacterData= {...dataCharacter, "favorite": value};
    setDataCharacter(newCharacterData);
    dispatch({ type: "UPDATE_CHARACTER", data: newCharacterData, idCharacter: route.params.idCharacter })
  }

  const GoBack = () => { editable ? setModalVisible(true) : navigation.navigate('Home') };



  return (
    <View style={styles.specialContainer}>

      <View style={[styles.buttonArea, styles.header]}>
        <TouchableOpacity onPress={GoBack}>
          <Text style={styles.text}> {"< Volver al listado"}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.content, styles.smallContent]}>
        <View style={styles.name}>
          {editable ?
            <TextInput
              style={[styles.title, styles.input]}
              onChangeText={v => onChange("name", v)}
              defaultValue={dataCharacter.name}
            />
            : <Text style={styles.title}>{dataCharacter.name}</Text>}
          <Icon name={dataCharacter.favorite ? "star" : "star-border"} onPress={() => {onFav(dataCharacter.favorite === true ? false : true) }} size={25} color="yellow" />
        </View>
        <Text style={[styles.text, styles.description]}>{dataCharacter.gender}</Text>
        <Text style={[styles.text, styles.description]}>{"Birth date: " + dataCharacter.birth_year}</Text>
        <Text style={[styles.text, styles.description]}>{"Amount of films: " + dataCharacter.films.length}</Text>
        <View style={styles.line}>
          <Text style={[styles.text, styles.description]}>{"Height: "}</Text>
          {editable ?
            <TextInput
              style={[styles.text, styles.description, styles.input]}
              onChangeText={v => onChange("height", v)}
              defaultValue={dataCharacter.height.toString()}
              keyboardType="numeric"
            />
            : <Text style={[styles.text, styles.description]}>{dataCharacter.height}</Text>}
          <Text style={[styles.text, styles.description]}>{" | Mass: "}</Text>
          {editable ?
            <TextInput
              style={[styles.text, styles.description, styles.input]}
              onChangeText={v => onChange("mass", v)}
              defaultValue={dataCharacter.mass.toString()}
              keyboardType="numeric"
            />
            : <Text style={[styles.text, styles.description]}>{dataCharacter.mass}</Text>}
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={editable ? onSave : onEdit}
        >
          <Text style={styles.text}>{editable ? "Guardar los cambios" : "Editar"}</Text>
        </TouchableOpacity>
      </View>

{modalVisible && 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Tienes cambios sin guardar</Text>
            <Text style={styles.modalText}>Si abandonas la página sin guardar perderás los cambios realizados.</Text>
            <View style={styles.modalButtonArea}>
              <Pressable
                style={styles.buttonModal}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonConfirm]}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.textStyle}>Abandonar página</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    }
    </View>
  );
};

export default Profile;

import React, { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../css/styles.js";

export default function Panel({ dataCharacters, navigation }) {
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalRemove, setModalRemove] = useState(null);
  const ITEMS_PER_PAGE = 6;
  const PAGE_MAX = Math.ceil(dataCharacters.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);

  const Item = ({ id, item }) => (
    <View style={styles.item}>
      <View style={styles.col1}>
        <TouchableOpacity onPress={() => { setModalVisible(true); setModalRemove(id) }} style={styles.item}>
          <Icon
            name="times"
            size={10}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.col2}>
        <TouchableOpacity onPress={() =>
          navigation.navigate('Profile', { dataCharacter: item, idCharacter: id })}>
          <View style={styles.name}>
            <Text style={styles.text}>{item.name}</Text>
            {item.favorite && <Icon name="star" size={8} color="yellow" />}
          </View>
          <Text style={styles.details}>{item.gender + " | Birth date: " + item.birth_year}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const OnHandleRemove = (id) => {
    dispatch({ type: "DELETE_CHARACTER", idCharacter: id });
    setModalVisible(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Item
        id={index}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataCharacters && dataCharacters.slice((ITEMS_PER_PAGE * page) - ITEMS_PER_PAGE, ITEMS_PER_PAGE * page)}
        renderItem={({ item, index }) => renderItem({ item, index })}
        keyExtractor={(item, index) => index}
        numColumns={2}
        style={{flexGrow: 0}}
      />

    <View style={styles.pagination}>
                <Pressable
                  onPress={() => { if ((Number(page) - 1) > 0) setPage(Number(page) - 1) }}
                >
                  <Text style={styles.textStyle}>◀ Volver</Text>
                </Pressable>
                <Pressable
                  onPress={() => { if ((Number(page) + 1) <= PAGE_MAX) setPage(Number(page) + 1) }}
                >
                  <Text style={styles.textStyle}>Siguiente ▶</Text>
                </Pressable>
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
              <Text style={styles.modalHeader}>Seguro que quieres borrar?</Text>
              <Text style={styles.modalText}>Si borras, la acción no se podrá deshacer.</Text>
              <View style={styles.modalButtonArea}>
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonConfirm]}
                  onPress={() => OnHandleRemove(modalRemove)}
                >
                  <Text style={styles.textStyle}>Borrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }
    </View>

  );
}
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import styles from "../css/styles.js";

export default function Panel({ dataCharacters, navigation }) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalRemove, setModalRemove] = useState(null);
  const [dataToShow, setDataToShow] = useState([])
  const ITEMS_PER_PAGE = 6;
  const PAGE_MAX = Math.ceil(dataCharacters.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.col1}>
        <TouchableOpacity testID={"delete-button-" + item.name} onPress={() => { setModalVisible(true); setModalRemove(item.url) }} style={styles.item}>
          <Icon
            name="times"
            size={10}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.col2}>
        <TouchableOpacity testID={"item-" + item.name} onPress={() =>
          navigation.navigate('Profile', { dataCharacter: item, idCharacter: item.url })}>
          <View style={styles.name}>
            <Text style={styles.text}>{item.name}</Text>
            {item.favorite && <Icon name="star" size={8} color="yellow" />}
          </View>
          <Text style={styles.details}>{item.gender + " | Birth date: " + item.birth_year}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const OnHandleRemove = (url) => {
    dispatch({ type: "DELETE_CHARACTER", idCharacter: url });
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };

  useEffect(() => {
    if(dataCharacters) setDataToShow (dataCharacters.sort((a,b)=> a.name.localeCompare(b.name)).slice((ITEMS_PER_PAGE * page) - ITEMS_PER_PAGE, ITEMS_PER_PAGE * page));
  }, [dataCharacters, page])

  return (
    <View style={styles.container}>
      { dataToShow.length === 0 && page ===1 ? 
      <Text testID="nodata-text" style={styles.textStyle}>No data available.. Come back later!</Text>
      :
      <>
      <FlatList
      data={dataToShow}
      renderItem={({ item, index }) => renderItem({ item, index })}
      keyExtractor={(item, index) => index}
      numColumns={2}
      style={styles.flatList}
    />

    <View style={styles.pagination}>
      {((Number(page) - 1) > 0) &&
        <Pressable onPress={() => { setPage(Number(page) - 1) }} testID="back-button">
          <Text style={styles.textStyle}>◀ Anterior</Text>
        </Pressable>
      }
      {((Number(page) + 1) <= PAGE_MAX) &&
        <Pressable onPress={() => { setPage(Number(page) + 1) }} testID="next-button">
        <Text style={styles.textStyle}>Siguiente ▶</Text>
      </Pressable>
      }        
    </View>
    </>
      }
      

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
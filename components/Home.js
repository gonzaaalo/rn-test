import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import getCharacters from '../controllers/charactersController.js';
import styles from "../css/styles.js";
import Panel from './Panel';

export default function Home({ navigation }) {
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState(false);

  const onPress = () => setFiltered(!filtered);

  const loadCharacters = async () => {
    const response = await getCharacters();
    dispatch({ type: "LOAD_CHARACTERS", data: response});
  };

  
  useEffect(() => {
    if(characters.length === 0) loadCharacters(); 
  }, [])

  return (
    <View style={styles.specialContainer}>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          testID="filter-button"
        >
          <Text style={styles.text}>Filtrar por favoritos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Panel
          dataCharacters={filtered ? characters.filter(c => c.favorite === true) : characters}
          navigation={navigation} 
          />
      </View>
    </View>
  );
}



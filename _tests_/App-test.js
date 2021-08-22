import React from 'react';
import { fireEvent, render, waitForElementToBeRemoved} from '@testing-library/react-native';

jest.useFakeTimers()
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Panel from '../components/Panel';
import initialState from '../store/initialState';


describe('Batería de pruebas pantalla principal', () => {
  const testData = require('./data.json');
  const push = {
    navigate: jest.fn(),
  
  };

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData)
    }))
  })

    it('Chequeo de renderización sin datos', () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={[]}
              navigation={push}
            />
        </Provider>);
      component.getByText('No data available.. Come back later!')

    });

    it('Chequeo de renderización con datos', () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Luke Skywalker');
      component.getByText('C-3PO');
    });

    it('Chequeo de renderización con datos filtrados', () => {
      let filtered=true;
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={filtered ? testData.filter(c => c.favorite === true) : testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Luke Skywalker'); //Es favorito
      expect(component.queryByText('C-3PO')).toBeNull(); //No es favorito
    });

    it('Cambio a página siguiente', async () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Luke Skywalker'); //Ítem de primera página debe aparecer
      expect(component.queryByText('R5-D4')).toBeNull(); //Ítem de segunda página no debe aparecer
      const nextButton=component.getByText('Siguiente ▶');
      fireEvent.press(nextButton);
      component.getByText('R5-D4'); //Ítem de segunda página debe aparecer
      expect(component.queryByText('Luke Skywalker')).toBeNull(); //Ítem de primera página no debe aparecer
    });

    it('Cambio a página anterior', async () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Luke Skywalker'); //Ítem de primera página debe aparecer
      expect(component.queryByText('R5-D4')).toBeNull(); //Ítem de segunda página no debe aparecer
      const nextButton=component.getByText('Siguiente ▶');
      fireEvent.press(nextButton);
      component.getByText('R5-D4'); //Ítem de segunda página debe aparecer
      expect(component.queryByText('Luke Skywalker')).toBeNull(); //Ítem de primera página no debe aparecer
      const backButton=component.getByText('◀ Anterior');
      fireEvent.press(backButton);
      component.getByText('Luke Skywalker'); //Ítem de primera página debe aparecer
      expect(component.queryByText('R5-D4')).toBeNull(); //Ítem de segunda página no debe aparecer
    });

    it('Eliminar registro', async () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Beru Whitesun lars')
      const deleteButton=component.getByTestId('delete-button-Beru Whitesun lars');
      fireEvent.press(deleteButton);
      fireEvent.press(component.getByText('Borrar'));
      expect(component.queryByText('Borrar')).toBeNull();
    });    

    it('Ir a ventana de edición del personaje', async () => {
      const component = render(
        <Provider store={store}>
            <Panel
              dataCharacters={testData}
              navigation={push}
            />
        </Provider>);
      component.getByText('Beru Whitesun lars')
      const itemButton=component.getByTestId('item-Beru Whitesun lars');
      expect(push.navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(itemButton);
      expect(push.navigate).toHaveBeenCalledTimes(1);
    });    

  });


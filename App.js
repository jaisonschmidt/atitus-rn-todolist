/**
 * Conteúdo abordado:
 * 1 - Como criar um novo projeto React Native usando Expo
 * 2 - Como rodar no nosso celular este projeto
 * 3 - Como instanciar componentes nativos (View, text, TextInput, Button, FlatList)
 * 4 - Como usar o useState para manipular estados
 * 5 - Como usar o FlatList para exibir uma lista de itens
 * 6 - Como capturar o valor de um Input usando estado e onChangeText
 * 7 - Como adicionar um novo item na lista usando array de objetos
 * 8 - Como remover um item da lista usando o filter
 * 9 - Como usar o uuid para gerar um id único para cada item
 * 10 - Como usar o Alert para exibir um modal de confirmação
 * 11 - Como usar o SafeAreaView para evitar que o conteúdo fique por baixo da barra de status
 * 12 - Como usar Flexbox no React Native
 */

import uuid from 'react-native-uuid';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  
  const removeTask = (item) => {
    Alert.alert(
      'Remover task',
      `Deseja remover a task "${item.task}"?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const newData = data.filter(task => task.id !== item.id);
            setData(newData);
          }
        }
      ]
    );
  }

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: uuid.v4(),
      task,
      completed: false,
    };

    setData([...data, newTask]);
    setTask('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.header}>My APP!</Text>

      <View style={styles.mainContent}>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
          placeholder='Digite sua task:'
          onChangeText={text => setTask(text)}
          defaultValue={task}
        />

        <Button 
          title='Adicionar'
          onPress={() => addTask()} 
          disabled={task.trim() === ''}
        />

        <FlatList 
          data={data}
          style={{ marginTop: 20 }}
          renderItem={ ({ item }) => <View style={{marginBottom: 10}}><Button onPress={() => removeTask(item)} title={item.task} /></View> }
          ListEmptyComponent={ <Text>Nenhuma task cadastrada</Text> }
        />
      </View>

      <Text style={styles.footer}>Desenvolvido por Jaison</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#125D75',
    color: '#fff',
    padding: 20,
  },
  mainContent: {
    flexGrow: 1,
    padding: 20,
  },
  footer: {
    backgroundColor: '#125D75',
    color: '#fff',
    padding: 20,
    textAlign: 'center',
  },
});

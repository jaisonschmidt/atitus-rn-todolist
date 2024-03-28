/**
 * TODO
 * 1 - integrar o array com o input (implementar estado)
 * 2 - para cada task, renderizar um button
 * 3 - quando clicar no button da task, pedir confirmação
 * 4 - caso concorde, remover a task do array
 * 5 - implementar o componente SafeAreaView
 * 6 - Implementar UUID para gerar ids únicos
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

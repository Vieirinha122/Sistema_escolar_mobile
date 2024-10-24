import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';

export const LoginScreen = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!matricula) {
      setError('Por favor, insira a matrícula.');
      return;
    }

    setError('');  // Limpa o erro anterior

    // Requisição para buscar os alunos pela matrícula
    axios.get('https://sistema-escolar-two.vercel.app/api/alunos')
      .then(response => {
        const alunos = response.data;

        // Filtra o aluno pela matrícula digitada
        const alunoEncontrado = alunos.find(aluno => aluno.matricula === matricula);

        if (alunoEncontrado) {
          // Navega para a tela com as informações do aluno
          navigation.navigate('AlunoInfo', { aluno: alunoEncontrado });
        } else {
          setError('Matrícula não encontrada.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados do aluno:', error);
        setError('Falha ao buscar dados do aluno.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

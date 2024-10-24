import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';

export const AlunoInfoScreen = ({ route }) => {
  const { aluno } = route.params;
  const [nomeTurma, setNomeTurma] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifica se há turmas e faz a requisição para buscar o nome da turma
    if (aluno.turma.length > 0) {
      const idTurma = aluno.turma[0]; // Considerando que só há uma turma, usa o primeiro ID da lista
      axios.get(`https://sistema-escolar-two.vercel.app/api/turmas/${idTurma}`)
        .then(response => {
          setNomeTurma(response.data.nome); // Supondo que o campo nome da turma seja "nome"
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar nome da turma:', error);
          setError('Erro ao buscar nome da turma.');
          setLoading(false);
        });
    } else {
      setNomeTurma('Nenhuma turma encontrada.');
      setLoading(false);
    }
  }, [aluno.turma]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Nome: {aluno.nome}</Text>
          <Text>Matrícula: {aluno.matricula}</Text>
          <Text>Turno: {aluno.turno}</Text>
          <Text>Email: {aluno.email}</Text>
          <Text>Turma: {nomeTurma}</Text> 
        </Card.Content>
      </Card>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

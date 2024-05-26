import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '@env';

const Requests = () => {
    const [type, setType] = useState('request');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post(`${API_BASE_URL}/pedidos`, { type, name, email, phone, message });
            setResponseMessage('Pedido enviado com sucesso!');
        } catch (error) {
            setResponseMessage('Erro ao enviar o pedido.');
        }
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={type}
                style={styles.input}
                onValueChange={(itemValue) => setType(itemValue)}
            >
                <Picker.Item label="Pedido" value="request" />
                <Picker.Item label="Mensagem" value="message" />
            </Picker>
            <TextInput
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Seu email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Seu telefone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
            />
            <TextInput
                placeholder="Sua mensagem"
                value={message}
                onChangeText={setMessage}
                style={styles.input}
            />
            <Button title="Enviar Pedido" onPress={handleSubmit} />
            {responseMessage ? <Text>{responseMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        width: '80%',
    },
});

export default Requests;

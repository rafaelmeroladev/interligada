import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert,TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '@env';

const Requests = ({ onClose, showSuccessPopup }) => {
    const [type, setType] = useState('request');
    const [state, setState] = useState('state');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post(`${API_BASE_URL}/pedidos`, { type, name,state,city, email, phone, message });
            setResponseMessage('Pedido enviado com sucesso!');
            onClose();
            showSuccessPopup();
        } catch (error) {
            console.log(error);
            setResponseMessage('Erro ao enviar o pedido.');
            onClose();
            Alert.alert('Erro', 'Erro ao enviar o pedido.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Envie seu Pedido ou Mensagem</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        style={styles.picker}
                        onValueChange={(itemValue) => setType(itemValue)}
                    >
                        <Picker.Item label="Pedido" value="request" />
                        <Picker.Item label="Mensagem" value="message" />
                    </Picker>
                </View>
                <TextInput
                    placeholder="Seu nome"
                    placeholderTextColor="#000"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <View style={styles.row}>
                    <TextInput
                        placeholder="Seu email"
                        placeholderTextColor="#000"
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, styles.halfInput]}
                    />
                    <TextInput
                        placeholder="Seu telefone"
                        placeholderTextColor="#000"
                        value={phone}
                        keyboardType={'phone-pad'}
                        onChangeText={setPhone}
                        style={[styles.input, styles.halfInput]}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.pickerContainerHalf}>
                        <Picker
                            selectedValue={state}
                            style={styles.picker}
                            onValueChange={(itemValue) => setState(itemValue)}
                        >
                            <Picker.Item label="--" value="Estrangeiro" />
                            <Picker.Item label="AC" value="AC" />
                            <Picker.Item label="AL" value="AL" />
                            <Picker.Item label="AP" value="AP" />
                            <Picker.Item label="AM" value="AM" />
                            <Picker.Item label="BA" value="BA" />
                            <Picker.Item label="CE" value="CE" />
                            <Picker.Item label="ES" value="ES" />
                            <Picker.Item label="GO" value="GO" />
                            <Picker.Item label="MA" value="MA" />
                            <Picker.Item label="MT" value="MT" />
                            <Picker.Item label="MS" value="MS" />
                            <Picker.Item label="MG" value="MG" />
                            <Picker.Item label="PA" value="PA" />
                            <Picker.Item label="PB" value="PB" />
                            <Picker.Item label="PR" value="PR" />
                            <Picker.Item label="PE" value="PE" />
                            <Picker.Item label="PI" value="PI" />
                            <Picker.Item label="RJ" value="RJ" />
                            <Picker.Item label="RN" value="RN" />
                            <Picker.Item label="RS" value="RS" />
                            <Picker.Item label="RO" value="RO" />
                            <Picker.Item label="RR" value="RR" />
                            <Picker.Item label="SC" value="SC" />
                            <Picker.Item label="SP" value="SP" />
                            <Picker.Item label="SE" value="SE" />
                            <Picker.Item label="TO" value="TO" />
                            <Picker.Item label="DF" value="DF" />
                        </Picker>
                    </View>
                    <TextInput
                        placeholder="Cidade"
                        placeholderTextColor="#000"
                        value={city}
                        onChangeText={setCity}
                        style={[styles.input, styles.halfInput]}
                    />
                </View>
                <TextInput
                    placeholder="Sua mensagem"
                    placeholderTextColor="#000"
                    value={message}
                    onChangeText={setMessage}
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar Pedido</Text>
                </TouchableOpacity>
                {responseMessage ? <Text style={styles.responseMessage}>{responseMessage}</Text> : null}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#FFC655',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        width: '100%',
        borderRadius: 5,
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginVertical: 8,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    pickerContainerHalf: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginVertical: 8,
        width: '48%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        height: 45,
        paddingBottom:50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    halfInput: {
        width: '48%',
    },
    textArea: {
        height: 100,
        paddingStart: 10,
        paddingTop: 0,
    },
    button: {
        backgroundColor: '#FFC655',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    responseMessage: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
});

export default Requests;

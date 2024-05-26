import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, Alert, Button as RNButton } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import RadioPlayer from './components/RadioPlayer';
import Requests from './components/Requests';
import Timetable from './components/Timetable';

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [locutorOnline, setLocutorOnline] = useState(false);

    useEffect(() => {
        const checkLocutorStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/program`);
                setLocutorOnline(response.data == 'Online');
                console.log(response.data);
            } catch (error) {
                console.error('Erro ao verificar o status do locutor:', error);
            }
        };

        checkLocutorStatus();

        const intervalId = setInterval(checkLocutorStatus, 60000); // Verificar a cada minuto
        return () => clearInterval(intervalId);
    }, []);

    const openModal = (modal) => {
        if (modal === 'requests' && !locutorOnline) {
            setMessageModalVisible(true);
            return;
        }
        setCurrentModal(modal);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const closeMessageModal = () => {
        setMessageModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <RadioPlayer />
            <View style={styles.menu}>
                <Button
                    type="clear"
                    icon={<Icon name="home" size={30} color="blue" />}
                    title="Início"
                    onPress={closeModal}
                />
                <Button
                    type="clear"
                    icon={<Icon name="queue-music" size={30} color="blue" />}
                    title="Pedidos"
                    onPress={() => openModal('requests')}
                />
                <Button
                    type="clear"
                    icon={<Icon name="event" size={30} color="blue" />}
                    title="Horários"
                    onPress={() => openModal('timetable')}
                />
            </View>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {currentModal === 'requests' && <Requests />}
                        {currentModal === 'timetable' && <Timetable />}
                        <RNButton title="Fechar" onPress={closeModal} />
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                animationType="slide"
                visible={messageModalVisible}
                onRequestClose={closeMessageModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Nenhum locutor no ar no momento, confira a nossa programação.
                        </Text>
                        <RNButton title="Fechar" onPress={closeMessageModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    menu: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '50%',
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

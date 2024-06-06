import 'react-native-gesture-handler'; // Adicione esta linha no topo
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, Alert, Button as RNButton, TouchableOpacity,Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import RadioPlayer from './components/RadioPlayer';
import Requests from './components/Requests';
import SponsorBanners from './components/SponsorBanners';
import Timetable from './components/Timetable';
import { LinearGradient } from 'expo-linear-gradient'; // Certifique-se de que esta linha está correta
import PartnersBanner from './components/PartnersBanner';


const  widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [locutorOnline, setLocutorOnline] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    
 
    useEffect(() => {
        const checkLocutorStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/program`);
                setLocutorOnline(response.data === 'Online');
            } catch (error) {
                console.error('Erro ao verificar o status do locutor:', error);
            }
        };

        checkLocutorStatus();

        const intervalId = setInterval(checkLocutorStatus, 60000); // Verificar a cada minuto
        return () => clearInterval(intervalId);
    }, []);

    const resetApp = () => {
        setResetKey(prevKey => prevKey + 1);
        setAutoPlay(true);
        closeModal(); // Fechar modais se abertos
    };

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

    const showSuccessPopup = () => {
        setSuccessPopupVisible(true);
        setTimeout(() => setSuccessPopupVisible(false), 5000); // Exibir popup por 3 segundos
    };

    return (
        <LinearGradient colors={['#FFDD58', '#FFC655']} style={styles.gradient}>
            <View style={styles.container}>
                <SponsorBanners resetKey={resetKey}  />
                <RadioPlayer  resetKey={resetKey} />
                <LinearGradient colors={['#000000', '#302F2F']} style={styles.menu}>
                    <Button 
                        type="clear"
                        icon={<Icon name="home" size={30} color="#FFC655" />}
                        title="Início"
                        onPress={resetApp}
                        titleStyle={styles.titleStyle} 
                    />
                    <Button
                        type="clear"
                        icon={<Icon name="queue-music" size={30} color="#FFC655" />}
                        title="Pedidos"
                        onPress={() => openModal('requests')}
                        titleStyle={styles.titleStyle} 
                    />
                    <Button 
                        type="clear"
                        icon={<Icon name="event" size={30} color="#FFC655" />}
                        title="Programação"
                        onPress={() => openModal('timetable')}
                        titleStyle={styles.titleStyle} 
                    />
                </LinearGradient>

                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, currentModal === 'requests' ? styles.modalContentRequests : styles.modalContentTimetable]}>
                            {currentModal === 'requests' && <Requests onClose={closeModal} showSuccessPopup={showSuccessPopup} />}
                            {currentModal === 'timetable' && <Timetable />}
                            <TouchableOpacity 
                                style={styles.closeButton}
                                titleStyle={styles.closeButtonTitle}
                                onPress={closeModal}>
                                <Text style={styles.closeButtonTitle}>Fechar</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeMessageModal}>
                                <Text style={styles.closeButtonTitle}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {successPopupVisible && (
                    <View style={styles.successPopup}>
                        <Text style={styles.successPopupText}>Pedido enviado com sucesso!</Text>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    titleStyle: {
        color: '#FFC655',
        fontSize: 18,
        paddingStart: 5,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: widthScreen * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#FFC655',
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: widthScreen,
        paddingVertical: 15,
        borderTopWidth: 2,
        borderColor: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 5,
        borderColor: '#000',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalContentRequests: {
        height: '80%',
    },
    modalContentTimetable: {
        height: '52%',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    successPopup: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -widthScreen * 0.4 }, { translateY: -50 }],
        backgroundColor: '#d4edda',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#155724',
        zIndex: 1000,
        elevation:15
    },
    successPopupText: {
        color: '#155724',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

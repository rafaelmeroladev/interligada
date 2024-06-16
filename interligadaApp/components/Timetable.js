import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import axios from 'axios';
import { API_BASE_URL, API_BASE_IMAGE_URL } from '@env'; // Import API_BASE_IMAGE_URL
import { DateTime } from 'luxon'; // Importa luxon
import { MaterialIcons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const itemWidth = width * 0.8;
const itemSpacing = (width - itemWidth) / 2;

const Timetable = ({ resetKey }) => {
    const [timetables, setTimetables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/timetables/day`);
                const sortedTimetables = response.data.sort((a, b) => {
                    const startA = DateTime.fromFormat(a.hour_start, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
                    const startB = DateTime.fromFormat(b.hour_start, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
                    return startA - startB;
                });
                setTimetables(sortedTimetables);
                setLoading(false);

                const now = DateTime.now().setZone('America/Sao_Paulo');

                // Encontre o índice do programa atual ou o mais próximo
                const currentOrClosestIndex = sortedTimetables.findIndex(item => {
                    const start = DateTime.fromFormat(item.hour_start, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
                    const finish = DateTime.fromFormat(item.hour_finish, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
                    return now >= start && now <= finish;
                });

                const closestIndex = currentOrClosestIndex === -1
                    ? sortedTimetables.findIndex(item => {
                        const start = DateTime.fromFormat(item.hour_start, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
                        return start > now;
                    })
                    : currentOrClosestIndex;

                const indexToScroll = closestIndex === -1 ? sortedTimetables.length - 1 : closestIndex;

                setTimeout(() => {
                    if (flatListRef.current && indexToScroll >= 0 && indexToScroll < sortedTimetables.length) {
                        flatListRef.current.scrollToIndex({ animated: true, index: indexToScroll, viewPosition: 0.5 });
                    }
                    setSelectedItem(sortedTimetables[indexToScroll]);
                    setScrollIndex(indexToScroll);
                }, 100);
            } catch (error) {
                setError('Erro ao carregar a programação. Por favor, tente novamente.');
                setLoading(false);
            }
        };

        fetchTimetables();
    }, [resetKey]);

    const getItemStyle = (hourStart, hourFinish) => {
        const now = DateTime.now().setZone('America/Sao_Paulo');
        const start = DateTime.fromFormat(hourStart, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });
        const finish = DateTime.fromFormat(hourFinish, 'HH:mm:ss', { zone: 'America/Sao_Paulo' });

        if (now < start) {
            return styles.future;
        } else if (now >= start && now <= finish) {
            return styles.present;
        } else {
            return styles.past;
        }
    };

    const handleNext = () => {
        if (flatListRef.current && scrollIndex < timetables.length - 1) {
            const newIndex = scrollIndex + 1;
            flatListRef.current.scrollToIndex({
                index: newIndex,
                animated: true,
                viewPosition: 0.5
            });
            setScrollIndex(newIndex);
        }
    };

    const handlePrev = () => {
        if (flatListRef.current && scrollIndex > 0) {
            const newIndex = scrollIndex - 1;
            flatListRef.current.scrollToIndex({
                index: newIndex,
                animated: true,
                viewPosition: 0.5
            });
            setScrollIndex(newIndex);
        }
    };

    const renderItem = ({ item }) => {
        const imageUrl = item.imagem ? `${API_BASE_IMAGE_URL}/${item.imagem}` : null;
        const toggleDescription = () => {
            setSelectedItem(selectedItem && selectedItem.id === item.id ? null : item);
        };

        const itemStyle = getItemStyle(item.hour_start, item.hour_finish);

        return (
            <TouchableOpacity onPress={toggleDescription}>
                <View style={styles.cardContainer}>
                    {item.imagem ? (
                        <ImageBackground
                            source={{ uri: imageUrl }}
                            style={styles.backgroundImage}
                            imageStyle={[styles.backgroundImageStyle, itemStyle]}
                        >
                            <View style={styles.textContainer}>
                                <Text style={styles.programName}>{item.program_name}</Text>
                                <Text style={styles.time}>{item.hour_start} - {item.hour_finish}</Text>
                            </View>
                            <View style={styles.item}>
                                {selectedItem && selectedItem.id === item.id && (
                                    <View style={styles.descriptionBox}>
                                        <Text style={styles.descriptionText}>{item.description}</Text>
                                    </View>
                                )}
                            </View>
                        </ImageBackground>
                    ) : (
                        <View style={styles.item}>
                            <View style={styles.textContainer}>
                                <Text style={styles.programName}>{item.program_name}</Text>
                                <Text style={styles.time}>{item.hour_start} - {item.hour_finish}</Text>
                            </View>
                            {selectedItem && selectedItem.id === item.id && (
                                <View style={styles.descriptionBox}>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={scrollIndex > 0 ? "white" : "yellow"}
                onPress={handlePrev}
                style={[styles.arrowLeft, { opacity: scrollIndex > 0 ? 1 : 0.5 }]}
                disabled={scrollIndex <= 0}
            />
            <FlatList
                ref={flatListRef}
                data={timetables}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={itemWidth + itemSpacing}
                decelerationRate="fast"
                pagingEnabled
                getItemLayout={(data, index) => (
                    { length: itemWidth + itemSpacing, offset: (itemWidth + itemSpacing) * index, index }
                )}
                initialNumToRender={1}
            />
            <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color={scrollIndex < timetables.length - 1 ? "white" : "yellow"}
                onPress={handleNext}
                style={[styles.arrowRight, { opacity: scrollIndex < timetables.length - 1 ? 1 : 0.5 }]}
                disabled={scrollIndex >= timetables.length - 1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    listContainer: {
        paddingHorizontal: itemSpacing / 3,
    },
    cardContainer: {
        width: width * 0.78,
        height: height * 0.4,
        marginHorizontal: itemSpacing / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: null,
        height: height * 0.36,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    backgroundImageStyle: {
        borderRadius: 30,
        width: width * 0.8,
    },
    item: {
        width: itemWidth,
        height: itemWidth,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        resizeMode: 'contain',
    },
    textContainer: {
        position: 'absolute',
        top: width * 0.05,
        right: width * 0.15,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    programName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'right',
    },
    time: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'right',
    },
    past: {
        borderColor: '#ee6b6e',
        borderWidth: 5,
    },
    present: {
        borderColor: 'rgb(170, 255, 0)',
        borderWidth: 5,
    },
    future: {
        borderColor: 'rgb(255, 234, 0)',
        borderWidth: 5,
    },
    descriptionBox: {
        width: width * 0.78,
        height: height * 0.35,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    arrowLeft: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    arrowRight: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
    },
});

export default Timetable;

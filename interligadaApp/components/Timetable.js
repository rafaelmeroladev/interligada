import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import moment from 'moment';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.75;
const itemSpacing = (width - itemWidth) / 2;

const Timetable = () => {
    const [timetables, setTimetables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/timetables/day`);
                const sortedTimetables = response.data.sort((a, b) => moment(a.hour_start, 'HH:mm').diff(moment(b.hour_start, 'HH:mm')));
                setTimetables(sortedTimetables);
                setLoading(false);

                const now = moment();
                const closestIndex = sortedTimetables.findIndex(item => moment(item.hour_start, 'HH:mm').isAfter(now));
                const indexToScroll = closestIndex === -1 ? sortedTimetables.length - 1 : closestIndex;

                // Scroll to the closest program
                setTimeout(() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToIndex({ animated: true, index: indexToScroll, viewPosition: 0.5 });
                    }
                    setSelectedItem(sortedTimetables[indexToScroll]);
                }, 100); // Small delay to ensure FlatList is rendered
            } catch (error) {
                setError('Erro ao carregar a programação. Por favor, tente novamente.');
                setLoading(false);
            }
        };

        fetchTimetables();
    }, []);

    const getItemStyle = (hourStart, hourFinish) => {
        const now = moment();
        const start = moment(hourStart, 'HH:mm');
        const finish = moment(hourFinish, 'HH:mm');

        if (now.isBefore(start)) {
            return styles.future;
        } else if (now.isBetween(start, finish)) {
            return styles.present;
        } else {
            return styles.past;
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <View style={styles.cardContainer}>
                {item.imagem ? (
                    <ImageBackground source={{ uri: `${API_BASE_URL}/storage/${item.imagem}` }} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
                        <View style={[styles.item, getItemStyle(item.hour_start, item.hour_finish)]}>
                            <Text style={styles.programName}>{item.program_name}</Text>
                            <Text style={styles.time}>{item.hour_start} - {item.hour_finish}</Text>
                            {selectedItem && selectedItem.id === item.id && (
                                <View style={styles.descriptionBox}>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                </View>
                            )}
                        </View>
                    </ImageBackground>
                ) : (
                    <View style={[styles.item, getItemStyle(item.hour_start, item.hour_finish)]}>
                        <Text style={styles.programName}>{item.program_name}</Text>
                        <Text style={styles.time}>{item.hour_start} - {item.hour_finish}</Text>
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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={timetables}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
                snapToInterval={itemWidth + 20} // Adjusting for card width and margin
                decelerationRate="fast"
                pagingEnabled
                getItemLayout={(data, index) => (
                    { length: itemWidth + 20, offset: (itemWidth + 20) * index, index }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    listContainer: {
        paddingHorizontal: itemSpacing,
    },
    cardContainer: {
        width: itemWidth + 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: itemWidth,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImageStyle: {
        borderRadius: 10,
    },
    item: {
        width: itemWidth,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    programName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    time: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    past: {
        borderColor: '#f8d7da',
        borderWidth: 2,
    },
    present: {
        borderColor: '#d4edda',
        borderWidth: 2,
    },
    future: {
        borderColor: '#f9f9f9',
        borderWidth: 2,
    },
    descriptionBox: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Timetable;

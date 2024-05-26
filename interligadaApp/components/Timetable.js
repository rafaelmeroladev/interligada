import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const Timetable = () => {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            const response = await axios.get(`${API_BASE_URL}/horarios`);
            setTimetable(response.data);
        };

        fetchTimetable();
    }, []);

    return (
        <View style={styles.container}>
            {timetable.map((item, index) => (
                <Text key={index} style={styles.text}>{item.show_name} - {item.time}</Text>
            ))}
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
    text: {
        padding: 8,
    },
});

export default Timetable;

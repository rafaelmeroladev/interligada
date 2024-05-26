import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const PartnersBanner = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            const response = await axios.get(`${API_BASE_URL}/banners`);
            setBanners(response.data);
        };

        fetchBanners();
    }, []);

    return (
        <ScrollView horizontal>
            {banners.map((banner, index) => (
                <Image key={index} source={{ uri: banner.img_url }} style={{ width: 200, height: 100 }} />
            ))}
        </ScrollView>
    );
};

export default PartnersBanner;

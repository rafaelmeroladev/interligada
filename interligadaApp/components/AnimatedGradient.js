import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const AnimatedGradient = ({ colors1, colors2, duration, style }) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        };

        animate();
    }, [animation, duration]);

    const interpolateColors = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors1, colors2],
    });

    return (
        <View style={style}>
            <Animated.View style={{ ...style, opacity: animation }}>
                <LinearGradient colors={colors1} style={style} />
            </Animated.View>
            <Animated.View style={{ ...style, opacity: Animated.subtract(1, animation) }}>
                <LinearGradient colors={colors2} style={style} />
            </Animated.View>
        </View>
    );
};

export default AnimatedGradient;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido al Sancocho </Text>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7308/7308210.png' }}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        color: '#FFD700',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default HomeScreen;

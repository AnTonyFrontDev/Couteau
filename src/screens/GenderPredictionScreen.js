import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

const GenderPredictionScreen = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGender = async () => {
        if (!name) {
            setError('Por favor, ingresa un nombre.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.genderize.io/?name=${name}`);
            const data = await response.json();
            setGender(data.gender);
        } catch (error) {
            setError('Error al obtener el género. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.container}>
                <Text style={styles.title}>Predicción de Género</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa un nombre"
                        placeholderTextColor="#888"
                        onChangeText={setName}
                        value={name}
                    />
                    <TouchableOpacity style={styles.predictButton} onPress={fetchGender}>
                        <Text style={styles.predictButtonText}>Predecir</Text>
                    </TouchableOpacity>
                </View>

                {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />}

                {error && <Text style={styles.errorText}>{error}</Text>}

                {gender && !loading && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>
                            El género es: {gender === 'male' ? 'Masculino' : 'Femenino'}
                        </Text>
                        <View style={[styles.genderIndicator, { backgroundColor: gender === 'male' ? '#4169E1' : '#FF69B4' }]} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#FFD700',
        borderWidth: 2,
        borderRadius: 25,
        color: '#fff',
        paddingHorizontal: 20,
        fontSize: 16,
    },
    predictButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginLeft: 10,
    },
    predictButtonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 20,
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    resultText: {
        color: '#FFD700',
        fontSize: 18,
    },
    genderIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    errorText: {
        color: '#FF6347',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        padding: 12,
        borderRadius: 8,
    },
    loader: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default GenderPredictionScreen;
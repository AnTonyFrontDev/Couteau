import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
} from 'react-native';

const AgePredictionScreen = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAge = async () => {
        if (!name) {
            setError('Por favor, ingresa un nombre.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`);
            const data = await response.json();
            setAge(data.age);
        } catch (error) {
            setError('Error al obtener la edad. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const getCategory = (age) => {
        if (age <= 20) return 'joven';
        if (age > 20 && age <= 50) return 'adulto';
        return 'anciano';
    };

    const getImage = (ageCategory) => {
        switch (ageCategory) {
            case 'joven':
                return 'https://cdn3d.iconscout.com/3d/premium/thumb/guapo-empresario-avatar-10255294-8303731.png?f=webp';
            case 'adulto':
                return 'https://cdn3d.iconscout.com/3d/premium/thumb/hombre-calvo-barbudo-10253268-8330279.png?f=webp';
            case 'anciano':
                return 'https://cdn3d.iconscout.com/3d/premium/thumb/juez-11098727-8893740.png?f=webp';
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.container}>
                <Text style={styles.title}>Predicción de Edad</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa un nombre"
                        placeholderTextColor="#888"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <TouchableOpacity style={styles.predictButton} onPress={fetchAge}>
                        <Text style={styles.predictButtonText}>Predecir</Text>
                    </TouchableOpacity>
                </View>

                {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />}

                {error && <Text style={styles.errorText}>{error}</Text>}

                {age !== null && !loading && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>La edad estimada es: {age}</Text>
                        <Text style={styles.resultText}>
                            Clasificación: {getCategory(age)}
                        </Text>
                        <Image
                            source={{ uri: getImage(getCategory(age)) }}
                            style={styles.image}
                        />
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
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    resultText: {
        color: '#FFD700',
        fontSize: 18,
        marginBottom: 10,
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
    image: {
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 75,
    },
    loader: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default AgePredictionScreen;
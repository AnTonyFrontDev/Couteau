import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList,
    Linking,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
} from 'react-native';

const UniversityScreen = () => {
    const [country, setCountry] = useState('');
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUniversities = async () => {
        if (!country) {
            setError('Por favor, ingresa el nombre de un país.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
            const data = await response.json();
            if (data.length === 0) {
                setError('No se encontraron universidades para este país.');
            } else {
                setUniversities(data);
            }
        } catch (error) {
            setError('Error al obtener las universidades. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.universityContainer}>
            <Text style={styles.universityName}>{item.name}</Text>
            <Text style={styles.universityDomain}>{item.domains[0]}</Text>
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Linking.openURL(item.web_pages[0])}
            >
                <Text style={styles.linkButtonText}>Visitar página web</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.container}>
                <Text style={styles.title}>Universidades por País</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el nombre del país"
                        placeholderTextColor="#888"
                        onChangeText={(text) => setCountry(text)}
                        value={country}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={fetchUniversities}>
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                {loading && <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />}

                {error && <Text style={styles.errorText}>{error}</Text>}

                <FlatList
                    data={universities}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
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
    searchButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginLeft: 10,
    },
    searchButtonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    universityContainer: {
        backgroundColor: '#1A1A1A',
        padding: 20,
        marginBottom: 16,
        borderRadius: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    universityName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 8,
    },
    universityDomain: {
        fontSize: 14,
        color: '#BBB',
        marginBottom: 12,
    },
    linkButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    linkButtonText: {
        color: '#121212',
        fontSize: 14,
        fontWeight: 'bold',
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

export default UniversityScreen;
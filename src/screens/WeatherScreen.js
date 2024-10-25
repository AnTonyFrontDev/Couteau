import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { RefreshCw } from 'lucide-react-native';

const WeatherScreen = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const APIKey = 'i6JNQ8g7SQJAGBwXyaIPNW5oi83l88VS';
    const locationKey = '125887'; // Key for Santo Domingo

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${APIKey}&language=es-US&details=True`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                setWeatherData(data[0]);
            } else {
                setError('No se pudo obtener el clima de Santo Domingo. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Error al obtener el clima.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.container}>
                <Text style={styles.title}>Clima en Santo Domingo</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.refreshButton} onPress={fetchWeather}>
                            <RefreshCw color="#FFD700" size={24} />
                        </TouchableOpacity>
                    </View>
                ) : weatherData && (
                    <View style={styles.weatherContainer}>
                        <Text style={styles.temperature}>
                            {weatherData.Temperature && weatherData.Temperature.Metric
                                ? `${weatherData.Temperature.Metric.Value}°C`
                                : 'N/A'}
                        </Text>
                        <Text style={styles.description}>
                            {weatherData.WeatherText || 'Sin descripción'}
                        </Text>
                        {weatherData.WeatherIcon && (
                            <Image
                                source={{
                                    uri: `https://developer.accuweather.com/sites/default/files/${weatherData.WeatherIcon.toString().padStart(2, '0')}-s.png`,
                                }}
                                style={styles.weatherIcon}
                            />
                        )}
                        <View style={styles.detailsContainer}>
                            <Text style={styles.details}>
                                Sensación térmica: {weatherData.RealFeelTemperature && weatherData.RealFeelTemperature.Metric
                                ? `${weatherData.RealFeelTemperature.Metric.Value}°C`
                                : 'N/A'}
                            </Text>
                            <Text style={styles.details}>
                                Humedad: {weatherData.RelativeHumidity || 'N/A'}%
                            </Text>
                            <Text style={styles.details}>
                                Viento: {weatherData.Wind && weatherData.Wind.Speed && weatherData.Wind.Speed.Metric
                                ? `${weatherData.Wind.Speed.Metric.Value} km/h`
                                : 'N/A'} {weatherData.Wind && weatherData.Wind.Direction ? weatherData.Wind.Direction.Localized : ''}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.refreshButton} onPress={fetchWeather}>
                            <RefreshCw color="#FFD700" size={24} />
                        </TouchableOpacity>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 24,
        textAlign: 'center',
    },
    weatherContainer: {
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        maxWidth: 350,
    },
    temperature: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
    description: {
        fontSize: 24,
        color: '#FFD700',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 15,
        width: '100%',
    },
    details: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
    },
    errorContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxWidth: 350,
    },
    errorText: {
        color: '#FF6347',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
    refreshButton: {
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderRadius: 25,
        padding: 10,
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default WeatherScreen;
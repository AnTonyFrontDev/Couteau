import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para iconos, como el icono de menú (hamburguesa)

// Importa las pantallas
import HomeScreen from '../../screens/HomeScreen';
import GenderPredictionScreen from '../../screens/GenderPredictionScreen';
import AgePredictionScreen from '../../screens/AgePredictionScreen';
import UniversityScreen from '../../screens/UniversityScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import WordPressNewsScreen from '../../screens/WordPressNewsScreen';
import AboutScreen from '../../screens/AboutScreen';

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

// Tema personalizado oscuro
const CustomDarkTheme = {
    dark: true,
    colors: {
        primary: '#FFD700',
        background: '#121212',
        card: '#1A1A1A',
        text: '#FFFFFF',
        border: '#333333',
        notification: '#FF6347',
    },
};

function AppNavigation() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <NavigationContainer theme={CustomDarkTheme}>
                <Drawer.Navigator
                    initialRouteName="Portada"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#1A1A1A' },
                        headerTintColor: '#FFFFFF', // Asegura que el icono del menú sea blanco
                        drawerActiveTintColor: '#FFD700',
                        drawerInactiveTintColor: '#888888',
                        drawerStyle: { backgroundColor: '#1A1A1A' },
                    }}
                >
                    <Drawer.Screen
                        name="Portada"
                        component={HomeScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="home" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Predicción de Género"
                        component={GenderPredictionScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="man" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Predicción de Edad"
                        component={AgePredictionScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="time" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Universidades por País"
                        component={UniversityScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="school" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Clima en RD"
                        component={WeatherScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="cloud" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Noticias de WordPress"
                        component={WordPressNewsScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="newspaper" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Acerca de"
                        component={AboutScreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="information-circle" size={size} color={color} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppNavigation;

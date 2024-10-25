import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
    const openEmail = () => {
        Linking.openURL('mailto:antonydeveloper08@gmail.com');
    };

    const openPhone = () => {
        Linking.openURL('tel:849876xxxx');
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#1A1A1A', '#2A2A2A']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://drive.google.com/uc?export=view&id=1iYjUrtdu0LdmdrpSZF0KQsBravL_faQc' }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Antony Espinal</Text>
                    <Text style={styles.subtitle}>Desarrollador de Couteau App</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Sobre mí</Text>
                    <Text style={styles.description}>
                        Soy un apasionado desarrollador de aplicaciones móviles con un enfoque especial en crear experiencias de usuario inmersivas y atractivas. Mi trabajo en esta app de Iron Man demuestra mi habilidad para combinar diseño elegante con funcionalidad robusta, todo ello manteniendo la esencia de la icónica franquicia de Marvel.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Contacto</Text>
                    <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
                        <Ionicons name="mail" size={24} color="#FFD700" />
                        <Text style={styles.contactText}>antonydeveloper08@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
                        <Ionicons name="call" size={24} color="#FFD700" />
                        <Text style={styles.contactText}>849876xxxx</Text>
                    </TouchableOpacity>
                    <View style={styles.contactItem}>
                        <Ionicons name="school" size={24} color="#FFD700" />
                        <Text style={styles.contactText}>Matrícula: 20221960</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Habilidades</Text>
                    <View style={styles.skillsContainer}>
                        <View style={styles.skill}>
                            <Text style={styles.skillText}>React Native</Text>
                        </View>
                        <View style={styles.skill}>
                            <Text style={styles.skillText}>JavaScript</Text>
                        </View>
                        <View style={styles.skill}>
                            <Text style={styles.skillText}>UI/UX Design</Text>
                        </View>
                        <View style={styles.skill}>
                            <Text style={styles.skillText}>API Integration</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    gradient: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    subtitle: {
        fontSize: 16,
        color: '#BBBBBB',
    },
    card: {
        backgroundColor: '#1A1A1A',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#BBBBBB',
        lineHeight: 24,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#FFD700',
        marginLeft: 10,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skill: {
        backgroundColor: '#FFD700',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    skillText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
});

export default AboutScreen;

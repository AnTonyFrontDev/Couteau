import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { SvgUri } from "react-native-svg";
import { RefreshCw, ChevronRight } from 'lucide-react-native';

const WordPressNewsScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://usainbolt.com/wp-json/wp/v2/posts');
            const data = await response.json();
            setPosts(data.slice(0, 3)); // Obtener las 3 últimas noticias
        } catch (error) {
            setError('Error al obtener las noticias.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title.rendered}</Text>
            <Text style={styles.postExcerpt}>
                {item.excerpt.rendered.replace(/<[^>]+>/g, '')} {/* Remover etiquetas HTML */}
            </Text>
            <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => Linking.openURL(item.link)}
            >
                <Text style={styles.readMoreText}>Leer más</Text>
                <ChevronRight color="#FFD700" size={16} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.container}>
                <Text style={styles.title}>Noticias de WordPress</Text>

                <SvgUri
                    uri="https://usainbolt.com/wp-content/uploads/2022/09/usain-bolt-centered-logo.svg"
                    style={styles.logo}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.refreshButton} onPress={fetchPosts}>
                            <RefreshCw color="#FFD700" size={24} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderPost}
                        contentContainerStyle={styles.postsList}
                    />
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
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 20,
        textAlign: 'center',
    },
    logo: {
        width: 120,
        height: 75,
        marginBottom: 30,
    },
    postsList: {
        width: '100%',
    },
    postContainer: {
        backgroundColor: '#1A1A1A',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
    },
    postExcerpt: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 15,
        lineHeight: 24,
    },
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    readMoreText: {
        fontSize: 16,
        color: '#FFD700',
        marginRight: 5,
    },
    errorContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        borderRadius: 10,
        padding: 20,
        width: '100%',
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
    },
    loader: {
        marginTop: 20,
    },
});

export default WordPressNewsScreen;
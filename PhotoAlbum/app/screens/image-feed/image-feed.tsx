import * as React from 'react';
import { View, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Api } from '../../services/api';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';

const CLOSE_IMG_URI = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png';

export class ImageFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        imageData: [],
        imageuri: '',
        ModalVisibleStatus: false,
    }

    apiInterface: Api = new Api();

    componentDidMount() {
        this.getPhotos();
    }

    render() {
        // Recuperar lista de fotos
        if (this.state.ModalVisibleStatus) {
            return (
                <Modal
                    transparent={false}
                    animationType={'fade'}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={() => {
                        this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                    }}>
                    <View style={styles.modelStyle}>
                        <Image style={styles.fullImageStyle} source={{ uri: this.state.imageuri }}></Image>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.closeButtonStyle}
                            onPress={() => {
                                this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                            }}>
                            <FastImage
                                source={{
                                    uri: CLOSE_IMG_URI,
                                }}
                                style={styles.closeButtonImageStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.imageData}
                        renderItem={({ item }) => {
                            return <View style={styles.imageView}>
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.container}
                                    onPress={() => {
                                        this.ShowModalFunction(true, item.url);
                                    }}>
                                    <Image style={styles.image} source={{ uri: item.thumbnailUrl }}></Image>
                                </TouchableOpacity>
                            </View>
                        }}
                        //Setting the number of column
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }
    }

    getPhotos() {
        this.apiInterface.getPhotos().then((photos) => {
            console.log('getPhotos OK');
            this.setState({ imageData: photos });
        });
    }

    ShowModalFunction(visible, imageURL) {
        //handler to handle the click on image of Grid
        //and close button on modal
        this.setState({
            ModalVisibleStatus: visible,
            imageuri: imageURL,
        });
    }
}

const styles = StyleSheet.create({
    // Gallery
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        flex: 1,
    },
    image: {
        height: 150,
        width: '100%',
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute',
    },
    closeButtonImageStyle: { 
        width: 35, 
        height: 35, 
        marginTop: 16 
    },
    defaultPadding: {
        padding: 20
    },
    imageView: { 
        flex: 1, 
        flexDirection: 'column', 
        margin: 1 
    }
});
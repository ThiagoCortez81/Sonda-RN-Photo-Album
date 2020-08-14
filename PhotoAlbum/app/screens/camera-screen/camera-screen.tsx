import React, { Component } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { RNCamera } from "react-native-camera";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRss, faCamera, faEllipsisH, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Text } from "../../components";

export const flashAuto = require("./torch-icons/flash-auto.png")
export const flashOff = require("./torch-icons/flash-off.png")
export const flashTorch = require("./torch-icons/flash-torch.png")
export const takePic = require("./takePic.png")

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    flashIcon: {
        width: 35,
        height: 35,
        paddingStart: 20
    },
    picIcon: {
        marginTop: 10,
        width: 65,
        height: 65
    },
    iconView: {
        flex: 0.5,
        alignSelf: "center",
        marginStart: 15
    },
    iconViewFinish: {
        flex: 0.5,
        alignSelf: "center",
        alignItems: "flex-end",
        marginEnd: 15
    }
});

export class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    navigation;
    camera;

    fieldRef = React.createRef();

    state = {
        flashMode: RNCamera.Constants.FlashMode.auto,
        flashIcon: (<Image source={flashAuto} style={styles.flashIcon}></Image>),
        cameraType: RNCamera.Constants.Type.back
    }

    changeFlash = () => {
        if (this.state.flashMode === RNCamera.Constants.FlashMode.auto) {
            this.setState({ flashMode: RNCamera.Constants.FlashMode.torch, flashIcon: <Image source={flashTorch} style={styles.flashIcon}></Image> })
        } else if (this.state.flashMode === RNCamera.Constants.FlashMode.torch) {
            this.setState({ flashMode: RNCamera.Constants.FlashMode.off, flashIcon: <Image source={flashOff} style={styles.flashIcon}></Image> })
        } else {
            this.setState({ flashMode: RNCamera.Constants.FlashMode.auto, flashIcon: <Image source={flashAuto} style={styles.flashIcon}></Image> })
        }
    }

    changeCamera = () => {
        if (this.state.cameraType === RNCamera.Constants.Type.back) {
            this.setState({ cameraType: RNCamera.Constants.Type.front })
        } else {
            this.setState({ cameraType: RNCamera.Constants.Type.back })
        }
    }

    goBack = () => {
        this.navigation.pop();
    }

    takePicAction = async () => {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log('Foto tirada! URI =>' + data.uri);

        this.goBack();
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={{ flex: 0.08, alignContent: "center", flexDirection: "row", backgroundColor: '#000000' }}>
                    <View style={styles.iconView}>
                        <TouchableOpacity
                            onPress={this.changeFlash}>
                            {this.state.flashIcon}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconViewFinish}>
                        <TouchableOpacity
                            onPress={this.changeCamera}>
                            <FontAwesomeIcon icon={faCamera} color="#FFFFFF" size={35} />
                        </TouchableOpacity>
                    </View>
                </View>
                <RNCamera
                    style={{ flex: 0.75 }}
                    ref={camera => { this.camera = camera }}
                    type={this.state.cameraType}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={this.state.flashMode}
                    captureAudio={false}
                />
                <View style={{ flex: 0.15, backgroundColor: '#000000' }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, paddingStart: 20, alignSelf: "center" }}>
                                <TouchableOpacity
                                    onPress={this.goBack}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.8, alignItems: "center" }}>
                                <Text>Photo</Text>
                                <TouchableOpacity
                                    onPress={this.takePicAction}>
                                    <Image source={takePic} style={styles.picIcon}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.2 }}>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

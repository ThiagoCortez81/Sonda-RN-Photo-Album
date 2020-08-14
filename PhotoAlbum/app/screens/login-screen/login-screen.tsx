import React, { Component } from "react"
import { Image, View, StyleSheet, ActivityIndicator } from "react-native"
import { Text } from "../../components";
import { TextField } from '@ubaids/react-native-material-textfield';
import { Button } from 'react-native-elements';

export const instagramLogo = require("./instagram.jpg")

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    state = {
        loading: false
    }
    navigation;


    handleLogin = () => {
        this.setState({ loading: true });
        setTimeout((that) => {
            this.navigation.navigate("main");
            that.setState({ loading: false });
        }, 5000, this); // Timeout de 5s para o Activity Indicator
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.page}>
                    <View style={styles.pageLoading}>
                        <ActivityIndicator size={70} color="#d73f8c" />
                        <Text style={styles.text}>Efetuando login, aguarde...</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.page}>
                <View style={styles.centeredView}>
                    <Image
                        style={styles.headingLogo}
                        source={instagramLogo}
                    />
                </View>
                <View style={styles.horizontalSeparator} />
                <View style={styles.mainView}>
                    <View style={styles.rowOrganizedView}>
                        <Text style={styles.text}>Para acessar o app informe seu </Text>
                        <Text style={styles.bolderText}>email</Text>
                    </View>
                    <TextField
                        label='Email'
                        tintColor="#009688"
                    />

                    <View style={styles.rowOrganizedView}>
                        <Text style={styles.text}>Agora digite sua </Text>
                        <Text style={styles.bolderText}>senha</Text>
                    </View>
                    <TextField
                        label='Senha'
                        tintColor="#009688"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.loginButtonView}>
                    <Button
                        title="ACESSAR"
                        onPress={this.handleLogin}
                        titleStyle={styles.loginButton}
                        buttonStyle={styles.loginButtonStyle}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    pageLoading: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        justifyContent: "center",
        alignSelf: "center"
    },
    headingLogo: {
        marginTop: 30,
        width: 130,
        height: 130
    },
    centeredView: {
        alignItems: "center"
    },
    rowOrganizedView: {
        flexDirection: "row",
        paddingVertical: 2
    },
    horizontalSeparator: {
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 1,
        marginVertical: 50
    },
    text: {
        color: "#000",
        fontSize: 20,
        fontWeight: "200",
        fontFamily: "Roboto-Light"
    },
    bolderText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "DroidSans-Bold"
    },
    inputStyle: {
        color: "#000"
    },
    loginButton: {
        fontFamily: "DroidSans-Bold",
        fontSize: 16,
    },
    loginButtonStyle: {
        paddingVertical: 25,
        backgroundColor: "#d73f8c"
    },
    loginButtonView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    mainView: {
        paddingHorizontal: 30
    }
});

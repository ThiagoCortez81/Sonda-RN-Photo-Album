import * as React from 'react';
import { View, FlatList, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Api } from '../../services/api';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export function MoreScreen(navigation) {
    return <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
        <View style={styles.defaultPadding}>
            <Text style={styles.morePageHeaderTextView}>Teste Técnico CTIS</Text>
            <Text style={styles.morePageHeaderTextView}>Versão 1.0.2 (Número da build 10)</Text>
        </View>
        {
            listItems.map((l, i) => (
                <ListItem
                    key={i}
                    leftIcon={l.icon}
                    title={l.textComponent}
                    onTouchEnd={() => navigation.navigate(l.onTapRoute)}
                    topDivider
                    bottomDivider
                >
                </ListItem>
            ))
        }
    </View>
}

const styles = StyleSheet.create({
    listItemTextView: {
        color: "#000",
        fontSize: 20,
        fontWeight: "200",
        fontFamily: "Roboto-Light",
    },
    scene: {
        flex: 1,
    },
    defaultPadding: {
        padding: 20
    },
    morePageHeaderTextView: {
        color: "#000",
        fontSize: 16,
        fontWeight: "200",
        fontFamily: "Roboto-Light"
    },
});

const listItems = [
    {
        icon: <FontAwesomeIcon icon={faSignOutAlt} size={40} />,
        textComponent: <Text style={styles.listItemTextView}>Sair</Text>,
        onTapRoute: "login"
    },
];
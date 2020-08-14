import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import { SceneRendererProps, NavigationState } from 'react-native-tab-view/lib/typescript/src/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRss, faCamera, faEllipsisH, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { ImageFeed } from '../image-feed/image-feed';
import { MoreScreen } from '../more-screen/more-screen';

const PhotoTabHandler = () => {
    return null;
}

const initialLayout = { width: Dimensions.get('window').width };

export class MainScreen extends React.Component {
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    state = {
        index: 0
    }
    setIndex = (tab) => {
        this.setState({ index: tab });
    }
    routes = [
        { key: 'imageFeed', title: 'Feed de imagens' },
        { key: 'openCamera', title: 'Tirar Foto' },
        { key: 'moreScreen', title: 'Mais...' },
    ];
    renderScene = SceneMap({
        imageFeed: ImageFeed,
        openCamera: PhotoTabHandler,
        moreScreen: () => MoreScreen(this.navigation),
    });

    renderIcon = ({ route, color }: { route: Route; color: string }) => {
        if (route.key == 'imageFeed')
            return <FontAwesomeIcon icon={faRss} color={color} size={40} />;
        if (route.key == 'openCamera')
            return <FontAwesomeIcon icon={faCamera} color={color} size={40} />;
        if (route.key == 'moreScreen')
            return <FontAwesomeIcon icon={faEllipsisH} color={color} size={40} />;
    }

    renderLabel = ({ route, focused, color }) => {
        return <Text style={{ color, ...styles.tabTextLabel }}>{route.title}</Text>
    }

    tabPress = (route, navigation) => {
        if (route.key == 'openCamera') {
            navigation.navigate('camera');
        }
    }

    private renderTabBar = (props: SceneRendererProps & {
        navigationState: NavigationState<{
            key: string;
            title: string;
        }>;
    }) => {
        return (
            <TabBar
                {...props}
                renderLabel={this.renderLabel}
                renderIcon={this.renderIcon}
                activeColor="#D73F8C"
                inactiveColor="rgba(215, 63, 140, 0.427450980392157)"
                style={styles.whiteBg}
                indicatorStyle={styles.whiteBg}
                jumpTo={(route) => { (route == 'openCamera') ? props.jumpTo('imageFeed') : props.jumpTo(route) }}
                onTabPress={({ route }) => this.tabPress(route, this.navigation)}
            />
        );
    };

    render() {
        const index = this.state.index;
        const routes = this.routes;
        const renderScene = this.renderScene;
        const setIndex = this.setIndex;

        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={this.renderTabBar}
                tabBarPosition="bottom"
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabTextLabel: {
        fontSize: 13
    },
    defaultPadding: {
        padding: 20
    },
    whiteBg: {
        backgroundColor: "#FFFFFF"
    }
});

type Route = {
    key: string;
    icon: string;
};
import React, { Component } from 'react';

import I18n from '../helpers/i18n';
import * as Components from './index';


import {

    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    StyleSheet,

} from 'react-native';


class Flags extends Component {

    state: Object;

    constructor(props: Object) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        let arg = {
            uri: require('../../assets/img/flags/arg.png')
        };

        return (
            <View></View>
        );
    }
}

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({


});

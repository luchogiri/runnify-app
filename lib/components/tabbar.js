
// @flow

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

class TabbarItem extends Component {

  props: { children: Object };

  render() {
    return this.props.children
  }
}


class Tabbar extends Component {


  constructor(props: Object) {
    super(props);

    this.state = {
      itemSelected: 0
    };
  }


  onTabSelected = (tab: number, callback: Function) => {
    return () => {
      if (this.state.itemSelected == tab) return;
      this.setState({ itemSelected: tab });
      if (callback) callback();
    };
  };

  static get Item() {
    return TabbarItem;
  }

  render() {
    return (
      <View style={styles.wrapper}>

        <View style={styles.content}>
          {this.props.children.map((item, idx) => {
            if (idx == this.state.itemSelected)
              return (
                <View
                  key={idx}
                  style={styles.tab_screen}>
                  {item.props.children}
                </View>
              );
          })}
        </View>

        <View style={styles.tabbar}>
          {this.props.children.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.tabbar_item}
              onPress={this.onTabSelected(idx, item.props.onPress)}>
              <Image
                source={this.state.itemSelected != idx ? item.props.icon : item.props.iconon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default Tabbar;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1
  },

    content: {
      flex: 1
    },

    tabbar: {
      height: 49,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#c1c1c1'
    },

      tabbar_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      },

    tab_screen: {
      flex: 1
    }

});

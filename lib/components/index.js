export { default as HeaderView } from './header';
export { default as Headersimple } from './headersimple';

export { default as Tabbar } from './tabbar';
export { default as EventRow } from './event-row';


// @flow
import React, { Component } from 'react';
const RN = require('react-native');

export const View = RN.View;
export const Touchable = RN.TouchableOpacity;
export const ScrollView = RN.ScrollView;
export const StyleSheet = RN.StyleSheet;
export const Platform = RN.Platform;

import Images from './images';
export const Image = (props) => {
  const { source, ...attrs } = props;
  const src = source instanceof Object? source: Images[source];
  return <RN.Image source={src} {...attrs} />;
};

export const Text = (props) => {
  let { children, style, ...attrs } = props;
  return <RN.Text style={[styles.default_text, style]} {...attrs}>{children}</RN.Text>;
};

export const Span = Text;
export const Link = RN.View;
export const History = {};

// common styles

const styles = RN.StyleSheet.create({
  default_text: {
    color: '#fff'
  }
});
// @flow

import React, { Component } from 'react';
import ENV from '../env';

export const View = (props) => {
  let { children, style, container, ...attrs } = props;
  if (style && style.length) style = style.join(' ');
  if (container) style = 'ctn ' + style;
  return <div className={'flex '+style} {...attrs}>{children}</div>;
};

export const ScrollView = (props) => {
  let { children, style, bounces, ...attrs } = props;
  return <View style={['scroll', style]} {...attrs}>{children}</View>;
};

export const Touchable = (props) => {
  let { children, style, onPress, ...attrs } = props;
  if (style && style.length) style = style.join(' ');
  return (<div className={'flex touchable '+style} {...attrs} onClick={onPress}>{children}</div>);
};

export const Text = (props) => {
  let { children, style, container, aria, ...attrs } = props;
  if (style && style.length) style = style.join(' ');
  switch (aria) {
    case 'span': return (<span className={style} {...attrs}>{children}</span>);
    default: return (<p className={style} {...attrs}>{children}</p>);
  }
};

export const Span = (props) => <Text {...props} aria="span" />;

export const Image = (props) => {
  let { source, style, ...attrs } = props;
  if (style && style.length) style = style.join(' ');
  if (source instanceof Object) source = source.uri;
  return (
    <img className={style} src={ENV.IMG_PATH + source} {...attrs} />
  );
};

import { css } from 'glamor';
export const StyleSheet = {
  create: style => {
    Object.keys(style).forEach(c => {
      Object.keys(style[c]).forEach(s => {
        if (s == 'lineHeight') style[c][s] = style[c][s]+'px';
      });
      style[c] = css(style[c])
    });
    return style;
  }
};

export const Platform = { OS: 'web' };

const RR = require('react-router');
export const Link = RR.Link;
export const History = RR.browserHistory;
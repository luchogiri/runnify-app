// @flow

import React, { Component } from 'react';
import { Text, Span, View, StyleSheet } from './index';


export default class TextInputComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { focus: false, focused: false }
  }

  focus = () => {
    this.refs.input.focus();
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false, focused: true });
  };

  validate = () => {
    this.setState({ focused: true });
  };

  render () {

    let { label, value, error, blurOnSubmit, returnKeyType, keyboardType, ...props } = this.props;

    let def_props = {
      ref: 'input',
      name: Math.random().toString(32).substr(2),
      type: 'text',
      autoCorrect: false,
      autoCapitalize: 'sentences', // none, words, characters
      onFocus: this.onFocus,
      onBlur: this.onBlur
    };

    let attrs = { ...def_props, ...props };

    return (
      <View
        style={[styles.input,
              (this.state.focus || value) && styles.input_focus,
              !value && this.state.focused && !this.state.focus && styles.input_error,
              error && this.state.focused && !this.state.focus && styles.input_error]}>
        <Text style={styles.label}>
          <Span>{label}</Span>&nbsp;&nbsp;
          {error && this.state.focused && !this.state.focus && <Span style={styles.input_error_text}>{error}</Span>}
        </Text>
        <input className={styles.text_input} {...attrs} />
      </View>
    );
  }
};


const styles = StyleSheet.create({

  input: {
    height: 48,
    marginTop: 20,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.25)'
  },
    input_focus: {
      borderBottomColor: '#ffffff'
    },
    input_error: {
      borderBottomColor: '#ff4433'
    },

  label: {
    height: 16,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)'
  },
    input_error_text: {
      color: 'rgba(255,68,51,0.8)',
      fontSize: 11
    },

  text_input: {
    height: 26,
    fontSize: 18,
    marginTop: 2,
    color: '#ffffff',
    border: 'none',
    background: 'transparent'
  }

});

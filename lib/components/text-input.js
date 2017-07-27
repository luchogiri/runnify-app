// @flow

import React, { Component } from 'react';

import { Text, TextInput, View, StyleSheet } from 'react-native';


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

    let { label, value, error, onChange, ...props } = this.props;

    let def_props = {
      ref: 'input',
      placeholderTextColor: '#ffffff88',
      underlineColorAndroid: 'transparent',
      blurOnSubmit: false,
      autoCorrect: false,
      returnKeyType: 'next', // done, go, next, search, send
      autoCapitalize: 'sentences', // none, words, characters
      keyboardType: 'default', // numeric, email-address, phone-pad
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChangeText: onChange
    };

    let attrs = { ...def_props, ...props };

    return (
      <View
        style={[styles.input,
              (this.state.focus || value) && styles.input_focus,
              !value && this.state.focused && !this.state.focus && styles.input_error,
              error && this.state.focused && !this.state.focus && styles.input_error]}>
        <Text style={styles.label}>
          <Text>{label}</Text>&nbsp;&nbsp;
          {error && this.state.focused && !this.state.focus && <Text style={styles.input_error_text}>{error}</Text>}
        </Text>
        <TextInput style={styles.text_input} {...attrs} />
      </View>
    );
  }
};


const styles = StyleSheet.create({

  input: {
    height: 48,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff4d'
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
    color: '#ffffffcc'
  },
    input_error_text: {
      color: '#ff4433b2',
      fontSize: 11
    },

  text_input: {
    height: 24,
    fontSize: 16,
    marginTop: 2,
    color: '#ffffff'
  }

});

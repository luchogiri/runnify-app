// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from '../../helpers/i18n';

import { View, Text, ScrollView, Touchable, StyleSheet, Platform, History } from '../../components';
import TextInput from "../../components/text-input";
import Select from "../../components/select";

import Header from "../common/header";

import Events from '../../services/events';


const InitialState = {

  name: '',
  start_date: '',
  organizer: I18n('Elija un organizador...'),
  location: '',
  category: I18n('Elija un tipo...'),
  link:'',

  error: false,
  msg: '',
  sent: false,
  typeSelect: false,
  orgSelect: false,
  organizerText: false
};


class Create extends Component {

  constructor(props) {
    super(props);
    this.state = { ...InitialState };
  }

  componentDidMount() {
    let autocomplete = new google.maps.places.Autocomplete( document.getElementById('google-ac') );
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(', ');
      }
      this.setState({ location: address });
    });
  }

  back = () => {
    Platform.OS === 'web' ? History.push('/profile') : this.props.navigator.pop();
  };

  handleInput = (field) => {
    return (ev) => {
      const value = ev.target.value;

      if (field === 'organizer' && value === 'other')
        return this.setState({ organizer: '', organizerText: true });

      if (field === 'organizer' && this.state.organizer.length === 1 && value === '')
        return this.setState({ [field] : value, organizerText: false, organizer: I18n('Elija un organizador') });

      this.setState({ [field] : value });
    };
  };

  handleForm = () => {
    this.setState({ error: false });
    if (!this.state.name ||
        !this.state.link || !this.state.location ||
        this.state.category === I18n('Elija un tipo') ||
        this.state.organizer === I18n('Elija un organizador'))
      return this.setState({ error: true, msg: I18n('Revise los campos e intente nuevamente.') });
    this.state.start_date = this.state.start_date.split('/').reverse().join('-')+'T00:00:00.000';
    let { error, sent, typeSelect, orgSelect, organizerText, ...data } = this.state;
    Events.Create(data, this.props.account.token);
    this.setState({ sent: true });
  };


  render() {
    return (
      <View style={styles.wrapper}>
        <Header back={this.back} />

        <ScrollView>
          <View style={styles.form}>

            {this.state.sent &&
            <Text style={styles.title}>{I18n('¡Gracias!')}</Text>}

            {!this.state.sent &&
            <Text style={styles.title}>{I18n('¿No encontras la carrera que buscabas?')}</Text>}
            {!this.state.sent &&
            <Text style={[styles.title, styles.subtitle]}>{I18n('Sugerinos alguna carrera que nos falte o que estés organizando para poder incluirla!')}</Text>}
            {!!this.state.error &&
            <Text style={styles.msg_error}>{this.state.msg}</Text>}


            {!this.state.sent &&
            <TextInput ref="name"
                       name="name"
                       label={I18n("Nombre de la carrera")}
                       placeholder={I18n("Ej. Maraton Buenos Aires")}
                       value={this.state.name}
                       onChange={this.handleInput("name")} />}

            {!this.state.sent &&
            <Select ref="category"
                    name="category"
                    label={I18n("Tipo de carrera")}
                    placeholder={I18n("Elija un tipo...")}
                    value={this.state.category}
                    onChange={this.handleInput("category")}>
              {this.props.config.categories.map(c => ({ name: I18n(c.name), value: c.name }))}
            </Select>}

            {!this.state.sent && !this.state.organizerText &&
            <Select ref="organizer"
                    name="organizer"
                    label={I18n("Organizador")}
                    placeholder={I18n("Elija un organizador...")}
                    value={this.state.organizer}
                    onChange={this.handleInput("organizer")}>
              {[ ...this.props.config.organizers.map(o => ({ name: o.name, value: o.name, key: o._id }) ),{name: I18n('Otro'), value: 'other'}]}
            </Select>}

            {!this.state.sent && this.state.organizerText &&
            <TextInput ref="organizer_text"
                       name="organizer_text"
                       label={I18n("Organizador")}
                       placeholder={I18n("Ej. Maratones BA")}
                       value={this.state.organizer}
                       onChange={this.handleInput("organizer")} />}

            {!this.state.sent &&
            <TextInput ref="start_date"
                       name="start_date"
                       label={I18n("Fecha de la carrera")}
                       placeholder={I18n("En formato día/mes/año")}
                       value={this.state.start_date}
                       onChange={this.handleInput("start_date")} />}

            {!this.state.sent &&
            <TextInput id="google-ac"
                       ref="location"
                       name="location"
                       value={this.state.location}
                       label={I18n("Lugar de la carrera")}
                       placeholder={I18n("Ej. Palermo, Capital Federal, Argentina.")} />}

            {!this.state.sent &&
            <TextInput ref="link"
                       name="link"
                       label={I18n("Página web para anotarse a la carrera")}
                       placeholder={I18n("Ej. www.proximacarrera.com")}
                       value={this.state.link}
                       onChange={this.handleInput("link")} />}


            {!this.state.sent &&
            <Touchable style={styles.btn} onPress={this.handleForm}>
              <Text style={styles.btn_text}>{I18n('Enviar')}</Text>
            </Touchable>}

            {this.state.sent && <View>
              <Text style={{fontSize:14, marginVertical: 16, color: '#ffffff', marginHorizontal: 24, textAlign: 'center'}}>
                {I18n('Verificaremos los datos ingresados y te notificaremos en el caso de que la carrera sea publicada.')}
              </Text>
            </View>}

            {this.state.sent &&
            <Touchable style={styles.btn} onPress={() => this.setState({ ...InitialState })}>
              <Text style={styles.btn_text}>{I18n('Crear otra')}</Text>
            </Touchable>}

          </View>
        </ScrollView>
      </View>
    );
  }
}

const Container = connect(store => store)( Create );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#510c80',
    [Platform.OS === 'web' ? 'boxShadow' : 'flex']: Platform.OS === 'web' ? '#111 0 6px 15px' : 1
  },

  title: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 19,
    color: '#fff',
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 14
  },

  msg_error: {
    color:'#fff',
    backgroundColor: 'rgba(255,0,0,0.25)',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    padding: 10
  },

  form: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 32
  },

  btn: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 32,
    marginRight: 32,
    backgroundColor: '#ffffff',
    borderRadius: 4
  },

  btn_text: {
      textAlign: 'center',
      color: '#532880',
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      flex: 1
    }


});

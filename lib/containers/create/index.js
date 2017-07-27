
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ENV from '../../env';


import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Modal, Image, Platform, TouchableOpacity, Dimensions, StyleSheet, Switch } from 'react-native';

import I18n from '../../helpers/i18n';

import Events from '../../services/events';
const {width} = Dimensions.get('window');
const initial = {
  name: '', start_date: '', organizer: I18n('Elija un organizador'), location: I18n('Lugar de la carrera'), category: I18n('Elija un tipo'), link:'',
  error: false, msg: '', sent: false, typeSelect: false, orgSelect: false, locSelect: false, organizerText: false, organizers: {} };

class Create extends Component {

  state: Object;

  constructor(props) {
    super(props);
    this.state = { ...initial };
  }

  componentDidMount() {
    let organizers = {};
    this.props.config.organizers.forEach(o => {
      organizers[o.country] = organizers[o.country] || { name: o.country, items: [] };
      organizers[o.country].items.push(o);
    });
    this.setState({ organizers });
  }

  handleNext = (next) => {
    return () => {
      this.refs[next].focus();
    };
  };

  handleInput = (field) => {
    return (value) => {
      if (field === 'organizer' && this.state.organizer.length === 1 && value === '')
        return this.setState({ [field] : value, organizerText: false, organizer: I18n('Elija un organizador') });
      this.setState({ [field] : value });
    };
  };

  handleForm = () => {
    this.setState({ error: false });
    if ( !this.state.name ||
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
        <Image style={styles.imgBackground} source={require('../../../assets/img/main-bg.jpg')}>

          <ScrollView>
            <KeyboardAvoidingView behavior='position' style={styles.form}>

              <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
                  <Image source={require('../../../assets/img/icon-header-back.png')} style={styles.back_img} />
                </TouchableOpacity>
              </View>

              {this.state.sent &&
                <Text style={{fontSize:24, marginBottom: 19, color: '#fff', marginHorizontal: 24, textAlign: 'center'}}>{I18n('¡Gracias!')}</Text>}
              {!this.state.sent &&
                <Text style={{fontSize:24, marginBottom: 19, color: '#fff', marginHorizontal: 24, textAlign: 'center'}}>{I18n('¿No encontras la carrera que buscabas?')}</Text>}
              {!this.state.sent &&
                <Text style={{fontSize:14, marginBottom: 16, color: '#fff', marginHorizontal: 24, textAlign: 'center'}}>{I18n('Sugerinos alguna carrera que nos falte o que estés organizando para poder incluirla!')}</Text>}
              {!!this.state.error && <Text style={styles.msjerrores}>{this.state.msg}</Text>}

              {!this.state.sent &&
              <View style={styles.item}>
                <TextInput
                   style={styles.form__input}
                   placeholder={I18n('Nombre de la carrera')}
                   returnKeyType='next'
                   placeholderTextColor='#ffffffa5'
                   underlineColorAndroid='transparent'
                   onChangeText={this.handleInput('name')}
                   value={this.state.name}
                   blurOnSubmit={true}
                   onSubmitEditing={() => { this.setState({ typeSelect:true }) }}
                 />
              </View>}

              {!this.state.sent &&
              <View style={styles.item}>
                <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => { this.setState({ typeSelect: true}) }}>
                  <Text style={[styles.form__input, {height: 30, marginTop:24}]}>{I18n(this.state.category)}</Text>
                </TouchableOpacity>
              </View>}

              {!this.state.sent && !this.state.organizerText &&
              <View style={styles.item}>
                <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => { this.setState({ orgSelect: true}) }}>
                  <Text style={[styles.form__input, {height: 30, marginTop:24}]}>{I18n(this.state.organizer)}</Text>
                </TouchableOpacity>
              </View>}

              {!this.state.sent && this.state.organizerText &&
              <View style={styles.item}>
                <TextInput
                  ref='organizer_text'
                  style={styles.form__input}
                  placeholder={I18n('Nombre del organizador')}
                  returnKeyType='next'
                  placeholderTextColor='#ffffffa5'
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  onChangeText={this.handleInput('organizer')}
                  value={this.state.organizer}
                  blurOnSubmit={false}
                />
              </View>}

              {!this.state.sent && <DatePicker
                style={[styles.item, {height: 40, marginTop: 16, marginHorizontal: 40, width: width-80 }]}
                date={this.state.start_date}
                mode="date"
                placeholder={I18n('Fecha de la carrera')}
                format='DD/MM/YYYY'
                minDate={moment().utc().format('DD/MM/YYYY')}
                confirmBtnText={I18n('Confirmar')}
                cancelBtnText={I18n('Cancelar')}
                onDateChange={start_date => this.setState({ start_date })}
                customStyles={{
                  dateText: { color: '#fafafa', textAlign: 'left'},
                  dateInput: { borderWidth: 0, alignItems: 'flex-start', margin: 0},
                  dateIcon: { opacity: 0}
                }} />}

              {!this.state.sent &&
              <View style={styles.item}>
                <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => { this.setState({ locSelect: true}) }}>
                  <Text style={[styles.form__input, {height: 30, marginTop:24}]}>{this.state.location}</Text>
                </TouchableOpacity>
              </View>}

              {!this.state.sent &&
              <View style={styles.item}>
                <TextInput
                   ref='link'
                   style={styles.form__input}
                   placeholder={I18n('Página web para anotarse a la carrera')}
                   returnKeyType='done'
                   value={this.state.link}
                   placeholderTextColor='#ffffffa5'
                   underlineColorAndroid='transparent'
                   onChangeText={this.handleInput('link')}
                   onSubmitEditing={this.handleLogin}
                 />
              </View>}

              {!this.state.sent &&
              <TouchableOpacity style={styles.btn} onPress={this.handleForm}>
                <Text style={styles.btnLogin}>{I18n('Enviar')}</Text>
              </TouchableOpacity>}

              {this.state.sent && <View>
                <Text style={{fontSize:14, marginVertical: 16, color: '#ffffff', marginHorizontal: 24, textAlign: 'center'}}>{I18n('Verificaremos los datos ingresados y te notificaremos en el caso de que la carrera sea publicada.')}</Text>
              </View>}

              {this.state.sent &&
              <TouchableOpacity style={styles.btn} onPress={() => this.setState({ ...initial })}>
                <Text style={styles.btnLogin}>{I18n('Crear otra')}</Text>
              </TouchableOpacity>}

            </KeyboardAvoidingView>
          </ScrollView>


          <Modal animationType={"slide"} transparent={true} visible={this.state.typeSelect}>
            <TouchableOpacity style={styles.modalCtn} onPress={() => this.setState({ typeSelect: false })}>
              <View style={styles.modal}>
                {this.props.config.categories.map(c => (
                  <TouchableOpacity style={styles.option} key={c.name} onPress={() => { this.setState({ typeSelect: false, category: c.name } ) }}>
                    <Text>{I18n(c.name)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal animationType={"slide"} transparent={true} visible={this.state.orgSelect}>
            <TouchableOpacity style={styles.modalCtn} onPress={() => this.setState({ orgSelect: false })}>
              <View style={styles.modal}>
                <ScrollView>
                {Object.keys( this.state.organizers ).map(c => (
                  <View key={this.state.organizers[c].name}>
                    <Text style={styles.country}>{this.state.organizers[c].name}</Text>
                    {this.state.organizers[c].items.map(o =>
                      <TouchableOpacity style={styles.option} key={o._id} onPress={() => this.setState({orgSelect: false, organizer: o.name})}>
                        <Text>{I18n(o.name)}</Text>
                      </TouchableOpacity>
                    )}
                  </View>))}
                  <TouchableOpacity style={styles.option} key={'other'} onPress={() => { this.setState({ orgSelect: false, organizer: '', organizerText: true }, this.handleNext('organizer_text')); }}>
                    <Text>{I18n('Otro...')}</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal animationType={"slide"} transparent={true} visible={this.state.locSelect}>
            <TouchableOpacity style={styles.modalCtn} onPress={() => this.setState({ locSelect: false })}>
              <View style={[styles.modal,{ height: 500 }]}>
                <GooglePlacesAutocomplete
                  placeholder={I18n('Ingrese el lugar de la carrera...')}
                  minLength={3}
                  autoFocus={true}
                  returnKeyType={'default'}
                  currentLocation={false}
                  styles={{
                    textInputContainer: {
                      backgroundColor: 'rgba(0,0,0,0)',
                      borderTopWidth: 0,
                      borderBottomWidth:0
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 16
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    },
                  }}
                  onPress={data => {
                    let city = '', state = '', country = '';
                    if (data.terms) {
                      city = data.terms[0] && data.terms[0].value || '';
                      state = data.terms[data.terms.length > 3 ? 2:1] &&
                              data.terms[data.terms.length > 3 ? 2:1].value || '';
                      country = data.terms[data.terms.length-1] &&
                                data.terms[data.terms.length-1].value || '';
                    }
                    this.setState({ locSelect: false, country, state: state.replace(' Province',''), city, location: `${city}, ${state}, ${country}` });
                  }}
                  query={{
                    key: ENV.PLACES_SERVICE,
                    language: 'es'
                  }} />
              </View>
            </TouchableOpacity>
          </Modal>

        </Image>
      </View>
    );
  }
}

const Container = connect(store => ({ account:store.account, config: store.config }) )( Create );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },

  header: {
    height: Platform.OS == 'android' ? 74 : 70,
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  back: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back_img: {
    height: 24,
    width: 24
  },

    imgBackground:{
      paddingTop: Platform.OS == 'android' ? 24 : 20,
      resizeMode: 'cover',
      width: null,
      flex: 1
    },

    msjerrores: {
      color:'#ffffff',
      backgroundColor:'#ff000060',
      marginHorizontal: 30,
      borderRadius:10,
      padding:10
    },

    item:{
      height:54,
      borderBottomWidth:1,
      borderBottomColor:'#ffffff44',
      marginHorizontal: 40
    },
      form__input: {
        height:40,
        marginTop: 16,
        fontSize:16,
        color:'#ffffff'
      },

  txtblanco:{color:'#ffffff',fontSize:16},

  hr:{borderBottomWidth:1, borderBottomColor:'#e1e1e1', height: 24, marginHorizontal: 15 },

  form:{
    marginTop: 0
  },
    rowBtns:{flexDirection:"row",marginTop:24},
    btn1:{flex:1,marginLeft:30},
    btn2:{flex:1},
    itemFacebook:{width:140,height:54,borderRadius:5,borderWidth:2,borderColor:'#cccccc',textAlign:'center'},
        textFacebook:{color:'#ffffff',textAlign:'center',marginTop:12,fontSize:16},
    itemCreateAcount:{width:140,height:32,borderRadius:5,borderWidth:2,borderColor:'#cccccc',marginTop:1},
        textCreateAcount:{ color:'#ffffff',textAlign:'center',marginTop:4,fontSize:16},


    forgot:{
      marginTop: 40
    },
      txtForgot:{
        fontSize:16,color:'#ffffff', textAlign:'center'
      },

    btn:{flexDirection: 'row',marginTop:20},
    btnCustom:{flexDirection: 'row',marginTop:5},
      btnLogin:{textAlign:'center',backgroundColor:'#ffffff',borderRadius:10,color:'#532880',fontSize:16,paddingTop:10,paddingBottom:10,flex:1,marginLeft:30,marginRight:30},
      btnLoginCustom:{textAlign:'center',borderRadius:10,color:'#532880',fontSize:16,paddingTop:5,paddingBottom:10,flex:1,marginLeft:0,marginRight:30},


  modalCtn: {
    flex: 1,
    backgroundColor: '#00000033',
    justifyContent: 'flex-end'
  },
  modal: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 32,
    maxHeight: 500
  },


  option: {
    height: 48,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#cccccc',
    borderTopColor: '#f9f9f9',
  },

  country: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600'
  }

});

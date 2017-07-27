// @flow

import React, { Component } from 'react';

import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';

import I18n from '../helpers/i18n';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  onSearch = () => {

  };

  render() {
    return (

      <View style={styles.wrapper}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
            <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
          </TouchableOpacity>

          <View style={styles.search}>
            <TextInput
              style={styles.search_input}
              placeholder={I18n('Buscar...')}
              returnKeyType='done'
              placeholderTextColor='#9f9fa6'
              underlineColorAndroid='transparent'
              onChangeText={query => this.setState({ query })}
              value={this.state.query}
              blurOnSubmit={false}
              onSubmitEditing={this.props.navigator.screen('Results', { query: this.state.query })}
            />
            <TouchableOpacity style={styles.search_btn} onPress={this.props.navigator.screen('Results', { query: this.state.query })} >
              <Image style={styles.search_btn_img} source={require('../../assets/img/icon-header-search-a.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.wrapper}>
          <ScrollView>
            <TouchableOpacity style={styles.list} onPress={this.props.navigator.screen('Results', { distance: '42-200' })}>
              <Text style={styles.titulo1}>SUPERHERO</Text>
              <Text style={styles.distancia1}>+42k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={this.props.navigator.screen('Results', { distance: '21-41.99' })}>
              <Text style={styles.titulo2}>ATHLETE</Text>
              <Text style={styles.distancia2}>21-42k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={this.props.navigator.screen('Results', { distance: '10-20.99' })}>
              <Text style={styles.titulo3}>SPORTY</Text>
              <Text style={styles.distancia3}>10-21k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.list} onPress={this.props.navigator.screen('Results', { distance: '0-9.99' })}>
              <Text style={styles.titulo4}>ENJOYER</Text>
              <Text style={styles.distancia4}>-10k</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#f1f7f7'
  },

    header: {
      backgroundColor:'#510c80',
      height: Platform.OS == 'android' ? 78 : 74,
      paddingTop: Platform.OS == 'android' ? 24 : 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
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

      search: {
        flex:1,
        height: 38,
        borderRadius: 19,
        marginHorizontal: 16,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'#ffffff',
      },
        search_input:{
          flex: 1,
          paddingLeft: 16
        },
          search_btn: {
            paddingTop: 1,
            width: 32,
            height: 32,
            marginRight: 8,
            alignItems: 'center',
            justifyContent: 'center'
          },
            search_btn_img: {
              height: 20,
              width: 20
            },


  row: {
    marginHorizontal: 16,
    borderBottomColor: '#9b9b9b9b',
    borderBottomWidth: 1
  },
    row_disabled: {
      opacity: 0.5
    },

    row_label: {
      flex: 1,
      paddingVertical: 16,
      justifyContent: 'center'
    },
      row_label_text: {
        color: '#ffffff',
        fontSize: 16
      },

  list:{backgroundColor:'#ffffff',flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#cccccc',height:56,justifyContent:'flex-end',alignItems:'center'},
  titulo:{flex:1,paddingLeft:20},
    titulo1:{fontFamily:'Devinyl-Regular',textAlign:'left',fontSize:20,color:'#1a1c1f',flex:1,paddingLeft:20},
    titulo2:{fontFamily:'Devinyl-Stencil',textAlign:'left',fontSize:20,color:'#ccff22',flex:1,paddingLeft:20},
    titulo3:{fontFamily:'Devinyl-Inline',textAlign:'left',fontSize:20,color:'#fc4320',flex:1,paddingLeft:20},
    titulo4:{fontFamily:'Devinyl-Incise',textAlign:'left',fontSize:20,color:'#21e4d5',flex:1,paddingLeft:20},
    distancia1:{width:60,fontFamily:'Devinyl-Regular',fontSize:20,color:'#1a1c1f'},
    distancia2:{width:60,fontFamily:'Devinyl-Stencil',fontSize:20,color:'#ccff22'},
    distancia3:{width:60,fontFamily:'Devinyl-Inline',fontSize:20,color:'#fc4320'},
    distancia4:{width:60,fontFamily:'Devinyl-Incise',fontSize:20,color:'#21e4d5'},

});

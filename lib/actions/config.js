// @flow

import ConfigService from '../services/config';


export const ConfigActions = {

 SAVE: 'app/config/save',
 CLEAR: 'app/config/clear',
 UPDATE: 'app/config/update',
 SHOW_COUNTRIES: 'app/config/show_countries',
 SHOW_COUNTRY: 'app/config/show_country',
 UPDATE_COUNTRY: 'app/config/update_country',
 SHOW_PROVINCES: 'app/config/show_provinces',
 SHOW_PROV: 'app/config/show_prov',
 UPDATE_PROV: 'app/config/update_prov',
 SHOW_CATEGORIES: 'app/config/show_categories',
 SHOW_CAT: 'app/config/show_cat',
 UPDATE_CAT: 'app/config/update_cat',
 SHOW_DISTANCES: 'app/config/show_distances',
 SHOW_DIS: 'app/config/show_dis',
 UPDATE_DIS: 'app/config/update_dis',
 RESTABLECER: 'app/config/restablecer',
 ADD_PAIS_TODOS: 'app/config/add_pais_todos',
 ADD_PROV_TODOS: 'app/config/add_prov_todos'
};

const Config = {

  Retrieve: () => {
    return async(dispatch) => {
      let data = await ConfigService.Retrieve();
      dispatch( Config.Save( data ) );
    }
  },

  AddPaisTodos: ( data:Object ) => {
    return {
      type: ConfigActions.ADD_PAIS_TODOS, data
    }
  },

  AddProvTodos: ( data:Object ) => {
    return {
      type: ConfigActions.ADD_PROV_TODOS, data
    }
  },

  Save: ( data ) => {
    return { type: ConfigActions.SAVE, data: data };
  },

  Update: ( data ) => {
    return { type: ConfigActions.UPDATE, data: data };
  },

  Clear: () => {
    return { type: ConfigActions.CLEAR };
  },

  GetDistances: () => {
    let distances = [{name:'#superhero',dis:'42-200'}, {name:'#athlete',dis:'21-41.99'}, {name:'#sporty',dis:'10-20.99'}, {name:'#enjoyer',dis:'0-9.99'}];
    return { type: ConfigActions.SHOW_DISTANCES, distances: distances };
  },

  ShowDis: () => {
    let dis = '';
    return { type: ConfigActions.SHOW_DIS, dis: dis };
  },

  UpdateDis: (dis: String) => (
    {
      type: ConfigActions.UPDATE_DIS,
      dis: dis
    }
  ),


  ShowCountryDef: () => {
    let country = 'Elegir Pais';
    return { type: ConfigActions.UPDATE_COUNTRY, country: country };
  },
  ShowProvDef: () => {
    let prov = 'Elegir Provincia';
    return { type: ConfigActions.UPDATE_PROV, prov: prov };
  },
  ShowCatDef: () => {
    let cat = 'Elegir Categoria';
    return { type: ConfigActions.UPDATE_CAT, cat: cat };
  },
  ShowDisDef: () => {
    let dis = 'Elegir Distancia';
    return { type: ConfigActions.UPDATE_DIS, dis: dis };
  },

};

export default Config;

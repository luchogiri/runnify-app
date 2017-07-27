
import { ConfigActions } from '../actions/config';

const categories = [{ name: 'road_running' }, { name: 'trial' }, { name: 'adventure' }, { name: 'duathlon' }, { name: 'triathlon' }, { name: 'obstacles' }, { name: 'cycling' }];


const Config = (

  state = {
    country: null,
    countries: [],
    prov: null,
    provinces: [],
    cat: null,
    categories: [],
    dis: null,
    distances: [],
    show_nearme: true,
    show_onboarding: true,
    show_login: false
  },

  action

) => {

  switch (action.type) {

    case ConfigActions.SAVE:
      return { ...state, ...action.data, categories };

    case ConfigActions.CLEAR:
      return { ...Config.InitialState };

    case ConfigActions.UPDATE:
      return { ...state, ...action.data };

    case ConfigActions.ADD_PAIS_TODOS:
      return { ...state, countries: [ ...state.countries, action.data ] }

    case ConfigActions.ADD_PROV_TODOS:
      return { ...state, states: [ ...state.states, action.data ] }

    case ConfigActions.SHOW_COUNTRIES:
      return { ...state, countries: action.countries };

    case ConfigActions.SHOW_COUNTRY:
      return { ...state, country: state.country || action.country };

    case ConfigActions.UPDATE_COUNTRY:
      return { ...state, country: action.country };

    case ConfigActions.SHOW_PROVINCES:
      return { ...state, provinces:action.provinces };

    case ConfigActions.SHOW_PROV:
      return { ...state, prov:action.prov || action.prov };

    case ConfigActions.UPDATE_PROV:
      return { ...state, prov: action.prov };

    case ConfigActions.SHOW_CATEGORIES:
      return { ...state, categories:action.categories };

    case ConfigActions.SHOW_CAT:
      return { ...state, cat:action.cat || action.cat };

    case ConfigActions.UPDATE_CAT:
      return { ...state, cat: action.cat };

      case ConfigActions.SHOW_DISTANCES:
        return { ...state, distances:action.distances };

      case ConfigActions.SHOW_DIS:
        return { ...state, dis:action.dis || action.dis };

      case ConfigActions.UPDATE_DIS:
        return { ...state, dis: action.dis };


    default:
      return state;
  }

}

export default Config;

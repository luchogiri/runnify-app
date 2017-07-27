
import { EventsActions } from '../actions/events';
const u = undefined;

const Events = (

  state = {
    items: [],
    limit: 20,
    loading: false,
    show_nearme: true,
    offset: 0,
    search: u,
    query: {
      country: u,
      state: u,
      city: u,
      category: u,
      distance: u,
      date_from: u,
      date_to: u,
      lat_lng: u
    }
  },

  action

) => {

  switch (action.type) {

    case EventsActions.RENDER_EVENTS:
      return { ...state, ...action.data };

    case EventsActions.APPEND_EVENTS:
      let { items, ...props } = action.data;
      return { ...state, ...props, items: [...state.items, ...items] };

    case EventsActions.LOADING:
      return { ...state, loading: action.data };

    case EventsActions.UPDATE_FILTERS:
      return { ...state, ...action.data };

    case EventsActions.CLEAR_FILTERS:
      return { ...state, show_nearme: true, search: u, offset: 0, limit: 20, query: {} };

    default:
      return state;
  }

}

export default Events;

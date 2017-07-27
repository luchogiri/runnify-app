// @flow

import EventsService from '../services/events';

export const EventsActions = {

  LOADING: 'app/events/loading',
  RENDER_EVENTS: 'app/events/render',
  APPEND_EVENTS: 'app/events/append',
  UPDATE_FILTERS: 'app/events/update_filters',
  CLEAR_FILTERS: 'app/events/clear_filters'

};

const Events = {

  Retrieve: (filters:Object, append:Boolean = false) => {
    return async dispatch => {
      dispatch( Events.Loading() );
      let data = await EventsService.Retrieve( filters );
      dispatch( Events[ append ? 'Append': 'Render'](data) );
      dispatch( Events.Loading(false) );
    };
  },

  Get: (filters:Object) => {
    return async () => {
      return await EventsService.Retrieve( filters );
    };
  },

  Loading: ( data = true ) => ({ type: EventsActions.LOADING, data }),

  Render: ( data ) => ({ type: EventsActions.RENDER_EVENTS, data }),

  Append: ( data ) => ({ type: EventsActions.APPEND_EVENTS, data }),

  UpdateFilters: ( data ) => ({ type: EventsActions.UPDATE_FILTERS, data }),

  ClearFilters: () => ({ type: EventsActions.CLEAR_FILTERS }),

  // RetrieveById:(id:Object) => {
  //   return async dispatch => {
  //     dispatch(Events.loading(true));
  //     let data = await EventsService.RetrieveById(id);
  //     dispatch(Events.showevents(data));
  //     dispatch(Events.loading(false));
  //   };
  // },



  // GeteventsearchState: (filters:Object) => {
  //   return async() => {
  //     //dispatch(Events.loading(true));
  //     return await EventsService.Retrieve(filters);
  //     //dispatch(Events.showevents(data));
  //     //dispatch(Events.loading(false));
  //   }
  // },

  // Getevents2: (queryterm:Object) => {
  //   return async dispatch => {
  //       dispatch(Events.loading(true));
  //       let data = await EventsService.RetrieveSearch(queryterm);
  //       dispatch(Events.showevents(data));
  //       dispatch(Events.loading(false));
  //   };
  // },

  // ShowData: () => {
  //     let data = true;
  //     return { type: EventsActions.SHOW_DATA, testing: data };
  // },



  // likeRace: () => {
  //     return async dispatch => {
  //         dispatch(Events.loading(true));
  //
  //         let data = await EventsService.saveRace();
  //
  //         dispatch(Events.loading(false));
  //     };
  // },

};

export default Events;

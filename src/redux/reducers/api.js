import { FEACT_API } from '../actions/actionsTypes';

const INITIAL_STATE = {};

const fetchApi = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FEACT_API:
    return {
      response: payload,
    };
  default:
    return state;
  }
};
export default fetchApi;

import { FEACT_API } from './actionsTypes';

export const fetchApi = (maels) => ({
  type: FEACT_API,
  payload: maels,
});

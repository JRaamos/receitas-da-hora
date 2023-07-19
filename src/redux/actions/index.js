import { FEACT_API, GRAVATAR } from './actionsTypes';

export const fetchApi = (maels) => ({
  type: FEACT_API,
  payload: maels,
});

export const handleGravatarEmail = (email) => ({
  type: GRAVATAR,
  payload: email,
});

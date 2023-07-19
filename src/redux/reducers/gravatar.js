import { GRAVATAR } from '../actions/actionsTypes';

const INITIAL_STATE = {
  gravatar: '',
};

const gravatarProfile = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GRAVATAR:
    return {
      gravatar: payload,
    };
  default:
    return state;
  }
};
export default gravatarProfile;

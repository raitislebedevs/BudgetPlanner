import { SET_LOADER, SET_REFRESH } from "../actionTypes";

const initialState = {
  isLoading: true,
  refreshing: false,
};

const loader = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return { isLoading: action.value };
    case SET_REFRESH:
      return { refreshing: action.value };
  }
  return state;
};

export default loader;

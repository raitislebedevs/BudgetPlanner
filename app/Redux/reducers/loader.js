import { SET_LOADER } from "../actionTypes";

const initialState = {
  isLoading: true,
};

const loader = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return { isLoading: action.value };
  }
  return state;
};

export default loader;

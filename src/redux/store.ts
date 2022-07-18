import { configureStore } from "@reduxjs/toolkit";
import { ApiResponse } from "../interfaces/api";

export interface IinitialProps {
  currentWeather?: ApiResponse;
  favoriteWeather: ApiResponse[];
  currentForecast: any;
  loading: boolean;
  data?: ApiResponse;
}

const initialState: IinitialProps = {
  currentWeather: undefined,
  favoriteWeather: [],
  currentForecast: [],
  loading: true,
  data: undefined,
};

interface stateStore {
  type: string;
}

const changeState = (state = initialState, { type, ...rest }: stateStore) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = configureStore({ reducer: changeState });
export default store;

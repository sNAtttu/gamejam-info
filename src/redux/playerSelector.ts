import { RootState } from "./store";

export const getPlayersSelector = (state: RootState) => state.players?.players ?? [];

export const getPlayersLoadingSelector = (state: RootState) => state.players.loading;
export const getWheelSpin = (state: RootState) => state.players.spin;


import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getPlayers = async (playerRequest: PlayerRequest) => {
    const response = await fetch(`https://rersj2nm9a.execute-api.eu-west-1.amazonaws.com/prod/challenges/${playerRequest.challengeId}/players`, {

    })
    return (await response.json()) as PlayerResponse[]
}

export const toggleSpin = createAction<boolean>("player/toggleSpin");

export const fetchPlayers = createAsyncThunk<
    // Return type of the payload creator
    PlayerResponse[],
    // First argument to the payload creator
    PlayerRequest,
    { rejectValue: { error: string } }
>('player/fetchByChallengeId', async (playerRequest: PlayerRequest, { rejectWithValue }) => {
    try {
        return getPlayers(playerRequest);
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

const initialState: PlayerSliceData = {
    error: undefined,
    players: undefined,
    loading: "idle",
    spin: false,
    stop: false,
}



const playerSlice = createSlice({
    name: 'player',
    initialState,
    // reducers actions
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.fulfilled, (state, action) => {

                state.loading = "idle";
                state.players = [...action.payload];
            });
        builder.addCase(fetchPlayers.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "idle";
        });
        builder.addCase(fetchPlayers.pending, (state) => {
            delete state.error;
            state.loading = "pending";
        });

        builder.addCase(toggleSpin, (state, action) => {
            state.spin = action.payload;
        });

    },
})
export default playerSlice.reducer
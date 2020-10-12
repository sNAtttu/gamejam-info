declare interface PlayerResponse {
    id: number,
    challengeId: number,
    name: string,
    avatar: string,
    points: 0,
    error?: string,
}

declare interface PlayerRequest {
    challengeId: number,
}

declare interface PlayerSliceData {
    players?: PlayerResponse[],
    error?: string,
    loading: string,
    spin: boolean,
    stop: boolean,
}

declare interface Player {
    id: number,
    challengeId: number,
    name: string,
    avatar: string,
    points: 0,
}
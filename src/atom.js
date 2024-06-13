import { atom } from "recoil";

export const userPlaylistsState = atom({
  key: "userPlaylistsState",
  default: [],
});

export const playlistState = atom({
  key: "playlistState",
  default: [],
});

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    user: null,
    loading: true,
  },
});

export const playerState = atom({
  key: "playerState",
  default: {
    ytId: "",
    isPlaying: false,
    isPaused: false,
    duration: 0,
    currentTime: "",
    isLoading: false,
    isMuted: false,
    volume: 50,
    isEnd: false,
    timestamp: Date.now(),
  },
});

export const selectedMusicState = atom({
  key: "selectedMusicState",
  default: null,
});

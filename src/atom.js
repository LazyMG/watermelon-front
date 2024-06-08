import { atom } from "recoil";

export const playerState = atom({
  key: "playerState",
  default: {
    ytId: "",
    isPlaying: false,
    isPaused: false,
    duration: 0,
    currentTime: "",
    isLoading: false,
  },
});

export const ytIdState = atom({
  key: "ytIdState",
  default: "",
});

export const selectedMusicState = atom({
  key: "selectedMusicState",
  default: null,
});

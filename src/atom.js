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
    isMuted: false,
    volume: 50,
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

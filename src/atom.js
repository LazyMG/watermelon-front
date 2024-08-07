import { atom } from "recoil";

export const recentPlaylistState = atom({
  key: "recentPlaylistState",
  default: [],
});

//사용자의 저장된 플레이리스트 목록
export const userPlaylistsState = atom({
  key: "userPlaylistsState",
  default: [],
});

//현재 플레이리스트
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

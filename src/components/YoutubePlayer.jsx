import { useCallback, useEffect } from "react";

const YoutubePlayer = ({ videoId }) => {
  useEffect(() => {
    // YouTube iframe API 로드
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube iframe API 로드 후 호출되는 콜백 함수
    window.onYouTubeIframeAPIReady = () => {
      // YouTube 플레이어 생성
      new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // 컴포넌트가 마운트 해제될 때 호출되는 함수
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  // 플레이어가 준비되면 실행되는 함수
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 플레이어 상태가 변경될 때 실행되는 함수
  function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }

  return <div id="player"></div>;
};

export default YoutubePlayer;

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Body from "../components/Body";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { MdPlaylistPlay } from "react-icons/md";
import Link from "next/link";
import YouTube from "react-youtube";

const tokenkey = "AIzaSyCaRXoR-xQJsTV8-xQAeMPh97FJ74Gpssg";
const playlistId = "PL7VuK4dN6eJ3tR7zKE_LWCzXFlAMppXHI";

const Music = () => {
  const [loading, setLoading] = useState(true);
  const [playList, setPlayList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [playerLoad, setPlayerLoad] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [videoState, setVideoState] = useState(null);
  const [youtubePlayer, setYoutubePlayer] = useState(null);

  useEffect(() => {
    console.log("Fetching playlist...");
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${tokenkey}&maxResults=50`
      );
      const data = await res.json();
      console.log("Playlist API response:", data);

      const items = data.items || [];
      setPlayList(items);
      setTotalItems(data.pageInfo?.totalResults || items.length);

      console.log("Set playList length:", items.length);
      console.log("Total items:", data.pageInfo?.totalResults);

      setLoading(false);

      if (items.length > 0) {
        setPlayerItem(items[0]);
      }
    } catch (err) {
      console.error("Error fetching playlist:", err);
      setLoading(false);
    }
  };

  const setPlayerItem = (item) => {
    console.log("Setting player item:", item);
    setCurrentItem(item);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onYouTubeReady = (event) => {
    const player = event.target;
    console.log("YouTube player ready", player);
    setYoutubePlayer(player);
    setIsPaused(false);
    setCurrentTime("0:00");
    player.unMute();
    player.setVolume(100);

    const duration = player.getDuration();
    console.log("Video duration (seconds):", duration);
    setVideoDuration(duration);
    player.playVideo();
  };

  const onStateChange = (event) => {
    console.log("YouTube state changed:", event.data);
    setVideoState(event.data);
  };

  useEffect(() => {
    if (videoState === 3) {
      // buffering
      setPlayerLoad(true);
    } else {
      setPlayerLoad(false);
    }
  }, [videoState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayer) {
        const seconds = Math.floor(youtubePlayer.getCurrentTime());
        setCurrentSeconds(seconds);
        setCurrentTime(secondsToHms(seconds));
        setVideoState(youtubePlayer.getPlayerState());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [youtubePlayer]);

  const secondsToHms = (d) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 60));
    const hDisplay = h > 0 ? h + ":" : "";
    const mDisplay = m < 10 ? "0" + m + ":" : m + ":";
    const sDisplay = s < 10 ? "0" + s : s;
    return hDisplay + mDisplay + sDisplay;
  };

  const playPauseHandler = () => {
    if (!youtubePlayer) {
      console.warn("No YouTube player yet.");
      return;
    }
    if (isPaused) {
      console.log("Resuming video");
      youtubePlayer.playVideo();
      setIsPaused(false);
    } else {
      console.log("Pausing video");
      youtubePlayer.pauseVideo();
      setIsPaused(true);
    }
  };

  const nextTrack = () => {
    if (!currentItem || !playList.length) {
      console.warn("Cannot go to next: no currentItem or empty playlist");
      return;
    }
    const pos = currentItem.snippet?.position;
    if (pos == null) {
      console.warn("Current item has no position");
      return;
    }
    const nextIndex = pos + 1 < totalItems ? pos + 1 : 0;
    console.log("Going to next track at index:", nextIndex);
    setPlayerItem(playList[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentItem || !playList.length) {
      console.warn("Cannot go to previous: no currentItem or empty playlist");
      return;
    }
    const pos = currentItem.snippet?.position;
    if (pos == null) {
      console.warn("Current item has no position");
      return;
    }
    const prevIndex = pos - 1 >= 0 ? pos - 1 : totalItems - 1;
    console.log("Going to previous track at index:", prevIndex);
    setPlayerItem(playList[prevIndex]);
  };

  const onSeek = (e) => {
    const newSec = Number(e.target.value);
    console.log("Seeking to:", newSec);
    setCurrentSeconds(newSec);
    setCurrentTime(secondsToHms(newSec));
    if (youtubePlayer) {
      youtubePlayer.seekTo(newSec, true);
    }
  };

  return (
    <Body title="Music">
      <div>
        <h1 className="text-6xl font-extrabold tracking-tight">Music</h1>
        <p className="mt-1 text-lg">YouTube Data API v3</p>
      </div>

      {currentItem && (
        <div className="relative mt-5 w-full rounded-lg bg-purple-50 shadow-xl p-4 dark:bg-neutral-800">
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={() => {
                console.log("Closing player");
                setCurrentItem(null);
              }}
              aria-label="Close player"
              className="rounded-full bg-gray-300 p-1 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <CgClose />
            </button>
          </div>

          <YouTube
            videoId={currentItem.snippet.resourceId.videoId}
            opts={{ width: "0", height: "0", playerVars: { autoplay: 1 } }}
            onReady={onYouTubeReady}
            onStateChange={onStateChange}
            onEnd={() => {
              console.log("Video ended, going to next track");
              nextTrack();
              setPlayerLoad(true);
            }}
          />

          <div className="mt-4 flex flex-col md:flex-row md:items-center">
            {currentItem.snippet.thumbnails && (
              <img
                src={
                  (currentItem.snippet.thumbnails.maxres ||
                    currentItem.snippet.thumbnails.high ||
                    currentItem.snippet.thumbnails.medium ||
                    currentItem.snippet.thumbnails.default
                  ).url
                }
                alt={currentItem.snippet.title}
                className="mb-4 md:mb-0 md:mr-6 w-auto h-48 object-cover"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {currentItem.snippet.title}
              </h2>
              <Link
                href={`https://www.youtube.com/channel/${currentItem.snippet.videoOwnerChannelId}`}
                target="_blank"
                className="hover:opacity-75"
              >
                <p>{currentItem.snippet.videoOwnerChannelTitle}</p>
              </Link>

              <div className="mt-4 flex items-center space-x-6">
                <button onClick={prevTrack} className="text-4xl">
                  <BsFillSkipStartFill />
                </button>
                <button onClick={playPauseHandler} className="text-4xl">
                  {playerLoad ? (
                    <div className="loading-spinner h-10 w-10 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
                  ) : isPaused ? (
                    <BsPlayFill />
                  ) : (
                    <BsPauseFill />
                  )}
                </button>
                <button onClick={nextTrack} className="text-4xl">
                  <BsSkipEndFill />
                </button>
              </div>

              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max={Math.floor(videoDuration)}
                  value={currentSeconds}
                  step="1"
                  onChange={onSeek}
                  className="w-full"
                />
                <p className="mt-1 text-sm">
                  {currentTime} / {secondsToHms(videoDuration)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => {
            console.log("Play Random clicked");
            if (playList.length) {
              const randomIndex = Math.floor(Math.random() * playList.length);
              console.log("Random index:", randomIndex);
              setPlayerItem(playList[randomIndex]);
            } else {
              console.warn("playList is empty");
            }
          }}
          className="rounded-xl bg-purple-400 px-4 py-2 text-xl font-bold hover:bg-purple-500"
        >
          <BsPlayFill className="inline-block mr-2" />
          Play Random
        </button>

        <Link
          href={`https://www.youtube.com/playlist?list=${playlistId}`}
          target="_blank"
          className="rounded-xl bg-gray-200 px-4 py-2 text-xl font-bold hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center"
        >
          <MdPlaylistPlay className="text-3xl mr-2" />
          <span>Open Playlist</span>
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <Skeleton count={5} height={60} borderRadius="8px" />
        ) : playList.length > 0 ? (
          playList.map((item) => (
            <div
              key={item.id}
              onClick={() => setPlayerItem(item)}
              className="cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <p className="font-medium">{item.snippet.title}</p>
              <p className="text-sm text-gray-500">
                {item.snippet.videoOwnerChannelTitle}
              </p>
            </div>
          ))
        ) : (
          <p>No videos found in playlist.</p>
        )}
      </div>
    </Body>
  );
};

export default Music;



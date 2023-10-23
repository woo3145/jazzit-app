'use client';

import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { formatSeconds } from '@/lib/dateFormat';

interface Props {
  track: Track;
  videoRef: RefObject<HTMLAudioElement>;
}
export const PlayerController = ({ track, videoRef }: Props) => {
  const {
    currentTime,
    volume,
    stemType,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    changeMusic,
  } = usePlayerStore((state) => ({
    currentTime: state.currentTime,
    volume: state.volume,
    stemType: state.stemType,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
    setCurrentTime: state.setCurrentTime,
    changeMusic: state.changeMusic,
  }));
  const [duration, setDuration] = useState<number>();
  const trackSrc = useMemo(() => {
    if (!track.stems.length) return null;
    const curStem = track.stems.filter((stem) => stem.stemType === stemType);
    return curStem.length ? curStem[0].src : null;
  }, [stemType, track]);

  const currentTimeUpdateHandler = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const playClickHandler = () => {
    if (!videoRef.current) return;
    setIsPlaying(!isPlaying);
  };

  const metadataLoadHandler = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const currentTimeChangeHandler = (time: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time[0];
  };

  useEffect(() => {
    if (!videoRef.current || !trackSrc) return;
    videoRef.current.src = trackSrc;
    videoRef.current.volume = volume;
    videoRef.current.currentTime = currentTime;
    if (!isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }
    // eslint-disable-next-line
  }, [trackSrc, isPlaying]);

  return (
    <div className="flex justify-center w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center w-full">
        {/* 이전곡, 재생, 다음곡 */}
        <div className="flex gap-4">
          <Button
            shape="circle"
            type="button"
            variant="ghost"
            onClick={() => changeMusic('prev')}
            className="shrink-0 w-10 h-10 p-3"
          >
            <SkipBack />
          </Button>

          <Button
            shape="circle"
            type="button"
            onClick={playClickHandler}
            className="shrink-0 w-10 h-10 p-3"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button
            shape="circle"
            type="button"
            variant="ghost"
            className="shrink-0 w-10 h-10 p-3"
            onClick={() => changeMusic('next')}
          >
            <SkipForward />
          </Button>
        </div>
        {/* 재생바 */}
        <div className="flex items-center w-full text-sm gap-2">
          <span>{formatSeconds(currentTime)}</span>
          <Slider
            max={duration}
            value={[currentTime]}
            onValueChange={currentTimeChangeHandler}
            className={cn('w-full cursor-pointer')}
          />
          <span>{formatSeconds(track.length)}</span>
        </div>
      </div>
      {track && trackSrc && (
        <audio
          ref={videoRef}
          onTimeUpdate={currentTimeUpdateHandler}
          onLoadedMetadata={metadataLoadHandler}
        >
          <source src={trackSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
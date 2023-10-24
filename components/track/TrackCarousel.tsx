'use client';

import { Track } from '@/modules/track/domain/track';
import { TrackItem } from './TrackItem';
import { usePlayerStore } from '@/store/usePlayerStore';
import { SoundCardCarousel } from '../carousel/SoundCardCarousel';
import { SwiperSlide } from 'swiper/react';

interface Props {
  tracks: Track[];
}

export const TrackCarousel = ({ tracks }: Props) => {
  const { setTrack, setPlaylist, playlist, playlistId } = usePlayerStore(
    (state) => ({
      setTrack: state.setTrack,
      playlist: state.playlist,
      playlistId: state.playlistId,
      setPlaylist: state.setPlaylist,
    })
  );

  const onTrackClick = (track: Track) => {
    if (playlistId === null || playlist.length === 0) {
      setPlaylist(0, [track]);
    } else {
      setPlaylist(playlistId, [
        ...playlist.filter((item) => item.id !== track.id),
        track,
      ]);
    }
    setTrack(track);
  };

  return (
    <div className="py-4">
      <SoundCardCarousel>
        {tracks.map((track) => {
          return (
            <SwiperSlide key={track.id}>
              <TrackItem track={track} onClick={onTrackClick} />
            </SwiperSlide>
          );
        })}
      </SoundCardCarousel>
    </div>
  );
};
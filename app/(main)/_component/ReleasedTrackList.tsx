import { TrackCarousel } from '@/components/track/TrackCarousel';
import { Genre } from '@/modules/genre/domain/genre';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';

interface Props {
  genre?: Genre;
}

export const RelasedTrackList = async ({ genre }: Props) => {
  const { tracks } = await getReleasedTracksServerAction({
    genres: genre ? [genre.id] : undefined,
  });

  return <TrackCarousel tracks={tracks} />;
};

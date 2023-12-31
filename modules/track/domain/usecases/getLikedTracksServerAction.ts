'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';

// 페이지 네이션 필요
export const getLikedTracksServerAction = async (
  userId?: string,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;
  if (!userId) {
    return [];
  }
  try {
    const likedTracks = await unstable_cache(
      async () => {
        const data = await repo.getLikedTracksByUser(userId);
        console.log(`Prisma 호출: ${cacheKeys.getLikedTracksByUser(userId)}`);
        return data;
      },
      [cacheKeys.getLikedTracksByUser(userId)],
      {
        tags: [cacheKeys.getLikedTracksByUser(userId)],
        revalidate: 3600,
      }
    )();

    return likedTracks;
  } catch (e) {
    console.error('getTrackServerAction Error: ', e);
    return [];
  }
};

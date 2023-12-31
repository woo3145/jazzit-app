'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseEditTrackInput,
  UsecaseEditTrackInputSchema,
} from '../validations/EditTrackTypes';
import { TrackRepository } from '../track.repository';
import { arraysEqual } from '@/lib/utils';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { TrackStatus } from '../track';

export const editTrackServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditTrackInput,
    subTrackRepository: TrackRepository | null = null
  ) => {
    const {
      title,
      imageUrl,
      length,
      bpm,
      key,
      status,
      creatorId,
      moodIds,
      genreIds,
    } = UsecaseEditTrackInputSchema.parse(data);
    const repo = subTrackRepository || repository.track;

    const exist = await repo.findById(id);
    if (!exist) {
      return { success: false, message: '트랙이 존재하지 않습니다.' };
    }

    const updatedField = {
      title: exist.title === title ? undefined : title,
      imageUrl: exist.imageUrl === imageUrl ? undefined : imageUrl,
      length: exist.length === length ? undefined : length,
      bpm: exist.bpm === bpm ? undefined : bpm,
      key: exist.key === key ? undefined : key,
      status: exist.status === status ? undefined : status,
      creatorId: exist.creator?.id === creatorId ? undefined : creatorId,
      moodIds: arraysEqual(
        exist.moods.map((mood) => mood.id),
        moodIds
      )
        ? undefined
        : moodIds,
      genreIds: arraysEqual(
        exist.genres.map((genre) => genre.id),
        genreIds
      )
        ? undefined
        : genreIds,
    };

    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, updatedField);

      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);
      revalidateTag(cacheKeys.getTrack(result.id));

      // status가 publish 였거나 publish 로 수정될때만 releasedTrack 캐시 무효화
      if (
        exist.status === TrackStatus.PUBLISH ||
        result.status === TrackStatus.PUBLISH
      ) {
        revalidateTag(cacheKeys.RELEASED_TRACKS);
      }

      return { success: true, track: result };
    } catch (e) {
      console.error('editTrackServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);

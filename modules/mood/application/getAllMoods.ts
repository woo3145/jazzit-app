'use server';

import { repository } from '@/modules/config/repository';

export const getAllMoods = async () => {
  const moods = await repository.mood.getAllMoods();
  return moods;
};
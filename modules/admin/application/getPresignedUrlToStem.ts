'use server';

import { adminGuard } from '@/libs/guard/adminGuard';
import { FileRepository } from '../../upload/domain/file.repository';
import { repository } from '@/modules/config/repository';

export const getPresignedUrlToStem = adminGuard(
  async (filename: string, subFileRepository: FileRepository | null = null) => {
    const repo = subFileRepository || repository.file;
    const url = await repo.getPresignedUrl(`stem/${filename}`, 'audio/mpeg');

    return url;
  }
);
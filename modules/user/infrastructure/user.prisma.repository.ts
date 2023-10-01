import { UserRepository } from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';
import { EditUserFormData } from '../domain/user.validation';
import bcrypt from 'bcrypt';
import { User as DomainUser } from '../domain/user';
import { User as PrismaUser } from '@prisma/client';

export class UserPrismaRepository implements UserRepository {
  toDomainModel(record: PrismaUser): DomainUser {
    return {
      id: record.id,
      name: record.name,
      email: record.email,
      image: record.image,
      role: record.role,
      isSocialLogin: record.password ? false : true,
    };
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return this.toDomainModel(user);
  }
  async findByEmailWithPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return {
      ...this.toDomainModel(user),
      password: user.password,
    };
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return this.toDomainModel(user);
  }
  async findByIdWithPassword(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return {
      ...this.toDomainModel(user),
      password: user.password,
    };
  }

  async create(email: string, hashedPassword: string, name: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return this.toDomainModel(user);
  }

  async edit(userId: string, { name, imageUrl }: EditUserFormData) {
    const exist = await prisma.user.findUnique({ where: { id: userId } });

    if (!exist) {
      throw new Error('User가 존재하지 않습니다.');
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      image: exist.image === imageUrl ? undefined : imageUrl,
    };

    // 모든 필드가 undefined라면 기존 user 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return this.toDomainModel(exist);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedField,
    });

    return this.toDomainModel(updatedUser);
  }

  async changePassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistrationDto } from './create-registration.dto';
import { UpdateRegistrationStatusDto } from './update-registration-status.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRegistrationDto) {
    return this.prisma.$transaction(async (tx) => {
      const owner = await tx.owner.create({
        data: {
          fullName: dto.owner.fullName,
          nationalId: dto.owner.nationalId,
          phoneNumber: dto.owner.phoneNumber,
          email: dto.owner.email,
          address: dto.owner.address,
        },
      });

      const vehicle = await tx.vehicle.create({
        data: {
          plateNumber: dto.vehicle.plateNumber,
          make: dto.vehicle.make,
          model: dto.vehicle.model,
          year: dto.vehicle.year,
          color: dto.vehicle.color,
          chassisNumber: dto.vehicle.chassisNumber,
          engineNumber: dto.vehicle.engineNumber,
          vehicleType: dto.vehicle.vehicleType,
        },
      });

      const registration = await tx.vehicleRegistration.create({
        data: {
          userId: dto.userId,
          ownerId: owner.id,
          vehicleId: vehicle.id,
          // status/submittedAt use defaults from schema
        },
        include: {
          user: true,
          owner: true,
          vehicle: true,
        },
      });

      return registration;
    });
  }

  async findAll() {
    return this.prisma.vehicleRegistration.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        user: true,
        vehicle: true,
        owner: true,
      },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.vehicleRegistration.findMany({
      where: { userId },
      orderBy: { submittedAt: 'desc' },
      include: {
        vehicle: true,
        owner: true,
      },
    });
  }

  async findOne(id: string) {
    const registration = await this.prisma.vehicleRegistration.findUnique({
      where: { id },
      include: {
        user: true,
        vehicle: true,
        owner: true,
      },
    });

    if (!registration) {
      throw new NotFoundException('Vehicle registration not found');
    }

    return registration;
  }

  async findOneForUser(id: string, userId: string) {
    const registration = await this.prisma.vehicleRegistration.findFirst({
      where: { id, userId },
      include: {
        vehicle: true,
        owner: true,
      },
    });

    if (!registration) {
      throw new NotFoundException('Vehicle registration not found');
    }

    return registration;
  }

  async updateStatus(id: string, dto: UpdateRegistrationStatusDto) {
    try {
      return await this.prisma.vehicleRegistration.update({
        where: { id },
        data: {
          status: dto.status,
          reviewedAt: new Date(),
          rejectionReason: dto.rejectionReason ?? null,
        },
        include: { user: true, vehicle: true, owner: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Vehicle registration not found');
      }
      throw error;
    }

    
  }
}

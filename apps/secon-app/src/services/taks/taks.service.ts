import { Injectable } from '@nestjs/common';
import { RepositoryService } from '@app/content-db/services/repository.service';
import { Types } from 'mongoose';

import { TaskDTO } from '../../models/taks/taks.dto';
import { TaksError } from './taks-error.service';

@Injectable()
export class TaksService {
  public static async listTask() {
    const theTaks = await RepositoryService.taks.findAll();
    return theTaks;
  }

  public static async createTask(payload: Partial<TaskDTO>) {
    try {
      await RepositoryService.taks.create(payload).then();
      return payload;
    } catch (error) {
      throw new TaksError(error);
    }
  }

  public static async taksById(taksId: Types.ObjectId) {
    const taks = await RepositoryService.taks.findOne({
      _id: taksId,
    });
    return taks;
  }

  public static async updateTaks(
    taksId: Types.ObjectId,
    payload: Partial<TaskDTO>,
  ) {
    try {
      await RepositoryService.taks.update(taksId, payload).then();
      return payload;
    } catch (error) {
      throw new TaksError(error);
    }
  }

  public static async deleteTaks(taksId: Types.ObjectId) {
    try {
      await RepositoryService.taks.remove(taksId).then();
      return taksId;
    } catch (error) {
      throw new TaksError(error);
    }
  }
}

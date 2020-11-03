import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TaksService } from '../services/taks/taks.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { TaskDTO } from '../models/taks/taks.dto';
import { TaskVM } from '../models/taks/taks.vm';

@ApiTags('taks')
@Controller('taks')
export class TaksController {
  @Post('/create')
  @ApiOkResponse({ type: TaskVM })
  async create(@Body() taksCreate: TaskDTO) {
    const response = await TaksService.createTask(taksCreate);
    return response;
  }

  @Get('/list')
  @ApiOkResponse({ type: TaskVM })
  async list() {
    const response = await TaksService.listTask();
    return response;
  }

  @Get('/:id')
  @ApiOkResponse({ type: TaskVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async load(@Param('id') taksId: Types.ObjectId) {
    const response = await TaksService.taksById(taksId);
    return response;
  }

  @Put('update/:id')
  @ApiOkResponse({ type: TaskVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async update(
    @Param('id') taksId: Types.ObjectId,
    @Body() taksToUpdate: TaskDTO,
  ) {
    const response = await TaksService.updateTaks(taksId, taksToUpdate);
    return response;
  }

  @Delete('delete/:id')
  @ApiOkResponse({ type: TaskVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async delete(@Param('id') taksId: Types.ObjectId) {
    const response = await TaksService.deleteTaks(taksId);
    return response;
  }
}

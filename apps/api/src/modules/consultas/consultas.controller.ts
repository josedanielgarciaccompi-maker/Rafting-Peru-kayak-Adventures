import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() dto: CreateConsultaDto) {
    return this.consultasService.create(dto);
  }

  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.consultasService.updateEstado(id, estado);
  }
}

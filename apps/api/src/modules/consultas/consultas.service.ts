import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Injectable()
export class ConsultasService {
  // TODO Fase 1: reemplazar con PrismaService cuando se configure la BD
  private readonly store: Array<Record<string, unknown>> = [];

  create(dto: CreateConsultaDto) {
    const consulta = {
      id: Date.now().toString(),
      ...dto,
      estado: 'nueva',
      creadoEn: new Date(),
    };
    this.store.push(consulta);
    return consulta;
  }

  findAll() {
    return this.store;
  }

  updateEstado(id: string, estado: string) {
    const consulta = this.store.find((c) => c['id'] === id);
    if (!consulta) return null;
    consulta['estado'] = estado;
    return consulta;
  }
}

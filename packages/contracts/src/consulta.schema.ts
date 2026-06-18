import { z } from 'zod';

export const DestinoEnum = z.enum(['cusco', 'lima', 'arequipa']);
export type Destino = z.infer<typeof DestinoEnum>;

export const EstadoEnum = z.enum(['nueva', 'en_seguimiento', 'cerrada']);
export type Estado = z.infer<typeof EstadoEnum>;

export const CreateConsultaSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().optional(),
  destino: DestinoEnum,
  mensaje: z.string().min(10),
});
export type CreateConsultaDto = z.infer<typeof CreateConsultaSchema>;

export const ConsultaSchema = CreateConsultaSchema.extend({
  id: z.string(),
  estado: EstadoEnum,
  creadoEn: z.coerce.date(),
});
export type Consulta = z.infer<typeof ConsultaSchema>;

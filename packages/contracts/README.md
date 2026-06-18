# packages/contracts — LA COLUMNA

Fuente única de verdad de los tipos y esquemas compartidos entre `apps/web`, `apps/admin` y `apps/api`.

## Regla de oro
> Ningún lado redefine tipos de request/response. Ambos importan desde aquí.

## Schemas disponibles
- `consulta.schema.ts` — CreateConsultaDto, Consulta, DestinoEnum, EstadoEnum

## Agregar un nuevo contrato
1. Crear `src/{feature}.schema.ts` con Zod
2. Re-exportar desde `src/index.ts`
3. PR de contrato primero — luego frontend y backend se adaptan

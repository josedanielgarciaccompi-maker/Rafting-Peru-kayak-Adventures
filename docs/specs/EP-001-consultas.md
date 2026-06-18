# EP-001: Módulo de Consultas

## Estado
En desarrollo (Fase 1)

## Objetivo
Captar leads de potenciales clientes que quieren información sobre paquetes de rafting/kayak.

## Alcance (Fase 1)
- Formulario público de contacto: nombre, email, teléfono, destino, mensaje
- Almacenamiento en PostgreSQL vía Prisma
- Inbox mínimo para ver y gestionar consultas
- Cambio de estado: `nueva` → `en_seguimiento` → `cerrada`

## Fuera de alcance (Fase 2+)
- Notificaciones por correo (Resend)
- Asignación de consultas a agentes
- Integración con CRM externo

## Contrato
Ver [`packages/contracts/src/consulta.schema.ts`](../../packages/contracts/src/consulta.schema.ts)

## Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/consultas` | Crear consulta |
| `GET` | `/api/consultas` | Listar todas las consultas |
| `PATCH` | `/api/consultas/:id/estado` | Cambiar estado |

## Estados
```
nueva → en_seguimiento → cerrada
```

## Campos
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| nombre | string (min 2) | ✅ | |
| email | string email | ✅ | |
| telefono | string | ❌ | |
| destino | enum | ✅ | cusco \| lima \| arequipa |
| mensaje | string (min 10) | ✅ | |

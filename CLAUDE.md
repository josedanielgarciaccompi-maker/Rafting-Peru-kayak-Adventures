# CLAUDE.md – Rafting Peru & Kayak Adventures

> Guía maestra para Claude Code. Define **cómo trabajamos** (metodología),
> **cómo está organizado el proyecto** (arquitectura y carpetas) y **qué
> puede tocar cada agente** (fronteras). Leer esto antes de cualquier tarea.

---

## 1. Proyecto

Plataforma web para un operador de turismo de aventura (rafting y kayak) con
sedes en Cusco, Lima y Arequipa. No es un sitio de folleto: es una aplicación
transaccional con tres superficies (sitio público, back-office y backend).

Bilingüe **ES / EN**. Mercado de pagos: **Perú (Mercado Pago)**.

---

## 2. Metodología

### Spec-Driven Development (SDD)
El orden de trabajo es siempre el mismo. **No se escribe código de una feature
antes de tener su spec y su contrato.**

1. **Spec** — cada feature/epic se documenta en `docs/specs/` antes de codear.
2. **Contrato** — del spec se derivan los esquemas en `packages/contracts`.
3. **Implementación en paralelo** — backend y frontend construyen contra el
   contrato, no contra el otro.
4. **QA** — pruebas de contrato + e2e antes de cerrar la feature.

### Regla de oro
> Ningún cambio cruza la frontera frontend→backend sin pasar primero por
> `packages/contracts`. Si una feature necesita un campo nuevo, **primero se
> cambia el contrato (PR), luego cada lado se adapta.**

### Control de versiones
- Trunk-based: ramas de feature cortas (`feat/EP-001-consultas`).
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`).
- Un PR por feature; no mezclar superficies en un mismo PR.

---

## 3. Arquitectura

Monorepo con tres superficies sobre un backend único. El **contrato** es la
columna que comparten los dos frontends.

```
  Sitio público (web)        Back-office (admin)
            \                     /
             \                   /
              v                 v
            API · Contrato (OpenAPI + tipos)
                      |
                      v
            Backend (BD · pagos · correos)
```

### Stack
| Capa            | Tecnología                                  |
|-----------------|---------------------------------------------|
| Monorepo        | Turborepo + pnpm                            |
| Sitio público   | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui |
| Back-office     | Next.js (App Router) – Fase 2               |
| Backend / API   | NestJS (módulos) – *alternativa ligera: Next API routes* |
| Base de datos   | PostgreSQL + Prisma                         |
| Contrato        | Zod en `packages/contracts` → tipos TS (+ OpenAPI opcional) |
| i18n            | next-intl (ES/EN)                           |
| Pagos           | Mercado Pago – Fase 2                        |
| Correos         | Resend (o equivalente)                       |

---

## 4. Estructura de carpetas

Claude Code debe crear esta estructura. Las carpetas marcadas **(Fase 2/3)**
se crean como placeholders con un `README.md` que describe su alcance.

```
rafting-peru/
├── CLAUDE.md
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .env.example
├── apps/
│  ├── web/                  # Sitio público (Next.js) – Fase 1
│  │  ├── app/               # rutas (App Router)
│  │  ├── components/        # componentes de la app
│  │  ├── lib/               # helpers, cliente del API
│  │  ├── messages/          # i18n: es.json / en.json
│  │  └── public/            # estáticos
│  ├── admin/                # Back-office (Next.js) – Fase 2
│  │  └── app/
│  └── api/                  # Backend (NestJS) – Fase 1+
│     ├── src/
│     │  ├── modules/        # consultas, paquetes, reservas, pagos, cotizaciones, equipos
│     │  ├── common/         # guards, pipes, filtros, utilidades
│     │  └── main.ts
│     └── prisma/
│        └── schema.prisma
└── packages/
   ├── contracts/            # LA COLUMNA: Zod + tipos compartidos
   │  └── src/
   ├── ui/                   # componentes compartidos (web/admin)
   ├── config/               # eslint, tsconfig, tailwind compartidos
   └── utils/                # helpers puros sin dependencias de framework
   docs/
   ├── specs/                # SDD: una spec por feature/epic
   └── adr/                  # Architecture Decision Records
```

---

## 5. Convenciones y fronteras

- **El frontend nunca toca la base de datos ni secretos.** Solo llama al API.
- **Auth y validación viven en el backend**, en el borde de la API.
- En Next, solo lo que puede ser público lleva el prefijo `NEXT_PUBLIC_`.
- CORS configurado explícitamente en la API (orígenes de `web` y `admin`).
- `packages/contracts` es la **única** fuente de verdad de los tipos del API.
  Ambos lados lo importan; nadie redefine tipos de request/response.
- `packages/utils` es código puro (sin React, sin Nest). Si algo depende de un
  framework, no va aquí.
- Variables de entorno: cada app tiene su `.env`; la raíz mantiene
  `.env.example` documentando todas.

---

## 6. Agentes y sus límites

| Agente            | Es dueño de                          | Puede leer            | Regla |
|-------------------|--------------------------------------|-----------------------|-------|
| Frontend Agent    | `apps/web`, `apps/admin`, `packages/ui` | `packages/contracts` (solo lectura) | No edita el contrato ni la API |
| Backend Agent     | `apps/api`, `prisma`                 | `packages/contracts`  | Único que **propone** cambios al contrato, vía PR |
| QA Agent          | tests (contrato + e2e)               | todo el repo          | Valida ambos lados contra el contrato |

Si un agente necesita algo del otro lado, **no cruza la frontera**: abre/edita
el contrato primero y deja que el otro agente se adapte.

---

## 7. Fases (alcance)

### Fase 1 – MVP (sin pagos)
Objetivo: captar y dar seguimiento básico, rápido y barato.
- `apps/web`: vitrina + WhatsApp con destino precargado + i18n + formulario de consulta.
- `apps/api`: módulo `consultas` (recibir, listar, cambiar estado).
- `packages/contracts`: esquema de `consulta`.
- Inbox mínimo de consultas (puede vivir en `web` protegido, o iniciar `admin`).

### Fase 2 – Transaccional
- Back-office completo (`apps/admin`) con login.
- Reservas + pagos (Mercado Pago) + confirmación por correo.
- Cotizaciones B2B (corporativo / agencias).

### Fase 3 – Comercialización de equipos
- Catálogo de equipos + pedidos bajo importación + seguimiento de estado.

---

## 8. Tarea de scaffolding inicial

Al recibir la orden de "crear la estructura", Claude Code debe:

1. Inicializar el monorepo (Turborepo + pnpm) con `pnpm-workspace.yaml` y `turbo.json`.
2. Crear el árbol de la sección 4. Las carpetas de Fase 2/3 se crean con un
   `README.md` que solo describe su alcance (sin código todavía).
3. Andamiar **solo lo de Fase 1**: `apps/web`, `apps/api` (con el módulo
   `consultas` vacío) y `packages/contracts` (con el esquema de `consulta`).
4. Crear `.env.example` en la raíz y `README.md` por app.
5. No instalar dependencias de pagos ni de auth todavía (son Fase 2).

> Cualquier desviación de esta guía se documenta como ADR en `docs/adr/`.

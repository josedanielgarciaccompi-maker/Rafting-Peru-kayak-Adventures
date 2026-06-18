# apps/web — Sitio Público (Fase 1)

Vitrina pública de Kayak Rafting Peru. Next.js 15 + App Router + Tailwind + next-intl.

## Arrancar en desarrollo
```bash
pnpm dev
```

## Estructura clave
- `app/[locale]/` — rutas con i18n (ES/EN)
- `messages/` — textos ES/EN
- `lib/api.ts` — cliente HTTP hacia `apps/api`
- `public/` — prototipo Claude Design (index.html + support.js)
- `components/` — componentes React reutilizables

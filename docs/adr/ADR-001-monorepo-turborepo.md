# ADR-001: Monorepo con Turborepo + pnpm

## Estado
Aceptado

## Contexto
El proyecto tiene tres superficies (web, admin, api) que comparten tipos y componentes.
Se necesita una forma de coordinar builds, compartir código y mantener una única fuente de verdad.

## Decisión
Usar **Turborepo** como orquestador de tareas y **pnpm workspaces** para gestión de paquetes.

## Consecuencias

### Positivas
- Un único repositorio con pipelines de build/dev/lint coordinados
- `packages/contracts` como única fuente de verdad de tipos compartidos
- Cada app puede deployarse de forma independiente
- Caché de builds compartida entre CI y local

### Negativas
- Curva de aprendizaje inicial para el equipo
- El setup inicial es más complejo que un repo simple

## Alternativas consideradas
- Repositorios separados (polyrepo): descartado por la fricción al sincronizar tipos
- Nx: descartado por mayor complejidad de configuración

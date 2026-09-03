# AI Rules

## Tech stack

- **React 19** provides the component model and UI rendering.
- **TypeScript 5** is required for all application source code, with strict compiler checks enabled.
- **TanStack Start** provides the full-stack application runtime, including SSR and the Vite/Nitro build pipeline.
- **TanStack Router** provides file-based routing under `src/routes/`; `src/routeTree.gen.ts` is generated and must not be edited manually.
- **TanStack React Query** provides request state, caching, and server-state synchronization through the router context.
- **Supabase** provides the database and authentication integration; use the existing clients and generated `Database` types under `src/integrations/supabase/`.
- **Tailwind CSS v4** provides utility-first styling, theme tokens, responsive layouts, and the shared utilities defined in `src/styles.css`.
- **shadcn/ui and Radix UI** provide accessible, composable interface primitives in `src/components/ui/`.
- **Vite** handles development and bundling, with the `@/*` alias resolving to `src/*`.

## Library and implementation rules

- Use **TanStack Router** for all navigation and route definitions. Add pages as files in `src/routes/` using TanStack's file-based naming conventions. Do not create `src/pages/`, `src/App.tsx`, or another routing system. Preserve the `<Outlet />` in `src/routes/__root.tsx`.
- Use **TanStack React Query** for asynchronous server data, caching, mutations, loading states, and invalidation. Do not add a second data-fetching or server-state library.
- Use the existing **Supabase client** for database queries, authentication, and storage. Import it from `@/integrations/supabase/client` and use the generated types from `@/integrations/supabase/types`; do not edit generated integration files unless regeneration is required.
- Use **shadcn/ui components** from `@/components/ui` for dialogs, forms, menus, buttons, cards, tables, and other standard UI patterns. Compose or wrap them in new components rather than editing the generated files in `src/components/ui/`.
- Use **Radix UI** directly only when a matching shadcn/ui component does not cover the interaction. Preserve keyboard navigation, focus management, and accessible labeling.
- Use **Tailwind CSS classes** for component styling. Put global tokens, base styles, fonts, and genuinely reusable custom utilities in `src/styles.css`; avoid adding one-off CSS files or inline style objects.
- Use **Lucide React** for interface icons. Do not add a separate icon package or use text glyphs as replacements for UI icons.
- Use **React Hook Form** with **Zod** and `@hookform/resolvers` for forms and boundary validation. Keep schemas close to the form or feature that owns them.
- Use **date-fns** for date parsing and formatting, and **react-day-picker** through the existing calendar component for date selection. Do not hand-roll date calculations.
- Use `cn` from `@/lib/utils` to merge conditional Tailwind classes; it combines `clsx` and `tailwind-merge`. Do not duplicate class-merging helpers.
- Use **Sonner** for brief toast notifications when feedback should not interrupt the user's workflow. Use shadcn/ui dialogs or alerts for decisions and important messages.

## Project conventions

- Keep application source under `src/`. Put reusable site or feature components in `src/components/`, shared hooks in `src/hooks/`, and shared helpers in `src/lib/`.
- Keep the existing visual language: Fraunces for display headings, Inter for body text, and the semantic color tokens defined in `src/styles.css`.
- Prefer small, focused components and typed props. Avoid unnecessary abstractions, duplicate state, and new dependencies when an installed library already solves the problem.
- Use `Link` and router APIs for internal navigation; use normal anchors for external URLs. Provide meaningful `alt` text for informative images and accessible labels for interactive controls.
- Never expose secrets in client code, bypass Supabase authorization, render unsanitized HTML, or interpolate untrusted input into HTML or SQL.
- Before finishing a change, run the relevant type checks and keep generated route artifacts, formatting, and lint rules intact.

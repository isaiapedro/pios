A pill-shaped action button — the primary call-to-action across all Petlove&Co surfaces.

```jsx
<Button type="default" weight="primary" size="md">Adicionar à sacola</Button>
<Button type="default" weight="secondary">Ver detalhes</Button>
<Button type="accent" iconLeft={<Icon name="cart" size={20} />}>Comprar</Button>
```

Types: `default` (purple brand), `accent` (green), `danger` (red), `inverted` (for dark/photo backgrounds).
Weights: `primary` (filled), `secondary` (outlined/tinted), `tertiary` (text-only, no side padding).
Sizes: `sm` 40px · `md` 48px · `lg` 56px. Supports `fullWidth`, `loading`, `disabled`, `iconLeft`/`iconRight`.

/* Petlove shop — interactive storefront screens, composed from Caramelo components. */
const NS = window.CarameloDesignSystemPetlove_6f57df;
const { PetloveLogo, SearchBar, Chip, ProductCard, BottomNav, Counter, Price, Button,
        IconButton, Icon, Banner, Tabs, Badge, Stepper, Divider, Rating, EmptyState } = NS;
const { products, categories } = window.PETLOVE_DATA;
const brl = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- Shared chrome ---------- */
function TopBar({ count, onCart }) {
  return (
    <div style={{ background: "var(--c-brand)", color: "var(--c-on-brand)", padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <PetloveLogo size="lg" type="inverse" style={{ transform: "scale(1.5)", transformOrigin: "left center" }} />
        <div style={{ display: "flex", gap: 4 }}>
          <IconButton name="heart" weight="ghost" ariaLabel="Favoritos" style={{ color: "#fff" }} />
          <div style={{ position: "relative" }}>
            <IconButton name="cart" weight="ghost" ariaLabel="Sacola" onClick={onCart} style={{ color: "#fff" }} />
            {count > 0 && <span style={{ position: "absolute", top: 2, right: 2, pointerEvents: "none" }}><Badge color="heart" variant="solid" size="sm">{count}</Badge></span>}
          </div>
        </div>
      </div>
      <SearchBar placeholder="Buscar ração, brinquedos…" />
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
        <Icon name="home" size={16} /> Entregar em <strong>Rua das Acácias, 120</strong>
        <Icon name="chevron-down" size={16} />
      </div>
    </div>
  );
}

/* ---------- Home ---------- */
function Home({ onOpen, onAdd }) {
  const [cat, setCat] = React.useState("racao");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "18px 0 24px" }}>
      <div style={{ display: "flex", gap: 18, padding: "0 16px", overflowX: "auto" }}>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ width: 60, height: 60, borderRadius: "var(--radius-pill)", display: "flex", alignItems: "center", justifyContent: "center",
              background: cat === c.id ? "var(--c-brand)" : "var(--c-brand-faint)", color: cat === c.id ? "#fff" : "var(--c-brand)" }}>
              <Icon name={c.icon} size={28} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--c-text-secondary)" }}>{c.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        <Banner tone="brand" title="Clube Petlove" subtitle="Até 30% off e frete grátis sempre." cta="Assinar" />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0 16px 12px" }}>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: 22, margin: 0 }}>Ofertas pra vocês</h2>
          <button style={{ border: "none", background: "none", color: "var(--c-brand)", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-plain)" }}>Ver tudo</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px" }}>
          {products.map((p) => (
            <ProductCard key={p.id} {...p} originalPrice={p.original} onAdd={() => onAdd(p)} onToggleFavorite={() => {}} onClick={() => onOpen(p)} style={{ width: "100%" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Product detail ---------- */
function Detail({ product, onAdd, onBack }) {
  const p = product;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "1/1", background: "var(--c-surface-cream)" }}>
        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}><IconButton name="chevron-left" type="neutral" weight="secondary" ariaLabel="Voltar" onClick={onBack} style={{ background: "var(--c-bg)" }} /></div>
        {p.discount && <div style={{ position: "absolute", top: 16, right: 16 }}><Badge color="heart" variant="solid">-{p.discount}%</Badge></div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--c-text-muted)", textTransform: "uppercase", letterSpacing: .4 }}>{p.brand}</span>
        <h1 style={{ fontFamily: "var(--font-brand)", fontSize: 24, margin: 0, lineHeight: 1.2 }}>{p.title}</h1>
        <Rating value={p.rating} count={p.reviews} showValue />
        <Price value={p.price} original={p.original} club={p.club} size="lg" />
        <p style={{ fontSize: 14, color: "var(--c-text-secondary)", lineHeight: 1.5, margin: 0 }}>
          Alimento completo e balanceado, com proteínas de alta qualidade para a saúde e energia do seu melhor amigo.
        </p>
        <Divider />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Counter defaultValue={1} min={1} />
          <Button fullWidth iconLeft={<Icon name="cart" size={20} />} onClick={() => onAdd(p)}>Adicionar à sacola</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cart ---------- */
function Cart({ items, onQty, onRemove, onCheckout }) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  if (!items.length) {
    return <div style={{ padding: 24 }}><EmptyState icon="cart" title="Sua sacola está vazia" description="Que tal começar pelos mais queridos da loja?" /></div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      <Stepper steps={["Sacola", "Entrega", "Pagamento"]} current={0} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: "var(--radius-md)", padding: 12 }}>
            <img src={it.image} alt={it.title} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", background: "var(--c-surface-cream)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{it.title}</div>
              <div style={{ marginTop: 6 }}><Price value={it.price} size="sm" /></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <IconButton name="close" type="neutral" weight="ghost" size="sm" ariaLabel="Remover" onClick={() => onRemove(it.id)} />
              <Counter size="sm" value={it.qty} min={1} onChange={(q) => onQty(it.id, q)} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--c-surface-cream)", borderRadius: "var(--radius-md)", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <Row label="Subtotal" value={brl(total)} />
        <Row label="Frete" value="Grátis" accent />
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontFamily: "var(--font-brand)", fontSize: 18 }}>Total</strong>
          <Price value={total} size="md" />
        </div>
      </div>
      <Button fullWidth size="lg" onClick={onCheckout}>Finalizar compra</Button>
    </div>
  );
}
function Row({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
      <span style={{ color: "var(--c-text-secondary)" }}>{label}</span>
      <span style={{ fontWeight: 700, color: accent ? "var(--c-success)" : "var(--c-text)" }}>{value}</span>
    </div>
  );
}

/* ---------- App shell ---------- */
function App() {
  const [tab, setTab] = React.useState("home");
  const [detail, setDetail] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const count = cart.reduce((s, it) => s + it.qty, 0);

  const add = (p) => {
    setCart((c) => {
      const found = c.find((it) => it.id === p.id);
      if (found) return c.map((it) => it.id === p.id ? { ...it, qty: it.qty + 1 } : it);
      return [...c, { ...p, qty: 1 }];
    });
    setToast(p.title);
    setTimeout(() => setToast(null), 2200);
  };
  const setQty = (id, q) => setCart((c) => c.map((it) => it.id === id ? { ...it, qty: q } : it));
  const remove = (id) => setCart((c) => c.filter((it) => it.id !== id));

  let body;
  if (detail) body = <Detail product={detail} onAdd={(p) => { add(p); setDetail(null); setTab("cart"); }} onBack={() => setDetail(null)} />;
  else if (tab === "home") body = <Home onOpen={setDetail} onAdd={add} />;
  else if (tab === "cart") body = <Cart items={cart} onQty={setQty} onRemove={remove} onCheckout={() => setToast("Pedido confirmado! 🐾")} />;
  else body = <div style={{ padding: 24 }}><EmptyState icon="search" title="Em breve" description="Esta seção é uma amostra do design system." /></div>;

  return (
    <div style={{ width: 390, height: 800, background: "var(--c-bg)", borderRadius: 36, overflow: "hidden", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", position: "relative", border: "1px solid var(--c-border)" }}>
      {!detail && <TopBar count={count} onCart={() => setTab("cart")} />}
      <div style={{ flex: 1, overflowY: "auto", background: "var(--c-surface)" }}>{body}</div>
      <BottomNav value={tab} onChange={(v) => { setDetail(null); setTab(v); }} items={[
        { value: "home", label: "Início", icon: "home" },
        { value: "search", label: "Buscar", icon: "search" },
        { value: "cart", label: "Sacola", icon: "cart" },
        { value: "pet", label: "Meu pet", icon: "dog" },
      ]} />
      {toast && (
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 84, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "var(--grey-900)", color: "#fff", padding: "12px 16px", borderRadius: 12, fontSize: 13, fontFamily: "var(--font-plain)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="success" size={18} color="var(--green-400)" /> {toast.length > 30 ? "Adicionado à sacola" : toast}
          </div>
        </div>
      )}
    </div>
  );
}

window.PetloveShopApp = App;

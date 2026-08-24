"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Service = { id: string; title: string; body: string; status: "Available" | "Draft" | "Paused"; createdAt: number };

const SEED: Service[] = [
  { id: "service-1", title: "Full-stack build", body: "Next.js + API", status: "Available", createdAt: 1 },
  { id: "service-2", title: "Product interface audit", body: "Flows, hierarchy, and responsive behavior", status: "Available", createdAt: 2 },
  { id: "service-3", title: "Data workflow prototype", body: "A small local-first operating surface", status: "Draft", createdAt: 3 },
];

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored) as T);
    } catch { /* keep the authored seed */ }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) localStorage.setItem(key, JSON.stringify(value));
  }, [key, ready, value]);
  return [value, setValue] as const;
}

export default function Home() {
  const [services, setServices] = useLocalStorage<Service[]>("services-ledger-v2", SEED);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Service["status"]>("All");
  const [draft, setDraft] = useState({ title: "", body: "", status: "Available" as Service["status"] });
  const visible = useMemo(() => services.filter((service) => {
    const matchesFilter = filter === "All" || service.status === filter;
    const haystack = `${service.title} ${service.body} ${service.status}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query, services]);

  function addService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    setServices((current) => [{ ...draft, id: crypto.randomUUID(), title: draft.title.trim(), body: draft.body.trim(), createdAt: Date.now() }, ...current]);
    setDraft({ title: "", body: "", status: "Available" });
  }

  return (
    <main className="service-shell">
      <nav className="service-nav" aria-label="Service Ledger">
        <span className="service-mark">SERVICE / LEDGER</span>
        <span>LOCAL CATALOG · EDIT IN PLACE</span>
      </nav>

      <header className="service-hero">
        <div>
          <h1>Make the work easy to find.</h1>
          <p>A small working catalog for the services you offer. Add a line, give it a state, and keep the useful version in view.</p>
        </div>
        <div className="service-stamp">CATALOG<br /><strong>{String(services.length).padStart(2, "0")}</strong><br />LINES</div>
      </header>

      <section className="service-summary" aria-label="Catalog summary">
        <span><strong>{services.length}</strong> lines in ledger</span>
        <span><strong>{services.filter((service) => service.status === "Available").length}</strong> available now</span>
        <span><strong>{visible.length}</strong> showing</span>
      </section>

      <section className="service-workspace">
        <form className="service-form" onSubmit={addService}>
          <div className="service-section-head"><span>WRITE A NEW LINE</span><span>01</span></div>
          <h2>Describe the offer.</h2>
          <label>
            <span>Name</span>
            <input aria-label="Service name" placeholder="e.g. Interface direction" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          </label>
          <label>
            <span>Details</span>
            <textarea aria-label="Service details" placeholder="What does this help someone do?" value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} />
          </label>
          <label>
            <span>State</span>
            <select aria-label="Service state" value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Service["status"] })}>
              <option>Available</option><option>Draft</option><option>Paused</option>
            </select>
          </label>
          <button className="service-submit" type="submit">Add to ledger <span>ADD</span></button>
          <p className="service-note">Stored in this browser only. No checkout, account, or remote catalog.</p>
        </form>

        <div className="service-ledger">
          <div className="service-section-head"><span>THE LEDGER</span><span>02</span></div>
          <div className="service-tools">
            <input aria-label="Search services" placeholder="Search the ledger" value={query} onChange={(event) => setQuery(event.target.value)} />
            <div className="service-filters" aria-label="Filter service state">
              {(["All", "Available", "Draft", "Paused"] as const).map((state) => <button key={state} type="button" aria-pressed={filter === state} onClick={() => setFilter(state)}>{state}</button>)}
            </div>
          </div>
          <div className="service-list" aria-live="polite">
            {visible.length > 0 ? visible.map((service, index) => (
              <article className="service-row" key={service.id}>
                <span className="service-row-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="service-row-copy"><h3>{service.title}</h3><p>{service.body}</p></div>
                <span className={`service-status service-status-${service.status.toLowerCase()}`}>{service.status}</span>
                <button className="service-delete" type="button" onClick={() => setServices((current) => current.filter((item) => item.id !== service.id))}>Remove</button>
              </article>
            )) : <p className="service-empty">No lines match this filter. Try another state or add a new service.</p>}
          </div>
        </div>
      </section>

      <footer className="service-footer"><span>BOOK / SOLO CATALOG</span><span>LOCAL STORAGE · HONEST DEMO</span></footer>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-10 text-paper/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs uppercase tracking-wide md:flex-row">
        <span>Trail Tales</span>
        <span>&copy; {new Date().getFullYear()} — Every trip, one trail.</span>
      </div>
    </footer>
  );
}

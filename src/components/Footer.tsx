export default function Footer({ name }: { name: string }) {
  return (
    <footer className="px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border text-xs text-muted uppercase tracking-widest">
      <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
      <span>Designed &amp; built by {name}</span>
    </footer>
  );
}

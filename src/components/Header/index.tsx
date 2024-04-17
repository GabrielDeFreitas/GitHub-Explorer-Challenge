import { NavLink } from '../NavLink';

export function Header() {
  return (
    <header className="w-full max-w-4xl mx-auto p-5 flex items-center gap-5 py-6">
      <nav className="flex items-center gap-5">
        <NavLink title="Pesquisa e Exportação" href="/">
          Pesquisa e Exportação
        </NavLink>
        <NavLink title="Importação e Visualização" href="/import">
          Importação e Visualização
        </NavLink>
      </nav>
    </header>
  );
}

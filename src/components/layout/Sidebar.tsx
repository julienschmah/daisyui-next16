import Link from 'next/link';

export function Sidebar() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        {/* Sidebar content here */}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pipelines">Pipelines</Link>
        </li>
        <li>
          <Link href="/settings">Configurações</Link>
        </li>
      </ul>
    </div>
  );
}

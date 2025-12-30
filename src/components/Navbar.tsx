import { Home, Menu, ClipboardList, Tag, ShoppingCart, Moon } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, isActive }: NavItemProps) => (
  <div className={`nav-item ${isActive ? 'active' : ''}`}>
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">Cibeey</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavItem icon={<Home size={20} />} label="Home" isActive />
          <NavItem icon={<Menu size={20} />} label="Menu" />
          <NavItem icon={<ClipboardList size={20} />} label="Orders" />
          <NavItem icon={<Tag size={20} />} label="Avail" />
          <NavItem icon={<ShoppingCart size={20} />} label="Cart" />
        </nav>

        {/* Dark mode toggle */}
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Moon size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around py-2 border-t border-border">
        <NavItem icon={<Home size={18} />} label="Home" isActive />
        <NavItem icon={<Menu size={18} />} label="Menu" />
        <NavItem icon={<ClipboardList size={18} />} label="Orders" />
        <NavItem icon={<Tag size={18} />} label="Avail" />
        <NavItem icon={<ShoppingCart size={18} />} label="Cart" />
      </nav>
    </header>
  );
};

export default Navbar;

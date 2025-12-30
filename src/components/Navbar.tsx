import { Home, LayoutGrid, ClipboardList, UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => (
  <Link 
    to={to}
    className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

interface NavbarProps {
  activeTab?: string;
}

const Navbar = ({ activeTab }: NavbarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getIsActive = (path: string, label: string) => {
    if (activeTab) return activeTab === label;
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Cibeey
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <NavItem icon={<Home size={24} strokeWidth={2} />} label="Home" to="/" isActive={getIsActive('/', 'Home')} />
            <NavItem icon={<LayoutGrid size={24} strokeWidth={2} />} label="Menu" to="/menu" isActive={getIsActive('/menu', 'Menu')} />
            <NavItem icon={<ClipboardList size={24} strokeWidth={2} />} label="Orders" to="/orders" isActive={getIsActive('/orders', 'Orders')} />
            <NavItem icon={<UtensilsCrossed size={24} strokeWidth={2} />} label="Avail" to="/avail" isActive={getIsActive('/avail', 'Avail')} />
            <NavItem icon={<ShoppingCart size={24} strokeWidth={2} />} label="Cart" to="/cart" isActive={getIsActive('/cart', 'Cart')} />
          </nav>

          {/* Profile Icon */}
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <User size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around pt-4 border-t border-border mt-4">
          <NavItem icon={<Home size={20} strokeWidth={2} />} label="Home" to="/" isActive={getIsActive('/', 'Home')} />
          <NavItem icon={<LayoutGrid size={20} strokeWidth={2} />} label="Menu" to="/menu" isActive={getIsActive('/menu', 'Menu')} />
          <NavItem icon={<ClipboardList size={20} strokeWidth={2} />} label="Orders" to="/orders" isActive={getIsActive('/orders', 'Orders')} />
          <NavItem icon={<UtensilsCrossed size={20} strokeWidth={2} />} label="Avail" to="/avail" isActive={getIsActive('/avail', 'Avail')} />
          <NavItem icon={<ShoppingCart size={20} strokeWidth={2} />} label="Cart" to="/cart" isActive={getIsActive('/cart', 'Cart')} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

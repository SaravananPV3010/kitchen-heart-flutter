import { useState } from 'react';
import { Home, FileText, CalendarCheck, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import UserProfileSheet from './UserProfileSheet';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => (
  <Link 
    to={to}
    className="relative flex items-center gap-2 cursor-pointer transition-colors group"
  >
    <span className={`transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
      {icon}
    </span>
    <span className={`text-base font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
      {label}
    </span>
    {/* Active underline indicator */}
    {isActive && (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
    )}
  </Link>
);

interface NavbarProps {
  activeTab?: string;
}

const Navbar = ({ activeTab }: NavbarProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const getIsActive = (path: string, label: string) => {
    if (activeTab) return activeTab === label;
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-foreground font-montserrat tracking-tight">
            Cibeey
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavItem 
              icon={<Home size={22} strokeWidth={1.5} />} 
              label="Home" 
              to="/" 
              isActive={getIsActive('/', 'Home')} 
            />
            <NavItem 
              icon={<FileText size={22} strokeWidth={1.5} />} 
              label="Menu" 
              to="/menu" 
              isActive={getIsActive('/menu', 'Menu')} 
            />
            <NavItem 
              icon={<CalendarCheck size={22} strokeWidth={1.5} />} 
              label="Orders" 
              to="/orders" 
              isActive={getIsActive('/orders', 'Orders')} 
            />
            <NavItem 
              icon={<UtensilsCrossed size={22} strokeWidth={1.5} />} 
              label="Avail" 
              to="/avail" 
              isActive={getIsActive('/avail', 'Avail')} 
            />
            <NavItem 
              icon={<ShoppingCart size={22} strokeWidth={1.5} />} 
              label="Cart" 
              to="/cart" 
              isActive={getIsActive('/cart', 'Cart')} 
            />
          </nav>

          {/* Profile Icon */}
          <button 
            onClick={() => setProfileOpen(true)}
            className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
          >
            <div className="w-4 h-4 rounded-full border-2 border-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around pt-4 mt-4 border-t border-border">
          <NavItem 
            icon={<Home size={20} strokeWidth={1.5} />} 
            label="Home" 
            to="/" 
            isActive={getIsActive('/', 'Home')} 
          />
          <NavItem 
            icon={<FileText size={20} strokeWidth={1.5} />} 
            label="Menu" 
            to="/menu" 
            isActive={getIsActive('/menu', 'Menu')} 
          />
          <NavItem 
            icon={<CalendarCheck size={20} strokeWidth={1.5} />} 
            label="Orders" 
            to="/orders" 
            isActive={getIsActive('/orders', 'Orders')} 
          />
          <NavItem 
            icon={<UtensilsCrossed size={20} strokeWidth={1.5} />} 
            label="Avail" 
            to="/avail" 
            isActive={getIsActive('/avail', 'Avail')} 
          />
          <NavItem 
            icon={<ShoppingCart size={20} strokeWidth={1.5} />} 
            label="Cart" 
            to="/cart" 
            isActive={getIsActive('/cart', 'Cart')} 
          />
        </nav>
      </div>

      {/* User Profile Sheet */}
      <UserProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  );
};

export default Navbar;

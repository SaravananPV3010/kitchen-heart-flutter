import { Home, LayoutGrid, ClipboardList, UtensilsCrossed, ShoppingCart } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, isActive }: NavItemProps) => (
  <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-center gap-12 md:gap-16">
          <NavItem icon={<Home size={24} strokeWidth={2} />} label="Home" isActive />
          <NavItem icon={<LayoutGrid size={24} strokeWidth={2} />} label="Menu" />
          <NavItem icon={<ClipboardList size={24} strokeWidth={2} />} label="Orders" />
          <NavItem icon={<UtensilsCrossed size={24} strokeWidth={2} />} label="Avail" />
          <NavItem icon={<ShoppingCart size={24} strokeWidth={2} />} label="Cart" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

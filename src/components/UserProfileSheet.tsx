import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Pencil } from 'lucide-react';

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileSheet = ({ open, onOpenChange }: UserProfileSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[400px] bg-background overflow-y-auto">
        {/* Edit Icon */}
        <button className="absolute top-4 right-12 p-2 hover:bg-muted rounded-full transition-colors">
          <Pencil size={20} className="text-foreground" />
        </button>

        <SheetHeader className="pt-8 pb-4">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center bg-muted">
              <User size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Name</h2>
          </div>
        </SheetHeader>

        {/* Profile Form */}
        <div className="space-y-5 mt-6">
          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">Name</label>
            <input 
              type="text" 
              defaultValue="Abdul kalam"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">Mobile Number</label>
            <input 
              type="tel" 
              defaultValue="+91-9158628645"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">Email ID</label>
            <input 
              type="email" 
              defaultValue="abdulkalam@gmail.com"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-start gap-4">
            <label className="w-32 text-foreground font-medium text-sm pt-2">Address</label>
            <textarea 
              rows={3}
              defaultValue="58/11 sample street, Modern via, In This, Place. Pin - 635602"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">Landmark</label>
            <input 
              type="text" 
              defaultValue="Nearby"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">City / State</label>
            <input 
              type="text" 
              defaultValue="Place"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">PIN</label>
            <input 
              type="text" 
              defaultValue="635602"
              className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 text-foreground font-medium text-sm">Payment Method</label>
            <Select defaultValue="cod">
              <SelectTrigger className="flex-1 bg-background text-sm">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="cod">Cash on Delivery</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6" />

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-2">
          <span className="text-foreground font-medium">Dark Mode</span>
          <Switch />
        </div>

        {/* Sign Out */}
        <button className="w-full text-left py-3 text-muted-foreground hover:text-foreground transition-colors">
          Sign-Out
        </button>

        {/* Delete Account */}
        <button className="w-full text-left py-3 text-red-500 hover:text-red-600 transition-colors">
          Delete Account
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;

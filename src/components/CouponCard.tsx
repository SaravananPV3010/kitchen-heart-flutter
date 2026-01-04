import { Ticket, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CouponCardProps {
  code: string;
  discount: string;
  minOrder?: number;
  maxDiscount?: number;
  description: string;
}

const CouponCard = ({ code, discount, minOrder, maxDiscount, description }: CouponCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: 'Coupon copied!',
      description: `Code "${code}" copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gradient-to-r from-primary/5 to-accent/30 border border-dashed border-primary/30 rounded-xl p-4 overflow-hidden">
      {/* Ticket cutout decoration */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full" />
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Ticket size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary text-lg">{discount}</span>
            <span className="text-xs text-muted-foreground">OFF</span>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          {minOrder && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Min. order: ₹{minOrder} {maxDiscount && `| Max: ₹${maxDiscount}`}
            </p>
          )}
        </div>
        
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="font-mono">{code}</span>
        </button>
      </div>
    </div>
  );
};

export default CouponCard;

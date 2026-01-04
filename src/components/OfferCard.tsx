import { Tag, Percent, Gift, Clock } from 'lucide-react';

interface OfferCardProps {
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  type: 'percentage' | 'flat' | 'bogo';
}

const OfferCard = ({ title, description, code, discount, validUntil, type }: OfferCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-6 h-6" />;
      case 'bogo':
        return <Gift className="w-6 h-6" />;
      default:
        return <Tag className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-lg text-sm">
              {discount}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{validUntil}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Use code:</span>
          <code className="bg-muted px-3 py-1.5 rounded-lg text-sm font-mono font-semibold text-foreground">
            {code}
          </code>
        </div>
        <button className="text-primary text-sm font-medium hover:underline">
          Apply
        </button>
      </div>
    </div>
  );
};

export default OfferCard;

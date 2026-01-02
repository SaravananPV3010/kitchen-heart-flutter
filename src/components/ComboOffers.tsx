import thali from '@/assets/thali.png';

interface OfferCardProps {
  label: string;
  title: string;
  bgColor: string;
  image?: string;
  imagePosition?: 'left' | 'right';
}

const OfferCard = ({ label, title, bgColor, image, imagePosition = 'right' }: OfferCardProps) => (
  <div 
    className="offer-card relative overflow-hidden cursor-pointer h-24 md:h-28 flex items-center"
    style={{ backgroundColor: bgColor }}
  >
    {/* Image on left side */}
    {image && imagePosition === 'left' && (
      <div className="w-20 h-20 flex-shrink-0 ml-2">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
    )}
    
    <div className={`relative z-10 flex-1 ${imagePosition === 'left' ? 'pl-2 pr-4' : 'pl-4 pr-2'}`}>
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <h4 className="text-sm font-semibold text-foreground mt-0.5 leading-tight">
        {title}
      </h4>
    </div>
    
    {/* Image on right side */}
    {image && imagePosition === 'right' && (
      <div className="w-20 h-20 flex-shrink-0 mr-2">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
    )}
  </div>
);

const offers = [
  { label: "Mini Meals", title: "Unlimited meals for Rupee 100", bgColor: "hsl(30 60% 95%)", image: undefined, imagePosition: 'right' as const },
  { label: "AD @ 30%", title: "30% OFF for The Combo Breakfast", bgColor: "hsl(25 80% 92%)", image: thali, imagePosition: 'right' as const },
  { label: "AD @ 10%", title: "30% OFF for The Combo Breakfast", bgColor: "hsl(40 60% 94%)", image: thali, imagePosition: 'left' as const },
  { label: "Mini Meals", title: "Unlimited meals for Rupee 100", bgColor: "hsl(20 70% 94%)", image: thali, imagePosition: 'right' as const },
];

const ComboOffers = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Combo Offer</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {offers.map((offer, index) => (
            <OfferCard 
              key={index}
              label={offer.label}
              title={offer.title}
              bgColor={offer.bgColor}
              image={offer.image}
              imagePosition={offer.imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboOffers;

import thali from '@/assets/thali.png';

interface OfferCardProps {
  discount: string;
  title: string;
  bgColor: string;
  image?: string;
}

const OfferCard = ({ discount, title, bgColor, image }: OfferCardProps) => (
  <div 
    className="offer-card relative overflow-hidden cursor-pointer"
    style={{ backgroundColor: bgColor }}
  >
    <div className="relative z-10">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {discount}
      </span>
      <h4 className="text-lg font-semibold text-foreground mt-1 leading-tight">
        {title}
      </h4>
    </div>
    {image && (
      <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-80">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
    )}
  </div>
);

const offers = [
  { discount: "AD @ 10%", title: "Unlimited meals for Rupee 100", bgColor: "hsl(20 100% 95%)" },
  { discount: "AD @ 30%", title: "30% OFF for The Combo Breakfast", bgColor: "hsl(25 100% 92%)" },
  { discount: "AD @ 10%", title: "30% OFF for The Combo Breakfast", bgColor: "hsl(40 100% 95%)" },
  { discount: "AD @ 10%", title: "Unlimited meals for Rupee 100", bgColor: "hsl(12 100% 95%)" },
];

const ComboOffers = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h3 className="section-title mb-4">Combo Offer</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {offers.map((offer, index) => (
            <OfferCard 
              key={index}
              discount={offer.discount}
              title={offer.title}
              bgColor={offer.bgColor}
              image={index % 2 === 1 ? thali : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboOffers;

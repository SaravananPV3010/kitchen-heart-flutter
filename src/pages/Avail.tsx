import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OfferCard from "@/components/OfferCard";
import CouponCard from "@/components/CouponCard";
import { Sparkles, UtensilsCrossed } from "lucide-react";

const Avail = () => {
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = [
    { day: "SUN", date: 9, month: "FEB" },
    { day: "MON", date: 10, month: "FEB" },
    { day: "TUE", date: 11, month: "FEB" },
    { day: "WED", date: 12, month: "FEB" },
    { day: "THU", date: 13, month: "FEB" },
    { day: "FRI", date: 14, month: "FEB" },
    { day: "SAT", date: 15, month: "FEB" },
    { day: "SUN", date: 16, month: "FEB" },
    { day: "MON", date: 17, month: "FEB" },
    { day: "TUE", date: 18, month: "FEB" },
    { day: "WED", date: 19, month: "FEB" },
    { day: "THU", date: 20, month: "FEB" },
  ];

  const offers = [
    {
      title: "Weekend Special",
      description: "Get 25% off on all thali meals every Saturday and Sunday",
      code: "WEEKEND25",
      discount: "25% OFF",
      validUntil: "Valid till Feb 28",
      type: "percentage" as const,
    },
    {
      title: "Buy 1 Get 1 Free",
      description: "Order any dosa and get another one absolutely free",
      code: "BOGO",
      discount: "BOGO",
      validUntil: "Valid till Feb 15",
      type: "bogo" as const,
    },
    {
      title: "First Order Discount",
      description: "Flat ₹100 off on your first order with us",
      code: "FIRST100",
      discount: "₹100 OFF",
      validUntil: "For new users",
      type: "flat" as const,
    },
  ];

  const coupons = [
    {
      code: "SAVE20",
      discount: "20%",
      minOrder: 300,
      maxDiscount: 100,
      description: "On orders above ₹300",
    },
    {
      code: "FLAT50",
      discount: "₹50",
      minOrder: 200,
      description: "Flat ₹50 off on orders above ₹200",
    },
    {
      code: "LUNCH15",
      discount: "15%",
      minOrder: 250,
      maxDiscount: 75,
      description: "Valid 12PM - 3PM only",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navbar activeTab="Avail" />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Offers Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Special Offers</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>
        </section>

        {/* Coupons Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Available Coupons</h2>
          </div>
          <div className="space-y-3">
            {coupons.map((coupon, index) => (
              <CouponCard key={index} {...coupon} />
            ))}
          </div>
        </section>

        {/* Date Picker */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Reserve a Table</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-4">
              {dates.map((d, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(index)}
                  className={`flex flex-col items-center min-w-[60px] px-3 py-2 rounded-lg transition-colors ${
                    selectedDate === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xs font-medium">{d.day}</span>
                  <span className="text-xl font-bold">{d.date}</span>
                  <span className="text-xs">{d.month}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Reserve Table Button */}
        <div className="flex justify-center my-6">
          <Button className="px-12 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Reserve Table
          </Button>
        </div>

        {/* Level 1 Floor Plan */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Level 1</h2>
          <div className="flex justify-center">
            <FloorPlanLevel1 />
          </div>
        </div>

        {/* Level 2 Floor Plan */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Level 2</h2>
          <div className="flex justify-center">
            <FloorPlanLevel2 />
          </div>
        </div>
      </main>
    </div>
  );
};

const FloorPlanLevel1 = () => {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md" fill="none">
      {/* Main outline */}
      <rect x="50" y="20" width="250" height="280" stroke="#888" strokeWidth="1" fill="none" />
      
      {/* Restroom area */}
      <rect x="240" y="20" width="60" height="50" stroke="#888" strokeWidth="1" fill="none" />
      <text x="255" y="50" fontSize="10" fill="#666">Restroom</text>
      
      {/* Lift area */}
      <rect x="240" y="100" width="60" height="80" stroke="#888" strokeWidth="1" fill="none" />
      <text x="265" y="145" fontSize="10" fill="#666" transform="rotate(90, 265, 145)">Lift</text>
      
      {/* Reception area */}
      <rect x="240" y="200" width="60" height="80" stroke="#888" strokeWidth="1" fill="none" />
      <text x="265" y="245" fontSize="10" fill="#666" transform="rotate(90, 265, 245)">Reception</text>
      
      {/* Tables Row 1 */}
      <rect x="70" y="40" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="100" y="40" width="25" height="25" rx="3" fill="#9ca3af" />
      <ellipse cx="145" cy="52" rx="12" ry="10" fill="#9ca3af" />
      <ellipse cx="165" cy="52" rx="12" ry="10" fill="#9ca3af" />
      <ellipse cx="195" cy="52" rx="12" ry="10" fill="#9ca3af" />
      
      {/* Tables Row 2 */}
      <rect x="70" y="85" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="100" y="85" width="25" height="25" rx="3" fill="#9ca3af" />
      <ellipse cx="145" cy="97" rx="12" ry="10" fill="#9ca3af" />
      <ellipse cx="165" cy="97" rx="12" ry="10" fill="#9ca3af" />
      
      {/* Tables Row 3 */}
      <rect x="70" y="130" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="95" y="130" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="130" y="130" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="165" y="130" width="30" height="15" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 4 */}
      <rect x="70" y="165" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="95" y="165" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="180" y="165" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="215" y="165" width="15" height="15" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 5 */}
      <rect x="70" y="200" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="100" y="200" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="145" y="200" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="180" y="200" width="30" height="15" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 6 */}
      <rect x="70" y="245" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="100" y="245" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="145" y="245" width="25" height="20" rx="3" fill="#9ca3af" />
      <rect x="175" y="245" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="210" y="245" width="20" height="20" rx="3" fill="#9ca3af" />
      
      {/* Entrance curve */}
      <path d="M 300 280 Q 320 300 300 320" stroke="#888" strokeWidth="1" fill="none" />
    </svg>
  );
};

const FloorPlanLevel2 = () => {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md" fill="none">
      {/* Main outline */}
      <rect x="50" y="20" width="250" height="280" stroke="#888" strokeWidth="1" fill="none" />
      
      {/* Restroom area */}
      <rect x="240" y="20" width="60" height="50" stroke="#888" strokeWidth="1" fill="none" />
      <text x="255" y="50" fontSize="10" fill="#666">Restroom</text>
      
      {/* Lift area */}
      <rect x="240" y="100" width="60" height="80" stroke="#888" strokeWidth="1" fill="none" />
      <text x="265" y="145" fontSize="10" fill="#666" transform="rotate(90, 265, 145)">Lift</text>
      
      {/* Tables Row 1 */}
      <rect x="70" y="40" width="25" height="20" rx="3" fill="#9ca3af" />
      <ellipse cx="115" cy="50" rx="12" ry="10" fill="#9ca3af" />
      <ellipse cx="135" cy="50" rx="12" ry="10" fill="#9ca3af" />
      
      {/* Tables Row 2 */}
      <rect x="70" y="80" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="110" y="80" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="145" y="80" width="30" height="15" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 3 */}
      <rect x="70" y="120" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="130" y="120" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="165" y="120" width="30" height="15" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 4 */}
      <rect x="70" y="165" width="20" height="20" rx="3" fill="#9ca3af" />
      <rect x="130" y="165" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="165" y="165" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="210" y="165" width="20" height="20" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 5 */}
      <rect x="70" y="210" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="130" y="210" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="165" y="210" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="210" y="200" width="20" height="50" rx="3" fill="#9ca3af" />
      
      {/* Tables Row 6 */}
      <rect x="70" y="255" width="25" height="25" rx="3" fill="#9ca3af" />
      <rect x="130" y="255" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="165" y="255" width="30" height="15" rx="3" fill="#9ca3af" />
      <rect x="210" y="260" width="20" height="30" rx="3" fill="#9ca3af" />
    </svg>
  );
};

export default Avail;

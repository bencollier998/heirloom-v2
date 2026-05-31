import React, { useState, useRef } from 'react';
import { 
  Coffee, 
  Clock, 
  ChevronRight,
  Utensils, 
  Leaf,
  Menu as MenuIcon,
  X,
  MapPin,
  ChevronLeft,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#top' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#' },
  { name: 'Locations', href: '#' },
];

const MENU_ITEMS = [
  { category: 'Seasonal Tart', title: 'Caramel Apple Tart', description: 'Orchard apples baked with caramel in a flaky crust.', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13', icon: Utensils, ingredients: 'Apple, caramel, butter pastry', prep: '5–10 min', price: 5.50 },
  { category: 'Coffee', title: 'Maple Pecan Latte', description: 'Espresso with maple syrup and toasted pecans.', image: 'https://images.unsplash.com/photo-1695459003559-a84af05f043e', icon: Coffee, ingredients: 'Espresso, maple, pecan, oat milk', prep: '3–5 min', price: 4.80 },
  { category: 'Bakery', title: 'Cinnamon Bun', description: 'Flaky pastry with warm cinnamon sugar.', image: 'https://images.unsplash.com/photo-1593872571314-4a735d4b27b0', icon: Leaf, ingredients: 'Flour, cinnamon, brown sugar, butter', prep: '5 min', price: 3.80 },
  { category: 'Tea', title: 'House Chai', description: 'Spiced chai brewed with black tea and honey.', image: 'https://images.unsplash.com/photo-1519532059956-a63a37af5deb', icon: Clock, ingredients: 'Black tea, cardamom, ginger, honey', prep: '5–8 min', price: 4.20 },
  { category: 'Coffee', title: 'Pumpkin Spice Flat White', description: 'Velvety espresso with pumpkin spice and steamed milk.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', icon: Coffee, ingredients: 'Espresso, pumpkin spice, whole milk', prep: '3–5 min', price: 4.80 },
  { category: 'Bakery', title: 'Carrot Cake', description: 'Moist spiced carrot cake with cream cheese frosting.', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', icon: Utensils, ingredients: 'Carrot, cinnamon, cream cheese, walnuts', prep: '2 min', price: 4.50 },
  { category: 'Hot Drink', title: 'Butterscotch Hot Chocolate', description: 'Creamy hot chocolate with a rich butterscotch swirl.', image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25', icon: Coffee, ingredients: 'Dark chocolate, butterscotch, steamed milk', prep: '5 min', price: 4.50 },
  { category: 'Cold Drink', title: 'Spiced Apple Juice', description: 'Warm pressed apple juice with cinnamon and star anise.', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371', icon: Leaf, ingredients: 'Pressed apple, cinnamon, star anise, clove', prep: '3 min', price: 3.50 },
  { category: 'Bakery', title: 'Brown Butter Walnut Tart', description: 'Buttery tart shell filled with caramelised walnuts and brown butter custard.', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814', icon: Utensils, ingredients: 'Brown butter, walnuts, custard, pastry', prep: '5 min', price: 5.80 },
  { category: 'Coffee', title: 'Golden Hour Latte', description: 'Turmeric and oat milk latte with a touch of honey and black pepper.', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f', icon: Coffee, ingredients: 'Turmeric, oat milk, honey, black pepper', prep: '3–5 min', price: 4.60 },
  { category: 'Bakery', title: 'Harvest Oat Cookie', description: 'Thick oat cookie with dried cranberry, dark chocolate and toasted seeds.', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e', icon: Leaf, ingredients: 'Oats, cranberry, dark chocolate, seeds', prep: '2 min', price: 2.80 },
  { category: 'Cold Drink', title: 'Ember Cold Brew', description: 'Slow-steeped cold brew with a hint of smoked vanilla and maple.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', icon: Coffee, ingredients: 'Cold brew, smoked vanilla, maple syrup', prep: '2 min', price: 4.20 },
];

const BEST_SELLERS = [
  { label: 'I Want a Latte', emoji: '☕', filter: 'Coffee', desc: 'Warm, velvety and indulgent' },
  { label: 'Something Cold', emoji: '🧊', filter: 'Cold Drink', desc: 'Cool, crisp and refreshing' },
  { label: 'A Cosy Pastry', emoji: '🥐', filter: 'Bakery', desc: 'Flaky, warm and comforting' },
  { label: 'Fireside Snack', emoji: '🍂', filter: 'Seasonal Tart', desc: 'Seasonal and soul-warming' },
  { label: 'Something Herbal', emoji: '🍵', filter: 'Tea', desc: 'Spiced, soothing and slow' },
  { label: 'A Sweet Treat', emoji: '🍫', filter: 'Hot Drink', desc: 'Rich, sweet and warming' },
];

const SHOP_ITEMS = [
  { name: 'Heirloom Signature Blend', desc: '250g whole bean coffee, sourced from our partner farms in Colombia and Ethiopia.', price: 14.00, emoji: '☕' },
  { name: 'Barista Bear', desc: 'Our beloved mascot in plush form. Comes with a tiny Heirloom apron. Limited edition.', price: 22.00, emoji: '🧸' },
  { name: 'Autumn Roast Gift Set', desc: 'Three seasonal roasts beautifully packaged in a kraft box. Perfect gift.', price: 38.00, emoji: '🎁' },
  { name: 'Heirloom Canvas Tote', desc: 'Heavyweight canvas tote with our leaf logo. Naturally dyed in warm ochre.', price: 18.00, emoji: '🛍️' },
  { name: 'Ceramic Keep Cup', desc: 'Hand-thrown ceramic keep cup in our signature cream glaze. 8oz.', price: 28.00, emoji: '🍵' },
  { name: 'Heirloom Enamel Pin', desc: 'Collectible enamel pin featuring our leaf logo in gold and orange.', price: 8.00, emoji: '📌' },
];

type BagItem = { title: string; price: number; qty: number };

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const GalleryModal = ({ onClose }: { onClose: () => void }) => {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', alt: 'Cozy cafe interior' },
    { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600', alt: 'Latte art' },
    { src: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=600', alt: 'Autumn pastries' },
    { src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600', alt: 'Barista at work' },
    { src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600', alt: 'Coffee beans' },
    { src: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600', alt: 'Seasonal tart' },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream-light rounded-[2rem] p-8 max-w-2xl w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
        <div className="flex items-center gap-2 mb-6"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Gallery</span></div>
        <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-8">Moments from Our Café</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.alt} className="aspect-square rounded-2xl overflow-hidden">
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const LocationsModal = ({ onClose }: { onClose: () => void }) => {
  const locations = [
    { name: 'Heirloom — Marylebone', address: '14 Paddington Street, London W1U 5AS', hours: 'Mon–Fri 7am–6pm · Sat–Sun 8am–5pm', maps: 'https://maps.google.com/?q=14+Paddington+Street+London' },
    { name: 'Heirloom — Swansea', address: '7 Wind Street, Swansea SA1 1DP', hours: 'Mon–Fri 7am–6pm · Sat–Sun 8am–5pm', maps: 'https://maps.google.com/?q=7+Wind+Street+Swansea' },
    { name: 'Heirloom — Paris', address: '23 Rue de Bretagne, Paris 75003', hours: 'Mon–Sun 8am–7pm', maps: 'https://maps.google.com/?q=23+Rue+de+Bretagne+Paris' },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream-light rounded-[2rem] p-10 max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
        <div className="flex items-center gap-2 mb-6"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Locations</span></div>
        <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-8">Find Us</h2>
        <div className="space-y-6">
          {locations.map((loc) => (
            <div key={loc.name} className="border-b border-brand-brown/10 pb-6 last:border-0 last:pb-0">
              <h3 className="font-serif font-bold text-brand-brown text-lg italic mb-2">{loc.name}</h3>
              <div className="flex items-start gap-2 mb-1"><MapPin size={14} className="text-brand-orange mt-0.5 shrink-0" /><p className="text-brand-brown/70 text-sm">{loc.address}</p></div>
              <div className="flex items-start gap-2 mb-3"><Clock size={14} className="text-brand-orange mt-0.5 shrink-0" /><p className="text-brand-brown/70 text-sm">{loc.hours}</p></div>
              <a href={loc.maps} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-brand-orange hover:text-brand-brown transition border-b border-brand-orange/30 pb-0.5">Get Directions →</a>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ShopCheckoutModal = ({ bag, onClose }: { bag: BagItem[]; onClose: () => void }) => {
  const [step, setStep] = useState<'choose' | 'delivery' | 'pickup' | 'confirmed'>('choose');
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', address: '', email: '' });
  const [pickupInfo, setPickupInfo] = useState({ name: '', email: '', store: 'Marylebone', time: '' });
  const [errors, setErrors] = useState<string[]>([]);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const total = bag.reduce((sum, b) => sum + b.price * b.qty, 0);

  const validateDelivery = () => {
    const e: string[] = [];
    if (!deliveryInfo.name.trim()) e.push('Full name is required');
    if (!deliveryInfo.email.trim()) e.push('Email address is required');
    if (!deliveryInfo.address.trim()) e.push('Delivery address is required');
    setErrors(e);
    return e.length === 0;
  };

  const validatePickup = () => {
    const e: string[] = [];
    if (!pickupInfo.name.trim()) e.push('Your name is required');
    if (!pickupInfo.email.trim()) e.push('Email address is required');
    if (!pickupInfo.time) e.push('Please select a pickup time');
    setErrors(e);
    return e.length === 0;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-lg relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
        {step === 'confirmed' ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🛍️</div>
            <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Order Confirmed</span></div>
            <h2 className="text-4xl font-serif font-black italic text-brand-brown mb-4">Thank You!</h2>
            <p className="text-brand-brown/60 text-sm mb-6">Your order is confirmed. We'll be in touch shortly.</p>
            <div className="bg-brand-cream-light rounded-2xl p-6 mb-6">
              <p className="text-[10px] uppercase tracking-widest text-brand-brown/50 mb-2">Order Number</p>
              <p className="text-3xl font-serif font-black italic text-brand-orange">#{orderNumber}</p>
            </div>
            <button onClick={onClose} className="mt-4 bg-brand-brown text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">Done</button>
          </div>
        ) : step === 'delivery' ? (
          <div>
            <button onClick={() => { setStep('choose'); setErrors([]); }} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-2"><Truck size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Delivery</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">Delivery Details</h2>
            {errors.length > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">{errors.map(e => <p key={e} className="text-red-600 text-xs">· {e}</p>)}</div>}
            <div className="space-y-4 mb-8">
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Full Name *</label><input value={deliveryInfo.name} onChange={e => setDeliveryInfo(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Email Address *</label><input value={deliveryInfo.email} onChange={e => setDeliveryInfo(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Delivery Address *</label><input value={deliveryInfo.address} onChange={e => setDeliveryInfo(p => ({ ...p, address: e.target.value }))} placeholder="12 Example Street, London" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
            </div>
            <div className="border-t border-brand-brown/10 pt-4 mb-6">
              <div className="flex justify-between text-sm"><span className="text-brand-brown/60">Subtotal</span><span className="font-bold text-brand-brown">£{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm mt-2"><span className="text-brand-brown/60">Delivery</span><span className="font-bold text-brand-brown">£4.99</span></div>
              <div className="flex justify-between text-sm mt-2 pt-2 border-t border-brand-brown/10"><span className="font-bold text-brand-brown">Total</span><span className="font-bold text-brand-orange text-lg">£{(total + 4.99).toFixed(2)}</span></div>
            </div>
            <button onClick={() => { if (validateDelivery()) setStep('confirmed'); }} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Pay £{(total + 4.99).toFixed(2)} → Confirm Order</button>
          </div>
        ) : step === 'pickup' ? (
          <div>
            <button onClick={() => { setStep('choose'); setErrors([]); }} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-2"><Store size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Store Pickup</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">Pickup Details</h2>
            {errors.length > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">{errors.map(e => <p key={e} className="text-red-600 text-xs">· {e}</p>)}</div>}
            <div className="space-y-4 mb-8">
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Your Name *</label><input value={pickupInfo.name} onChange={e => setPickupInfo(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Email Address *</label><input value={pickupInfo.email} onChange={e => setPickupInfo(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Store</label><select value={pickupInfo.store} onChange={e => setPickupInfo(p => ({ ...p, store: e.target.value }))} className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1"><option>Marylebone, London</option><option>Swansea</option><option>Paris</option></select></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Pickup Time *</label><select value={pickupInfo.time} onChange={e => setPickupInfo(p => ({ ...p, time: e.target.value }))} className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1"><option value="">Select a time</option>{['9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm'].map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
            <div className="border-t border-brand-brown/10 pt-4 mb-6">
              <div className="flex justify-between text-sm"><span className="font-bold text-brand-brown">Total</span><span className="font-bold text-brand-orange text-lg">£{total.toFixed(2)}</span></div>
              <p className="text-brand-brown/40 text-xs mt-1">No delivery charge for store pickup</p>
            </div>
            <button onClick={() => { if (validatePickup()) setStep('confirmed'); }} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Pay £{total.toFixed(2)} → Confirm Order</button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Checkout</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">How would you like to receive your order?</h2>
            <div className="space-y-4 mb-8">
              {bag.map(b => (
                <div key={b.title} className="flex justify-between items-center bg-brand-cream-light rounded-2xl px-5 py-3">
                  <span className="font-serif italic text-brand-brown text-sm">{b.title} × {b.qty}</span>
                  <span className="text-brand-orange font-bold text-sm">£{(b.price * b.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setStep('pickup')} className="flex items-center justify-center gap-2 border-2 border-brand-brown text-brand-brown py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown hover:text-white transition"><Store size={14} /> Store Pickup</button>
              <button onClick={() => setStep('delivery')} className="flex items-center justify-center gap-2 bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition"><Truck size={14} /> Delivery</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ShopModal = ({ onClose }: { onClose: () => void }) => {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const addToBag = (item: typeof SHOP_ITEMS[0]) => {
    setBag(prev => {
      const existing = prev.find(b => b.title === item.name);
      if (existing) return prev.map(b => b.title === item.name ? { ...b, qty: b.qty + 1 } : b);
      return [...prev, { title: item.name, price: item.price, qty: 1 }];
    });
  };
  const total = bag.reduce((sum, b) => sum + b.price * b.qty, 0);
  const totalItems = bag.reduce((sum, b) => sum + b.qty, 0);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
          <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
          <div className="flex items-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Shop</span></div>
          <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-2">The Heirloom Store</h2>
          <p className="text-brand-brown/60 text-sm mb-8">Take a piece of Heirloom home with you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {SHOP_ITEMS.map((p) => {
              const bagItem = bag.find(b => b.title === p.name);
              return (
                <div key={p.name} className="bg-brand-cream-light rounded-2xl p-6 flex flex-col gap-3">
                  <div className="text-3xl">{p.emoji}</div>
                  <div><h3 className="font-serif font-bold italic text-brand-brown text-lg">{p.name}</h3><p className="text-brand-brown/60 text-xs mt-1 leading-relaxed">{p.desc}</p></div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-brown/10">
                    <span className="font-bold text-brand-orange text-sm">£{p.price.toFixed(2)}</span>
                    {bagItem ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setBag(prev => prev.map(b => b.title === p.name ? { ...b, qty: Math.max(0, b.qty - 1) } : b).filter(b => b.qty > 0))} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Minus size={12} /></button>
                        <span className="font-bold text-brand-brown text-sm w-4 text-center">{bagItem.qty}</span>
                        <button onClick={() => addToBag(p)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Plus size={12} /></button>
                      </div>
                    ) : (
                      <button onClick={() => addToBag(p)} className="bg-brand-brown text-white px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">Add to Bag</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {totalItems > 0 && <button onClick={() => setShowCheckout(true)} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Checkout ({totalItems} items) · £{total.toFixed(2)}</button>}
        </motion.div>
      </motion.div>
      <AnimatePresence>{showCheckout && <ShopCheckoutModal bag={bag} onClose={() => setShowCheckout(false)} />}</AnimatePresence>
    </>
  );
};

const CareersModal = ({ onClose }: { onClose: () => void }) => {
  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', statement: '' });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const jobs = [
    { title: 'Junior Barista', location: 'Marylebone, London', type: 'Full Time', desc: "We're looking for a passionate, curious Junior Barista to join our Marylebone team.", reqs: ['A love of coffee and hospitality', 'Positive energy and team spirit', 'Flexibility across weekday and weekend shifts', 'Experience helpful but not essential — we train!'] },
    { title: 'Pastry Assistant', location: 'Swansea', type: 'Part Time', desc: "Join our Swansea kitchen team and help craft the seasonal bakes that our customers love.", reqs: ['Basic baking knowledge', 'Early morning availability', 'Attention to detail', 'Food hygiene certificate (or willingness to obtain)'] },
    { title: 'Front of House Lead', location: 'Paris', type: 'Full Time', desc: "Our Paris location is growing and we need a confident, warm Front of House Lead to run the floor.", reqs: ['Previous hospitality leadership experience', 'English and French speaker preferred', 'Calm under pressure', 'Passion for exceptional guest experience'] },
  ];
  const wordCount = form.statement.trim().split(/\s+/).filter(Boolean).length;
  const handleSubmit = () => {
    const e: string[] = [];
    if (!form.email.trim()) e.push('Email address is required');
    if (!/\S+@\S+\.\S+/.test(form.email)) e.push('Please enter a valid email address');
    if (wordCount < 10) e.push('Please write at least a short personal statement');
    if (wordCount > 250) e.push('Personal statement must be 250 words or fewer');
    setErrors(e);
    if (e.length === 0) setSubmitted(true);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
        {submitted ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">☕</div>
            <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Application Sent</span></div>
            <h2 className="text-4xl font-serif font-black italic text-brand-brown mb-4">Thank You!</h2>
            <p className="text-brand-brown/60 text-sm mb-2">We've received your application for <strong className="text-brand-brown">{applyingFor}</strong>.</p>
            <p className="text-brand-brown/60 text-sm">We'll be in touch soon.</p>
            <button onClick={onClose} className="mt-8 bg-brand-brown text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">Done</button>
          </div>
        ) : applyingFor ? (
          <div>
            <button onClick={() => { setApplyingFor(null); setErrors([]); setForm({ email: '', statement: '' }); }} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back to Jobs</button>
            <div className="flex items-center gap-2 mb-2"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Apply</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-1">{applyingFor}</h2>
            <p className="text-brand-brown/50 text-sm mb-8">Tell us why you'd be a great fit for this role.</p>
            {errors.length > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">{errors.map(e => <p key={e} className="text-red-600 text-xs">· {e}</p>)}</div>}
            <div className="space-y-6 mb-8">
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Email Address *</label><input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Personal Statement * (max 250 words)</label>
                  <span className={`text-xs font-bold ${wordCount > 250 ? 'text-red-500' : 'text-brand-brown/40'}`}>{wordCount}/250</span>
                </div>
                <textarea value={form.statement} onChange={e => setForm(p => ({ ...p, statement: e.target.value }))} placeholder="In 250 words, tell us why you'd be a great addition to the Heirloom team..." rows={8} className="w-full border border-brand-brown/20 rounded-2xl p-4 text-sm bg-brand-cream-light outline-none resize-none leading-relaxed mt-1" />
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Send Application →</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Careers</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-2">Join Our Team</h2>
            <p className="text-brand-brown/60 text-sm mb-8">We're always looking for people who care deeply about craft and community.</p>
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.title} className="bg-brand-cream-light rounded-2xl p-6">
                  <h3 className="font-serif font-bold italic text-brand-brown text-xl">{job.title}</h3>
                  <div className="flex gap-3 mt-1 mb-3"><span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold">{job.location}</span><span className="text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">{job.type}</span></div>
                  <p className="text-brand-brown/70 text-sm leading-relaxed mb-4">{job.desc}</p>
                  <ul className="space-y-1 mb-4">{job.reqs.map(r => <li key={r} className="text-xs text-brand-brown/60 flex gap-2"><span className="text-brand-orange">→</span>{r}</li>)}</ul>
                  <button onClick={() => setApplyingFor(job.title)} className="bg-brand-brown text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">Apply Now</button>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const PressModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
      <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
      <div className="flex items-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Press</span></div>
      <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-8">In The Press</h2>
      <div className="space-y-8">
        {[
          { source: 'The Guardian', date: 'March 2024', headline: '"Heirloom Coffee Is Quietly Becoming the UK\'s Most Loved Independent Café"', body: 'In a landscape dominated by global chains, Heirloom Coffee has done something remarkable — it has made people slow down. With its warm interiors, seasonally rotating menus, and obsessive attention to sourcing, the brand has cultivated a loyal following that crosses generations.' },
          { source: 'Eater London', date: 'January 2024', headline: '"The Best Autumn Menu in London Right Now"', body: "Heirloom's autumnal offering is nothing short of stunning. From the caramel apple tart to the maple pecan latte that has become something of a cult obsession, every item on the menu feels considered and intentional." },
          { source: 'Condé Nast Traveller', date: 'November 2023', headline: '"Paris Has Fallen for a British Coffee Brand — and We Understand Why"', body: 'When Heirloom Coffee opened its doors on Rue de Bretagne, the neighbourhood was sceptical. Six weeks later, there was a queue down the street.' },
        ].map((a) => (
          <div key={a.source} className="border-b border-brand-brown/10 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-3"><span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange">{a.source}</span><span className="text-brand-brown/30 text-xs">· {a.date}</span></div>
            <h3 className="font-serif font-bold italic text-brand-brown text-xl mb-3">{a.headline}</h3>
            <p className="text-brand-brown/70 text-sm leading-relaxed">{a.body}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const PrivacyModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
      <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
      <div className="flex items-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Privacy</span></div>
      <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-2">Privacy Policy</h2>
      <p className="text-brand-brown/50 text-xs mb-8">Last updated: January 2024</p>
      <div className="space-y-6 text-sm text-brand-brown/70 leading-relaxed">
        {[
          { title: 'Who We Are', body: 'Heirloom Coffee Ltd is a specialty coffee company operating from London, Swansea, and Paris. We are committed to protecting your personal data.' },
          { title: 'What Data We Collect', body: 'We may collect your name, email address, delivery address, and payment information when you place an order or subscribe to our newsletter.' },
          { title: 'How We Use Your Data', body: 'Your data is used solely to process orders, send newsletters you have opted into, and improve our services. We do not sell your data to third parties. Ever.' },
          { title: 'Your Rights', body: 'Under UK GDPR, you have the right to access, correct, or delete your personal data at any time.' },
          { title: 'Cookies', body: 'Our website uses essential cookies to function correctly and optional analytics cookies to understand how visitors use our site.' },
          { title: 'Data Retention', body: 'We retain personal data only for as long as necessary. Order data is held for 7 years in line with HMRC requirements.' },
          { title: 'Contact Us', body: 'Contact our Data Protection Officer at privacy@heirloomcoffee.co.uk.' },
        ].map((s) => (
          <div key={s.title}><h3 className="font-serif font-bold italic text-brand-brown text-lg mb-2">{s.title}</h3><p>{s.body}</p></div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const OrderModal = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'cafe' | 'shop'>('cafe');
  const [bag, setBag] = useState<BagItem[]>([]);
  const [step, setStep] = useState<'menu' | 'bag' | 'delivery' | 'pickup' | 'confirmed'>('menu');
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', address: '', email: '', time: '' });
  const [pickupInfo, setPickupInfo] = useState({ name: '', email: '', store: 'Marylebone', time: '' });
  const [errors, setErrors] = useState<string[]>([]);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  const addToBag = (item: { title: string; price: number }) => {
    setBag(prev => {
      const existing = prev.find(b => b.title === item.title);
      if (existing) return prev.map(b => b.title === item.title ? { ...b, qty: b.qty + 1 } : b);
      return [...prev, { title: item.title, price: item.price, qty: 1 }];
    });
  };
  const updateQty = (title: string, delta: number) => setBag(prev => prev.map(b => b.title === title ? { ...b, qty: Math.max(0, b.qty + delta) } : b).filter(b => b.qty > 0));
  const total = bag.reduce((sum, b) => sum + b.price * b.qty, 0);
  const totalItems = bag.reduce((sum, b) => sum + b.qty, 0);

  const validateDelivery = () => {
    const e: string[] = [];
    if (!deliveryInfo.name.trim()) e.push('Full name is required');
    if (!deliveryInfo.email.trim()) e.push('Email address is required');
    if (!/\S+@\S+\.\S+/.test(deliveryInfo.email)) e.push('Please enter a valid email address');
    if (!deliveryInfo.address.trim()) e.push('Delivery address is required');
    if (!deliveryInfo.time) e.push('Please select a delivery time');
    setErrors(e); return e.length === 0;
  };
  const validatePickup = () => {
    const e: string[] = [];
    if (!pickupInfo.name.trim()) e.push('Your name is required');
    if (!pickupInfo.email.trim()) e.push('Email address is required');
    if (!/\S+@\S+\.\S+/.test(pickupInfo.email)) e.push('Please enter a valid email address');
    if (!pickupInfo.time) e.push('Please select a pickup time');
    setErrors(e); return e.length === 0;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition"><X size={24} /></button>
        {step === 'confirmed' ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-6">☕</div>
            <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Order Confirmed</span></div>
            <h2 className="text-4xl font-serif font-black italic text-brand-brown mb-4">Thank You!</h2>
            <p className="text-brand-brown/60 text-sm mb-6">Your order has been received and is being prepared with care.</p>
            <div className="bg-brand-cream-light rounded-2xl p-6 mb-6"><p className="text-[10px] uppercase tracking-widest text-brand-brown/50 mb-2">Order Number</p><p className="text-3xl font-serif font-black italic text-brand-orange">#{orderNumber}</p></div>
            <button onClick={onClose} className="mt-8 bg-brand-brown text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">Done</button>
          </div>
        ) : step === 'delivery' ? (
          <div>
            <button onClick={() => { setStep('bag'); setErrors([]); }} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-2"><Truck size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Delivery</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">Delivery Details</h2>
            {errors.length > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">{errors.map(e => <p key={e} className="text-red-600 text-xs">· {e}</p>)}</div>}
            <div className="space-y-4 mb-8">
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Full Name *</label><input value={deliveryInfo.name} onChange={e => setDeliveryInfo(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Email Address *</label><input value={deliveryInfo.email} onChange={e => setDeliveryInfo(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Delivery Address *</label><input value={deliveryInfo.address} onChange={e => setDeliveryInfo(p => ({ ...p, address: e.target.value }))} placeholder="12 Example Street, London" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Preferred Time *</label><select value={deliveryInfo.time} onChange={e => setDeliveryInfo(p => ({ ...p, time: e.target.value }))} className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1"><option value="">Select a time slot</option><option>8:00am – 10:00am</option><option>10:00am – 12:00pm</option><option>12:00pm – 2:00pm</option><option>2:00pm – 4:00pm</option></select></div>
            </div>
            <div className="border-t border-brand-brown/10 pt-4 mb-6">
              <div className="flex justify-between text-sm"><span className="text-brand-brown/60">Subtotal</span><span className="font-bold text-brand-brown">£{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm mt-2"><span className="text-brand-brown/60">Delivery</span><span className="font-bold text-brand-brown">£2.50</span></div>
              <div className="flex justify-between text-sm mt-2 pt-2 border-t border-brand-brown/10"><span className="font-bold text-brand-brown">Total</span><span className="font-bold text-brand-orange text-lg">£{(total + 2.5).toFixed(2)}</span></div>
            </div>
            <button onClick={() => { if (validateDelivery()) setStep('confirmed'); }} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Pay £{(total + 2.5).toFixed(2)} → Confirm Order</button>
          </div>
        ) : step === 'pickup' ? (
          <div>
            <button onClick={() => { setStep('bag'); setErrors([]); }} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-2"><Store size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Store Pickup</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">Pickup Details</h2>
            {errors.length > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">{errors.map(e => <p key={e} className="text-red-600 text-xs">· {e}</p>)}</div>}
            <div className="space-y-4 mb-8">
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Your Name *</label><input value={pickupInfo.name} onChange={e => setPickupInfo(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Email Address *</label><input value={pickupInfo.email} onChange={e => setPickupInfo(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1" /></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Store</label><select value={pickupInfo.store} onChange={e => setPickupInfo(p => ({ ...p, store: e.target.value }))} className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1"><option>Marylebone, London</option><option>Swansea</option><option>Paris</option></select></div>
              <div><label className="text-xs uppercase tracking-widest text-brand-brown/50 font-bold">Pickup Time *</label><select value={pickupInfo.time} onChange={e => setPickupInfo(p => ({ ...p, time: e.target.value }))} className="w-full border-b border-brand-brown/20 py-3 text-sm bg-transparent outline-none mt-1"><option value="">Select a time</option>{['8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm'].map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
            <div className="border-t border-brand-brown/10 pt-4 mb-6">
              <div className="flex justify-between text-sm"><span className="font-bold text-brand-brown">Total</span><span className="font-bold text-brand-orange text-lg">£{total.toFixed(2)}</span></div>
              <p className="text-brand-brown/40 text-xs mt-1">No delivery charge for store pickup</p>
            </div>
            <button onClick={() => { if (validatePickup()) setStep('confirmed'); }} className="w-full bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">Pay £{total.toFixed(2)} → Confirm Order</button>
          </div>
        ) : step === 'bag' ? (
          <div>
            <button onClick={() => setStep('menu')} className="text-brand-orange text-xs mb-6 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-2"><ShoppingBag size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Your Bag</span></div>
            <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-6">Review Order</h2>
            {bag.length === 0 ? <p className="text-brand-brown/50 text-sm">Your bag is empty.</p> : (
              <>
                <div className="space-y-4 mb-8">
                  {bag.map((b) => (
                    <div key={b.title} className="flex items-center justify-between bg-brand-cream-light rounded-2xl px-5 py-4">
                      <div><p className="font-serif font-bold italic text-brand-brown text-sm">{b.title}</p><p className="text-brand-brown/50 text-xs">£{b.price.toFixed(2)} each</p></div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQty(b.title, -1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Minus size={12} /></button>
                        <span className="font-bold text-brand-brown text-sm w-4 text-center">{b.qty}</span>
                        <button onClick={() => updateQty(b.title, 1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Plus size={12} /></button>
                        <span className="text-brand-orange font-bold text-sm w-14 text-right">£{(b.price * b.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brand-brown/10 pt-4 mb-8"><div className="flex justify-between"><span className="font-bold text-brand-brown">Total</span><span className="font-bold text-brand-orange text-xl">£{total.toFixed(2)}</span></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setStep('pickup')} className="flex items-center justify-center gap-2 border-2 border-brand-brown text-brand-brown py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown hover:text-white transition"><Store size={14} /> Store Pickup</button>
                  <button onClick={() => setStep('delivery')} className="flex items-center justify-center gap-2 bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition"><Truck size={14} /> Delivery</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Order Online</span></div>
              {totalItems > 0 && <button onClick={() => setStep('bag')} className="flex items-center gap-2 bg-brand-brown text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-black transition"><ShoppingBag size={14} /> Bag ({totalItems}) · £{total.toFixed(2)}</button>}
            </div>
            <div className="flex gap-2 mb-8 bg-brand-cream-light rounded-2xl p-1">
              <button onClick={() => setActiveTab('cafe')} className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition ${activeTab === 'cafe' ? 'bg-brand-brown text-white' : 'text-brand-brown/60 hover:text-brand-brown'}`}>☕ Café Menu</button>
              <button onClick={() => setActiveTab('shop')} className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition ${activeTab === 'shop' ? 'bg-brand-brown text-white' : 'text-brand-brown/60 hover:text-brand-brown'}`}>🛍️ Shop</button>
            </div>
            {activeTab === 'cafe' ? (
              <div className="space-y-3">
                {MENU_ITEMS.map((item) => {
                  const bagItem = bag.find(b => b.title === item.title);
                  return (
                    <div key={item.title} className="flex items-center gap-4 bg-brand-cream-light rounded-2xl px-5 py-4">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-grow min-w-0"><p className="font-serif font-bold italic text-brand-brown text-sm">{item.title}</p><p className="text-brand-brown/50 text-xs truncate">{item.description}</p></div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-brand-orange font-bold text-sm">£{item.price.toFixed(2)}</span>
                        {bagItem ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.title, -1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Minus size={12} /></button>
                            <span className="font-bold text-brand-brown text-sm w-4 text-center">{bagItem.qty}</span>
                            <button onClick={() => updateQty(item.title, 1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Plus size={12} /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToBag({ title: item.title, price: item.price })} className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-brown transition"><Plus size={14} /></button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {SHOP_ITEMS.map((item) => {
                  const bagItem = bag.find(b => b.title === item.name);
                  return (
                    <div key={item.name} className="flex items-center gap-4 bg-brand-cream-light rounded-2xl px-5 py-4">
                      <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                      <div className="flex-grow min-w-0"><p className="font-serif font-bold italic text-brand-brown text-sm">{item.name}</p><p className="text-brand-brown/50 text-xs truncate">{item.desc}</p></div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-brand-orange font-bold text-sm">£{item.price.toFixed(2)}</span>
                        {bagItem ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.name, -1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Minus size={12} /></button>
                            <span className="font-bold text-brand-brown text-sm w-4 text-center">{bagItem.qty}</span>
                            <button onClick={() => updateQty(item.name, 1)} className="w-7 h-7 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><Plus size={12} /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToBag({ title: item.name, price: item.price })} className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-brown transition"><Plus size={14} /></button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {totalItems > 0 && <button onClick={() => setStep('bag')} className="w-full mt-6 bg-brand-orange text-white py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brand-brown transition">View Bag ({totalItems}) · £{total.toFixed(2)}</button>}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

type CardProps = {
  title: string; category: string; description: string; image: string;
  icon: React.ElementType; ingredients: string; prep: string;
};

const Card = ({ title, category, description, image, icon: Icon, ingredients, prep }: CardProps) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex-shrink-0 w-72 md:w-80" style={{ height: '520px', perspective: '1200px' }}>
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)' }}>
        <div className="absolute inset-0 bg-brand-cream-light rounded-[2rem] overflow-hidden shadow-sm border border-brand-brown/5 flex flex-col" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '220px' }}>
            <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="p-8 flex flex-col flex-grow overflow-hidden">
            <div className="mb-3 flex items-center gap-2"><Icon size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">{category}</span></div>
            <h3 className="text-xl font-serif font-bold italic mb-3">{title}</h3>
            <p className="text-brand-brown/70 text-sm flex-grow leading-relaxed overflow-hidden">{description}</p>
            <button onClick={() => setFlipped(true)} className="flex items-center gap-2 text-brand-brown text-[10px] uppercase tracking-[0.2em] font-bold border-b border-brand-brown/10 w-fit pb-1 hover:gap-3 transition-all mt-4 flex-shrink-0">
              View Details <ChevronRight size={14} className="text-brand-orange" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl p-8 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div>
            <div className="flex items-center gap-2 mb-4"><Icon size={18} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Product Info</span></div>
            <h3 className="text-2xl font-serif font-bold italic text-brand-brown mb-4">{title}</h3>
            <p className="text-brand-brown/70 text-sm leading-relaxed mb-6">Carefully crafted with premium seasonal ingredients and artisan techniques.</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2 border-black/5"><span className="font-medium text-brand-brown">Category</span><span className="text-brand-brown/60">{category}</span></div>
              <div className="flex justify-between border-b pb-2 border-black/5"><span className="font-medium text-brand-brown">Ingredients</span><span className="text-brand-brown/60 text-right max-w-[55%]">{ingredients}</span></div>
              <div className="flex justify-between border-b pb-2 border-black/5"><span className="font-medium text-brand-brown">Prep Time</span><span className="text-brand-brown/60">{prep}</span></div>
              <div className="flex justify-between"><span className="font-medium text-brand-brown">Availability</span><span className="text-brand-orange font-semibold">In Store</span></div>
            </div>
          </div>
          <button onClick={() => setFlipped(false)} className="mt-6 bg-brand-brown text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-black transition">Back</button>
        </div>
      </div>
    </div>
  );
};

const ViewAllModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()} className="bg-brand-cream rounded-[2rem] p-8 w-full max-w-6xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
      <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown hover:text-brand-orange transition z-10"><X size={24} /></button>
      <div className="flex items-center gap-2 mb-4"><Leaf size={16} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Full Menu</span></div>
      <h2 className="text-3xl font-serif font-black italic text-brand-brown mb-8">Autumnal Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item) => <Card key={item.title} {...item} />)}
      </div>
    </motion.div>
  </motion.div>
);

const Navbar = ({ onOrderOnline }: { onOrderOnline: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const handleNavClick = (name: string) => {
    if (name === 'Gallery') setShowGallery(true);
    if (name === 'Locations') setShowLocations(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 h-20 px-6 md:px-12 flex justify-between items-center backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-brand-orange text-white flex items-center justify-center rounded-full group-hover:rotate-12 transition-transform duration-300"><Leaf size={20} fill="currentColor" /></div>
          <span className="text-2xl font-serif font-bold text-white italic">Heirloom Coffee</span>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            link.name === 'Home' || link.name === 'Menu' ? (
              <a key={link.name} href={link.href} className="text-white font-medium hover:text-brand-orange transition-colors relative group text-sm">
                {link.name}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
              </a>
            ) : (
              <button key={link.name} onClick={() => handleNavClick(link.name)} className="text-white font-medium hover:text-brand-orange transition-colors relative group text-sm">
                {link.name}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
              </button>
            )
          ))}
        </div>
        <button onClick={onOrderOnline} className="hidden md:block bg-brand-brown border border-white text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-brown transition">Order Online</button>
        <button aria-label="Toggle menu" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-brand-brown p-8 flex flex-col gap-6 md:hidden">
              {NAV_LINKS.map((link) => (
                link.name === 'Home' || link.name === 'Menu' ? (
                  <a key={link.name} href={link.href} className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
                ) : (
                  <button key={link.name} onClick={() => handleNavClick(link.name)} className="text-white text-xl text-left">{link.name}</button>
                )
              ))}
              <button onClick={() => { onOrderOnline(); setIsMenuOpen(false); }} className="text-white text-xl text-left">Order Online</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <AnimatePresence>{showGallery && <GalleryModal onClose={() => setShowGallery(false)} />}</AnimatePresence>
      <AnimatePresence>{showLocations && <LocationsModal onClose={() => setShowLocations(false)} />}</AnimatePresence>
    </>
  );
};

const Footer = ({ onShowShop, onShowCareers, onShowPress, onShowSustainability, onShowPrivacy }: {
  onShowShop: () => void; onShowCareers: () => void; onShowPress: () => void;
  onShowSustainability: () => void; onShowPrivacy: () => void;
}) => (
  <footer className="bg-[#1a0f0a] text-white pt-20 pb-16 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      <div>
        <div className="flex items-center gap-2 mb-8"><Leaf size={16} className="text-brand-orange" /><span className="font-serif text-xl italic">Heirloom Coffee</span></div>
        <p className="text-white/50 text-sm">Crafted coffee and seasonal experiences since 2012.</p>
      </div>
      <div>
        <h4 className="text-brand-orange font-bold mb-6">Shop & Links</h4>
        <ul className="space-y-3 text-white/60 text-sm">
          <li><a href="#menu" className="hover:text-brand-orange transition">Menu</a></li>
          <li><button onClick={onShowShop} className="hover:text-brand-orange transition">Shop</button></li>
          <li><a href="#story" className="hover:text-brand-orange transition">Our Story</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-brand-orange font-bold mb-6">Company</h4>
        <ul className="space-y-3 text-white/60 text-sm">
          <li><button onClick={onShowCareers} className="hover:text-brand-orange transition">Careers</button></li>
          <li><button onClick={onShowPrivacy} className="hover:text-brand-orange transition">Privacy</button></li>
          <li><button onClick={onShowPress} className="hover:text-brand-orange transition">Press</button></li>
          <li><button onClick={onShowSustainability} className="hover:text-brand-orange transition">Sustainability</button></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/30 text-sm">© 2024 Heirloom Coffee</div>
  </footer>
);

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showViewAll, setShowViewAll] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showCareers, setShowCareers] = useState(false);
  const [showPress, setShowPress] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  const filteredItems = activeFilter ? MENU_ITEMS.filter(i => i.category === activeFilter) : MENU_ITEMS;

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  return (
    <div id="top" className="bg-brand-cream min-h-screen overflow-x-hidden">
      <Navbar onOrderOnline={() => setShowOrder(true)} />

      {/* HERO */}
      <section className="relative h-screen flex items-center">
        <img src="https://plus.unsplash.com/premium_photo-1665827719939-3975a75b0062?q=80&w=1170&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Cafe" loading="eager" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6 md:px-12 max-w-2xl">
          <motion.div {...motionConfig}>
            <h1 className="text-5xl md:text-7xl font-serif text-white italic font-black leading-tight">Sweet Moments Start Here</h1>
            <p className="text-white/80 mt-6">Artisan coffee crafted with patience and care.</p>
            <a href="#menu" className="mt-8 inline-block bg-brand-orange text-white px-8 py-4 rounded-full text-xs uppercase font-bold">Explore Menu</a>
          </motion.div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-20 bg-brand-cream">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div {...motionConfig} className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={14} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">What Are You Feeling?</span></div>
            <h2 className="text-4xl md:text-5xl font-serif font-black italic text-brand-brown">Find Your Perfect Pick</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BEST_SELLERS.map((item) => (
              <motion.button
                key={item.label}
                {...motionConfig}
                onClick={() => {
                  setActiveFilter(activeFilter === item.filter ? null : item.filter);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center gap-3 p-6 rounded-[1.5rem] border-2 transition-all ${activeFilter === item.filter ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-brown/10 bg-brand-cream-light hover:border-brand-orange/50'}`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-serif font-bold italic text-brand-brown text-sm text-center">{item.label}</span>
                <span className="text-brand-brown/50 text-[10px] text-center leading-relaxed">{item.desc}</span>
              </motion.button>
            ))}
          </div>
          {activeFilter && (
            <div className="text-center mt-6">
              <button onClick={() => setActiveFilter(null)} className="text-brand-orange text-xs uppercase tracking-widest font-bold hover:text-brand-brown transition">
                Clear filter ×
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 bg-brand-cream relative">
        <div className="px-6 md:px-12">
          <div className="flex items-end justify-between mb-12 max-w-7xl mx-auto">
            <div>
              <h2 className="text-5xl md:text-6xl italic font-serif font-black mb-3">
                {activeFilter ? activeFilter : 'Autumnal Favorites'}
              </h2>
              <p className="text-brand-brown/60 text-lg">Seasonal coffee and bakery selection crafted with care.</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowViewAll(true)} className="hidden md:block bg-brand-brown text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">View All</button>
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><ChevronLeft size={18} /></button>
                <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-brown hover:text-white transition"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollSnapType: 'x mandatory', height: '580px', alignItems: 'flex-start' }}>
            {filteredItems.map((item) => (
              <div key={item.title} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <Card {...item} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button onClick={() => setShowViewAll(true)} className="bg-brand-brown text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition">View All</button>
          </div>
        </div>
      </section>

      {/* OUR STORY + SUSTAINABILITY */}
      <section id="story" className="py-24 bg-[#1a0f0a] text-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <motion.div {...motionConfig}>
              <div className="flex items-center gap-2 mb-6"><Leaf size={14} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Our Story</span></div>
              <h2 className="text-5xl md:text-6xl font-serif font-black italic mb-8 leading-tight">Rooted in Craft, Grown with Love</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-4">Heirloom Coffee was born in 2012 from a simple belief — that a great cup of coffee can make an ordinary moment extraordinary. What started as a single small café has grown into a beloved community staple, guided by the same values we started with.</p>
              <p className="text-white/70 text-sm leading-relaxed mb-8">We source our beans directly from small family farms, roast in small batches, and pair every cup with seasonal food made from scratch. Every detail is intentional. Every ingredient is chosen with care.</p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[['2012', 'Founded'], ['100%', 'Organic'], ['3', 'Locations']].map(([stat, label]) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-serif font-black italic text-brand-orange">{stat}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...motionConfig} className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" className="rounded-[2rem] w-full h-48 object-cover" alt="Cafe" />
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" className="rounded-[2rem] w-full h-48 object-cover mt-8" alt="Coffee" />
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400" className="rounded-[2rem] w-full h-48 object-cover" alt="Barista" />
              <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400" className="rounded-[2rem] w-full h-48 object-cover mt-8" alt="Beans" />
            </motion.div>
          </div>

          <motion.div {...motionConfig} className="border-t border-white/10 pt-24">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={14} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Sustainability</span></div>
              <h2 className="text-4xl md:text-5xl font-serif font-black italic">Our Commitment to the Planet</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🌱', title: 'Direct Trade Sourcing', desc: 'Every bean sourced directly from smallholder farms we have visited personally. We pay above Fairtrade prices and build long-term relationships with our farmers.' },
                { icon: '♻️', title: 'Zero Single-Use Plastic', desc: 'Since 2019, we have eliminated single-use plastic across all three locations. Our cups are compostable and we offer a 20p discount to anyone who brings their own.' },
                { icon: '🍂', title: 'Seasonal & Local Baking', desc: 'Our bakery menu changes with the seasons, using locally grown produce wherever possible to reduce food miles and support British farmers.' },
                { icon: '⚡', title: '100% Renewable Energy', desc: 'All of our UK locations run entirely on renewable energy. Our Paris location reached this milestone in early 2024.' },
                { icon: '🤝', title: 'Community Partnerships', desc: 'We partner with local food banks to donate unsold food daily. In 2023 we donated over 4,000 items across our three stores.' },
                { icon: '📦', title: 'Plastic-Free Packaging', desc: 'All retail packaging is either recycled, recyclable, or compostable. Working toward fully home-compostable packaging by 2026.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl">{item.icon}</div>
                  <div><h3 className="font-serif font-bold italic text-white text-lg mb-1">{item.title}</h3><p className="text-white/50 text-sm leading-relaxed">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-brand-cream">
        <div className="px-6 md:px-12 max-w-2xl mx-auto text-center">
          <motion.div {...motionConfig}>
            <div className="flex items-center justify-center gap-2 mb-4"><Leaf size={14} className="text-brand-orange" /><span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Stay in the Loop</span></div>
            <h2 className="text-4xl md:text-5xl font-serif font-black italic text-brand-brown mb-4">New Updates</h2>
            <p className="text-brand-brown/60 text-sm mb-10 leading-relaxed">Be the first to hear about our seasonal menu changes, new locations, events and exclusive offers. No spam — just good things.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b-2 border-brand-brown/20 py-3 text-sm outline-none focus:border-brand-orange transition-colors"
              />
              <button onClick={handleSubscribe} className="bg-brand-brown text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black transition flex-shrink-0">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>{showViewAll && <ViewAllModal onClose={() => setShowViewAll(false)} />}</AnimatePresence>
      <AnimatePresence>{showShop && <ShopModal onClose={() => setShowShop(false)} />}</AnimatePresence>
      <AnimatePresence>{showCareers && <CareersModal onClose={() => setShowCareers(false)} />}</AnimatePresence>
      <AnimatePresence>{showPress && <PressModal onClose={() => setShowPress(false)} />}</AnimatePresence>
      <AnimatePresence>{showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}</AnimatePresence>
      <AnimatePresence>{showOrder && <OrderModal onClose={() => setShowOrder(false)} />}</AnimatePresence>

      <AnimatePresence>
        {subscribed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto bg-brand-brown text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50">
            <Leaf size={16} className="text-brand-orange flex-shrink-0" />
            <span className="text-sm font-medium flex-1">Thank you for subscribing to the Heirloom mailing list!</span>
            <button onClick={() => setSubscribed(false)} className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition"><X size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer
        onShowShop={() => setShowShop(true)}
        onShowCareers={() => setShowCareers(true)}
        onShowPress={() => setShowPress(true)}
        onShowSustainability={() => setShowSustainability(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
      />
    </div>
  );
}
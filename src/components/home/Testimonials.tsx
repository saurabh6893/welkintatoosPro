"use client";

import { useRef, useEffect, useState } from "react";
import { Star, RefreshCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INITIAL_REVIEWS = [
  { 
    id: 1, 
    name: "Tattoo Collector", 
    date: "A while ago",
    rating: 5,
    text: "Loading reviews from Google...",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" 
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSynced, setLastSynced] = useState("Just now");

  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsSyncing(true);
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.reviews) {
            const formattedReviews = data.reviews.map((r: any) => ({
                id: r.id,
                name: r.author_name,
                date: r.relative_time_description,
                rating: r.rating,
                text: r.text,
                img: r.profile_photo_url.includes("lh3") 
                     ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" 
                     : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }));
            setReviews(formattedReviews);
        }
      } catch (error) {
        console.error("Failed to sync reviews", error);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchReviews();
  }, []);

  const handleManualSync = async () => {
      if(isSyncing) return;
      setIsSyncing(true);
      const response = await fetch('/api/reviews');
      const data = await response.json();
       if (data.reviews) {
            const formattedReviews = data.reviews.map((r: any) => ({
                id: r.id,
                name: r.author_name,
                date: r.relative_time_description,
                rating: r.rating,
                text: r.text,
                img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }));
            setReviews(formattedReviews);
       }
      setLastSynced("Just now");
      setIsSyncing(false);
  };

  // GSAP Animation Logic
  useEffect(() => {
    if (reviews.length <= 1) return; // Don't animate loading state
    
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      
      ScrollTrigger.matchMedia({
        // Desktop & Tablet (>= 768px): Stacked -> Spread
        "(min-width: 768px)": function() {
          const cards = cardsRef.current.filter(c => c);
          
          if(!sectionRef.current || cards.length === 0) return;

          // Initial State: Stacked in center (Deck of Cards)
          gsap.set(cards, {
             xPercent: 0,
             yPercent: 0,
             rotate: (i) => (i - (cards.length - 1) / 2) * 8, // Increased rotation spread (was 5)
             scale: 0.9,
             opacity: 0, 
             y: 100, // Enter from bottom
             position: 'absolute',
             left: '30%', // roughly center relative to container
             transformOrigin: "center bottom"
          });

          const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top", 
                end: "+=25%", // Reduced from 150% for faster/snappier scrub
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
          });

          // Animation: Spread out into a row
          // We combine the reveal and spread for a more explosive "deal" feel
          tl.to(cards, {
             y: 0,
             opacity: 1,
             rotate: 0,
             scale: 1,
             left: (i) => `${(i * 22) + 2}%`, // Adjusted spread (2% offset start)
             duration: 1,
             ease: "power3.out", // Stronger/Snappier easing
             stagger: 0.08 // Slightly tighter stagger
          });
        },

        // Mobile (< 768px): Horizontal Scroll
        "(max-width: 767px)": function() {
            if(!wrapperRef.current || !sectionRef.current) return;
            
            const cards = cardsRef.current.filter(c => c);
            const scrollWidth = wrapperRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            // Standard Horizontal Scroll Scrub
            gsap.to(wrapperRef.current, {
                x: -(scrollWidth - viewportWidth + 60), // 60px padding buffer
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top -10%",
                    end: `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                }
            });
            
            // Add slight parallax/skew to cards for speed feel
            cards.forEach((card) => {
                 gsap.fromTo(card, 
                    { skewX: 5 },
                    { 
                        skewX: -5,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 20%",
                            end: `+=${scrollWidth}`,
                            scrub: true
                        }   
                    }
                 );
            });
        } 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [reviews]);


  return (
    <section ref={sectionRef} className="py-20 bg-white text-black border-t border-black/5 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between items-end relative z-10 block">
        <div>
             <div className="flex items-center gap-3 mb-4">
                 <div className="flex items-center gap-2 px-3 py-1 bg-[#F5F5F7] rounded-full border border-black/5">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Verified Reviews</span>
                 </div>
                 
                 <button 
                    onClick={handleManualSync}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-black/40 hover:text-black transition-colors"
                 >
                     <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin" : ""}`} />
                     {isSyncing ? "Syncing..." : `Synced: ${lastSynced}`}
                 </button>
             </div>
             <h2 className="font-sans">
                 <span className="block text-2xl md:text-3xl font-light tracking-wide text-black/60 mb-3 ml-1">Trusted by</span>
                 <span className="block text-4xl md:text-5xl font-bold tracking-tighter leading-[0.9] text-black">Those Who Wear Our Art.</span>
             </h2>
        </div>
        
        <div className="flex flex-col items-end gap-2 mt-8 md:mt-0">
            <a 
                href="https://www.google.com/search?q=Welkin+Tattoo+Kalyan+reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
            >
                <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold group-hover:underline">5.0</span>
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                    </div>
                </div>
                <span className="text-sm text-black/50 block group-hover:text-black transition-colors">(26 Google Reviews)</span>
            </a>
            <div className="flex gap-4">
                <a href="https://www.instagram.com/welkintattoos/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Instagram</a>
                <a href="https://www.facebook.com/WelkinTattoos/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Facebook</a>
            </div>
        </div>
      </div>

      {/* Reviews Container */}
      <div 
        ref={wrapperRef}
        className="relative w-[90%] md:h-[500px] flex md:block items-center md:overflow-visible pl-6 md:pl-0 gap-6 md:gap-0"
      >
        {reviews.map((review, index) => (
             <div 
                key={review.id}
                ref={el => { if(cardsRef.current) cardsRef.current[index] = el; }}
                className="
                    w-[85vw] md:w-[350px] shrink-0
                    p-8 rounded-3xl bg-[#F5F5F7] 
                    border border-transparent hover:border-black/5 transition-colors 
                    relative md:absolute md:top-10
                "
             >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-black/5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 opacity-50" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Google Review</h4>
                        <span className="text-xs text-black/40">{review.date}</span>
                    </div>
                </div>
                
                <div className="flex text-yellow-500 mb-4 scale-75 origin-left">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                
                <p className="text-black/70 font-light leading-relaxed text-sm h-24 overflow-hidden text-ellipsis line-clamp-4">
                    "{review.text}"
                </p>
            </div>
        ))}
      </div>
    </section>
  );
}

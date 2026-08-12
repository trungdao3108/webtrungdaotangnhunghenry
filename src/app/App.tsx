import { useState, useEffect, useRef, useMemo, type ReactNode } from "react";
import myLoveSong from '../assets/audio/my-love.mp3';
import pic1 from '../assets/images/pic1.jpg';
import pic3 from '../assets/images/pic3.png';
import pic4 from '../assets/images/pic4.jfif';
import pic5 from '../assets/images/pic5.jpg';
import pic6 from '../assets/images/pic6.jpg';
import pic8 from '../assets/images/pic8.jpg';
import pic9 from '../assets/images/pic9.jpg';
import pic11 from '../assets/images/pic11.jpg';
import pic12 from '../assets/images/pic12.jpg';
import pic14 from '../assets/images/pic14.jpg';
import pic15 from '../assets/images/pic15.jpg';
import pic16 from '../assets/images/pic16.jpg';







// ─── Design tokens ────────────────────────────────────────────────────────────
const PINK = "#F58CA8";
const SOFT_PINK = "#FFD6E0";
const CREAM = "#FFF8F3";
const DARK = "#3C2A32";
const MID = "#806A73";
const CONFETTI_COLORS = [PINK, SOFT_PINK, "#FF8FAB", "#FFC8D9", "#fff", "#FFB3C6", "#FFAAB5", "#FDE1E6"];

// ─── Hook: scroll-triggered reveal ───────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── RevealSection wrapper ────────────────────────────────────────────────────
function RevealSection({ children, className = "", delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s ${delay}s ease, transform 0.85s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

// ─── FloatingParticles ────────────────────────────────────────────────────────
const SYMBOLS = ["❤️", "💕", "✨", "🌸", "💫", "⭐", "💖", "🌷", "🎀", "🌺"];
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  symbol: SYMBOLS[i % SYMBOLS.length],
  left: 2 + (i * 5.4) % 94,
  dur: 10 + (i * 1.6) % 9,
  delay: (i * 0.7) % 7,
  size: 12 + (i * 3) % 14,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            bottom: "-30px",
            fontSize: p.size,
            animation: `floatUp ${p.dur}s ${p.delay}s infinite ease-in-out`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.8,
      duration: 2.5 + Math.random() * 2.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 5 + Math.floor(Math.random() * 9),
      rotation: Math.floor(Math.random() * 360),
      radius: Math.random() > 0.5 ? "50%" : "2px",
    }))
  , []);

  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-15px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.radius,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section header helper ────────────────────────────────────────────────────
function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <RevealSection className="text-center mb-16 md:mb-20">
      <h2
        className="font-bold mb-5 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif", color: DARK, fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
      >
        {children}
      </h2>
      <div className="w-14 h-0.5 mx-auto rounded-full" style={{ background: PINK }} />
    </RevealSection>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const scrollDown = () =>
    document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #FFF8F3 0%, #FFD6E0 55%, #FFF0F5 100%)" }}
    >
      <FloatingParticles />

      {/* Blurred orbs */}
      <div className="absolute top-16 left-6 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: PINK }} />
      <div className="absolute bottom-16 right-6 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: "#FFB3C6" }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto py-16">
        {/* Date badge */}
        <p
          className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
          style={{ fontFamily: "'Nunito', sans-serif", color: MID, animation: "fadeInUp 0.8s ease both" }}
        >
          ✨ 15.08.2001 — Một ngày thật đặc biệt ✨
        </p>

        {/* Main title */}
        <div style={{ animation: "fadeInUp 0.9s 0.1s ease both" }}>
          <h1
            className="font-bold leading-tight mb-0"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: DARK,
              fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
            }}
          >
            Happy Birthday,
          </h1>
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: PINK,
              fontSize: "clamp(3rem, 11vw, 6.5rem)",
              lineHeight: 1.15,
            }}
          >
            My Love ❤️
          </h1>
        </div>

        <p
          className="text-base md:text-lg mt-4 mb-8 leading-relaxed"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: MID,
            animation: "fadeInUp 0.9s 0.3s ease both",
          }}
        >
          Chúc mừng sinh nhật Nguyễn Phương Nhung <br></br>
          
        </p>

        {/* Polaroid photo */}
        <div
          className="bg-white shadow-2xl mb-8"
          style={{
            padding: "12px 12px 52px",
            borderRadius: "3px",
            maxWidth: "210px",
            transform: "rotate(2.5deg)",
            boxShadow: "0 24px 70px rgba(245,140,168,0.2), 0 4px 16px rgba(0,0,0,0.08)",
            animation: "fadeInUp 0.9s 0.5s ease both",
          }}
        >
          <img
            src={pic1}
            alt="Xinh lắm luôn"
            className="w-full h-52 object-cover"
            style={{ borderRadius: "1px" }}
          />
          <p
            className="text-center mt-4"
            style={{ fontFamily: "'Great Vibes', cursive", color: MID, fontSize: "20px" }}
          >
            Em yêu của anh 💕
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={scrollDown}
          className="px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${PINK}, #FF6B9D)`,
            fontFamily: "'Nunito', sans-serif",
            fontSize: "16px",
            animation: "fadeInUp 0.9s 0.7s ease both",
          }}
        >
          Mở món quà của em 🎁
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-80 transition-opacity"
        style={{ animation: "floatUpDown 2.2s infinite ease-in-out", color: PINK, fontSize: 22 }}
      >
        ↓
      </button>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// OUR STORY — Timeline
// ══════════════════════════════════════════════════════════════════════════════
const TIMELINE = [
  {
    date: "23/7/2025",
    title: "Lần đầu nhắn tin",
    desc: "Ngây ngô lắm. Giờ a đọc lại tin còn thấy anh ngốc kinh. Haha",
    emoji: "🌟",
    img: pic3,
  },
  {
    date: "30/12/2025",
    title: "Lần đầu gặp nhau",
    desc: "Khoảnh khắc anh biết em là người đặc biệt. Một cái nhìn thôi là đủ rồi.",
    emoji: "🌟",
    img: pic4,
  },
  {
    date: "18/7/2026",
    title: "Ngày ta nói lời yêu",
    desc: "Hồi hộp mà vui lắm. Cái buổi tối ngồi nói chuyện mãi không dứt đó. Coffee Gió",
    emoji: "☕",
    img: pic6,
  },
  {
    date: "Một ngày nữa yêu nhau",
    title: "Nắm tay anh nhé",
    desc: "Muốn nắm tay thế này mãi cơ bé yêu à",
    emoji: "😊",
    img: pic8,
  },
  {
    date: "Một dịp nào đó",
    title: "Chuyến đi đầu tiên cùng nhau",
    desc: "Anh muốn lúc nào đi đây đó cùng em.",
    emoji: "✈️",
    img: pic5,
  },

  {
    date: "15.08.2026",
    title: "Chúc em sinh nhật vui vẻ 🎂",
    desc: "Và đây là một trong những ngày anh thích nhất. Happy Birthday, my love.",
    emoji: "🎂",
    img: pic9,
  },
];

function OurStorySection() {
  return (
    <section id="our-story" className="py-24 px-6" style={{ background: CREAM }}>
      <SectionHeader>Chúng ta đã có thật nhiều kỷ niệm ❤️</SectionHeader>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical center spine (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${SOFT_PINK}, ${PINK}, ${SOFT_PINK}, transparent)` }}
        />

        {TIMELINE.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <RevealSection
              key={i}
              delay={i * 0.1}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-14 ${!isLeft ? "md:flex-row-reverse" : ""}`}
            >
              {/* Text card */}
              <div
                className="flex-1 bg-white p-6 md:p-8"
                style={{
                  borderRadius: "20px",
                  border: `1px solid ${SOFT_PINK}`,
                  boxShadow: "0 4px 28px rgba(245,140,168,0.1)",
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: PINK, fontFamily: "'Nunito', sans-serif" }}
                >
                  {item.date}
                </span>
                <h3
                  className="text-xl font-bold mt-2 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: DARK }}
                >
                  {item.emoji} {item.title}
                </h3>
                <p className="text-sl leading-7" style={{ fontFamily: "'Nunito', sans-serif", color: MID }}>
                  {item.desc}
                </p>
              </div>

              {/* Center dot */}
              <div
                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-sm z-10 flex-shrink-0"
                style={{ background: PINK, color: "white", boxShadow: `0 0 0 6px ${SOFT_PINK}` }}
              >
                {item.emoji}
              </div>

              {/* Polaroid photo */}
              <div className="flex-1 flex justify-center md:justify-start">
                <div
                  className="bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    padding: "10px 10px 44px",
                    borderRadius: "3px",
                    transform: `rotate(${isLeft ? "1.8deg" : "-1.8deg"})`,
                    maxWidth: "280px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-90 object-cover"
                    style={{ borderRadius: "1px", background: SOFT_PINK }}
                  />
                  <p
                    className="text-center mt-3"
                    style={{ fontFamily: "'Great Vibes', cursive", color: MID, fontSize: "25px" }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </RevealSection>
          );
        })}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PHOTO MEMORIES — Polaroid scrapbook gallery
// ══════════════════════════════════════════════════════════════════════════════
const PHOTOS = [
  {
    src: pic5,
    caption: "Ai xinh thế nhỉ ❤️",
    rotation: -3,
  },
  {
    src: pic16,
    caption: "Em vẫn luôn xinh như vậy.",
    rotation: 2.5,
  },
  {
    src: pic11,
    caption: "Trông cute thế nhỉ.",
    rotation: -1.5,
  },
  {
    src: pic12,
    caption: "Thêm thật nhiều chuyến đi như thế này nhé.",
    rotation: 3,
  },
  {
    src: pic14,
    caption: "Anh vẫn để ảnh đại diện nha.",
    rotation: -2,
  },
  {
    src: pic15,
    caption: "Cảm ơn em đã ở đây 💕",
    rotation: 1.5,
  },
];

function PhotoMemoriesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(135deg, #FFF0F5 0%, #FFF8F3 100%)" }}
    >
      <SectionHeader>Những khoảnh khắc anh muốn giữ mãi</SectionHeader>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
        {PHOTOS.map((photo, i) => (
          <RevealSection key={i} delay={i * 0.07}>
            <div
              className="bg-white cursor-pointer"
              style={{
                padding: "10px 10px 50px",
                borderRadius: "3px",
                transform: hovered === i
                  ? "scale(1.07) rotate(0deg)"
                  : `scale(1) rotate(${photo.rotation}deg)`,
                transition: "transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                boxShadow: hovered === i
                  ? "0 28px 70px rgba(245,140,168,0.35)"
                  : "0 6px 28px rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: hovered === i ? 10 : 1,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative overflow-hidden" style={{ borderRadius: "1px" }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-40 md:h-52 object-cover"
                  style={{ background: SOFT_PINK }}
                />
                {hovered === i && (
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-3 px-2"
                    style={{
                      background: "linear-gradient(to top, rgba(245,140,168,0.65) 0%, transparent 60%)",
                    }}
                  >
                    <span
                      className="text-white text-center"
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: "18px",
                        textShadow: "0 1px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      {photo.caption}
                    </span>
                  </div>
                )}
              </div>
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: MID,
                  fontSize: "14px",
                  opacity: hovered === i ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {photo.caption}
              </p>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOVE REASONS — Card grid
// ══════════════════════════════════════════════════════════════════════════════
const LOVE_REASONS = [
  { icon: "❤️", title: "Nụ cười của em", desc: "Mỗi lần thấy em cười là anh vui lây mà không biết tại sao." },
  { icon: "✨", title: "Cách em quan tâm mọi người", desc: "Em luôn chú ý đến từng người một — điều đó làm anh ngưỡng mộ lắm." },
  { icon: "🌷", title: "Sự dịu dàng của em", desc: "Em nhẹ nhàng và ấm áp theo cách riêng mà chẳng ai có được." },
  { icon: "😂", title: "Những lúc em cười thật lớn", desc: "Cái kiểu cười không kìm được đó — anh thấy đó là em thật nhất." },
  { icon: "🤍", title: "Cách em luôn ở bên anh", desc: "Dù là lúc vui hay buồn, em vẫn ở đó. Điều đó có nghĩa rất nhiều với anh." },
  { icon: "💫", title: "Đơn giản là vì em là em", desc: "Không cần lý do gì thêm. Em là em, và đó là điều anh yêu nhất." },
];

function LoveReasonsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" style={{ background: CREAM }}>
      <SectionHeader>Những điều anh yêu ở em</SectionHeader>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {LOVE_REASONS.map((r, i) => (
          <RevealSection key={i} delay={i * 0.08}>
            <div
              className="p-7 text-center cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? `linear-gradient(135deg, ${PINK}, #FF8FAB)` : "white",
                borderRadius: "22px",
                border: `1px solid ${SOFT_PINK}`,
                boxShadow: hovered === i
                  ? "0 22px 56px rgba(245,140,168,0.3)"
                  : "0 4px 22px rgba(0,0,0,0.06)",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                minHeight: 200,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="text-4xl mb-4 block"
                style={{ animation: hovered === i ? "heartbeat 1s infinite" : "none" }}
              >
                {r.icon}
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: hovered === i ? "white" : DARK,
                  fontSize: "17px",
                }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm leading-7"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: hovered === i ? "rgba(255,255,255,0.9)" : MID,
                }}
              >
                {r.desc}
              </p>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOVE LETTER
// ══════════════════════════════════════════════════════════════════════════════
function LoveLetterSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(150deg, #FFF0F5 0%, #FFF8F3 100%)" }}
    >
      <SectionHeader>Gửi cô gái anh yêu 💌</SectionHeader>

      <RevealSection>
        <div
          className="max-w-2xl mx-auto bg-white px-8 md:px-14 py-10 md:py-14"
          style={{
            borderRadius: "18px",
            boxShadow: "0 28px 90px rgba(245,140,168,0.1), 0 4px 20px rgba(0,0,0,0.05)",
            border: `1px solid ${SOFT_PINK}`,
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 31px,
              rgba(245, 140, 168, 0.1) 31px,
              rgba(245, 140, 168, 0.1) 32px
            )`,
          }}
        >
          <p
            className="mb-7"
            style={{ fontFamily: "'Great Vibes', cursive", color: PINK, fontSize: "34px", lineHeight: 1.3 }}
          >
            Chúc mừng sinh nhật em.
          </p>

          <div
            className="space-y-5 text-base leading-8"
            style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}
          >
            <p>
              Anh không biết tương lai sẽ có bao nhiêu điều đang chờ chúng ta phía trước, nhưng anh rất
              vui vì trong những năm tháng này, anh đã được gặp em.
            </p>
            <p>
              Cảm ơn em vì đã xuất hiện, vì những câu chuyện rất bình thường, những lần cùng nhau đi
              đâu đó, những lúc vui và cả những lúc chẳng vui chút nào.
            </p>
            <p>
              Anh mong tuổi mới sẽ mang đến cho em thật nhiều niềm vui, sức khỏe, may mắn và những
              điều em đang mong chờ.
            </p>
            <p>
              Và anh hy vọng mình vẫn sẽ được ở bên cạnh để cùng em tạo thêm thật nhiều kỷ niệm mới.
            </p>
            <p style={{ fontFamily: "'Great Vibes', cursive", color: PINK, fontSize: "22px" }}>
              Happy Birthday, my love. ❤️
            </p>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: `1px dashed ${SOFT_PINK}` }}>
            <p className="text-sm mb-1" style={{ color: MID, fontFamily: "'Nunito', sans-serif" }}>
              Mãi mãi,
            </p>
            <p style={{ fontFamily: "'Great Vibes', cursive", color: PINK, fontSize: "38px" }}>
              Love you, always. 💕
            </p>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// BIRTHDAY CAKE — Interactive blow-candle
// ══════════════════════════════════════════════════════════════════════════════
const CANDLES = [
  { x: 76, y: 62 }, { x: 100, y: 57 }, { x: 124, y: 62 },
  { x: 54, y: 102 }, { x: 84, y: 97 }, { x: 116, y: 97 }, { x: 146, y: 102 },
];

function BirthdayCakeSection() {
  const [blown, setBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    setShowConfetti(true);
    setTimeout(() => setShowWish(true), 700);
    setTimeout(() => setShowConfetti(false), 5500);
  };

  return (
    <section className="py-24 px-6 relative" style={{ background: CREAM }}>
      <Confetti active={showConfetti} />

      <SectionHeader>Một điều ước cho tuổi mới ✨</SectionHeader>

      <RevealSection className="flex flex-col items-center gap-8">
        <p className="text-base -mt-8 mb-4" style={{ fontFamily: "'Nunito', sans-serif", color: MID }}>
          Nhắm mắt lại và ước một điều nhé.
        </p>

        {/* SVG Cake */}
        <svg
          width="220"
          height="260"
          viewBox="0 0 200 250"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Bottom tier */}
          <rect x="8" y="165" width="184" height="77" rx="14" fill={SOFT_PINK} />
          <rect x="8" y="157" width="184" height="22" rx="10" fill={PINK} />
          {[35, 65, 100, 135, 165].map((cx, i) => (
            <circle key={i} cx={cx} cy="178" r="6" fill="#FF8FAB" />
          ))}
          <text
            x="100"
            y="218"
            textAnchor="middle"
            fill={MID}
            fontSize="12"
            fontFamily="Nunito, sans-serif"
            fontStyle="italic"
          >
            Happy Birthday! 🎂
          </text>

          {/* Middle tier */}
          <rect x="28" y="110" width="144" height="60" rx="12" fill={PINK} />
          <rect x="28" y="102" width="144" height="22" rx="10" fill="#FFB3C6" />
          {[52, 80, 108, 136, 160].map((fx, i) => (
            <path
              key={i}
              d={`M${fx},102 C${fx + 4},112 ${fx + 2},124 ${fx},136`}
              stroke="white"
              strokeWidth="3.5"
              fill="none"
              opacity="0.65"
              strokeLinecap="round"
            />
          ))}

          {/* Top tier */}
          <rect x="56" y="65" width="88" height="48" rx="10" fill="#FFB3C6" />
          <rect x="56" y="57" width="88" height="20" rx="10" fill="#FFC8D9" />
          {/* Mini sprinkles */}
          {[[72,76,40],[90,80,-25],[108,73,15],[124,80,-40],[82,88,30]].map(([sx, sy, sr], i) => (
            <rect
              key={i}
              x={sx}
              y={sy}
              width="7"
              height="2.5"
              rx="1.5"
              fill={i % 2 === 0 ? PINK : "#FF8FAB"}
              transform={`rotate(${sr} ${sx} ${sy})`}
            />
          ))}

          {/* Candles */}
          {CANDLES.map((c, i) => (
            <g key={i}>
              <rect
                x={c.x - 4}
                y={c.y - 28}
                width="8"
                height="28"
                rx="3"
                fill={i % 2 === 0 ? PINK : "#FFB3C6"}
              />
              {/* Wick */}
              <line x1={c.x} y1={c.y - 28} x2={c.x} y2={c.y - 33} stroke={DARK} strokeWidth="1.5" />
              {/* Flame or smoke */}
              {!blown ? (
                <g
                  style={{
                    animation: "candleFlicker 0.7s infinite",
                    transformOrigin: `${c.x}px ${c.y - 35}px`,
                  }}
                >
                  <ellipse cx={c.x} cy={c.y - 41} rx="3.5" ry="6.5" fill="#FFC107" opacity="0.95" />
                  <ellipse cx={c.x} cy={c.y - 39} rx="2" ry="3.5" fill="#FF9800" opacity="0.85" />
                </g>
              ) : (
                <path
                  d={`M${c.x - 3},${c.y - 38} Q${c.x + 3},${c.y - 48} ${c.x + 5},${c.y - 56}`}
                  stroke="#aaa"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                  style={{ animation: "pulseFade 2s infinite" }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* CTA or wish message */}
        {!blown ? (
          <button
            onClick={handleBlow}
            className="px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${PINK}, #FF6B9D)`,
              fontFamily: "'Nunito', sans-serif",
              fontSize: "17px",
            }}
          >
            Thổi nến 🎂
          </button>
        ) : showWish ? (
          <div
            className="text-center px-8 py-7 max-w-sm"
            style={{
              background: `linear-gradient(135deg, ${SOFT_PINK}, #FFF0F5)`,
              borderRadius: "24px",
              border: `1.5px solid ${PINK}`,
              boxShadow: "0 20px 60px rgba(245,140,168,0.2)",
              animation: "fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="text-3xl mb-3">🌟</div>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: PINK,
                fontSize: "26px",
                lineHeight: 1.4,
              }}
            >
              Điều ước của em nhất định sẽ thành hiện thực ❤️
            </p>
            <p className="text-sm mt-3" style={{ color: MID, fontFamily: "'Nunito', sans-serif" }}>
              Anh luôn tin vào điều đó.
            </p>
          </div>
        ) : null}
      </RevealSection>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SURPRISE BOX — Gift reveal
// ══════════════════════════════════════════════════════════════════════════════
function SurpriseBoxSection() {
  const [opened, setOpened] = useState(false);
  const [shaking, setShaking] = useState(false);

  return (
    <section
      className="py-24 px-6 overflow-hidden"
      style={{ background: `linear-gradient(150deg, #FFF0F5, ${SOFT_PINK})` }}
    >
      <SectionHeader>Anh còn một điều dành cho em...</SectionHeader>

      <RevealSection className="flex flex-col items-center gap-8">
        <p className="-mt-8 mb-2 text-base" style={{ fontFamily: "'Nunito', sans-serif", color: MID }}>
          Một món quà nhỏ, từ trái tim anh. 🎁
        </p>

        {/* Gift box */}
        <div
          className="relative select-none"
          style={{
            width: 200,
            height: 230,
            cursor: opened ? "default" : "pointer",
          }}
          onMouseEnter={() => !opened && setShaking(true)}
          onMouseLeave={() => setShaking(false)}
          onClick={() => { if (!opened) { setOpened(true); setShaking(false); } }}
        >
          {/* Box body */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center overflow-hidden"
            style={{
              height: 155,
              background: `linear-gradient(145deg, ${PINK}, #FF8FAB)`,
              borderRadius: "0 0 22px 22px",
            }}
          >
            {/* Vertical ribbon */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10"
              style={{ background: "rgba(255,255,255,0.28)" }}
            />
            {/* Stars inside opened box */}
            {opened &&
              ["✨", "💕", "🌟", "⭐", "💖"].map((s, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    fontSize: 20,
                    top: `${12 + (i * 18) % 68}%`,
                    left: `${8 + (i * 17) % 76}%`,
                    animation: `sparkle 1.2s ${i * 0.22}s infinite`,
                  }}
                >
                  {s}
                </span>
              ))}
          </div>

          {/* Horizontal ribbon */}
          <div
            className="absolute left-0 right-0"
            style={{ top: 74, height: 16, background: "rgba(255,255,255,0.28)", zIndex: 5 }}
          />

          {/* Lid */}
          <div
            className="absolute top-0 left-0 right-0 flex flex-col items-center pt-3 gap-1"
            style={{
              height: 80,
              background: `linear-gradient(145deg, #FF6B9D, ${PINK})`,
              borderRadius: "22px 22px 0 0",
              transformOrigin: "50% 100%",
              transform: opened
                ? "perspective(700px) rotateX(-160deg) translateY(-5px)"
                : "perspective(700px) rotateX(0deg)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)",
              animation: shaking && !opened ? "giftShake 0.35s infinite" : "none",
              zIndex: 10,
            }}
          >
            {/* Bow */}
            <div className="flex gap-1 mt-2">
              <div style={{ width: 34, height: 22, background: "rgba(255,255,255,0.38)", borderRadius: "50% 50% 0 0" }} />
              <div style={{ width: 34, height: 22, background: "rgba(255,255,255,0.38)", borderRadius: "50% 50% 0 0" }} />
            </div>
            <div style={{ width: 14, height: 10, background: "rgba(255,255,255,0.45)", borderRadius: "50%" }} />
          </div>
        </div>

        {/* Reveal card */}
        {!opened ? (
          <button
            onClick={() => setOpened(true)}
            className="px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${PINK}, #FF6B9D)`,
              fontFamily: "'Nunito', sans-serif",
              fontSize: "17px",
            }}
          >
            Mở quà 🎁
          </button>
        ) : (
          <div
            className="text-center max-w-sm px-8 py-8 bg-white"
            style={{
              borderRadius: "24px",
              border: `2px solid ${SOFT_PINK}`,
              boxShadow: "0 28px 80px rgba(245,140,168,0.22)",
              animation: "fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="text-4xl mb-3">🎫</div>
            <div
              className="text-xs tracking-widest uppercase font-bold mb-2"
              style={{ color: PINK, fontFamily: "'Nunito', sans-serif" }}
            >
              Voucher dành riêng cho em
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: DARK }}
            >
              Một chuyến đi cùng anh ❤️
            </h3>
            <p className="text-sm leading-7" style={{ fontFamily: "'Nunito', sans-serif", color: MID }}>
              Điểm đến do em chọn. Thời gian do em quyết định. Anh sẽ lo tất cả còn lại.
            </p>
            <div className="mt-5 pt-4" style={{ borderTop: `1px dashed ${SOFT_PINK}` }}>
              <span
                className="text-xs font-semibold"
                style={{ color: PINK, fontFamily: "'Nunito', sans-serif" }}
              >
                Không hết hạn · Chỉ dành cho em 💕
              </span>
            </div>
          </div>
        )}
      </RevealSection>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FINAL SECTION
// ══════════════════════════════════════════════════════════════════════════════
function FinalSection() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${SOFT_PINK} 0%, ${PINK} 50%, #FFF0F5 100%)` }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <RevealSection>
          <h2
            className="font-bold leading-none mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: DARK,
              fontSize: "clamp(3.5rem, 14vw, 7.5rem)",
            }}
          >
            Happy Birthday ❤️
          </h2>

          <p
            className="text-base md:text-xl mb-10 leading-8"
            style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(60,42,50,0.72)" }}
          >
            Chúc em tuổi mới luôn vui vẻ, hạnh phúc và vẫn luôn cười thật nhiều.
          </p>

          {/* Final polaroid */}
          <div
            className="mx-auto mb-10 bg-white"
            style={{
              padding: "12px 12px 56px",
              borderRadius: "3px",
              maxWidth: "280px",
              transform: "rotate(-2deg)",
              boxShadow: "0 28px 80px rgba(60,42,50,0.14)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1601658129158-02ae71e5fbd3?w=500&h=380&fit=crop&auto=format"
              alt="Mãi bên nhau"
              className="w-full h-52 object-cover"
              style={{ borderRadius: "1px", background: SOFT_PINK }}
            />
            <p
              className="text-center mt-4"
              style={{ fontFamily: "'Great Vibes', cursive", color: MID, fontSize: "21px" }}
            >
              Mãi bên nhau nhé 💕
            </p>
          </div>

          <p
            className="mb-8"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: DARK,
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
            }}
          >
            I love you.
          </p>

          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(60,42,50,0.4)", fontFamily: "'Nunito', sans-serif" }}
          >
            Made with ❤️ just for you.
            Web Trung Dao Tặng EM Yêu Phương Nhung @Cấm Sao Chép Dưới Mọi Hình Thức
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MUSIC PLAYER — Fixed bottom-left
// ══════════════════════════════════════════════════════════════════════════════
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3"
      style={{
        background: "white",
        borderRadius: "60px",
        border: `1px solid ${SOFT_PINK}`,
        boxShadow: "0 8px 36px rgba(245,140,168,0.2)",
      }}
    >
      <audio
        ref={audioRef}
        src={myLoveSong}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <span
        style={{
          fontSize: 18,
          animation: playing ? "heartbeat 1.2s infinite" : "none",
          display: "block",
        }}
      >
        🎵
      </span>
      <div>
        <p
          className="text-xs font-bold leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}
        >
          Our Song
        </p>
        <p
          className="text-xs leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif", color: MID }}
        >
          {playing ? "Đang phát..." : "Nhấn để phát"}
        </p>
      </div>
      <button
        onClick={toggleMusic}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-transform hover:scale-110 active:scale-90"
        style={{ background: `linear-gradient(135deg, ${PINK}, #FF6B9D)` }}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "⏸" : "▶"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <MusicPlayer />
      <HeroSection />
      <OurStorySection />
      <PhotoMemoriesSection />
      <LoveReasonsSection />
      <LoveLetterSection />
      <BirthdayCakeSection />
      <SurpriseBoxSection />
      <FinalSection />
    </div>
  );
}

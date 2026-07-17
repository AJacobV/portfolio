import { useEffect, useState, useRef, useMemo } from 'react';
import { EnvelopeFill, Github, Facebook } from 'react-bootstrap-icons';

const sectionStyle = {
  position: 'relative',
  zIndex: 1,
  padding: '4rem 0 7rem',
};

const containerStyle = {
  width: 'min(1200px, calc(100% - 3rem))',
  margin: '0 auto',
};

const SHARD_COUNT = 12;

function generateShards() {
  const shards = [];
  const cols = 4;
  for (let i = 0; i < SHARD_COUNT; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const angle = (i / SHARD_COUNT) * 360;
    const distance = 200 + Math.random() * 150;
    const rotation = -160 + Math.random() * 320;
    const exitDist = 80 + Math.random() * 100;
    const exitRotation = -120 + Math.random() * 240;
    shards.push({
      id: i, row, col,
      tx: `${Math.cos(angle * Math.PI / 180) * distance}px`,
      ty: `${Math.sin(angle * Math.PI / 180) * distance}px`,
      rot: `${rotation}deg`,
      ex: `${Math.cos(angle * Math.PI / 180) * exitDist}px`,
      ey: `${Math.sin(angle * Math.PI / 180) * exitDist}px`,
      er: `${exitRotation}deg`,
      delay: i * 55,
    });
  }
  return shards;
}

/**
 * Watches the whole section as one unit.
 * Fully bidirectional — same threshold logic applies whether
 * the user is scrolling down into the section or back up out of it.
 *
 * Phase states:
 *   'hidden'   — section completely out of view (no animations)
 *   'entering' — section dominates ≥55% of the viewport (build animation)
 *   'exiting'  — section is leaving the viewport, either direction (shatter)
 *
 * Threshold symmetry (mirrors the 55% rule in App.js getDominantSection):
 *   ↓ Scroll-down exit  : rect.top  < vh × 0.06  (leaving from the top)
 *   ↑ Scroll-up exit    : rect.top  > vh × 0.55  (sliding off to the bottom)
 *   Enter (both dirs)   : rect.top  < vh × 0.45  AND  rect.bottom > vh × 0.5
 */
function useSectionPhase() {
  const ref = useRef(null);
  const [phase, setPhase] = useState('hidden');
  const phaseRef = useRef('hidden');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const applyPhase = (next) => {
    if (phaseRef.current === next) return;
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollingDown = scrollY > lastScrollY.current;
        lastScrollY.current = scrollY;
        const cur = phaseRef.current;

        // ── Completely out of view ── reset regardless of direction
        if (rect.bottom <= 0 || rect.top >= vh) {
          applyPhase('hidden');
        }
        // ── Scroll-DOWN exit ──
        else if (scrollingDown && rect.bottom < vh * 0.25) {
          applyPhase('exiting');
        }
        // ── Scroll-UP exit ──
        else if (!scrollingDown && rect.top > vh * 0.75 && cur !== 'hidden') {
          applyPhase('exiting');
        }
        // ── Enter (both directions) ──
        // Widen the bounds so it triggers much earlier and feels snappy
        else if (rect.top < vh * 0.85 && rect.bottom > vh * 0.15) {
          applyPhase('entering');
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // seed on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [ref, phase];
}

function AboutMe() {
  const [sectionRef, sectionPhase] = useSectionPhase();
  const [showConnectPopup, setShowConnectPopup] = useState(false);

  // shardPhase: 'hidden' | 'building' | 'built' | 'shattering'
  const [shardPhase, setShardPhase] = useState('hidden');
  const shards = useMemo(() => generateShards(), []);
  const prevPhase = useRef('hidden');
  const buildTimer = useRef(null);
  const shatterTimer = useRef(null);

  useEffect(() => {
    if (buildTimer.current) clearTimeout(buildTimer.current);
    if (shatterTimer.current) clearTimeout(shatterTimer.current);

    if (sectionPhase === 'entering' && prevPhase.current !== 'entering') {
      setShardPhase('building');
      buildTimer.current = setTimeout(
        () => setShardPhase('built'),
        shards.length * 55 + 800
      );
    } else if (sectionPhase === 'exiting' && prevPhase.current !== 'exiting') {
      setShardPhase('shattering');
      shatterTimer.current = setTimeout(() => setShardPhase('hidden'), 750);
    } else if (sectionPhase === 'hidden') {
      setShardPhase('hidden');
    }

    prevPhase.current = sectionPhase;

    return () => {
      if (buildTimer.current) clearTimeout(buildTimer.current);
      if (shatterTimer.current) clearTimeout(shatterTimer.current);
    };
  }, [sectionPhase, shards.length]);



  const headerClass =
    sectionPhase === 'entering' ? 'scroll-fade entering' :
    sectionPhase === 'exiting'  ? 'scroll-fade exiting'  :
    'scroll-fade enter-up';

  const photoClass =
    sectionPhase === 'entering' ? 'photo-fade entering' :
    sectionPhase === 'exiting'  ? 'photo-fade exiting'  :
    'photo-fade enter-up';

  const contentVisible = shardPhase === 'built';

  // glass-card wrapper visibility:
  // invisible when there's nothing to show (hidden phase) or fully faded during shatter
  const glassWrapperClass =
    shardPhase === 'hidden'     ? 'glass-wrapper-invisible' :
    shardPhase === 'shattering' ? 'glass-wrapper-shattering' : '';

  return (
    <section id="about" style={sectionStyle}>
      <div ref={sectionRef} style={containerStyle}>
        {/* Header */}
        <div className={headerClass} style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '0 0 0.5rem',
            color: '#f7f7f7',
          }}>
            <span className="gold-text">About</span> Me
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#b2b2b2',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Get to know the person behind the code.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="about-flex" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'flex-start',
        }}>
          {/* Left — rotating fan photo cards */}
          <div className={photoClass} style={{ flex: '0 0 400px', maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pc-wrap">
              {/* Card 1 */}
              <div className="pc-card pc-card-1">
                <div className="pc-inner">
                  <img src="/profpic1.jpeg" alt="Angelo Valeros" />
                </div>
              </div>
              {/* Card 2 */}
              <div className="pc-card pc-card-2">
                <div className="pc-inner">
                  <img src="/profpic2.jpg" alt="Angelo Valeros" />
                </div>
              </div>
              {/* Card 3 */}
              <div className="pc-card pc-card-3">
                <div className="pc-inner">
                  <img src="/profpic3.jpg" alt="Angelo Valeros" />
                </div>
              </div>
              {/* Decorative bottom lines */}
              <div className="pc-lines">
                <div className="pc-line" />
                <div className="pc-line" />
              </div>
            </div>
          </div>

          {/* Right — glass card.
              The wrapper controls overall visibility so the card's
              border + shadow don't show as a floating box.
              The glass-card itself has NO background — shards carry
              the solid surface, so when they shatter the rectangle
              disappears with them.                                    */}
          <div className={`glass-wrapper ${glassWrapperClass}`} style={{ flex: '1 1 400px' }}>
            <div className="glass-card" style={{ position: 'relative', minHeight: '320px' }}>

              {/* Glass shards — they ARE the visual surface */}
              {shards.map((shard) => {
                const cols = 4, rows = 3;
                const w = 100 / cols, h = 100 / rows;
                const left = shard.col * w, top = shard.row * h;
                const isTop    = shard.row === 0;
                const isBottom = shard.row === rows - 1;
                const isLeft   = shard.col === 0;
                const isRight  = shard.col === cols - 1;
                return (
                  <div
                    key={shard.id}
                    className={`glass-shard ${
                      shardPhase === 'building'   ? 'building'  :
                      shardPhase === 'shattering' ? 'shattering':
                      shardPhase === 'built'      ? 'assembled' : ''
                    }`}
                    style={{
                      position: 'absolute',
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${w}%`,
                      height: `${h}%`,
                      borderRadius:
                        isTop    && isLeft   ? '24px 0 0 0'  :
                        isTop    && isRight  ? '0 24px 0 0'  :
                        isBottom && isLeft   ? '0 0 0 24px'  :
                        isBottom && isRight  ? '0 0 24px 0'  : '0',
                      animationDelay: shardPhase === 'building' ? `${shard.delay}ms` : '0ms',
                      '--shard-tx':  shard.tx,
                      '--shard-ty':  shard.ty,
                      '--shard-rot': shard.rot,
                      '--shard-ex':  shard.ex,
                      '--shard-ey':  shard.ey,
                      '--shard-er':  shard.er,
                      opacity: shardPhase === 'hidden' ? 0 : undefined,
                    }}
                  />
                );
              })}

              {/* Content */}
              <div
                className={`glass-content ${contentVisible ? 'visible-content' : 'hidden-content'}`}
                style={{ padding: '2rem 2.5rem' }}
              >
                <h3 style={{
                  margin: 0,
                  color: '#f7f7f7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                }}>
                  Who I Am
                </h3>
                <p style={{ margin: 0, color: '#b2b2b2', lineHeight: 1.75, fontSize: '0.98rem' }}>
                  I am a graduate student with an award of Cum Laude in Bachelor of Science in Information Technology at the{' '}
                  <span className="gold-text" style={{ fontWeight: 600 }}>University of Santo Tomas</span>{' '}
                  with a passion for technology and adventure. I started my programming journey with
                  Java and have since expanded to PHP, React, Node.js, SQL, and ASP.NET
                </p>
                <p style={{ margin: 0, color: '#b2b2b2', lineHeight: 1.75, fontSize: '0.98rem' }}>
                  I am a passionate programmer with a knack for creating clean, user-friendly,
                  and responsive websites. When I'm not coding, you can find me exploring new hiking
                  trails, dabbling in digital art, or building custom keyboards.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '0.5rem 0' }}>
                  {[{ num: '4', label: 'Years of Coding' }, { num: '7', label: 'Projects Completed' }].map(({ num, label }) => (
                    <div key={label} style={{
                      padding: '1rem',
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <span style={{ display: 'block', fontSize: '2rem', fontWeight: 900, color: '#e10600', lineHeight: 1 }}>
                        {num}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: '#b2b2b2', marginTop: '0.4rem' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => { e.preventDefault(); setShowConnectPopup(!showConnectPopup); }}
                  >
                    Let's Connect
                  </button>
                  
                  {/* Connect Popup */}
                  <div style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 15px)',
                    left: '50%',
                    transform: showConnectPopup ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
                    background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
                    border: '1px solid rgba(225,6,0,0.4)',
                    backdropFilter: 'blur(16px)',
                    padding: '0.75rem 1rem',
                    borderRadius: '16px',
                    display: 'flex',
                    gap: '1rem',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(225,6,0,0.2)',
                    opacity: showConnectPopup ? 1 : 0,
                    pointerEvents: showConnectPopup ? 'auto' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    zIndex: 10
                  }}>
                    {/* Bottom pointing triangle */}
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid rgba(225,6,0,0.4)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% - 1px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid rgba(15,15,15,0.95)',
                    }} />
                    
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=angelojacob.valeros.cics@ust.edu.ph&su=Inquiry" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ fontSize: '1.25rem', color: '#f7f7f7', width: '2.75rem', height: '2.75rem' }} title="Email"><EnvelopeFill /></a>
                    <a href="https://github.com/AJacobV" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ fontSize: '1.25rem', color: '#f7f7f7', width: '2.75rem', height: '2.75rem' }} title="GitHub"><Github /></a>
                    <a href="https://www.facebook.com/angelojacob.valeros" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ fontSize: '1.25rem', color: '#f7f7f7', width: '2.75rem', height: '2.75rem' }} title="Facebook"><Facebook /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

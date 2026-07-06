import React, { useEffect, useRef } from 'react';
import { MANIFESTO } from '../content.js';
import manifestoPhoto from '../../assets/photo.png';
import DnaPolkaWave from './DnaPolkaWave.jsx';
import Picture from './picture.jpg' 

export default function Manifesto() {
  const metaRef = useRef(null);

  useEffect(() => {
    const el = metaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="manifesto" style={{
    backgroundImage: `url(${Picture})`,
    backgroundSize: "100% 55%",
    backgroundPosition: "20% 39%",
    backgroundRepeat: "no-repeat",
  }}>
      <DnaPolkaWave />
      <img src={manifestoPhoto} alt="" className="manifesto-photo" />

      <div className="wrap reveal">
        <span
  className="eyebrow"
  style={{ marginLeft: "-1100px" }}
>
  The Manifesto
</span>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "120px", // Adjust this value for more/less space
    width: "100%",
  }}
>
  <p
    className="manifesto-quote"
    style={{
      textAlign: "left",
      flex: 1,
    }}
  >
    {MANIFESTO.lead}<span className="hl">{MANIFESTO.beleive}</span>{MANIFESTO.lead2}
  </p>

  <p
    className="manifesto-quote"
    style={{
      textAlign: "right",
      flex: 1,
    }}
  >
    {MANIFESTO.right} <span className="hl">{MANIFESTO.highlight}</span>{MANIFESTO.tail}
  </p>
</div>
        <div className="meta" ref={metaRef}>
          {MANIFESTO.meta.map((m, i) => (
            <div key={m.label} style={{ '--i': i }}>
              {m.label}
              <b>{m.value}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { ABOUT_PARAGRAPHS, ABOUT_STATS } from '../content.js';

export default function About({ site }) {
  return (
    <section id="about">
      <div className="col-l reveal">
        <span className="eyebrow">About</span>
        <h3 id="about-name">jaya vardhan govvada</h3>
      </div>
      <div className="col-r reveal">
        {ABOUT_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
        <div className="stat-row">
          {ABOUT_STATS.map((s) => (
            <div key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

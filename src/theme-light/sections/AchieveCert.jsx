import React from 'react';
import { ACHIEVEMENTS, CERTIFICATIONS } from '../content.js';

export default function AchieveCert() {
  return (
    <section id="achieve-cert">
      <span className="eyebrow reveal">Recognition</span>
      <h2 className="exp-head reveal">Achievements <em>&amp;</em> Certifications</h2>

      <div className="ac-wrap">
        <div className="ac-col ac-col-l reveal">
          <h4 className="ac-heading">Achievements</h4>
          <ul className="ac-list">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title}><b>{a.title}</b><span>{a.subtitle}</span></li>
            ))}
          </ul>
        </div>
        <div className="ac-col ac-col-r reveal">
          <h4 className="ac-heading">Certifications</h4>
          <ul className="ac-list">
            {CERTIFICATIONS.map((c) => (
              <li key={c.title}><b>{c.title}</b><span>{c.subtitle}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

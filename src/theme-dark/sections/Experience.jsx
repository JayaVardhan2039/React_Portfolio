import React from 'react';
import { EXPERIENCE_ITEMS } from '../content.js';

export default function Experience() {
  return (
    <section id="experience">
      <span className="eyebrow reveal">Experience</span>
      <h2 className="exp-head reveal">Where I've <em>built</em> things</h2>

      <div className="exp-track">
        <div className="exp-line"></div>

        {EXPERIENCE_ITEMS.map((item) => (
          <div key={item.title} className={`exp-row reveal${item.alt ? ' exp-alt' : ''}`}>
            <div className="exp-when">{item.when}</div>
            <div className="exp-body">
              <h4>{item.title}</h4>
              <span className="exp-co">{item.company}</span>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

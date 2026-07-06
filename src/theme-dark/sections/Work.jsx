import React from 'react';
import { PROJECTS } from '../content.js';

export default function Work() {
  return (
    <>
      <section id="work-intro">
        <h2 className="reveal">Selected <em>Work</em></h2>
      </section>

      <div id="work-list">
        {PROJECTS.map((p) => (
          <div key={p.num} className="project reveal">
            <div className="project-num">{p.num}</div>
            <div className="project-visual" style={{ background: p.visualStyle }}></div>
            <div className="project-content">
              <span className="project-tag">{p.tag}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
              <a href="#" className="project-link">View case study <span className="arrow">→</span></a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

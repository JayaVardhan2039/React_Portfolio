import React, { useState } from 'react';
import { PROJECTS } from '../content.js';

/* Eagerly import every project screenshot so Vite can bundle/hash them.
   Keyed by filename (without extension) so PROJECTS[].images (e.g. 'mrparker1')
   can look itself up below. */
const ASSET_MODULES = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

const IMAGE_MAP = Object.fromEntries(
  Object.entries(ASSET_MODULES).map(([path, url]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '');
    return [name, url];
  })
);

function ProjectGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const srcs = images.map((name) => IMAGE_MAP[name]).filter(Boolean);
  if (srcs.length === 0) return null;

  const go = (dir) => {
    setIndex((i) => (i + dir + srcs.length) % srcs.length);
  };

  return (
    <div className="project-gallery">
      <div className="project-gallery-frame">
        <img
          key={index}
          src={srcs[index]}
          alt={`${title} — screenshot ${index + 1} of ${srcs.length}`}
          className="project-gallery-img"
        />

        {srcs.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-btn gallery-btn-prev"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-btn gallery-btn-next"
              onClick={() => go(1)}
              aria-label="Next screenshot"
            >
              ›
            </button>

            <div className="gallery-dots">
              {srcs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gallery-dot${i === index ? ' active' : ''}`}
                  aria-label={`Go to screenshot ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <>
      <section id="work-intro">
        <h2 className="reveal">Technical <em> Showcase</em></h2>
      </section>

      <div id="work-list">
        {PROJECTS.map((p) => (
          <div key={p.num} className="project reveal">
            <div className="project-num">{p.num}</div>

            <div className="project-visual" style={{ background: p.visualStyle }}></div>

            {p.images && p.images.length > 0 && (
              <ProjectGallery images={p.images} title={p.title} />
            )}

            <div className="project-content">
              <span className="project-tag">{p.tag}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
              <a href={p.href} className="project-link" target="_blank" rel="noopener noreferrer">
                View case study <span className="arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
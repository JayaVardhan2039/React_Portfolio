import React from 'react';
import { EDUCATION, SKILLS } from '../content.js';

export default function EduSkills() {
  return (
    <section id="edu-skills">
      <span className="eyebrow reveal">Background</span>
      <h2 className="exp-head reveal">Education <em>&amp;</em> Skills</h2>

      <div className="es-grid">
        <div className="es-edu reveal">
          {EDUCATION.map((edu) => (
            <div className="es-edu-item" key={edu.school}>
              <span className="es-year">{edu.years}</span>
              <h4>{edu.degree}</h4>
              <span className="es-school">{edu.school}</span>
              {edu.detail && <span className="es-detail">{edu.detail}</span>}
            </div>
          ))}
        </div>

        <div className="es-skills reveal">
          {SKILLS.map((s) => <span key={s} className="es-skill">{s}</span>)}
        </div>
      </div>
    </section>
  );
}
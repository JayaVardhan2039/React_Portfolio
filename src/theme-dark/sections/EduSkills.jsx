import React from 'react';
import { EDUCATION, SKILLS } from '../content.js';

export default function EduSkills() {
  return (
    <section id="edu-skills">
      <span className="eyebrow reveal">Background</span>
      <h2 className="exp-head reveal">Education <em>&amp;</em> Skills</h2>

      <div className="es-edu reveal">
        <div className="es-edu-item">
          <span className="es-year">{EDUCATION.years}</span>
          <h4>{EDUCATION.degree}</h4>
          <span className="es-school">{EDUCATION.school}</span>
        </div>
      </div>

      <div className="es-skills reveal">
        {SKILLS.map((s) => <span key={s} className="es-skill">{s}</span>)}
      </div>
    </section>
  );
}

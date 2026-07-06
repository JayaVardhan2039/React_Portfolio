import React from 'react';
import { RIBBON_WORDS } from '../content.js';

function RibbonWords() {
  return (
    <>
      {RIBBON_WORDS.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className="fill">{w}</span><span>•</span>
        </React.Fragment>
      ))}
    </>
  );
}

export default function SkillsRibbon() {
  return (
    <div id="ribbon-wrap">
      <div className="ribbon ribbon-track">
        <RibbonWords />
        <RibbonWords />
      </div>
    </div>
  );
}

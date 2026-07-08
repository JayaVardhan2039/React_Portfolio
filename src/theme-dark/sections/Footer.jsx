import React from 'react';
import { SOCIALS } from '../content.js';

export default function Footer({ site }) {
  return (
    <footer>
      <span id="footer-name">{site.footerName}</span>
      <div className="socials">
        {SOCIALS.map((s) =><a
  key={s.label}
  href={s.href}
  target="_blank"
  rel="noopener noreferrer"
>
  {s.label}
</a>)}
      </div>
    </footer>
  );
}

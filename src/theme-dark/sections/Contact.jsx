import React from 'react';

export default function Contact({ site }) {
  return (
    <section id="contact">
      <span className="eyebrow">Get in touch</span>
      <h2 className="reveal">Let's build<br />something timeless</h2>
      <a href={`mailto:${site.email}`} className="email" id="contact-email">Let's connect</a>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        '.contact .section-title, .contact .section-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Contact info and map
      gsap.fromTo(
        '.contact__info, .contact__map',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact__content', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Visit Our Store</h2>
        <p className="section-subtitle">Come experience the magic of gifting in person</p>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__card">
              <div className="contact__icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>Location</h3>
                <p>Padmavathi Gift Shop<br />(Please check map for exact location)</p>
              </div>
            </div>

            <div className="contact__card">
              <div className="contact__icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <h3>Phone & WhatsApp</h3>
                <p>
                  <a href="tel:+918978165716">+91 89781 65716</a>
                </p>
              </div>
            </div>

            <div className="contact__card">
              <div className="contact__icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3>Store Hours</h3>
                <p>Monday - Sunday<br />9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact__map-wrapper">
            <iframe
              title="Padmavathi Gift Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.6611455041243!2d79.97964787510323!3d14.44668148602163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c8ccb12df0665%3A0xad2d689d37763c22!2sPADMAVATHI%20SHOPPING%20MALL!5e0!3m2!1sen!2sin!4v1787623315982!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contact__map-iframe"
            ></iframe>
            <div className="contact__map-overlay-card">
              <p className="contact__map-title">Padmavathi Gift Shop</p>
              <p className="contact__map-subtitle">Trunk Road • Landmark Showroom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

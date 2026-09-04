import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Memberships', path: '/memberships' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ],
  Membership: [
    { label: 'Student', path: '/memberships' },
    { label: 'Job Seeker', path: '/memberships' },
    { label: 'Middle Class', path: '/memberships' },
    { label: 'Premium', path: '/memberships' },
  ],
  Account: [
    { label: 'Log In', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Forgot Password', path: '/forgot-password' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-base-900 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight">Fit Kats</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Premium tiered-membership fitness, built around biometric access
              and a dashboard that adapts to how you train.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((SocialIcon, i) => {
                return (
                  
                    <a key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <SocialIcon size={16} className="text-white/60" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Visit Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>142 Rivonia Road, Sandton, Johannesburg</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone size={16} className="shrink-0" />
                <span>+27 11 555 0192</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail size={16} className="shrink-0" />
                <span>hello@fitkats.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Fit Kats. All rights reserved.
          </p>
          <p className="text-xs text-white/30">Built for a Rosebank College coursework project.</p>
        </div>
      </div>
    </footer>
  );
}
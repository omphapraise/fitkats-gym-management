import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative rounded-4xl overflow-hidden glass p-16 text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient mb-4">
            Ready to train differently?
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-9">
            Join Fit Kats today and get your first biometric enrolment session
            on us.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Join Fit Kats Now
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
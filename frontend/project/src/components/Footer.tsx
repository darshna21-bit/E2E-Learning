import { Link } from 'react-router-dom';
import { BookOpen, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">E2E Learning</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner for exam success. Comprehensive notes designed for 9+ SGPA achievement.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/notes" className="hover:text-blue-400 transition">Browse Notes</Link></li>
              <li><Link to="/orders" className="hover:text-blue-400 transition">My Orders</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@e2elearning.com" className="hover:text-blue-400 transition">
                support@e2elearning.com
              </a>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="border-t border-gray-800 pt-8 text-center text-sm"
          {...fadeUp(0.25)}
        >
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for students by E2E Learning
          </p>
          <p className="mt-2 text-gray-500">
            © {new Date().getFullYear()} E2E Learning. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
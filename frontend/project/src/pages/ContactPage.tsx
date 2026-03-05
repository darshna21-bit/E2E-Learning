import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const contactCards = [
  { icon: <Mail className="w-6 h-6 text-blue-600" />, title: 'Email Us', value: 'support@e2elearning.com' },
  { icon: <Phone className="w-6 h-6 text-blue-600" />, title: 'Call Us', value: '+91 98765 43210' },
  { icon: <MapPin className="w-6 h-6 text-blue-600" />, title: 'Visit Us', value: 'Mumbai, India' },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">We're here to help. Reach out to us anytime.</p>
        </motion.div>
      </div>

      {/* Info cards */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">{card.icon}</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactForm />
      </motion.div>

    </div>
  );
};

export default ContactPage;
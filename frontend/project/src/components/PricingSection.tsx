import { useNavigate } from 'react-router-dom';
import { Tag, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PricingSectionProps {
  price: number;
  discountedPrice: number;
  subjectTitle: string;
}

const PricingSection = ({ price, discountedPrice, subjectTitle }: PricingSectionProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const discount = Math.round(((price - discountedPrice) / price) * 100);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
    } else {
      alert('Payment integration coming soon! This will connect to Razorpay.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-20">
      <div className="flex items-center gap-2 text-green-600 mb-4">
        <Tag className="w-5 h-5" />
        <span className="font-semibold">{discount}% OFF - Limited Time!</span>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">{subjectTitle}</h3>

      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-bold text-blue-600">₹{discountedPrice}</span>
          <span className="text-2xl text-gray-400 line-through">₹{price}</span>
        </div>
        <p className="text-sm text-gray-600">One-time payment. Lifetime access.</p>
      </div>

      <button
        onClick={handleBuyNow}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        Buy Now
      </button>

      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
          <span>Comprehensive coverage of all units</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
          <span>All previous year questions included</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
          <span>Instant digital access</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
          <span>Regular updates and improvements</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

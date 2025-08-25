import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import MemberLoginModal from './MemberLoginModal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Secret Key Combination Logic
  // A + N + E + E + S + A (key codes: 65, 78, 69, 69, 83, 65)
  useEffect(() => {
    const secretCode = [65, 78, 69, 69, 83, 65];
    let codeIndex = 0; // Use a local variable for sequence tracking within the effect

    const handleKeyDown = (event) => {
        // Only process if no input field is focused (to prevent accidental triggers)
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            return;
        }

        if (event.keyCode === secretCode[codeIndex]) {
            codeIndex++;
            if (codeIndex === secretCode.length) {
                // Secret code entered successfully
                navigate('/admin-login');
                codeIndex = 0; // Reset for next use
                event.preventDefault(); // Prevent default browser behavior if any
            }
        } else {
            codeIndex = 0; // Reset if wrong key is pressed
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown); // Clean up listener
    };
  }, [navigate]); // navigate is a dependency

  // Placeholder for your carousel/hero section.
  const HeroSection = () => (
    <div
      className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('https://via.placeholder.com/1500x500/007bff/ffffff?text=Amazing+Prizes+Carousel')" }} // Replace with actual image path
    >
      <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Win Your Dream Home or Car!</h1>
        <p className="text-xl md:text-2xl">Join the MULTICOM Gift Scheme Today</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-blue-100 font-sans">

      {/* Hero/Carousel Section */}
      <HeroSection />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Key Info / Benefits Section */}
        <section className="text-center my-8 md:my-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">MULTICOM Gift Scheme</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Participate in our weekly draws and stand a chance to win exciting gifts,
            with grand bumper prizes like a 1BHK Flat and a Maruti Fronx!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Weekly Gifts</h3>
              <p className="text-gray-600">Win valuable prizes every week!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Grand Bumper Prizes</h3>
              <p className="text-gray-600">Dreams come true with our flat & car draws.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">Simple Payments</h3>
              <p className="text-gray-600">Easy weekly payments, hassle-free tracking.</p>
            </div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className="flex flex-col items-center gap-6 my-10 md:my-16">
          {/* "Interested to Join Scheme?" button - Big and eye-catching */}
          <button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse"
            // onClick={() => setShowJoinModal(true)} // Uncomment when you build JoinSchemeModal
          >
            🔥 Interested to Join Scheme?
          </button>

          {/* "Sign In as Member" button - Smaller, but prominent */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg md:text-xl font-semibold shadow-md transition-colors duration-300"
            onClick={() => setShowLoginModal(true)}
          >
            🔒 Sign In as Member
          </button>
        </section>

        {/* You can add more sections here like testimonials, FAQs, contact info etc. */}

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} MULTICOM Gift Scheme. All rights reserved.</p>
        <p className="text-sm">Contact: +91 12345 67890 | info@multicom.com</p>
      </footer>

      {/* Member Login Modal */}
      {showLoginModal && <MemberLoginModal onClose={() => setShowLoginModal(false)} />}

      {/* Join Scheme Modal (uncomment when ready) */}
      {/* {showJoinModal && <JoinSchemeModal onClose={() => setShowJoinModal(false)} />} */}

    </div>
  );
};

export default LandingPage;
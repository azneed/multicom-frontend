import React, { useState } from 'react';

const MultiComLandingPage = () => {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data for weekly prizes
  const prizes = [
    {
      week: "1st Week",
      prize1: "SAMARIT TV 32\"",
      desc1: "High quality television for your home entertainment",
      prize2: "SAMSUNG GALAXY F05",
      desc2: "Feature-packed smartphone"
    },
    {
      week: "2nd Week",
      prize1: "TVS JUPITER",
      desc1: "Stylish and reliable scooter",
      prize2: "20,000 RUPEES CASH",
      desc2: "Instant cash prize"
    },
    {
      week: "3rd Week",
      prize1: "HERO HF 100",
      desc1: "Fuel-efficient motorcycle",
      prize2: "GOLD",
      desc2: "Valuable gold prize"
    }
  ];

  // Data for how it works steps
  const steps = [
    {
      icon: "1",
      title: "Register",
      description: "Sign up for the MultiCom Gift Scheme with your basic details"
    },
    {
      icon: "2",
      title: "Participate",
      description: "Complete the simple requirements to be eligible for the draws"
    },
    {
      icon: "3",
      title: "Win",
      description: "Attend our weekly draws and claim your prize if you're the lucky winner!"
    }
  ];

  // Data for testimonials
  const testimonials = [
    {
      content: "I never thought I'd win something so valuable! The MultiCom Gift Scheme changed my life when I won the Hero HF 100 bike. The process was transparent and the team was very helpful.",
      name: "Rahul K.",
      role: "Bike Winner - 12th Week",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "Winning the 32\" Smart TV was amazing! I was skeptical at first but the MultiCom team made everything so easy. Now I enjoy movie nights with my family on my new TV.",
      name: "Priya M.",
      role: "TV Winner - 25th Week",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      content: "The cash prize of 20,000 rupees came at the perfect time for my family. Thank you MultiCom for this wonderful opportunity. I'm telling all my friends to join!",
      name: "Vikram S.",
      role: "Cash Prize Winner - 21st Week",
      img: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // CSS styles
  const styles = `
    :root {
      --primary: #FF6B00;
      --secondary: #003366;
      --accent: #FFD700;
      --light: #FFFFFF;
      --dark: #333333;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    body {
      background-color: #f9f9f9;
      color: var(--dark);
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Header Styles */
    header {
      background: linear-gradient(135deg, var(--secondary), var(--dark));
      color: var(--light);
      padding: 15px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 28px;
      font-weight: 700;
      color: var(--light);
      text-decoration: none;
    }

    .logo span {
      color: var(--accent);
    }

    nav ul {
      display: flex;
      list-style: none;
    }

    nav ul li {
      margin-left: 30px;
    }

    nav ul li a {
      color: var(--light);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    nav ul li a:hover {
      color: var(--accent);
    }

    .mobile-menu {
      display: none;
      font-size: 24px;
      cursor: pointer;
    }

    /* Hero Section */
    .hero {
      background: url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da') no-repeat center center/cover;
      height: 80vh;
      display: flex;
      align-items: center;
      position: relative;
      color: var(--light);
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 600px;
    }

    .hero h1 {
      font-size: 48px;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .hero p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    .btn {
      display: inline-block;
      background: var(--primary);
      color: var(--light);
      padding: 12px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: #e05e00;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    /* Weekly Prizes Section */
    .prizes {
      padding: 80px 0;
      background-color: var(--light);
    }

    .section-title {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-title h2 {
      font-size: 36px;
      color: var(--secondary);
      position: relative;
      display: inline-block;
      padding-bottom: 15px;
    }

    .section-title h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: var(--primary);
    }

    .prize-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }

    .prize-card {
      background: var(--light);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .prize-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }

    .prize-img {
      height: 200px;
      overflow: hidden;
    }

    .prize-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .prize-card:hover .prize-img img {
      transform: scale(1.1);
    }

    .prize-content {
      padding: 20px;
    }

    .prize-week {
      display: inline-block;
      background: var(--primary);
      color: var(--light);
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .prize-content h3 {
      font-size: 20px;
      margin-bottom: 10px;
      color: var(--secondary);
    }

    .prize-content p {
      color: #666;
      margin-bottom: 15px;
    }

    .prize-or {
      text-align: center;
      font-weight: 600;
      margin: 10px 0;
      color: var(--primary);
    }

    /* Featured Prize Section */
    .featured-prize {
      background: linear-gradient(135deg, var(--secondary), var(--dark));
      padding: 80px 0;
      color: var(--light);
    }

    .featured-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .featured-img {
      flex: 1;
      min-width: 300px;
      padding: 20px;
    }

    .featured-img img {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .featured-content {
      flex: 1;
      min-width: 300px;
      padding: 20px;
    }

    .featured-content h2 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    .featured-content p {
      margin-bottom: 30px;
      font-size: 18px;
    }

    /* How It Works Section */
    .how-it-works {
      padding: 80px 0;
      background-color: var(--light);
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .step {
      text-align: center;
      padding: 30px 20px;
      border-radius: 10px;
      background: #f5f5f5;
      transition: all 0.3s ease;
    }

    .step:hover {
      background: var(--primary);
      color: var(--light);
      transform: translateY(-10px);
    }

    .step-icon {
      font-size: 50px;
      margin-bottom: 20px;
      color: var(--primary);
    }

    .step:hover .step-icon {
      color: var(--light);
    }

    .step h3 {
      margin-bottom: 15px;
      font-size: 22px;
    }

    /* Testimonials */
    .testimonials {
      padding: 80px 0;
      background: #f5f5f5;
    }

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .testimonial {
      background: var(--light);
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }

    .testimonial-content {
      margin-bottom: 20px;
      font-style: italic;
      color: #555;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
    }

    .author-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
    }

    .author-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .author-info h4 {
      margin-bottom: 5px;
    }

    .author-info p {
      color: #777;
      font-size: 14px;
    }

    /* CTA Section */
    .cta {
      padding: 80px 0;
      background: linear-gradient(135deg, var(--primary), #ff8c00);
      color: var(--light);
      text-align: center;
    }

    .cta h2 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    .cta p {
      max-width: 700px;
      margin: 0 auto 30px;
      font-size: 18px;
    }

    .btn-light {
      background: var(--light);
      color: var(--primary);
    }

    .btn-light:hover {
      background: #f0f0f0;
    }

    /* Footer */
    footer {
      background: var(--dark);
      color: var(--light);
      padding: 60px 0 20px;
    }

    .footer-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .footer-col h3 {
      font-size: 20px;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
    }

    .footer-col h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: var(--primary);
    }

    .footer-col ul {
      list-style: none;
    }

    .footer-col ul li {
      margin-bottom: 10px;
    }

    .footer-col ul li a {
      color: #bbb;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .footer-col ul li a:hover {
      color: var(--light);
      padding-left: 5px;
    }

    .contact-info {
      margin-bottom: 15px;
      display: flex;
      align-items: flex-start;
    }

    .contact-info i {
      margin-right: 10px;
      color: var(--primary);
    }

    .social-links {
      display: flex;
      margin-top: 20px;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      margin-right: 10px;
      color: var(--light);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      background: var(--primary);
      transform: translateY(-3px);
    }

    .copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 14px;
      color: #bbb;
    }

    /* Responsive Styles */
    @media (max-width: 992px) {
      .hero h1 {
        font-size: 40px;
      }
    }

    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        text-align: center;
      }
      
      nav ul {
        margin-top: 20px;
        flex-direction: column;
        align-items: center;
        display: none;
      }
      
      nav ul.show {
        display: flex;
      }
      
      nav ul li {
        margin: 10px 0;
      }
      
      .mobile-menu {
        display: block;
      }
      
      .hero {
        height: auto;
        padding: 100px 0;
        text-align: center;
      }
      
      .hero-content {
        margin: 0 auto;
      }
      
      .featured-container {
        flex-direction: column;
      }
      
      .featured-img, .featured-content {
        min-width: 100%;
      }
    }

    @media (max-width: 576px) {
      .hero h1 {
        font-size: 32px;
      }
      
      .hero p {
        font-size: 16px;
      }
      
      .section-title h2 {
        font-size: 28px;
      }
      
      .featured-content h2 {
        font-size: 28px;
      }
      
      .cta h2 {
        font-size: 28px;
      }
    }
  `;

  return (
    <div className="App">
      {/* Inject CSS styles */}
      <style>{styles}</style>
      
      {/* Header */}
      <header>
        <div className="container header-container">
          <a href="#" className="logo">MULTI<span>COM</span></a>
          <div className="mobile-menu" onClick={toggleMenu}>☰</div>
          <nav className={isMenuOpen ? 'show' : ''}>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#prizes">Weekly Prizes</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Winners</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#" className="btn">Join Now</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Win Exciting Prizes Every Week!</h1>
            <p>Join MultiCom Gift Scheme for a chance to win amazing prizes including TVs, bikes, gold, cash prizes and more in our weekly draws!</p>
            <a href="#" className="btn">Register Today</a>
          </div>
        </div>
      </section>

      {/* Weekly Prizes Section */}
      <section className="prizes" id="prizes">
        <div className="container">
          <div className="section-title">
            <h2>Our Weekly Prize Draws</h2>
          </div>
          <div className="prize-grid">
            {prizes.map((prize, index) => (
              <div className="prize-card" key={index}>
                <div className="prize-img">
                  <img src={`https://picsum.photos/400/300?random=${index}`} alt={prize.prize1} />
                </div>
                <div className="prize-content">
                  <span className="prize-week">{prize.week}</span>
                  <h3>{prize.prize1}</h3>
                  <p>{prize.desc1}</p>
                  <div className="prize-or">OR</div>
                  <h3>{prize.prize2}</h3>
                  <p>{prize.desc2}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="#" className="btn">View All Prizes</a>
          </div>
        </div>
      </section>

      {/* Featured Prize Section */}
      <section className="featured-prize">
        <div className="container featured-container">
          <div className="featured-img">
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2" alt="Maruti Suzuki Fronx" />
          </div>
          <div className="featured-content">
            <h2>Grand Prize: Maruti Suzuki Fronx</h2>
            <p>One lucky winner will drive home the brand new Maruti Suzuki Fronx - a perfect combination of style, performance and comfort.</p>
            <p>With multiple opportunities to win throughout the year, your dream car could be just a draw away!</p>
            <a href="#" className="btn">How to Win</a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Participating in our gift scheme is simple and rewarding</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Our Happy Winners</h2>
            <p>Hear from people who've won amazing prizes with us</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={index}>
                <div className="testimonial-content">
                  "{testimonial.content}"
                </div>
                <div className="testimonial-author">
                  <div className="author-img">
                    <img src={testimonial.img} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Win Amazing Prizes?</h2>
          <p>Join thousands of participants who are already in the running for our exciting weekly prizes. Don't miss your chance to win!</p>
          <a href="#" className="btn btn-light">Register Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="container">
          <div className="footer-container">
            <div className="footer-col">
              <h3>MultiCom</h3>
              <p>The 6th Generation Gift Scheme providing exciting opportunities to win valuable prizes every week.</p>
              <div className="social-links">
                <a href="#"><i>f</i></a>
                <a href="#"><i>in</i></a>
                <a href="#"><i>t</i></a>
                <a href="#"><i>ig</i></a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#prizes">Prizes</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#testimonials">Winners</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Contact Us</h3>
              <div className="contact-info">
                <i>📍</i>
                <div>
                  <p>Ground Floor, Singapore Complex</p>
                  <p>Uppala, Karnataka, India</p>
                </div>
              </div>
              <div className="contact-info">
                <i>📞</i>
                <div>
                  <p>+91 9746797367</p>
                  <p>+91 9037497367</p>
                  <p>+91 8891497367</p>
                </div>
              </div>
              <div className="contact-info">
                <i>🌐</i>
                <div>
                  <p>www.multicomgiftscheme.in</p>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 MultiCom Gift Scheme. All Rights Reserved.</p>
            <p>DRAW EVERY THURSDAY 4:30PM @ MULTICOM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MultiComLandingPage;
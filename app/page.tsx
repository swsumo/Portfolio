'use client';

import { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector(targetId);
          targetSection?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Active nav link on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('section, .hero, .about, .skills-section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          padding-top: 80px;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid #f1e3c5ff;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2d2416;
        }

        .navbar-links {
          display: flex;
          gap: 30px;
        }

        .navbar-links a {
          color: #6d4730;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }

        .navbar-links a:hover,
        .navbar-links a.active {
          color: #d97757;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-delay-1 { animation-delay: 0.1s; }
        .fade-in-delay-2 { animation-delay: 0.2s; }
        .fade-in-delay-3 { animation-delay: 0.3s; }

        .hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 60px 0;
          border-bottom: 2px solid #e5d8bb;
        }

        .hero-left h1 {
          font-size: 3rem;
          color: #2d2416;
          margin-bottom: 10px;
        }

        .hero-left .subtitle {
          font-size: 1.2rem;
          color: #6d4730;
          margin-bottom: 20px;
        }

        .contact-links {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .contact-links a,
        .contact-links span {
          color: #d97757;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .contact-links a:hover {
          transform: translateY(-2px);
        }

        .profile-pic {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97757, #c96543);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: white;
          font-weight: bold;
          box-shadow: 0 10px 30px rgba(217, 119, 87, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        .about {
          padding: 40px 0 20px 0;
        }

        .about h2 {
          font-size: 2.5rem;
          color: #2d2416;
          margin-bottom: 20px;
          text-align: center;
        }

        .about-content {
          background: white;
          padding: 30px;
          border-radius: 20px;
          border: 2px solid #e5d8bb;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        .interests {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .interest-tag {
          background: #f0e8d5;
          padding: 8px 16px;
          border-radius: 20px;
          border: 2px solid #c9b592;
          font-size: 0.9rem;
        }

        .skills-section {
          padding: 20px 0 40px 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 20px;
        }

        .skill-category {
          background: white;
          padding: 30px;
          border-radius: 20px;
          border: 2px solid #e5d8bb;
          animation: float 3s ease-in-out infinite;
        }

        .skill-category:nth-child(2) {
          animation-delay: 0.5s;
        }

        .skill-category:nth-child(3) {
          animation-delay: 1s;
        }

        .skill-category:nth-child(4) {
          animation-delay: 1.5s;
        }

        .skill-category h3 {
          color: #2d2416;
          margin-bottom: 15px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .skill-list {
          color: #4a3020;
          line-height: 1.8;
        }

        .download-btn {
          display: inline-block;
          background: #d97757;
          color: white;
          padding: 15px 40px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: bold;
          margin: 20px 0;
          box-shadow: 0 4px 15px rgba(217, 119, 87, 0.3);
          transition: all 0.3s;
          animation: float 3s ease-in-out infinite;
        }

        .download-btn:hover {
          background: #c96543;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(217, 119, 87, 0.4);
        }

        .section-title {
          font-size: 2.5rem;
          color: #2d2416;
          margin: 30px 0 20px 0;
          text-align: center;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          border: 2px solid #e5d8bb;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          transition: all 0.3s;
          animation: float 3s ease-in-out infinite;
        }

        .card:nth-child(2n) {
          animation-delay: 0.5s;
        }

        .card:nth-child(3n) {
          animation-delay: 1s;
        }

        .card:hover {
          border-color: #d97757;
          transform: translateY(-10px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .card-badge {
          background: linear-gradient(135deg, #d97757, #c96543);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 15px;
        }

        .card h3 {
          color: #2d2416;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .card-date {
          color: #6d4730;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .card p {
          color: #4a3020;
          line-height: 1.8;
        }

        .card-link {
          display: inline-block;
          margin-top: 15px;
          color: #d97757;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .card-link:hover {
          transform: translateX(5px);
        }

        .resume-viewer {
          background: white;
          padding: 20px;
          border-radius: 20px;
          border: 2px solid #e5d8bb;
          margin: 20px 0;
        }

        .resume-viewer iframe {
          width: 100%;
          height: 800px;
          border: none;
        }

        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          margin-top: 20px;
        }

        .certificate-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          border: 2px solid #e5d8bb;
          text-align: center;
          transition: all 0.3s;
          animation: float 3s ease-in-out infinite;
        }

        .certificate-card:nth-child(2) {
          animation-delay: 0.5s;
        }

        .certificate-card:hover {
          border-color: #d97757;
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .certificate-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .certificate-card h3 {
          color: #2d2416;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .certificate-issuer {
          color: #d97757;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .certificate-card p {
          color: #6d4730;
          margin-bottom: 20px;
        }

        .verify-btn {
          display: inline-block;
          background: transparent;
          color: #d97757;
          padding: 10px 30px;
          border: 2px solid #d97757;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .verify-btn:hover {
          background: #d97757;
          color: white;
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
          }

          .hero-left h1 {
            font-size: 2rem;
          }

          .profile-pic {
            margin-top: 30px;
          }

          .navbar-links {
            flex-wrap: wrap;
            gap: 10px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .certificates-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* FIXED NAVIGATION BAR */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">SM</div>
          <div className="navbar-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#blogs" className="nav-link">Blogs</a>
            <a href="#resume" className="nav-link">Resume</a>
          </div>
        </div>
      </nav>

      <div className="container">
        
        {/* HERO SECTION */}
        <div className="hero fade-in" id="about">
          <div className="hero-left">
            <h1>Swapnil Mogal</h1>
            <p className="subtitle">Manipal University Jaipur | CGPA: 8.8</p>
            
            <div className="contact-links">
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '24px' }}>🤙</span>
    +91 8369170844
  </span>
  
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img src="/gmail.png" alt="Gmail" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
    swapnilmogal26@gmail.com
  </span>
  
  <a href="https://github.com/swsumo" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img src="/github-mark.png" alt="GitHub" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
    GitHub
  </a>
  
  <a href="https://www.linkedin.com/in/swapnil-mogal-b08163260" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img src="/icons8-linkedin-30.png" alt="LinkedIn" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
    LinkedIn
  </a>
  
  <a href="https://medium.com/@swapnilmogal26" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img src="/Screenshot 2026-01-07 000844.png" alt="Medium" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
    Medium
  </a>
</div>
          </div>
          
          <div className="profile-pic">
          <img src="/pp2.jpg" alt="Swapnil Mogal" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="about">
          <h2 className="fade-in">About Me</h2>
          
          <div className="about-content fade-in">
            <p><strong>Professional Summary:</strong></p>
            <p>Final-year B.Tech Data Science student with strong hands-on experience in Machine Learning, NLP, Computer Vision, and large-scale fintech analytics systems.</p>
            
            <p style={{ marginTop: '20px' }}><strong>Beyond Work:</strong></p>
            <p>When I&apos;m not coding or analyzing data, you&apos;ll find me watching football matches, exploring new destinations, enjoying movies, listening to melancholic music, binge-watching horror series, reading tech blogs, and experimenting with new cuisines ofc under a budget tho.</p>
            
            <div className="interests">
              <span className="interest-tag"> Football Fan A Manchester city supporter</span>
              <span className="interest-tag"> Travel Enthusiast</span>
              <span className="interest-tag"> Movie/Series Buff </span>
              <span className="interest-tag"> Underrated Songs Lover</span>
              <span className="interest-tag"> Tech Blogs</span>
            </div>
          </div>
          
          <center>
            <a href="/Swapnil Mogal Resume.pdf" download className="download-btn fade-in">📥 Download Resume</a>
          </center>
        </div>

        {/* SKILLS SECTION */}
        <div className="skills-section" id="skills">
          <h2 className="section-title fade-in">Tech Stack</h2>
          
          <div className="skills-grid">
            <div className="skill-category fade-in fade-in-delay-1">
              <h3>Programming Languages</h3>
              <p className="skill-list">Python, SQL, Java, C, C++, Django, Rest APIs</p>
            </div>

            <div className="skill-category fade-in fade-in-delay-2">
              <h3>Machine and Deep Learning</h3>
              <p className="skill-list">OpenCV, YOLO (v5/v8), Scikit-learn, TensorFlow, PyTorch, Keras, Django</p>
            </div>

            <div className="skill-category fade-in fade-in-delay-3">
              <h3>Frontend Development</h3>
              <p className="skill-list">HTML, CSS, Tailwind CSS, JavaScript</p>
            </div>

            <div className="skill-category fade-in">
              <h3>Data Visualization & Analytics Tools</h3>
              <p className="skill-list">Tableau, Power BI, Git, Matplotlib, Seaborn, Pandas, NumPy</p>
            </div>
          </div>
        </div>

        {/* INTERNSHIPS SECTION */}
        <h2 className="section-title fade-in" id="experience">Internships & Experience</h2>
        
        <div className="cards-grid">
          <div className="card fade-in fade-in-delay-1">
            <div className="card-badge">National Payments Co-operation of India - NPCI</div>
            <h3>Data Science Intern</h3>
            <p className="card-date">August 2025 - January 2026 </p>
            <p>Built an end-to-end analytics dashboard for CBDC–CBDC and CBDC–UPI interoperability, owning data engineering, KPI computation, success/failure analysis, and anomaly detection.
Generated bank-level insights through advanced visualizations to monitor transaction performance and operational trends.
Contributed to the CBDC reconciliation system by detecting discrepancies across issuance, redemption, inward, and outward bank transactions.</p>
          </div>
          
          <div className="card fade-in fade-in-delay-2">
            <div className="card-badge">Artizence Systems LLP</div>
            <h3>ML Engineer Intern</h3>
            <p className="card-date">January 2025 - March 2025</p>
            <p>Designed tailored approaches using large-scale models that addressed three key challenges faced by previous
algorithms, ensuring seamless adaptation of technology that improves overall user interaction with machine
generated texts.</p>
          </div>
          
          <div className="card fade-in fade-in-delay-3">
            <div className="card-badge">Finlatics</div>
            <h3>Business Analyst Intern</h3>
            <p className="card-date">January 2024  - February 2024</p>
            <p>Analyzed market trends and developed financial models for fintech solutions, improving decision-making
processes and increasing efficiency by 15% in 5+ industry cases</p>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <h2 className="section-title fade-in" id="projects">Projects</h2>
        
        <div className="cards-grid">
          <div className="card fade-in">
            <h3>PPE Safety Kit Detection</h3>
            <p>YOLOv8-based computer vision system for real-time detection and monitoring of safety equipment compliance in industrial environments.</p>
            <a href="https://github.com/swsumo/PPE-Safetykit-detetction" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>NHL Prediction App</h3>
            <p>Machine learning application that predicts NHL game outcomes using historical data, team statistics, and player performance metrics.</p>
            <a href="https://github.com/swsumo/NHL-Prediction-Application" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>Story Generation (Transformers)</h3>
            <p>Advanced NLP model using transformer architecture for creative story generation with contextually relevant outputs.</p>
            <a href="https://github.com/swsumo/Story_Generation" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>Pose Estimation</h3>
            <p>Real-time human pose estimation system using computer vision techniques for fitness and sports analytics applications.</p>
            <a href="https://github.com/swsumo/Pose-estimation" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>Stone Paper Scissors Game</h3>
            <p>Interactive game using hand gesture recognition powered by computer vision and CNN models.</p>
            <a href="https://github.com/swsumo/Stone-Paper-Scissors" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>COVID Dashboard (Snowflake)</h3>
            <p>Comprehensive data analytics dashboard for tracking COVID-19 trends using Snowflake data warehouse.</p>
            <a href="https://github.com/swsumo/Covid_Dashboard_Snowflake" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
          
          <div className="card fade-in">
            <h3>E-Commerce Dashboard</h3>
            <p>Business intelligence dashboard for e-commerce metrics analysis including sales trends and customer behavior.</p>
            <a href="https://github.com/swsumo/E_Commerece_Dashboard_Snowfflake" target="_blank" rel="noopener noreferrer" className="card-link">View on GitHub →</a>
          </div>
        </div>

        {/* BLOGS SECTION */}
        <h2 className="section-title fade-in" id="blogs">Blog Posts</h2>
        
        <div className="cards-grid">
          <div className="card fade-in fade-in-delay-1">
            <h3>AI Hallucinations: When Smart Systems Generate False Information</h3>
            <p>A comprehensive study on The Technical Underpinnings of Hallucinations.</p>
            <a href="https://medium.com/@swapnilmogal26" target="_blank" rel="noopener noreferrer" className="card-link">Read on Medium →</a>
          </div>
          
          <div className="card fade-in fade-in-delay-2">
            <h3>Prompt Engineering: The New Programming Language of AI?</h3>
            <p>Best practices for understanding and knowing What Is Prompt Engineering?</p>
            <a href="https://medium.com/@swapnilmogal26" target="_blank" rel="noopener noreferrer" className="card-link">Read on Medium →</a>
          </div>
          
          <div className="card fade-in fade-in-delay-3">
            <h3>Does ChatGPT Have Its Own Verifier? Clearing the Misconceptions</h3>
            <p>Dive Deep Down into how does GPT verify its claims?</p>
            <a href="https://medium.com/@swapnilmogal26/does-chatgpt-have-its-own-verifier-clearing-the-misconceptions-75c6118410f6" target="_blank" rel="noopener noreferrer" className="card-link">Read on Medium →</a>
          </div>
        </div>

        {/* RESUME VIEWER */}
        <h2 className="section-title fade-in" id="resume">Resume</h2>
        <div className="resume-viewer fade-in">
          <iframe
            src="/Swapnil Mogal Resume.pdf"
            title="Resume PDF"
          />
        </div>

        {/* CERTIFICATES SECTION */}
        <h2 className="section-title fade-in">Certifications</h2>
        
        <div className="certificates-grid">
          <div className="certificate-card fade-in fade-in-delay-1">
            <h3>AI/ML and Data Science Boot camp</h3>
            <p className="certificate-issuer">Udemy</p>
            <p>Comprehensive course covering Data Science Fundamentals , Machine learning, and deep learning fundamentals.</p>
            <a href="https://drive.google.com/file/d/1WOkaI86AePFkmz_6OmhlDLRrXaJPB-GY/view" className="verify-btn">Verify Certificate</a>
          </div>
          
          <div className="certificate-card fade-in fade-in-delay-2">
            <h3>Google Cloud Study Jams </h3>
            <p className="certificate-issuer">A Google Developer Student Club </p>
            <p>Professional certification demonstrating expertise in designing distributed systems on Google Cloud</p>
            <a href="https://drive.google.com/file/d/1H-5VE8mWdqeSoyqjzCMSANRNk7P9ygwb/view" className="verify-btn">Verify Certificate</a>
          </div>
        </div>

        {/* ADDITIONAL EXPERIENCE */}
        <h2 className="section-title fade-in">Leadership & Community</h2>
        
        <div className="cards-grid">
          <div className="card fade-in fade-in-delay-1">
            <div className="card-badge">Leadership</div>
            <h3>Student Placement Cell</h3>
            <p> Directed and implemented feedback mechanisms for resume and
interview preparation sessions, leading to continuous improvement; obtained positive testimonials from 90%
participants about the quality and effectiveness of the support provided.</p>
          </div>
          
          <div className="card fade-in fade-in-delay-2">
            <div className="card-badge">Community</div>
            <h3>IEEE-WIE Member</h3>
            <p> Spearheaded the planning and execution of five technical work
shops for IEEE Women in Engineering, engaging 300+ participants and facilitating new skills and networking
opportunities with industry professionals..</p>
          </div>
        </div>

      </div>
    </>
  );
}
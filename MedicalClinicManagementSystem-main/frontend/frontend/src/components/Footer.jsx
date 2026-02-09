import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© All rights reserved - 2025 mohamadit102@gmail.com</p>
        <div className="footer-social">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/?ref=homescreenpwa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 
              12.42-50.06 52.24-50.06h40.42V6.26S293.3 
              0 268.1 0c-73.22 0-121.07 44.38-121.07 
              124.72v70.62H86.4V288h60.63v224h92.66V288z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M224.1 141c-63.6 0-114.9 
              51.3-114.9 114.9s51.3 114.9 114.9 
              114.9S339 319.5 339 255.9 287.7 141 
              224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7 
              0-41.3 33.4-74.7 74.7-74.7 
              41.3 0 74.7 33.4 74.7 74.7 
              0 41.3-33.4 74.7-74.7 74.7zm146.4-194.3c0 
              14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 
              12-26.9 26.9-26.9 26.9 12 26.9 
              26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6C386.3 
              32.9 354.7 24.7 319 23c-35.7-1.7-142.7-1.7-178.4 
              0-35.7 1.7-67.3 9.9-93.6 36.2C20.7 85.5 
              12.5 117.1 10.8 152.8c-1.7 35.7-1.7 
              142.7 0 178.4 1.7 35.7 9.9 67.3 36.2 
              93.6 26.3 26.3 57.9 34.5 93.6 
              36.2 35.7 1.7 142.7 1.7 178.4 
              0 35.7-1.7 67.3-9.9 93.6-36.2 
              26.3-26.3 34.5-57.9 36.2-93.6 
              1.7-35.7 1.7-142.7 0-178.4z" />
            </svg>
          </a>

          {/* Twitter (X) */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M459.4 151.7c.3 4.5.3 
              9.1.3 13.6 0 138.7-105.6 
              298.8-298.8 298.8-59.5 
              0-114.8-17.2-161.4-47.1 
              8.4 1 16.8 1.6 25.6 1.6 
              49.3 0 94.6-16.8 
              130.7-45.7-46.1-1-84.8-31.2-98.1-72.8 
              6.4 1 12.8 1.6 19.6 
              1.6 9.1 0 18.1-1.2 
              26.7-3.5-48.4-9.7-84.8-52.5-84.8-104v-1.3c14.1 
              7.8 30.3 12.5 47.5 13.1-28.4-19-47-51.2-47-87.7 
              0-19.4 5.2-37.4 14.4-52.9 
              51.9 63.7 129.3 105.3 216.4 
              109.8-1.6-7.8-2.6-15.9-2.6-24 
              0-57.9 47-104.9 104.9-104.9 
              30.3 0 57.5 12.8 76.7 33.4 
              23.7-4.5 45.7-13.1 65.5-25-7.8 
              24.4-24.4 45.1-46.1 58.2 
              21.1-2.3 41.5-8.1 60.2-16.2-14.1 
              20.8-32.1 39.3-52.6 54.2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #fff;
          padding: 25px 10%;
          text-align: center;
          position: relative;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .footer p {
          margin: 0;
          font-size: 1rem;
          letter-spacing: 0.5px;
          opacity: 0.9;
          animation: fadeIn 2s ease;
        }
        .footer-social {
          display: flex;
          gap: 15px;
        }
        .footer-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 1.2rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .footer-social a:hover {
          background: #fff;
          color: #2c5364;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 600px) {
          .footer {
            padding: 20px 5%;
          }
          .footer p {
            font-size: 0.9rem;
          }
          .footer-social a {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;

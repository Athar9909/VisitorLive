import React, { useEffect } from 'react';

const ActivateMem = () => {
  useEffect(() => {
    // Check if the script already exists
    if (!document.getElementById('vismeforms-embed-script')) {
      const script = document.createElement('script');
      script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
      script.id = 'vismeforms-embed-script';
      script.async = true;

      script.onload = () => {
        console.log('Script loaded successfully');
        if (window.vismeEmbed) {
          window.vismeEmbed();
        }
      };

      script.onerror = () => {
        console.error('Script failed to load');
      };

      document.body.appendChild(script);
    } else if (window.vismeEmbed) {
      window.vismeEmbed();
    }
  }, []);

  useEffect(() => {
    if (window.vismeEmbed) {
      window.vismeEmbed();
    }
  }, []);

  return (
    <div>
      dd
      <div
        style={{ marginTop: '10dvh' }}
        className="visme_d"
        data-title="Real Estate Client Registration Form Templ"
        data-url="1jvnmrmp-real-estate-client-registration-form-templ"
        data-domain="forms"
        data-full-page="true"
        data-min-height="100dvh"
        data-form-id="81842"
      ></div>
    </div>
  );
};

export default ActivateMem;

export default function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'info@sia.com'

  return (
    <footer
      className="flex flex-col items-center text-center pb-12 relative"
      style={{ background: '#060621' }}
    >
      {/* Gold Top Bar */}
      <div 
        className="w-full h-[12px] mb-10" 
        style={{ background: '#fbd979' }} 
      />

      <div className="flex flex-col items-center gap-10 px-6">
        <p 
          className="font-avenir-regular" 
          style={{ color: '#ffffff', fontSize: 13, fontFamily: 'AvenirNext', opacity: 0.9 }}
        >
          SIA © 2025 All rights reserved
        </p>

        <a
          href="#"
          className="font-avenir-regular"
          style={{ color: '#ffffff', fontSize: 13, fontFamily: 'AvenirNext', opacity: 0.9 }}
        >
          Privacy Policy
        </a>

        <a
          href={`mailto:${email}`}
          className="font-avenir-regular underline underline-offset-4"
          style={{ color: '#ffffff', fontSize: 13, fontFamily: 'AvenirNext', opacity: 0.9 }}
        >
          {email}
        </a>

        <div className="flex items-center gap-3 mt-4">
          <p 
            className="font-avenir-regular text-right leading-tight" 
            style={{ fontSize: 13, color: '#ffffff', fontFamily: 'AvenirNext', opacity: 0.9 }}
          >
            Designed & Developed <br /> by feat.Consulting
          </p>
          <img
            src="/assets_mobile/feat_consulting.svg"
            alt="feat.Consulting"
            style={{ height: 32, filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>
    </footer>
  )
}


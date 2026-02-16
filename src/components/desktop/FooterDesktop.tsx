export default function FooterDesktop() {
  return (
    <footer className="w-full bg-[#060621] text-white pt-0 pb-16 relative z-50">
      {/* Yellow top border */}
      <div className="w-full h-1.5 bg-[#FBD979] mb-12" />
      
      <div className="max-w-350 mx-auto px-10 xl:px-24 flex flex-col md:flex-row items-start md:items-center justify-between text-sm opacity-80 font-avenir-regular gap-8 md:gap-0">
        
        {/* Left */}
        <div className="text-left font-avenir-light tracking-wide">
          SIA © 2025 All rights reserved
        </div>
        
        {/* Center */}
        <div className="flex items-center gap-12 font-avenir-light">
          <a href="#" className="hover:text-white transition-colors hover:opacity-100">Privacy Policy</a>
          <a href="mailto:info@sia.com" className="hover:text-white transition-colors hover:opacity-100 underline decoration-white/30 hover:decoration-white">info@sia.com</a>
        </div>
        
        {/* Right */}
        <div className="flex items-center gap-4 text-right">
          <div className="flex flex-col items-end leading-tight font-avenir-light text-xs">
            <span>Designed & Developed</span>
            <span>by <span className="font-avenir-heavy">feat.Consulting</span></span>
          </div>
          {/* Logo feat.Consulting */}
          <img 
            src="/assets_mobile/feat_consulting.svg" 
            alt="feat.Consulting" 
            className="w-10 h-auto"
          />
        </div>
      </div>
    </footer>
  )
}

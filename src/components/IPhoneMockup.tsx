import React from 'react';

interface IPhoneMockupProps {
  imageSrc: string;
  alt?: string;
  className?: string;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ imageSrc, alt = 'App screenshot', className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: '290px', height: '590px' }}>
        
        {/* Outer frame - titanium finish */}
        <div
          className="absolute inset-0 rounded-[55px]"
          style={{
            background: 'linear-gradient(145deg, #3a3a3c, #1c1c1e, #2c2c2e)',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.4),
              0 10px 20px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        />

        {/* Inner bezel */}
        <div
          className="absolute rounded-[48px]"
          style={{
            top: '4px',
            left: '4px',
            right: '4px',
            bottom: '4px',
            background: '#000',
          }}
        />

        {/* Screen area */}
        <div
          className="absolute overflow-hidden rounded-[44px]"
          style={{
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '8px',
            background: '#000',
          }}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: '18px',
            width: '100px',
            height: '28px',
            background: '#000',
            borderRadius: '20px',
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.8)',
          }}
        />

        {/* Front camera dot inside Dynamic Island */}
        <div
          className="absolute left-1/2 z-20"
          style={{
            top: '25px',
            marginLeft: '20px',
            width: '10px',
            height: '10px',
            background: 'radial-gradient(circle, #1a1a2e 30%, #0d0d0d 70%)',
            borderRadius: '50%',
            boxShadow: 'inset 0 0 2px rgba(50, 50, 80, 0.5)',
          }}
        />

        {/* Side button - Power (right) */}
        <div
          className="absolute rounded-r-sm"
          style={{
            right: '-2px',
            top: '160px',
            width: '3px',
            height: '65px',
            background: 'linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)',
          }}
        />

        {/* Side button - Mute switch (left) */}
        <div
          className="absolute rounded-l-sm"
          style={{
            left: '-2px',
            top: '110px',
            width: '3px',
            height: '22px',
            background: 'linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)',
          }}
        />

        {/* Side button - Volume Up (left) */}
        <div
          className="absolute rounded-l-sm"
          style={{
            left: '-2px',
            top: '150px',
            width: '3px',
            height: '35px',
            background: 'linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)',
          }}
        />

        {/* Side button - Volume Down (left) */}
        <div
          className="absolute rounded-l-sm"
          style={{
            left: '-2px',
            top: '195px',
            width: '3px',
            height: '35px',
            background: 'linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)',
          }}
        />

        {/* Screen reflection / glare */}
        <div
          className="absolute rounded-[44px] pointer-events-none z-10"
          style={{
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '8px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 100%)',
          }}
        />

        {/* Edge highlight - top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: '1px',
            width: '40%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      </div>
    </div>
  );
};

export default IPhoneMockup;

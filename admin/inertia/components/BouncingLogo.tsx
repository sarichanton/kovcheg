import { useState, useEffect } from 'react';
import { useT } from '~/i18n/I18nProvider';

// Fading Image Component
const FadingImage = ({  alt, className = "" }: { alt?: string; className?: string }) => {
  const { t } = useT();
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Remove from DOM after fade out completes
    const removeTimer = setTimeout(() => {
      setShouldShow(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-desert-sand z-50 pointer-events-none transition-opacity duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <img
        src="/nomad-primary.svg"
        alt={alt ?? t('common.fadingImageAlt')}
        className={`w-64 h-64 object-contain ${className}`}
      />
    </div>
  );
};

export default FadingImage;
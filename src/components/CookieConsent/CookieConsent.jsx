import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './CookieConsent.css';

const STORAGE_KEY = 'math-quiz-cookie-consent';

const defaultConsent = {
  necessary: true,
  preferences: false,
  analytics: false
};

/**
 * GDPR-oriented cookie consent popup with configurable consent groups.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      setIsVisible(true);
      return;
    }

    setConsent(JSON.parse(savedConsent));
  }, []);

  const saveConsent = (nextConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...nextConsent,
      updatedAt: new Date().toISOString()
    }));
    setConsent(nextConsent);
    setIsVisible(false);
  };

  const toggleConsent = (key) => {
    setConsent((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <section className="cookie-popup" aria-label="Cookie consent">
      <div>
        <h2>Cookie settings</h2>
        <p>
          Math Quiz uses required local storage for the interface. With consent,
          it can save game preferences and anonymous learning statistics.
        </p>
      </div>

      <div className="cookie-options">
        <label className="cookie-option">
          <input type="checkbox" checked disabled />
          <span>Required storage</span>
        </label>
        <label className="cookie-option">
          <input
            type="checkbox"
            checked={consent.preferences}
            onChange={() => toggleConsent('preferences')}
          />
          <span>Game preferences</span>
        </label>
        <label className="cookie-option">
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={() => toggleConsent('analytics')}
          />
          <span>Anonymous statistics</span>
        </label>
      </div>

      <div className="cookie-actions">
        <Button onClick={() => saveConsent(defaultConsent)} variant="secondary">
          Required only
        </Button>
        <Button onClick={() => saveConsent(consent)}>
          Save choice
        </Button>
        <Button onClick={() => saveConsent({ necessary: true, preferences: true, analytics: true })}>
          Accept all
        </Button>
      </div>
    </section>
  );
};

export default CookieConsent;

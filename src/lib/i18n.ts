import en from '../i18n/en.json';
import id from '../i18n/id.json';

const translations = { en, id } as const;

export type Locale = 'en' | 'id';

/**
 * Get a translation value by key
 * Supports both dot notation (e.g., 'nav.home') and nested object access
 * Falls back to English if the key is not found in the requested locale
 * Returns the key itself if no translation is found
 */
export function useTranslations(locale: Locale = 'en') {
  return function t(key: string): string {
    const localeData = translations[locale] as Record<string, any>;
    const fallbackData = translations.en as Record<string, any>;

    // Try to get the value from the requested locale
    let value = getNestedValue(localeData, key);

    // Fall back to English if not found
    if (value === undefined) {
      value = getNestedValue(fallbackData, key);
    }

    // Return the key itself as a last resort
    return value ?? key;
  };
}

/**
 * Helper function to get nested object values using dot notation
 * e.g., 'nav.home' -> obj.nav.home
 */
function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Hook to get translations in components
 * Usage: const t = useTranslation(locale);
 *        const label = t('nav.home');
 */
export const useTranslation = useTranslations;

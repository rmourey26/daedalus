// @flow
export type Locale = 'en-US' | 'ja-JP';

export const LOCALES: {
  english: Locale,
  japanese: Locale,
} = {
  english: 'en-US',
  japanese: 'ja-JP',
};

export const humanizedDurationLanguages = {
  'en-US': 'en',
  'ja-JP': 'ja',
};

export const dayjsLocales: {
  [key: Locale]: string,
} = {
  'en-US': 'en',
  'ja-JP': 'ja',
};

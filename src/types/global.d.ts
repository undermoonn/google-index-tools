declare interface AuthConfig {
  clientEmail: string
  privateKey: string
}

declare type AuthAccessToken = string

declare type I18nLocale = 'en' | 'zh' | '' | undefined

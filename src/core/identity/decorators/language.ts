import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to extract the language from the request.
 *
 * @param defaultLanguage The default language to use if no language is found.
 */
export const Language = createParamDecorator(
  (defaultLanguage: string = 'en', ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    // 1. Check if the language is provided as a query parameter.
    const langQuery = request.query?.lang;
    if (langQuery && typeof langQuery === 'string') {
      return langQuery;
    }

    // 2. Check if the language is provided in cookies.
    const langCookie = request.cookies?.lang;
    if (langCookie && typeof langCookie === 'string') {
      return langCookie;
    }

    // 3. Check the 'accept-language' header.
    const acceptLanguage = request.headers['accept-language'];
    if (acceptLanguage && typeof acceptLanguage === 'string') {
      return acceptLanguage.split(',')[0].trim();
    }

    // 4. Return the default language.
    return defaultLanguage;
  },
);

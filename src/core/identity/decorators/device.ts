import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { Language } from './language';

export const DeviceInfo = createParamDecorator(
  (defaultLanguage: string = 'en', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'] || '';

    const language = Language(defaultLanguage, ctx as any);

    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const clientMac = request.headers['x-mac-address'] || null;

    const parser = new UAParser(userAgent);
    const device = parser.getResult();

    return {
      ip: Array.isArray(ip) ? ip[0] : ip,
      language: language,
      clientMac: clientMac,
      headers: request.headers,
      os: device.os.name,
      osVersion: device.os.version,
      browser: device.browser.name,
      browserVersion: device.browser.version,
      device: device.device.type || 'desktop',
      cpu: device.cpu.architecture || 'desconhecido',
    };
  },
);

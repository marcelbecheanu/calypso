/**
 * Injectable service for handling JSON Web Tokens (JWT) in NestJS.
 * This service provides methods for encoding, decoding, and verifying JWTs.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {
  /**
   * Constructor for the JsonWebTokenService.
   * @param {JwtService} jwtService - An instance of the JwtService provided by NestJS.
   */
  constructor(private jwtService: JwtService) {}

  /**
   * Encodes the provided object into a JWT asynchronously.
   * @param {any} objectToEncode - The object to encode into the JWT.
   * @returns {Promise<string>} A Promise resolving to the encoded JWT string.
   */
  async encode(objectToEncode) {
    return await this.jwtService.signAsync(objectToEncode);
  }

  /**
   * Decodes the provided JWT asynchronously.
   * @param {string} codedObject - The JWT string to decode.
   * @returns {Promise<any>} A Promise resolving to the decoded object.
   */
  async decode(codedObject) {
    return await this.jwtService.decode(codedObject);
  }

  /**
   * Verifies the validity of the provided JWT asynchronously.
   * @param {string} codedObject - The JWT string to verify.
   * @returns {Promise<any>} A Promise resolving to the decoded object if the JWT is valid.
   * @throws {JwtException} Throws an error if the JWT is invalid.
   */
  async verify(codedObject) {
    try {
      return await this.jwtService.verifyAsync(codedObject);
    } catch (err) {
      throw new UnauthorizedException('The provided token is invalid or has expired.');
    }
  }
}

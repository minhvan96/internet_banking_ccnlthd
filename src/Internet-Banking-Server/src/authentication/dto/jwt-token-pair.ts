export class JwtTokenPair {
  constructor(public readonly accessToken: string, public readonly refreshToken: string) {
  }
}
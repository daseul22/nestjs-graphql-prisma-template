import { JwtService } from '@nestjs/jwt'
import axios from 'axios'
import { Provider } from '../interfaces/provider.interface'
import NodeRSA from 'node-rsa'

interface AppleJwt {
  header: {
    kid: string
    alg: string
  }
  payload: {
    iss: string
    aud: string
    exp: number
    iat: number
    sub: string
    nonce: string
    c_hash: string
    email: string
    email_verified: string
    is_private_email: string
    auth_time: number
    nonce_supported: boolean
  }
  signature: string
}

export class AppleProvider implements Provider {
  private email: string
  private readonly APPLE_IDENTITY_URL: string = 'https://appleid.apple.com'
  private readonly iosBundleId: string = 'com.chesedridge.dallem.user'

  constructor(private jwtService: JwtService) {}

  private async getAppleIdentityPublicKey(kid) {
    const url = this.APPLE_IDENTITY_URL + '/auth/keys'
    const req = await axios.get(url)

    const keys = req.data.keys
    const key = keys.find((k) => k.kid === kid)
    const pubKey = new NodeRSA()
    pubKey.importKey(
      { n: Buffer.from(key.n, 'base64'), e: Buffer.from(key.e, 'base64') },
      'components-public'
    )
    return pubKey.exportKey('public')
  }

  getUserEmail(): string {
    return this.email
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const clientID = this.iosBundleId
      const { header } = this.jwtService.decode(accessToken, {
        complete: true
      }) as AppleJwt

      const applePublicKey = await this.getAppleIdentityPublicKey(header.kid)
      const jwtClaims = this.jwtService.verify(accessToken, {
        publicKey: applePublicKey,
        algorithms: ['RS256']
      })

      if (jwtClaims.iss !== this.APPLE_IDENTITY_URL)
        throw new Error('Apple identity token wrong issuer: ' + jwtClaims.iss)
      if (jwtClaims.aud !== clientID)
        throw new Error('Apple identity token wrong audience: ' + jwtClaims.aud)

      console.log('jwtClaim', jwtClaims)
      this.email = jwtClaims.email
      return true
    } catch (err) {
      return false
    }
  }
}

import * as jwt from 'jsonwebtoken';
import { envs } from '../config/envs';



export class JwtAdapter {

  static generateToken(payload: Record<string, any>, expiresIn: jwt.SignOptions['expiresIn'] = '2h'): string {
    const options: jwt.SignOptions = { expiresIn };
    const secret: jwt.Secret = envs.JWT_SEED;
    return jwt.sign(payload, secret, options);
  }

  static verifyToken<T>(token: string): T {
    return jwt.verify(token, envs.JWT_SEED as jwt.Secret) as T;
  }
}



/*
  static validateToken(token: string) {

    return new Promise((resolve) => {

      jwt.verify(token, JWT_SEED, (err, decoded) => {

        if (err) return resolve(null);

        resolve(decoded);

      });



    })
  }


}*/
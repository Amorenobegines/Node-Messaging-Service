
import { AppDataSource } from '../../database/data-source';
import { User } from '../users/entities/User';
import { CustomError } from '../../domain/errors/custom.error';
import { BcryptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';


/*
Valida email y contraseña
Genera JWT
Maneja errores de credenciales
 */

export class AuthService {

    private userRepository = AppDataSource.getRepository(User);


    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw CustomError.notFound('User not found');

        // Primero comprobar si está activo o eliminado
        if (!user.isActive) {
            throw CustomError.unauthorized('User is inactive');
        }

        if (user.deletedAt) {
            throw CustomError.unauthorized('User is deleted');
        }

        // Luego validar contraseña
        const isValid = await BcryptAdapter.compare(password, user.password);
        if (!isValid) throw CustomError.unauthorized('Invalid password');

        return user;
    }
    login(user: User) {
        const payload = { id: user.id, email: user.email };
        const token = JwtAdapter.generateToken(payload);
        return { token };
    }



}

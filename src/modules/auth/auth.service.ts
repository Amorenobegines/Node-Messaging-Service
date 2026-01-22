import { UserRepository } from "../users/user.repository";
import { CustomError } from "../../domain/errors/custom.error";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

//    Services → lógica de negocio

export class AuthService {

    async register(email: string, password: string, name: string) {

        // normalizar email
        email = email.trim().toLowerCase();

        const exists = await UserRepository.findOne({
            where: { email },
            withDeleted: true
        });

        if (exists) throw CustomError.conflict("El email ya está registrado");

        const hashed = await BcryptAdapter.hash(password);

        const user = UserRepository.create({
            email,
            password: hashed,
            name
        });

        await UserRepository.save(user);

        // const token = JwtAdapter.generateToken({ id: user.id, email: user.email });

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword };
    }

    async login(email: string, password: string) {
        const user = await UserRepository.findOne({ where: { email } });

        if (!user) throw CustomError.unauthorized("Email inválido");

        const isValid = await BcryptAdapter.compare(password, user.password);
        if (!isValid) throw CustomError.unauthorized("Password inválidas");

        const token = JwtAdapter.generateToken({ id: user.id, email: user.email });

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}

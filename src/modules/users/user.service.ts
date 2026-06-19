import { CustomError } from '../../domain/errors/custom.error';
import { regularExps } from '../../config/regular-exp';
import { BcryptAdapter } from '../../config/bcrypt.adapter';
import { UserRepository } from "./user.repository";


interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

/*
Email único
Contraseña hasheada
Devuelve usuario sin password
*/

// función para capitalizar el nombre
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export class UserService {

    async register({ email, password, name }: RegisterDto) {

        // Normalizar email
        email = email.toLowerCase().trim();

        // Validación de email 
        if (!regularExps.email.test(email)) {
            throw CustomError.badRequest(`El email ${email} no es válido`);
        }

        // Validar nombre
        if (!name || name.trim().length === 0) {
            throw CustomError.badRequest('El nombre es obligatorio');
        }

        // Capitalizar nombre
        name = capitalize(name.trim());

        // Validar contraseña mínima
        if (!password || password.length < 6) {
            throw CustomError.badRequest('La contraseña debe tener al menos 6 caracteres');
        }

        // Validar email único
        const exists = await UserRepository.findOne({ where: { email } });
        if (exists) {
            throw CustomError.conflict(`El email ${email} ya está registrado`);
        }

        // Hash password
        const hashedPassword = await BcryptAdapter.hash(password);

        const user = UserRepository.create({
            email,
            name,
            password: hashedPassword,
        });

        await UserRepository.save(user);

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getAllUsers() {
        const users = await UserRepository.find({ withDeleted: false });

        return users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            active: u.isActive
        }));
    }

    async getUserById(id: string) {
        const user = await UserRepository.findOne({ where: { id } });

        if (!user) {
            throw CustomError.notFound('Usuario no encontrado');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            active: user.isActive
        };
    }


    // Permitir que el usuario autenticado cambie su propio estado
    async changeStatus(userId: string, isActive: boolean) {

        if (typeof isActive !== 'boolean') {
            throw CustomError.badRequest('El campo isActive debe ser booleano');
        }

        const user = await UserRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw CustomError.notFound('Usuario no encontrado');
        }

        user.isActive = isActive;

        await UserRepository.save(user);

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async deleteUser(id: string) {
        const user = await UserRepository.findOne({ where: { id } });
        if (!user) throw CustomError.notFound('Usuario no encontrado');

        // 1. Desactivar usuario 
        user.isActive = false;
        await UserRepository.save(user);

        // 2. Soft delete real (marca deletedAt) 
        await UserRepository.softDelete(id);
        return user; // devolver el usuario eliminado
    }

    async updateUser(id: string, data: { name?: string; password?: string; isActive?: boolean }) {
        const user = await UserRepository.findOne({ where: { id } });

        if (!user) {
            throw CustomError.notFound('User not found');
        }

        if (data.name) {
            user.name = capitalize(data.name.trim());
        }

        if (data.password) {
            const hashedPassword = await BcryptAdapter.hash(data.password);
            user.password = hashedPassword;
        }

        if (data.isActive !== undefined) {
            user.isActive = data.isActive;
        }

        await UserRepository.save(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive
        };
    }


}
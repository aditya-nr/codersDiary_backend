import bcrypt from 'bcrypt';

class PasswordService {
    static async hashPassword(password) {
        try {
            let hash = await bcrypt.hash(password, 8);
            return hash;
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(password, hash) {
        try {
            let same = await bcrypt.compare(password, hash);
            return same;//bool
        } catch (error) {

        }
    }
}

export default PasswordService
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async create(data) {
        try {
            const user = await this. userRepository.create(data);
            return user;
        }catch (error) {
            console.log( "Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try{
            //1 fetch user using email
            const user = await this.userRepository.getByEmail(email);
            //comapre incoming pass with store pass
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                console.log("Password does not match");
                throw {Error: 'incorrect password'};
            }
            //if match create token n send to user 
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        }catch (error) {
            console.log("Something went wrong in the signIn process ");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user){
        try{
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
            return result;
        }catch (error) {
            console.log("Something went wrong in token creaton");
            throw error;
        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token, JWT_KEY );
            return response;
        }catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        }catch (error) {
            console.log("Something went wrong in password validation");
            throw error;
        }
    }
}

module.exports = UserService;
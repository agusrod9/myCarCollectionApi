import usersModel from '../models/users.model.js';

export class userManager{
    constructor(){
        this.model = usersModel;
    }

    async readAllUsers(){
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(mail){
        try {
            const user = await this.model.findOne({email: mail}).lean();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(data){
        try {
            const user = await this.model.create(data);
            return user;
        } catch (error) {
            throw error;
        }
        
    }
}
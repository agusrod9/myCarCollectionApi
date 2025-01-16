import usersModel from '../models/users.model.js';

export class usersManager{
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

    async readById(id){
        try {
            const user = await this.model.findOne({_id:id}).lean();
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

    update = async (id, data) => {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async addCollectionsToUser(userId, collection){
            try {
                let one = await this.model.findOneAndUpdate()
            } catch (error) {
                throw error;
            }
    }
}
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

    async updateUser(id, data){
        try {
            const opt = { new: true, runValidators: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async updateUserLanguage(id, language){
        try {
            const opt = { new: true, runValidators: true };
            const one = await this.model.findByIdAndUpdate(id,{$set : {"settings.language" : language}},opt)
            return one;
        } catch (error) {
            throw error;
        }
    }

    async addCollectionsToUser(userId, collection){
            try {
                let one = await this.model.findOneAndUpdate();
            } catch (error) {
                throw error;
            }
    }

    async checkNickAvailability(nick){
        try {
            const user = await this.model.findOne({nickName: nick});
            return !user;
        } catch (error) {
            throw error
        }
    }

    async readOnlineUsers() {
        const minutes = 1;
        const threshold = new Date(Date.now() - minutes * 60 * 1000);
        return await this.model.find(
            { lastActiveAt: { $gte: threshold } },
            { nickName: 1, email: 1, lastActiveAt: 1 }
        );
    }
}
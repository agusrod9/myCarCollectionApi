import usersModel from '../models/users.model.js';

export class userManager{
    constructor(){
        this.model = usersModel;
    }

    async readAllUsers(){
        const users = await this.model.find();
        return users;
    }






}
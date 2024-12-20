import userPostsModel from '../models/userPosts.model.js';

export class userPostsManager{
    constructor(){
        this.model = userPostsModel;
    }

    async readAllPostsByUserId(id){
        try {
            let posts = await this.model.find({userId : id});
            return posts;
        } catch (error) {
            throw error;
        }
    }
}
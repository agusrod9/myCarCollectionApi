import commentsModel from '../models/comments.model.js'

export class commentsManager{
    constructor(){
        this.model = commentsModel;
    }

    async readCommentsByPostId(postId){
        try {
            let postComments = await this.model.find({postId});
            return postComments;
        } catch (error) {
            throw error;
        }
    }

    async createComment(data){
        try {
            const one = await this.model.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    }



}
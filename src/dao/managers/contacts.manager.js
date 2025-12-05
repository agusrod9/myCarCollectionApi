import contactsModel from "../models/contacts.model.js"

export class contactsManager{
    constructor(){
        this.model = contactsModel;
    }

    async createNewContact(newContactData){
        try {
            const one = await this.model.create(newContactData);
            return one;
        } catch (error) {
            throw error;
        }
    }

}
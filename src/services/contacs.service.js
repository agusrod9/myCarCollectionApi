import {contactsManager} from "../dao/managers/contacts.manager.js"
import { validateEmail } from "../utils/validator.util.js";

const manager = new contactsManager();

export async function createContact(body){
    try {
        if(!body.topic || !body.name || !body.email || !body.message || !body.channel){
            throw new Error("MISSING MANDATORY FIELDS");
        }
        if(!validateEmail(body.email)){
            throw new Error("INVALID EMAIL FORMAT");
        }
        if(body.message.length<25){
            throw new Error("MESSAGE TOO SHORT");
        }
        const process = await manager.createNewContact(body);
        return process;
    } catch (error) {
        throw error;
    }
}
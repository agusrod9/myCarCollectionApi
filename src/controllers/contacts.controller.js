import * as contactsService from '../services/contacs.service.js'

export async function createContact(req,res){
    try {
        const body = {...req.body, userIp : req.ip}
        const result = await contactsService.createContact(body);
        return res.status(201).json({error: null, data : result});
    } catch (error) {
        return res.status(500).json({error: error.message, data: []});
    }
}
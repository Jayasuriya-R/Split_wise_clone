import * as Contacts from 'expo-contacts';
import { getFormatedPhoneNumber } from '../../../constants/helper';
import Connection from '../../connections';
import { GET_USER_Phone } from './queries';
import { CreateUser } from '.';


const isUserAlreadyExistsInDB = async (phone) => {
    try {
        const db = await Connection.getConnection();
        const result = await db.getFirstAsync(GET_USER_Phone, phone)
        return result
    } catch (error) {
        console.log("error occured", error)
    }

}

const getContactDetailsById = async (id) => {
    try {
        const contacts = await Contacts.getContactByIdAsync(id, [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Name
        ])

        if (!contacts && !contacts.name || contacts.phoneNumbers.length <= 0) {
            return null
        }
        return {
            name: contacts.name,
            phone: getFormatedPhoneNumber(contacts.phoneNumbers[0])
        }
    } catch (error) {
        console.log("error occured", error)
    }
}

export const registerUsersUnOfficial = async (contactIds) => {
    let userIds = []
    for (const contactId of contactIds) {
        const contact = await getContactDetailsById(contactId)
        if(!contact) return

        let user = await isUserAlreadyExistsInDB(contact.phone)

        if(user){
            console.log("User aldready exists")
        }else{
         user = await CreateUser(contact.name,"",contact.phone,contact.phone,0)
         console.log("users",user.id)
        }

    userIds.push(user.id)
    }
return userIds
}
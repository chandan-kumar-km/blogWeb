import conf from "../config/conf";
import { Client,Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log("account created")
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("login error")
            throw error;
        }
        
    }

    async getCurrentUser() {
        try {
            const data =await this.account.get()
            return data
        } catch (error) {
           throw error;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
            try {
                await this.account.get()
            } catch (error) {
                console.log("succesfully logged out!")
            }
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
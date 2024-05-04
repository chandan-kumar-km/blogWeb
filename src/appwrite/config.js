import { Client,ID,Databases,Storage,Query} from "appwrite";
import conf from "../config/conf";

export class Service{
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectid)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({title, slug, content, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status,
                }
            )
        } catch (error) {
            throw error
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.isNotNull("title")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                queries,  
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }
}

const service = new Service()
export default service
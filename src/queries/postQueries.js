
import axios from 'axios'
import urlFile from "../common/ApiFile"
import url from "../common/api"

export async function postQueries(link,param){

    const response= await axios.post(url+link,param,{ headers: { 'Content-Type': 'application/json','Accept': 'application/json' }})
    const data = await response;
    console.log("data recept",data)
    if(data.status==201){
        
        return data.data
    }else{
        return null
    }
}



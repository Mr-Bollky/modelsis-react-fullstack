
import axios from 'axios'
import urlFile from "../common/ApiFile"
import url from "../common/api"

export async function patchQueries(link,param){

   
    const response= await axios.patch(url+link,param,{ headers: { 'Content-Type': 'application/json','Accept': 'application/json' }})
    const data = await response;
    
    if(data.status==201){
        return data.data
    }else{
        return
    }
}



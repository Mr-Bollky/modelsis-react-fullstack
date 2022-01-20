
import urlFile from "../common/ApiFile"
import url from "../common/api"
import axios from 'axios'

export async function deleteQueries(link){

    const response= await axios.delete(url+link)
    const data = await response;
    if(data.status==200){
        return data.data
    }else{
        return
    }
}




import urlFile from "../common/ApiFile"
import url from "../common/api"
import axios from 'axios'

export async function addQueries(link,param){

    const response= await axios.post(link,param)
    const data = await response;
       console.log("file updea",data)
        return data.data
  
}



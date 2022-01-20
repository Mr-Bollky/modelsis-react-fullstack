import url from "../common/api"
import axios from 'axios'

export async function getQueries(link){
  const response= await axios.get(url+link)
  const data = await response;
  if(data.status==200){
    return data.data
  }else{
    return
  }  
}
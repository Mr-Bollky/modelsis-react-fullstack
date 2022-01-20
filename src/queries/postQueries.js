
import axios from 'axios'
import url from "../common/api"

export async function postQueries(link,param){
  const response= await axios.post(url+link,param,{ headers: { 'Content-Type': 'application/json','Accept': 'application/json' }})
  const data = await response;
  if(data.status==201){
    return data.data
  }else{
    return null
  }
}
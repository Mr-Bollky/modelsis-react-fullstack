import urlFile from "../common/ApiFile"
import url from "../common/api"
import {postQueries} from "../queries/postQueries.js"
import axios from 'axios'

export async function addAuteur(param,id){
  for (var i=0;i<param.length;i++){  
    await postQueries("auteurs",param[i]).then(elem=>{
      console.log("auteur associe",elem)
      axios.patch(url+"ressources/"+id,{"ressource_auteurs_attributes":[{"auteur_id":elem.id}]},{ headers: { 'Content-Type': 'application/json','Accept': 'application/json' }})  
    })
  }
}
import urlFile from "../common/ApiFile"
import url from "../common/api"
import {postQueries} from "../queries/postQueries.js"
import axios from 'axios'

export async function addMotCle(param,id){
   
    for (var i=0;i<param.length;i++){
       
        await postQueries("mot_cles",param[i]).then(elem=>{
            console.log("mot cle save",elem)
            axios.patch(url+"ressources/"+id,{"ressource_mot_cles_attributes":[{"mot_cle_id":elem.id}]},{ headers: { 'Content-Type': 'application/json','Accept': 'application/json' }})
           
        })
    }
    
}
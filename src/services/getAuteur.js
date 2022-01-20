import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getAuteurList(){
    var datas=[]
    await getQueries("auteurs").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.nom,ressources:element.ressources}]
        })
    })
    
    return await datas
}
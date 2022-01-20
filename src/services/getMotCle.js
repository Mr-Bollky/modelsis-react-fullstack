import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getMotCleList(){
    var datas=[]
    await getQueries("mot_cles").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,evenements:element.evenements,label:element.libelle,ressources:element.ressources}]
        })
    })
    
    return await datas
}
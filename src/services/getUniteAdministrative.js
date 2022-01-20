import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getUniteAdministrativeList(){
    var datas=[]
    await getQueries("unite_administratives").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,evenements:element.evenements,label:element.libelle,ressources:element.ressources}]
        })
    })
    
    return await datas
}
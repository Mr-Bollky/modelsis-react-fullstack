import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getThematiqueList(){
    var datas=[]
    await getQueries("thematiques").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,evenements:element.evenements,utilisateurs:element.utilisateurs.filter(e=>e.fonction=="EXPERT"),label:element.libelle,ressources:element.ressources}]
        })
    })
    
    return await datas
}
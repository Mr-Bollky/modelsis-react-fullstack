import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getTypeSystemeIrrigueList(){
    var datas=[]
    await getQueries("type_systeme_irrigues").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.libelle,evenements:element.evenements,ressources:element.ressources,utilisateurs:element.utilisateurs.filter(e=>e.fonction=="EXPERT")}]
        })
    })
    
    return await datas
}
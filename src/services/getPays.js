import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getPaysList(){
    var datas=[]
    await getQueries("pays").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.nom,evenements:element.evenements,ressources:element.ressources,utilisateurs:element.utilisateurs.filter(e=>e.fonction=="EXPERT"),unite_administratives:element.unite_administratives}]
        })
    })
    
    return await datas
}

// export  getLangue
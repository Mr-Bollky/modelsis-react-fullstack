import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getLanguageList(){
    var datas=[]
    await getQueries("langues").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.nom,evenements:element.evenements,ressources:element.ressources,utilisateurs:element.utilisateurs.filter(e=>e.fonction=="EXPERT")}]
        })
    })
    
    return await datas
}

// export  getLangue
import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getFormatList(){
    var datas=[]
    await getQueries("le_formats").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.libelle,ressources:element.ressources}]
        })
    })
    
    return await datas
}
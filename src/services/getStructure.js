import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getStructureList(){
    var datas=[]
    await getQueries("structures").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.libelle}]
        })
    })
    
    return await datas
}
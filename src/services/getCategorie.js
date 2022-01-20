import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getCategorieList(){
    var datas=[]
    await getQueries("categories").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.libelle}]
        })
    })
    
    return await datas
}
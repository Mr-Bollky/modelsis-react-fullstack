import urlFile from "../common/ApiFile"
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getTypeRessourceList(){
    var datas=[]
    await getQueries("type_ressources").then(data=>{
        data.map((element)=>{
           datas= [...datas,{value:element.id,label:element.libelle,ressources:element.ressources,sous_types:element.sous_type_ressources}]
        })
    })
    
    return await datas
}

export async function getCardObject(){
    var datas={}
    await getQueries("type_ressources").then(data=>{
        data.map((element)=>{
            datas[""+element.libelle]=[]
        })
    })
    
    return await datas
}


export async function getColorObject(){
    var datas={}
    await getQueries("type_ressources").then(data=>{
        data.map((element)=>{
            datas[""+element.libelle]=""
            
        })
    })
    
    return await datas
}
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getSpecialiteList(){
  var datas=[]
  await getQueries("specialites").then(data=>{
    data.map((element)=>{
      datas= [...datas,{value:element.id,label:element.code}]
    })
  })
  return await datas
}
import url from "../common/api"
import {getQueries} from "../queries/getQueries.js"

export async function getProductTypeList(){
  var datas=[]
  await getQueries("products").then(data=>{
    data.map((element)=>{
      datas= [...datas,{value:element.name,label:element.name}]
    })
  })
  return await datas
}
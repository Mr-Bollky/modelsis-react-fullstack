
import urlFile from "../common/ApiFile"
import url from "../common/api"
import {addQueries} from "../queries/addQueries.js"
import axios from 'axios'


export async function postFile(link,param){
    var count={}
    
    await addQueries(url+link,param).then(elem=>{
     count =   elem.data
       
    })
  
    
}


export async function postPjointeToLocalStorage(){
  var count={}
  var param=document.getElementById("pieceJointe").files
  var pjointe=[]
  for (var i=0;i<param.length;i++){
    var formData = new FormData(); 
    // Update the formData object 
    formData.append( 
      "avatar", 
      param[i] 
    );

    await addQueries(urlFile.file+"/fileupload.php",formData).then(elem=>{
      const response =   elem.data
      postFile(url+"pjointes",{"file":response.name,"taille":response.size}).then(response=>{
        pjointe= [...pjointe,{"pjointe_id":response.data.id}]
      })
      if(i==param.length-1){
          return  pjointe
      }
    })
  }
}

export async function postImageToLocalStorage(){
    var count={}
    var param=document.getElementById("image").files
    var image=[]

  for (var i=0;i<param.length;i++){

    var formData = new FormData(); 
        
    // Update the formData object 
    formData.append( 
      "avatar", 
      param[i] 
    
    );


    await addQueries(urlFile.image+"/fileupload.php",formData).then(elem=>{
     const response =   elem.data
 
      postFile(url+"images",{"file":response.name,"taille":response.size}).then(response=>{
          image= [...image,{"image_id":response.data.id}]
        
        if(i==param.length-1){
          return image
        }
       
      })

    })

}
}

import {type  PackagingListInterface} from "../App.tsx";
export interface PackagingListProps{
    packagingLists:  PackagingListInterface[], 
    onDeleteList : (id:number)=>void,
}
export default function PackagingList ({packagingLists, onDeleteList}: PackagingListProps){
    
    
    return (
        <ul>
             {packagingLists.map((packagingList) =>{
    return (
     <li
     id={packagingList.id.toString()}
      key={packagingList.id}
      title={packagingList.title.toDateString()}
      >
        <h4>{packagingList.nameCompany}</h4>
        <p>{packagingList.title.toLocaleDateString()}  -  {packagingList.title.toLocaleTimeString()}</p>
        <ul>
            {Object.keys(packagingList.description).map((item)=><li>{item} : {packagingList.description[item]}</li>)}
        </ul>
        <button onClick={()=>onDeleteList(packagingList.id)}>Delete</button>
    </li>
    
    )
  })
  }  
        </ul>
    )
}
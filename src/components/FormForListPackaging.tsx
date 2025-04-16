import { useState, type FormEvent } from "react";
export interface InitialList {
    [key: string]: number;
  }

export default function FormForListPackaging({onAddList}:any) {
   

 const initialList: InitialList = {
    'KK': 0,
    'KK-SH': 0,
    'CC': 0,
    'NC': 0,
    'TAG-5': 0,
    'TAG-6': 0,
    'CC-SH': 0,
    'EXT': 0,
  };

  const [packagingList, setPackagingList] = useState<InitialList>(initialList);

  function handlePackagingForm(event: FormEvent) {
    event.preventDefault();
onAddList(packagingList)


  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPackagingList(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  }
  function handleChangeWithButton(event: React.MouseEvent<HTMLButtonElement>, sign: string) {
    event.preventDefault()
    const parent = (event.target as HTMLElement).parentElement;
    const itemName: string =  parent!.dataset.item || "";
  if (sign === "+") {
    setPackagingList(prev => ({
        ...prev,
        [itemName]: Number(packagingList[itemName]+1)
      }))
  }else if (sign === "-" && packagingList[itemName] > 0) {
    setPackagingList(prev => ({
        ...prev,
        [itemName]: Number(packagingList[itemName]-1)
      }))
  }
  }
    
  
  

  return (
    <form onSubmit={handlePackagingForm}>
      {
        Object.keys(packagingList).map((item) => (
          <div key={item}>
            <label htmlFor={item}>{item}</label>
           <div data-item={item} className="inputBtnGroup" >
           <button onClick={(event)=>handleChangeWithButton(event, '-')}>-</button>
            <input
            className="formInput"
              type="number"
              name={item}
              id={item}
              placeholder={packagingList[item].toString()}
              value={packagingList[item]|| ""}
              onChange={handleChange}
            />
            <button onClick={(event)=>handleChangeWithButton(event, '+')}>+</button>
           </div>
          </div>
        ))
      }
      <button type="submit">Save</button>
    </form>
  );
}

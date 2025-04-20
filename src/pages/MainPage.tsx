
import IndexedDBManager from '../classes/indexedDB.tsx';
import ModalWindowForNameCompany from '../components/ModalWindowForNameCompany.tsx';
import PackagingList from '../components/PackagingList.tsx';
import FormForListPackaging, { type InitialPackList } from '../components/FormForListPackaging.tsx';
import { useEffect, useState } from 'react';
import {type PackagingListInterface } from '../App.tsx';
export default  function MainPage (){
     const [packagingLists, setPackagingLists] = useState<PackagingListInterface[]>([]);
      const [isModalVisible, setIsModalVisible] = useState(false);
       const indexedDB = new IndexedDBManager();
        const [nameCompanyForList, setNameCompanyForList] = useState('');
        const [tempListData, setTempListData] = useState<InitialPackList | null>(null);
        const fetchAllItems = async () => {
          const items = await indexedDB.getAllItems();
          setPackagingLists(items);
        };
      
        useEffect(() => {
          fetchAllItems();
        }, [nameCompanyForList]);
      
        const handleNameCompanyFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const form = event.currentTarget;
          const input = form.elements.namedItem('nameCompany') as HTMLInputElement;
      
          if (input && input.value.length > 1 && tempListData) {
            const newList: PackagingListInterface = {
              id: Math.random(),
              title: new Date(),
              nameCompany: input.value,
              description: tempListData,
            };
            // if (Object.values(tempListData).filter(item => item == 0).length > 0) console.log("Packaging list cannot be empty")
      
            await indexedDB.saveItems([newList]);
            await fetchAllItems();
            setTempListData(null);
            setNameCompanyForList('');
            setIsModalVisible(false);
          }
        };
      
      
        const handleAddPackagingList = (list: InitialPackList) => {
          setTempListData(list);
          setIsModalVisible(true);
        };
      
        const handleDeleteGoal = async (id: number) => {
          await indexedDB.deleteItem(id);
          await fetchAllItems();
        };
    return(
       <> {isModalVisible ? (
        <ModalWindowForNameCompany onSubmit={handleNameCompanyFormSubmit} />
      ) : (
        <>
          <FormForListPackaging onAddList={handleAddPackagingList} />
          <PackagingList
            onDeleteList={handleDeleteGoal}
            packagingLists={packagingLists}
          />
        </>
      )}</>
    )
}
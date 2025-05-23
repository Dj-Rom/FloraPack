import { useEffect, useState } from 'react';
import './App.css';
import PackagingList from './components/PackagingList.tsx';
import FormForListPackaging from './components/FormForListPackaging.tsx';
import { type InitialList } from './components/FormForListPackaging.tsx';
import IndexedDBManager from './classes/indexedDB.tsx';
import ModalWindowForNameCompany from './components/ModalWindowForNameCompany.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store.tsx';
import PrimarySearchAppBar from './components/Navi.tsx';
import SelectLanguage from './components/SelectLanguage.tsx';
import SelectPackList from './components/SelectPackList.tsx'
export interface PackagingListInterface {
  id: number;
  title: Date;
  nameCompany: string | any;
  description: InitialList;
}


function App() {
  const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage)
  const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList)
  const indexedDB = new IndexedDBManager();
  const [packagingLists, setPackagingLists] = useState<PackagingListInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameCompanyForList, setNameCompanyForList] = useState('');
  const [tempListData, setTempListData] = useState<InitialList | null>(null);
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

  const handleAddPackagingList = (list: InitialList) => {
    setTempListData(list);
    setIsModalVisible(true);
  };

  const handleDeleteGoal = async (id: number) => {
    await indexedDB.deleteItem(id);
    await fetchAllItems();
  };

  return (
    <>
      <header>
        <PrimarySearchAppBar />
        {isSelectLanguage ? <SelectLanguage /> : ''}
        {isSelectPackList ? <SelectPackList /> : ''}
      </header>
      <main>
        {isModalVisible ? (
          <ModalWindowForNameCompany onSubmit={handleNameCompanyFormSubmit} />
        ) : (
          <>
            <FormForListPackaging onAddList={handleAddPackagingList} />
            <PackagingList
              onDeleteList={handleDeleteGoal}
              packagingLists={packagingLists}
            />
          </>
        )}
      </main>
      <footer>
        <p>&copy; Dj-Rom, Union Europe 2025</p>
      </footer>
    </>

  );
}


export default App;

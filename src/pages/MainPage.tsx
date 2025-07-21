import styles from './../styles/mainPage.module.scss'
import IndexedDBManager from '../classes/indexedDB.tsx';
import ModalWindowForNameCompany from '../components/ModalFormForNameCompany.tsx';
import PackagingList from '../components/PackagingList.tsx';
import FormForListPackaging, { type InitialPackList } from '../components/FormForListPackaging.tsx';
import { useEffect, useState } from 'react';
import { type PackagingListInterface } from '../App.tsx';
import { setAlert } from '../redux/slices/alertSlice.tsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.tsx';
import ShowLogs from '../components/ShowLogs.tsx';
import scrollToId from "../helpers/scrollToId.tsx";




export default function MainPage() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settingsLanguage)
  const [packagingLists, setPackagingLists] = useState<PackagingListInterface[]>([]);
  const [isLogsVisible, setIsLogssVisible] = useState(false);
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



      await indexedDB.saveItems([newList]);
      await fetchAllItems();
      setTempListData(null);
      setNameCompanyForList('');
      setIsModalVisible(false);
      setTimeout(() => scrollToId((newList.id).toString()), 300);

    } else {
      dispatch(setAlert({ type: "error", message: language.cannotBeEmpty }))
    }
  };


  const handleAddPackagingList = (list: InitialPackList) => {
    if (Object.values(list).filter(item => item !== 0).length === 0) {
      return dispatch(setAlert({ type: "error", message: language.listEmptyWarning }));
    }

    setTempListData(list);
    setIsModalVisible(true);
  };

  const handleDeleteGoal = async (id: number) => {
    await indexedDB.deleteItem(id);
    await fetchAllItems();
  };
  return (
    <> {isModalVisible ? (
      <ModalWindowForNameCompany onSubmit={handleNameCompanyFormSubmit} />
    ) : (
      <>
        <FormForListPackaging onAddList={handleAddPackagingList} />
        <br />
        <button type="button" className={styles.btnShowLogs} onClick={() => setIsLogssVisible(!isLogsVisible)}>{language.history}</button>
        {isLogsVisible ? <ShowLogs /> : ""}
        <PackagingList
          onDeleteList={handleDeleteGoal}
          packagingLists={packagingLists}
        />


      </>
    )}

    </>
  )
}
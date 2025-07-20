import { useState, type FormEvent } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.tsx';
import { useDispatch } from "react-redux";
import { settingsFormAllItemsIsShow, settingsFormAllItemsIsUnshow } from "../redux/slices/settingsPack.tsx";
import styles from './../styles/packagingForm.module.scss'

// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';

export interface InitialList {
  [key: string]: number;
}

export default function FormForListPackaging({ onAddList }: any) {

  const language = useSelector((state: RootState) => state.settingsLanguage)
  const [isButtonShowMore, setIsButtonShowMore] = useState(false);
  const dispatch = useDispatch();
  const listPacksForView = useSelector((state: RootState) => state.settingsPack);
  const initialList: InitialList = {
    'KK': 0,
    'KK-SH': 0,
    'CC': 0,
    'NC': 0,
    'TAG-5': 0,
    'TAG-6': 0,
    'CC-SH': 0,
    'EXT': 0,
    'EP': 0,
    'PALETA': 0,
    '533/544': 0,
    '560': 0,
    '566': 0,
    '577': 0,
    '588': 0,
    '596': 0,
    '597': 0,
    '598': 0,
    '520': 0,
    '595': 0,
    'TRAAY': 0,
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
    const itemName: string = parent!.dataset.item || "";
    if (sign === "+") {
      setPackagingList(prev => ({
        ...prev,
        [itemName]: Number(packagingList[itemName] + 1)
      }))
    } else if (sign === "-" && packagingList[itemName] > 0) {
      setPackagingList(prev => ({
        ...prev,
        [itemName]: Number(packagingList[itemName] - 1)
      }))
    }
  }




  return (
    <form onSubmit={handlePackagingForm}>
      {
        Object.keys(packagingList).sort((a: string, b: string) => b.localeCompare(a)).map((item) => {
          if (!listPacksForView[item]) return null;
          return (
            <div key={item}>
              <label htmlFor={item}>{item}</label>
              <div data-item={item} className={styles.inputBtnGroup}>
                <button type="button" onClick={(event) => handleChangeWithButton(event, '-')}>-</button>
                <input
                  className={styles.formInput}
                  type="number"
                  name={item}
                  id={item}
                  placeholder={packagingList[item]?.toString() || '0'}
                  value={packagingList[item] ?? ''}
                  onChange={handleChange}
                />

                <button type="button" onClick={(event) => handleChangeWithButton(event, '+')}>+</button>
              </div>
            </div>
          );
        })
      }

      {isButtonShowMore ? (<button className={styles.formBtnShow} type="button" onClick={() => {
        setIsButtonShowMore(!isButtonShowMore)
        dispatch(settingsFormAllItemsIsUnshow())
      }}>
        {language.showLess}
      </button>) : (<button className={styles.formBtnShow} type="button" onClick={() => {
        setIsButtonShowMore(!isButtonShowMore)
        dispatch(settingsFormAllItemsIsShow())
      }}>
        {language.showMore}
      </button>)}

      <button type="submit">{language.save}</button>
    </form>
  );
}

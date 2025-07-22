import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styles from './../styles/selectPackList.module.scss';
import { setIsSelectPackList } from "../redux/slices/naviSlice.tsx";
import { deletePackItem,  togglePackItemVisibility } from "../redux/slices/settingsPackSlice.tsx";
import logoAddNewItem from './../assets/icons8-add-50.png'
import ModalFormForAddToPackList from './ModalFormForAddToPackList.tsx'
import { setIsModalWindows } from "../redux/slices/modalWindowsSlice.tsx";
export default function SelectPackList() {
  const dispatch = useDispatch();
  const packList = useSelector((state: RootState) => state.settingsPack);
  const language = useSelector((state: RootState) => state.settingsLanguage);
  const isAddNewPackName = useSelector((state: RootState) => state.modalWindows).isModalFormForAddNewName
  const handlePackListChange = (key: string) => {
    dispatch( togglePackItemVisibility(key));
  };

  return (
    <> {isAddNewPackName ? <ModalFormForAddToPackList /> : ''}
      <form className={styles.modalFormPackList}>
        {Object.keys(packList)
          .sort((a, b) => b.localeCompare(a))
          .map((key) => (
            <fieldset
              key={key}
              style={{
                marginBottom: "20px",
                borderRadius: "5px",
                borderColor: "#dfd9be",
                textAlign: "center",
                margin: "1px auto",
              }}
            >
              <button className={styles.deleteBtnSelectPack} onClick={() => { dispatch(deletePackItem(key)) }} title={language.delete} type="button">X</button>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  id={`range-${key}`}
                  onChange={() => handlePackListChange(key)}
                  checked={packList[key]}
                />
                <span className={styles.slider}></span>
              </label>
              <legend style={{ marginLeft: "10px", color: "white" }}>{key}</legend>
            </fieldset>
          )
          )
        }
        <fieldset className={styles.fieldsetModalFormAddPackNameBtn}>
          <legend>{'add new'}</legend>
          <button type="button"
            className={styles.modalFormAddPackNameBtn}
            onClick={() => dispatch(setIsModalWindows('isModalFormForAddNewName'))}>
            <img src={logoAddNewItem} alt="+" />
          </button>
        </fieldset>
        <button
          type="button"
          className={styles.paclListBackBtn}
          onClick={() => dispatch(setIsSelectPackList())}
        >
          {language.back}
        </button>
      </form></>
  );
}

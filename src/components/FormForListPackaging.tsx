import { useState, type FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { addLog } from "../redux/slices/activityHistorySlice.tsx";

import {
  clearAllPackItems,
  setPackItem
} from "../redux/slices/packagingListSlice.tsx";
import CalculatorModal from "./CalculatorModa.tsx";
import styles from "./../styles/packagingForm.module.scss";
import { BsFillCalculatorFill } from "react-icons/bs";
import ModalForChangeItemQuantity from "./ModalForChangeItemQuantity.tsx";
import {setShowButton} from "../redux/slices/FormForListPackagingSlice.tsx";
import {settingsFormAllItemsIsShow, settingsFormAllItemsIsUnshod} from "../redux/slices/settingsPackSlice.tsx";
import scrollToId from "../helpers/scrollToId.tsx";

export interface InitialPackList {
  [key: string]: number;
}

export default function FormForListPackaging({ onAddList }: any) {
  const [isModalForChangeItemQuantity, setIsModalForChangeItemQuantity] = useState(false);
  const [itemName, setItemName] = useState('');
  const [isBtnChangeWithMath, setIsBtnChangeWithMath] = useState(false);
  const isButtonShowMore = useSelector((state: RootState) => state.formList);
  const language = useSelector((state: RootState) => state.settingsLanguage);
  const listPacksForView = useSelector((state: RootState) => state.settingsPack);
  const packagingList = useSelector((state: RootState) => state.dataPackList);


  const dispatch = useDispatch();

  function handlePackagingForm(event: FormEvent) {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    onAddList(packagingList);
    dispatch(clearAllPackItems());
    dispatch(addLog({
      message: { name: 'save', prevalue: "", value: 'db', sign: '' },
      datetime: Date.now()
    }));
  }

  function handleChangeWithMath(  event: { preventDefault: () => void; },  elemName:string) {
    event.preventDefault();
    setIsBtnChangeWithMath(false);
    console.log(elemName);
    setTimeout(()=>scrollToId(elemName),40)
  }

  function handleChangeWithButton(event: React.MouseEvent<HTMLButtonElement>, sign: string) {
    event.preventDefault();
    const parent = (event.target as HTMLElement).parentElement;
    const itemName = parent?.dataset.item || "";
    const currentValue = Number(packagingList[itemName]);

    if (sign === "+") {
      const newValue = currentValue + 1;
      dispatch(addLog({ message: { name: itemName, prevalue: currentValue, value: newValue, sign: '+' }, datetime: Date.now() }));
      dispatch(setPackItem({ name: itemName, value: newValue }));
    } else if (sign === "-" && currentValue > 0) {
      const newValue = currentValue - 1;
      dispatch(addLog({ message: { name: itemName, prevalue: currentValue, value: newValue, sign: '-' }, datetime: Date.now() }));
      dispatch(setPackItem({ name: itemName, value: newValue }));
    }
  }

  if (isModalForChangeItemQuantity) {
    return (
        <ModalForChangeItemQuantity
            itemName={itemName}
            itemValue={packagingList[itemName].toString()}
            toogleModalWindow={setIsModalForChangeItemQuantity}
        />
    );
  }

  if (isBtnChangeWithMath) {
 
    return (
        <CalculatorModal
            onSubmit={handleChangeWithMath}
            elemName={itemName}
        />
    );
  }

  return (
      <form id="formPackagingItems" onSubmit={(event)=>handlePackagingForm(event)} onReset={() => dispatch(clearAllPackItems())}>
        {Object.keys(packagingList).sort((a, b) => b.localeCompare(a)).map((item) => {
          if (!listPacksForView[item]) return null;
          return (
              <div key={item}>
                <label htmlFor={item}>{item}</label>
                <div data-item={item} className={styles.inputBtnGroup}>
                  <button
                      type="button"
                      className={styles.btnMath}
                      onClick={(e) => handleChangeWithButton(e, '-')}
                  >
                    -
                  </button>

                  <div
                      className={styles.formInput}
                      id={item}
                      onClick={() => {
                        setItemName(item);
                        setIsModalForChangeItemQuantity(true);
                      }}
                  >
                    {packagingList[item]}
                  </div>

                  <button
                      type="button"
                      className={styles.btnMath}
                      onClick={(e) => handleChangeWithButton(e, '+')}
                  >
                    +
                  </button>

                  <button
                      type="button"
                      data-item={item}
                      onClick={(e) => {
                        const button = e.currentTarget as HTMLElement;
                        const item = button.dataset.item || "";
                        setItemName(item);
                        setIsBtnChangeWithMath(true);
                      }}
                  >
                    <BsFillCalculatorFill style={{ marginTop: "9px" }} />
                  </button>
                </div>
              </div>
          );
        })}

        {isButtonShowMore.buttonShowItems ? (
            <button
                className={styles.formBtnShow}
                type="button"
                onClick={() => {
                  scrollToId("root");
                  dispatch(setShowButton());
                  dispatch(settingsFormAllItemsIsUnshod());
                }}
            >
              {language.showLess}
            </button>
        ) : (
            <button
                className={styles.formBtnShow}
                type="button"
                onClick={() => {
                  scrollToId("root");
                  dispatch(setShowButton());
                  dispatch(settingsFormAllItemsIsShow());
                }}>

              {language.showMore}
            </button>
        )}

        <button type="reset">{language.reset}</button>
        <button type="submit">{language.save}</button>
      </form>
  );
}

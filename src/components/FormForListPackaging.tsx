import { useState, type FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { addLog } from "../redux/slices/activityHistorySlice.tsx";
import { settingsFormAllItemsIsShow, settingsFormAllItemsIsUnshow } from "../redux/slices/settingsPackSlice.tsx";
import { clearAllPackItems, setPackItem } from "../redux/slices/packagingListSlice.tsx";
import CalculatorModal from "./CalculatorModa.tsx";
import styles from './../styles/packagingForm.module.scss';
import { BsFillCalculatorFill } from "react-icons/bs";
export interface InitialPackList {
  [key: string]: number;
}

export default function FormForListPackaging({ onAddList }: any) {
  const [itemName, setItemName] = useState('');
  const [isBtnChangeWithMath, setIsBtnChangeWithMath] = useState(false);
  const [isButtonShowMore, setIsButtonShowMore] = useState(false);
  const language = useSelector((state: RootState) => state.settingsLanguage);
  const listPacksForView = useSelector((state: RootState) => state.settingsPack);
  const packagingList = useSelector((state: RootState) => state.dataPackList);
  const dispatch = useDispatch();

  function handlePackagingForm(event: FormEvent) {
    event.preventDefault();
    onAddList(packagingList);
    dispatch(clearAllPackItems());
    dispatch(addLog({ message: { name: 'save', prevalue: "", value: 'db', sign: '' }, datetime: Date.now() }));
  }
  function handleFocus(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let { id, value } = event.target;
    let currentInput: any = document.getElementById(id)
    if (+value !== 0) {
      currentInput.value = packagingList[id];
    }
    else {
      currentInput.value = "";
    }
  }
  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let { id, value } = event.target;
    let currentInput: any = document.getElementById(id)
    if (+value !== 0) {
      currentInput.value = packagingList[id];
    }
    else {
      currentInput.value = "0";
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(setPackItem({ name, value }));
    dispatch(addLog({ message: { name, prevalue: "", value, sign: '' }, datetime: Date.now() }));
  }
  function handleChangeWithMath() {


    setIsBtnChangeWithMath(false);
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

  return (
    isBtnChangeWithMath ? (
      <CalculatorModal onSubmit={handleChangeWithMath} elemName={itemName} />
    ) : (
      <form onSubmit={handlePackagingForm} onReset={() => dispatch(clearAllPackItems())}>
        {Object.keys(packagingList).sort((a, b) => b.localeCompare(a)).map((item) => {
          if (!listPacksForView[item]) return null;
          return (
            <div key={item}>
              <label htmlFor={item}>{item}</label>
              <div data-item={item} className={styles.inputBtnGroup}>
                <button type="button" className={styles.btnMath} onClick={(e) => handleChangeWithButton(e, '-')}>-</button>

                <input
                  key={item}
                  className={styles.formInput}
                  type="number"
                  name={item}
                  min={0}
                  id={item}
                  onFocusCapture={handleFocus}
                  onBlur={handleBlur}
                  value={packagingList[item] || 0}
                  onChange={handleChange}
                />
                <button type="button" className={styles.btnMath} onClick={(e) => handleChangeWithButton(e, '+')}>+</button>
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
        {isButtonShowMore ? (
          <button className={styles.formBtnShow} type="button" onClick={() => {
            setIsButtonShowMore(false);
            dispatch(settingsFormAllItemsIsUnshow());
          }}>
            {language.showLess}
          </button>
        ) : (
          <button className={styles.formBtnShow} type="button" onClick={() => {
            setIsButtonShowMore(true);
            dispatch(settingsFormAllItemsIsShow());
          }}>
            {language.showMore}
          </button>
        )}
        <button type="reset">{language.reset}</button>
        <button type="submit">{language.save}</button>
      </form>
    )
  );
}

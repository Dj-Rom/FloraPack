import { useState, type FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { addLog } from "../redux/slices/activityHistorySlice.tsx";
import { settingsFormAllItemsIsShow, settingsFormAllItemsIsUnshow } from "../redux/slices/settingsPackSlice.tsx";
import { clearAllPackItems, setPackItem } from "../redux/slices/packagingListSlice.tsx";
import CalculatorModal from "./CalculatorModa.tsx";
import styles from './../styles/packagingForm.module.scss';

export interface InitialPackList {
  [key: string]: number;
}

export default function FormForListPackaging({ onAddList }: any) {
  const [sign, setSing] = useState('');
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
    dispatch(addLog({ message: { name: 'save', prevalue: "to", value: 'db', sign: '' }, datetime: Date.now() }));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(setPackItem({ name, value }));
    dispatch(addLog({ message: { name, prevalue: "", value, sign: '' }, datetime: Date.now() }));
  }

  function handleChangeWithMath(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const getNewValue = (form.elements.namedItem("expression") as HTMLInputElement).value;
    const currentValue = Number(packagingList[itemName]);
    const valueToApply = Number(getNewValue);

    if (isNaN(valueToApply)) {
      dispatch(addLog({ message: { name: itemName, prevalue: currentValue, value: currentValue, sign }, datetime: Date.now() }));
      dispatch(setPackItem({ name: itemName, value: currentValue }));
    } else if (sign === "+") {
      const newValue = currentValue + valueToApply;
      dispatch(addLog({ message: { name: itemName, prevalue: currentValue, value: newValue, sign: '+' }, datetime: Date.now() }));
      dispatch(setPackItem({ name: itemName, value: newValue }));
    } else if (sign === "-" && currentValue > 0) {
      const newValue = Math.max(0, currentValue - valueToApply);
      dispatch(addLog({ message: { name: itemName, prevalue: currentValue, value: newValue, sign: '-' }, datetime: Date.now() }));
      dispatch(setPackItem({ name: itemName, value: newValue }));
    }

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
      <CalculatorModal sign={sign} onSubmit={handleChangeWithMath} elemName={itemName} />
    ) : (
      <form onSubmit={handlePackagingForm} onReset={() => dispatch(clearAllPackItems())}>
        {Object.keys(packagingList).sort((a, b) => b.localeCompare(a)).map((item) => {
          if (!listPacksForView[item]) return null;
          return (
            <div key={item}>
              <label htmlFor={item}>{item}</label>
              <div data-item={item} className={styles.inputBtnGroup}>
                <button type="button" onClick={(e) => {
                  const parent = (e.target as HTMLElement).parentElement;
                  const item = parent?.dataset.item || "";
                  setItemName(item);
                  setSing('-');
                  setIsBtnChangeWithMath(true);
                }}>-</button>
                <button type="button" className={styles.btnMath} onClick={(e) => handleChangeWithButton(e, '-')}>-1</button>
                <input
                  className={styles.formInput}
                  type="number"
                  name={item}
                  min={0}
                  id={item}
                  value={packagingList[item] || 0}
                  onChange={handleChange}
                />
                <button type="button" className={styles.btnMath} onClick={(e) => handleChangeWithButton(e, '+')}>+1</button>
                <button type="button" onClick={(e) => {
                  const parent = (e.target as HTMLElement).parentElement;
                  const item = parent?.dataset.item || "";
                  setItemName(item);
                  setSing('+');
                  setIsBtnChangeWithMath(true);
                }}>+</button>
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

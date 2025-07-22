import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styles from './../styles/calculatorModal.module.scss';
import { useState } from "react";
import { addLog } from "../redux/slices/activityHistorySlice";
import { setPackItem } from "../redux/slices/packagingListSlice";
import * as React from "react";
import {ConfirmDialog} from "./ConfirmDialog.tsx";


interface Props {
  onSubmit: (event: React.FormEvent, elemName: string) => void;
  elemName: string;
}

export default function CalculatorModal({ onSubmit, elemName }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const datalist = useSelector((state: RootState) => state.dataPackList);
  const language = useSelector((state: RootState) => state.settingsLanguage);
  const dispatch = useDispatch();
const [isChange, setIsChange] = React.useState(false);
  if (datalist[elemName] === undefined) {
    return <div>Loading...</div>;
  }

  window.scroll(0,0)

  const initialValue = datalist[elemName];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [result, setResult] = useState<string | number>(initialValue);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputField, setInputField] = useState<number | string>(initialValue);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pendingOperation, setPendingOperation] = useState<string | null>(null);

  function inputAdd(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const number = event.currentTarget.innerHTML;
    setInputField(prev => {
      const newValueStr = prev === 0 ? number : prev.toString() + number;
      return Number(newValueStr);
    });
  }

  function handleOperation(op: string) {
    if (pendingOperation && pendingValue !== null) {
      let newValue = pendingValue;
      const currentValue = inputField;

      switch (pendingOperation) {
        case "+":
          newValue = +pendingValue + +currentValue;
          setResult(`${pendingValue} + ${currentValue} = ${newValue}`);
          break;
        case "-":
          newValue = Math.max(0, pendingValue - +currentValue);
          break;
        case "*":
          newValue = Math.max(0, pendingValue * +currentValue);
          break;
        case "/":
          newValue = currentValue !== 0 ? Math.max(0, pendingValue / +currentValue) : pendingValue;
          break;
      }

      setPendingValue(newValue);
      setResult(`${pendingValue} ${pendingOperation} ${currentValue} = ${newValue}`);

      dispatch(addLog({
        message: { name: elemName, prevalue: pendingValue, value: newValue, sign: pendingOperation },
        datetime: Date.now()
      }));

      dispatch(setPackItem({ name: elemName, value: newValue }));
      setInputField('');
      setPendingOperation(op);
    } else {
      setPendingValue(+inputField);
      setPendingOperation(op);
      setInputField('');

    }
  }

  function handleEqual() {
    if (pendingOperation && pendingValue !== null) {
      let newValue = pendingValue;
      const currentValue = inputField;

      switch (pendingOperation) {
        case "+":
          newValue = +pendingValue + +currentValue;
          setResult(`${pendingValue} + ${currentValue} = ${newValue}`);
          break;
        case "-":
          newValue = Math.max(0, pendingValue - +currentValue);
          setResult(`${pendingValue} - ${currentValue} = ${newValue}`);
          break;
        case "*":
          newValue = Math.max(0, pendingValue * +currentValue);
          setResult(`${pendingValue} * ${currentValue} = ${newValue}`);
          break;
        case "/":
          newValue = currentValue !== 0 ? Math.max(0, pendingValue / +currentValue) : pendingValue;
          setResult(`${pendingValue} / ${currentValue} = ${newValue}`);
          break;
      }

      dispatch(addLog({
        message: { name: elemName, prevalue: pendingValue, value: newValue, sign: pendingOperation },
        datetime: Date.now()
      }));

      dispatch(setPackItem({ name: elemName, value: newValue }));
setIsChange(true);
      setInputField(newValue);
      setPendingValue(null);
      setPendingOperation(null);
    }
  }

  function clearInput() {
    setInputField(0);
    setPendingValue(null);
    setPendingOperation(null);
    setResult(0);
  }

  const handleSubmit = (event: React.FormEvent) => {
    if (!isChange) {
      event.preventDefault();
      setShowConfirm(true);
      return;
    }
    onSubmit(event, elemName);
  };

  return (

<>
        {showConfirm && (
            <ConfirmDialog
                message={language.answerMessageForExitWithoutChange}
                onConfirm={() => {
                  setShowConfirm(false);
                  onSubmit(new Event("submit") as unknown as React.FormEvent, elemName);
                }}
                onCancel={() => setShowConfirm(false)}
            />
        )}




      <form
          className="calculatorModal"
          onSubmit={handleSubmit}
      >

      <div className={styles.calcHeader}>
        <h4>{elemName}</h4>
        <h5>
          {pendingOperation && pendingValue !== null
            ? `${pendingValue} ${pendingOperation} ${inputField}`
            : result}
        </h5>

        <input
          type="number"
          min="0"
          value={inputField}
          onChange={e => {
            const val = Number(e.target.value);
            if (val >= 0) setInputField(val);
          }}
          name="expression"
          id="expression"
        />
      </div>

      <div className={styles.calc}>
        <div className={styles.numbers}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
            <button
              key={num}
              type="button"
              onClick={inputAdd}
              className={styles.mathBtns}
            >
              {num}
            </button>
          ))}

          <button
            className={styles.mathBtns}
            style={{ background: "green" }}
            onClick={() => handleOperation("+")}
            type="button"
          >
            +
          </button>
          <button
            className={styles.mathBtns}
            style={{ background: "green" }}
            onClick={() => handleOperation("-")}
            type="button"
          >
            -
          </button>
          <button
            className={styles.mathBtns}
            style={{ background: "green" }}
            onClick={() => handleOperation("/")}
            type="button"
          >
            /
          </button>
          <button
            className={styles.mathBtns}
            style={{ background: "green" }}
            onClick={() => handleOperation("*")}
            type="button"
          >
            *
          </button>
          <button
            className={styles.mathBtns}
            style={{ background: "green" }}
            onClick={handleEqual}
            type="button"
          >
            =
          </button>

          <button
            className={styles.mathBtns}
            style={{ background: "tomato" }}
            onClick={clearInput}
            type="button"
          >
            C
          </button>
        </div>
      </div>

      <button type="submit">{language.back}</button>
    </form>
</>
  );
}

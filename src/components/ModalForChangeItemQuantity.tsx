import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Dispatch, SetStateAction, useState} from "react";
import {addLog} from "../redux/slices/activityHistorySlice.tsx";
import {setPackItem} from "../redux/slices/packagingListSlice.tsx";
import * as React from "react";

interface Props {
    itemName: string;
    itemValue: string;
    toogleModalWindow: Dispatch<SetStateAction<boolean>>;
}


export default function ModalForChangeItemQuantity({
                                                       itemName,
                                                       itemValue,
                                                       toogleModalWindow
                                                   }: Props) {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.settingsLanguage);
    const [inputValue, setInputValue] = useState(itemValue);

    function handleChangeQuantityItem(event: React.FormEvent) {
        event.preventDefault();
        const numericValue = Number(inputValue);

        if (!inputValue || isNaN(numericValue) || numericValue <= 0) {
            return alert("Please enter a valid number greater than 0");
        }
        dispatch(addLog({
            message: {name: itemName, prevalue: itemValue, value:  numericValue, sign: 'change'},
            datetime: Date.now()
        }));
        dispatch(setPackItem({name: itemName, value:  numericValue}));
        toogleModalWindow(false); // close modal
    }

    return (
        <form className="modalForm" onSubmit={(event) => handleChangeQuantityItem(event)}>
            <label htmlFor="nameCompany">{language.enterNewValue}</label>
            <input
                type="number"
                autoFocus={true}
                name="nameCompany"
                id="nameCompany"
                placeholder={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">{language.save}</button>
            <br/>
            <button
                type="button"
                onClick={() => toogleModalWindow(prev => !prev)}
            >
                {language.back}
            </button>
        </form>
    );
}

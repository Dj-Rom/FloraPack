import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {InitialList} from "../App.tsx";
import * as React from "react";


interface Props {
    handleChange:(event: React.FormEvent<HTMLFormElement>)=>void,
    packagingListItem: string;
    setPackagingList: Dispatch<SetStateAction<InitialList>>;
    setIsModalChangeQuntityInputVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ModalForChangeQuantity({packagingListItem, setIsModalChangeQuntityInputVisible, handleChange}: Props) {
const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus(); // безопасно вызовет focus, если current не null
    }, []);
    const language = useSelector((state: RootState) => state.settingsLanguage);




    return (
        <form className="modalForm" onSubmit={(event)=>handleChange(event)}>
            <label htmlFor="changeQuantity">enter new number </label>
            <input type="number" name="changeQuantity" id="changeQuantity" placeholder={packagingListItem} ref={inputRef} />
            <button type="submit">{language.save}</button>
            <button type="button" onClick={() => setIsModalChangeQuntityInputVisible(prev => !prev)}>
                {language.back}
            </button>
        </form>
    );
}

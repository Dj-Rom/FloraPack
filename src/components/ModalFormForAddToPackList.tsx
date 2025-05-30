import styles from './../styles/modalFormAddToPackList.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addNewPackName } from '../redux/slices/packagingListSlice';
import { setIsModalWindows } from '../redux/slices/modalWindowsSlice';
import { settingsPackAddNewPackItem } from '../redux/slices/settingsPackSlice';
import { setAlert } from '../redux/slices/alertSlice';

export default function ModalFormForAddToPackList() {
    const language = useSelector((state: RootState) => state.settingsLanguage);
    const dispatch = useDispatch();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const inputValue = (form.elements.namedItem("namePack") as HTMLInputElement)?.value;

        try {
            dispatch(settingsPackAddNewPackItem(inputValue));
            dispatch(addNewPackName(inputValue));
            dispatch(setIsModalWindows('isModalFormForAddNewName'));
            dispatch(setAlert({ type: 'success', message: 'Added successfully!' }));

        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: `Don't added: ${error.message || error}}` }));
        }
    };
    return (
        <form className={styles.modalFormAddToPackList} onSubmit={handleSubmit}>
            <fieldset className={styles.fieldsetModalFormAddPackName}>
                <legend>{language.packName}</legend>
                <input type="text" name='namePack' placeholder={`${language.example} : KK`} />
            </fieldset>
            <button type="submit">{language.save}</button>
        </form>
    );
}

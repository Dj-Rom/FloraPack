import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setLanguage } from "../redux/slices/settingsLanguageSlice";
import styles from './../styles/selectLanguage.module.scss'
import { setIsSelectLanguage } from "../redux/slices/naviSlice";
import { LanguageCode } from './../redux/slices/settingsLanguageSlice'
import { setAlert } from "../redux/slices/alertSlice";
export default function SelectLanguage() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settingsLanguage);
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;


    const isLanguageCode = (value: string): value is LanguageCode => {
      return ['pl', 'de', 'en', 'ru', 'nl', 'uk'].includes(value);
    };
    if (isLanguageCode(value)) {
      dispatch(setLanguage(value));
    } else {
      dispatch(setAlert({ message: `Invalid language code:${value}`, type: 'error' }));
    }
  };


  return (
    <form className={styles.modalForm}>
      <label htmlFor="selectLanguage">{language.languageLabel}</label><select name="selectLanguage" value={language.language} onChange={handleLanguageChange}>
        <option value="pl">polski</option>
        <option value="en">english</option>
        <option value="ua">українська</option>
        <option value="nl">nederlands</option>
        <option value="ru">русский</option>
        <option value="de">deutsch</option>
      </select>
      <button type="button" className={styles.backBtnSelectLanguage} onClick={() => dispatch(setIsSelectLanguage())}>{language.back}</button>
    </form>
  );
}

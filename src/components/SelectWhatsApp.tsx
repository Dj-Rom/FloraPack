import { useSelector } from 'react-redux'
import styles from './../styles/selectWhatsapp.module.scss'
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { setWhatsAppMessageSetting } from '../redux/slices/settingsWhatsAppMessageSlice'
import { setIsSelectWhatsAppMessage } from '../redux/slices/naviSlice'
export default function SelectWhatsApp() {
    const dispatch = useDispatch()
    function handleSettingWhatsAppMessageChange(item: 'date' | 'company') {
        dispatch(setWhatsAppMessageSetting(item));
    }
    const language = useSelector((state: RootState) => state.settingsLanguage)
    const settingsWhatsAppMessage = useSelector((state: RootState) => state.settingWhatsAppMessage)
    return (
        <form className={styles.modalFormPackList} >
            <h5>{language.whatsAppMessagePrompt}</h5>
            <fieldset
                key={language.date}
                style={{
                    marginBottom: "20px",
                    borderRadius: "5px",
                    borderColor: "#dfd9be",
                    textAlign: "center",
                    margin: "1px auto",
                }}
            >
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        id={`range-${language.date}`}
                        onChange={() => handleSettingWhatsAppMessageChange('date')}
                        checked={settingsWhatsAppMessage.date}
                    />
                    <span className={styles.slider}></span>
                </label>
                <legend style={{ marginLeft: "10px", color: "white" }}>{language.date}</legend>
            </fieldset>
            <fieldset
                key={language.date}
                style={{
                    marginBottom: "20px",
                    borderRadius: "5px",
                    borderColor: "#dfd9be",
                    textAlign: "center",
                    margin: "1px auto",
                }}
            >
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        id={`range-${language.company}`}
                        onChange={() => handleSettingWhatsAppMessageChange('company')}
                        checked={settingsWhatsAppMessage.company}
                    />
                    <span className={styles.slider}></span>
                </label>
                <legend style={{ marginLeft: "10px", color: "white" }}>{language.company}</legend>
            </fieldset>
            <button type='button' className={styles.paclListBackBtn} onClick={() => dispatch(setIsSelectWhatsAppMessage())}>{language.back}</button>
        </form>
    )
}
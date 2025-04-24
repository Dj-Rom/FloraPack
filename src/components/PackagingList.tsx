import { useSelector } from "react-redux";
import { type PackagingListInterface } from "../App.tsx";
import logoWhatsapp from './../assets/icons8-whatsapp.svg';
import logoEmail from './../assets/gmail-icon-logo-svgrepo-com.svg';
import { RootState } from "../redux/store.tsx";
import styles from './../styles/packagingForm.module.scss';
import { sendToWhatsApp, sendViaGmail } from "../helpers/whatsAppMessageAndGmail.tsx";

export interface PackagingListProps {
    packagingLists: PackagingListInterface[];
    onDeleteList: (id: number) => void;
}
export default function PackagingList({ packagingLists, onDeleteList }: PackagingListProps) {
    const language = useSelector((state: RootState) => state.settingsLanguage);
    const settingWhatsAppMessage = useSelector((state: RootState) => state.settingWhatsAppMessage);

    return (
        <ul className={styles.lists}>
            {packagingLists.map((packagingList) => {
                const formattedDate = packagingList.title instanceof Date
                    ? packagingList.title.toLocaleDateString()
                    : packagingList.title;

                const formattedTime = packagingList.title instanceof Date
                    ? packagingList.title.toLocaleTimeString()
                    : '';

                return (
                    <li
                        id={packagingList.id.toString()}
                        key={packagingList.id}
                        title={packagingList.title instanceof Date ? packagingList.title.toDateString() : packagingList.title}
                    >
                        <h4>{packagingList.nameCompany}</h4>
                        <p>
                            {formattedDate} - {formattedTime}
                        </p>
                        <ul>
                            {Object.entries(packagingList.description).map(([key, value]) => {
                                if (value) {
                                    return (
                                        <li key={key}>
                                            <span>
                                                {key} : {value}
                                            </span>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>

                        <div className={styles.listBtns}>
                            <div className="sendGroupBtn">
                                <button
                                    className={styles.btnLogo}
                                    onClick={() => sendToWhatsApp(packagingList, settingWhatsAppMessage, language)}
                                    aria-label="Send to WhatsApp"
                                >
                                    <img src={logoWhatsapp} alt="WhatsApp" />
                                </button>
                                <button
                                    aria-label="Send to Email"
                                    className={styles.btnLogo}
                                    onClick={() => sendViaGmail(packagingList, settingWhatsAppMessage, language)}
                                >
                                    <img src={logoEmail} alt="Email" />
                                </button>
                            </div>
                            <button onClick={() => onDeleteList(packagingList.id)}>{language.delete}</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

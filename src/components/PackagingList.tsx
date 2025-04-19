import { useSelector } from "react-redux";
import { type PackagingListInterface } from "../App.tsx";
import logoWhatsapp from './../assets/icons8-whatsapp.svg'
import logoEmail from './../assets/gmail-icon-logo-svgrepo-com.svg'
import { RootState } from "../redux/store.tsx";
import styles from './../styles/packagingForm.module.scss'

export interface PackagingListProps {
    packagingLists: PackagingListInterface[];
    onDeleteList: (id: number) => void;
}

function formatPackagingMessage(packagingList: PackagingListInterface): string {
    const { nameCompany, title, description } = packagingList;
    return `
Company :   ${nameCompany}
Date :  ${title.toLocaleDateString()}    ${title.toLocaleTimeString()}
___________________________________
${Object.entries(description)
            .filter(([, value]) => value !== 0)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
    `.trim();
}

export default function PackagingList({ packagingLists, onDeleteList }: PackagingListProps) {
    const language = useSelector((state: RootState) => state.settingsLanguage)

    function sendToWhatsApp(packagingList: PackagingListInterface) {
        const message = formatPackagingMessage(packagingList);
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    }

    function sendViaGmail(packagingList: PackagingListInterface) {
        const message = formatPackagingMessage(packagingList);
        const subject = encodeURIComponent(`Packaging List from ${packagingList.nameCompany}`);
        const body = encodeURIComponent(message);
        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
        window.open(gmailURL, "_blank");
    }

    return (
        <ul className={styles.lists}>
            {packagingLists.map((packagingList) => (
                <li
                    id={packagingList.id.toString()}
                    key={packagingList.id}
                    title={packagingList.title.toDateString()}
                >
                    <h4>{packagingList.nameCompany}</h4>
                    <p>
                        {packagingList.title.toLocaleDateString()} -{" "}
                        {packagingList.title.toLocaleTimeString()}
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
                        })}
                    </ul>

                    <div className={styles.listBtns}>
                        <div className="sendGroupBtn">
                            <button
                                className={styles.btnLogo}
                                onClick={() => sendToWhatsApp(packagingList)}
                                aria-label="Send to WhatsApp"
                            >
                                <img src={logoWhatsapp} alt="WhatsApp" />
                            </button>
                            <button aria-label="Send to Email" className={styles.btnLogo} onClick={() => sendViaGmail(packagingList)}>  <img src={logoEmail} alt="Email" /></button>
                        </div>
                        <button onClick={() => onDeleteList(packagingList.id)}>{language.delete}</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

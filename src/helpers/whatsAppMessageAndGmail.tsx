import { PackagingListInterface } from "../App";
import { type SettingWhatsAppMessage } from './../redux/slices/settingsWhatsAppMessage'; 
import { type LanguageLabels } from './../data/languages'
export function formatPackagingMessage(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage, 
    language: LanguageLabels 
): string {
    const { nameCompany, title, description } = packagingList;
    const formattedDate = title instanceof Date ? title.toLocaleDateString() : title;
    const formattedTime = title instanceof Date ? title.toLocaleTimeString() : '';
    return `
${settingWhatsAppMessage.company ? language.company + ": " : ""}${nameCompany}
${settingWhatsAppMessage.date ? `${language.date + ": "} ${formattedDate} ${formattedTime}` : ""}   
${Object.entries(description)
            .filter(([, value]) => value !== 0)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
    `.trim();
}

export function sendToWhatsApp(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage,
    language: LanguageLabels
) {
    const message = formatPackagingMessage(packagingList, settingWhatsAppMessage, language);
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}

export function sendViaGmail(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage,
    language: LanguageLabels
) {
    const message = formatPackagingMessage(packagingList, settingWhatsAppMessage, language);
    const subject = encodeURIComponent(`Packaging List from ${packagingList.nameCompany}`);
    const body = encodeURIComponent(message);
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    window.open(gmailURL, "_blank");
}

import { PackagingListInterface } from "../App";
import { type SettingWhatsAppMessage } from "../redux/slices/settingsWhatsAppMessageSlice";
import { type LanguageLabels } from "../data/languages";

export function formatPackagingMessage(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage,
    language: LanguageLabels
): string {
    const { nameCompany, title, description } = packagingList;

    const formattedDate =
        title instanceof Date ? title.toLocaleDateString() : title;
    const formattedTime =
        title instanceof Date ? title.toLocaleTimeString() : "";

    const priorityOrder = [
        "TAG-6", "TAG-5", "NC", "CC", "CC-SH", "EXT", "EP",
        "PALETA", "KK-SH", "KK",
        "533", "544", "560", "566", "577", "588", "596", "597", "598", "520", "595",
        "TRAAY"
    ];

    const sortedEntries = Object.entries(description)
        .filter(([, value]) => value !== 0)
        .sort(([a], [b]) => {
            const indexA = priorityOrder.findIndex(key =>
                a.toLowerCase().includes(key.toLowerCase())
            );
            const indexB = priorityOrder.findIndex(key =>
                b.toLowerCase().includes(key.toLowerCase())
            );

            if (indexA === -1 && indexB === -1) return a.localeCompare(b); // alphabetical fallback
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    const lines = [
        settingWhatsAppMessage.company
            ? `${language.company}: ${nameCompany}`
            : nameCompany,
        settingWhatsAppMessage.date
            ? `${language.date}: ${formattedDate} ${formattedTime}`
            : "",
        ...sortedEntries.map(([key, value]) => `• ${key}: ${value}`)
    ];

    return lines.filter(Boolean).join("\n").trim();
}

export function sendToWhatsApp(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage,
    language: LanguageLabels
) {
    const message = formatPackagingMessage(
        packagingList,
        settingWhatsAppMessage,
        language
    );
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}

export function sendViaGmail(
    packagingList: PackagingListInterface,
    settingWhatsAppMessage: SettingWhatsAppMessage,
    language: LanguageLabels
) {
    const message = formatPackagingMessage(
        packagingList,
        settingWhatsAppMessage,
        language
    );
    const subject = encodeURIComponent(
        `Packaging List from ${packagingList.nameCompany}`
    );
    const body = encodeURIComponent(message);
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    window.open(gmailURL, "_blank");
}

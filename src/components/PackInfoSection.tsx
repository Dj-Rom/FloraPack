import { useSelector } from 'react-redux';
import styles from './../styles/packInfoSection.module.scss';
import { RootState } from '../redux/store';

type PackInfoSectionProps = {
    title: string;
    photoUrl: string;
    description: { [key: string]: string };
};

export default function PackInfoSection({ title, photoUrl, description }: PackInfoSectionProps) {
    const { language } = useSelector((state: RootState) => state.settingsLanguage);

    return (
        <section className={styles.packInfoSection}>
            <h2>{title}</h2>
            <div className={styles.packInformationPageSectionLeft}>
                <img src={photoUrl} alt={`photo - ${title}`} />

            </div>
            <div className={styles.packInformationPageSectionRight}>
                <span
                    dangerouslySetInnerHTML={{
                        __html: description[language].replace(/\n/g, "<br />"),
                    }}
                />
            </div>
        </section>
    );
}

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './../styles/showlogs.module.scss';


export default function ShowLogs() {
    const dataLogs = useSelector((state: RootState) => state.activityHistory).history;
    const options: any = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    return (
        <ol className={styles.logsList}>
            {dataLogs.length < 1 ? "empty" : dataLogs.map((log) => {
                const date = new Date(log.datetime);

                return (
                    <li key={Math.random()}>
                        {date.toLocaleString("de-DE", options)} {log.message.name}    {log.message.prevalue} {log.message.sign} {Math.abs(+log.message.value - +log.message.prevalue)} = {log.message.value};
                    </li>)

            }
            )
            }  </ol>
    );
}

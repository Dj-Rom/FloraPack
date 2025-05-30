import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styles from './../styles/historySettinngsPanel.module.scss';
import { clearHistory, setLimit } from "../redux/slices/activityHistorySlice";

import { setIsSelectActivityHistoty } from "../redux/slices/naviSlice";

export default function HistorySettingsPanel() {
    const language = useSelector((state: RootState) => state.settingsLanguage);
    const limit = useSelector((state: RootState) => state.activityHistory.limit);
    const dispatch = useDispatch();



    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLimit(Number(event.target.value)));
    };

    return (
        <form className={styles.modalFormHistorySetting}>
            <h5>{language.history}</h5>

            <fieldset
                style={{
                    marginBottom: "20px",
                    borderRadius: "5px",
                    borderColor: "#dfd9be",
                    textAlign: "center",
                    margin: "1px auto",
                }}
            >
                <label className={styles.switch}>
                    <button type="button" onClick={() => dispatch(clearHistory())}>
                        {language.clear}
                    </button>
                </label>
                <legend style={{ marginLeft: "10px", color: "white" }}>  {language.history}</legend>
            </fieldset>

            <fieldset
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
                        type="number"
                        value={limit}
                        onChange={handleLimitChange}
                        min={1}
                    />
                    <span className={styles.slider}></span>
                </label>
                <legend style={{ marginLeft: "10px", color: "white" }}>{language.limit}</legend>
            </fieldset>

            <button
                type="button"
                className={styles.backBtnHistotySetting}
                onClick={() => dispatch(setIsSelectActivityHistoty())}
            >
                {language.back}
            </button>
        </form>
    );
}

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styles from './../styles/selectPackList.module.scss';
import { setIsSelectPackList } from "../redux/slices/navi";
import { settingsViewFormChangeItem } from "../redux/slices/settingsPack";

export default function SelectPackList() {
  const dispatch = useDispatch();
  const packList = useSelector((state: RootState) => state.settingsPack);
  const language = useSelector((state: RootState) => state.settingsLanguage);

  const handlePackListChange = (key: string) => {
    dispatch(settingsViewFormChangeItem(key));
  };

  return (
    <form className={styles.modalFormPackList}>
      {Object.keys(packList)
        .sort((a, b) => b.localeCompare(a))
        .map((key) => (
          <fieldset
            key={key}
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
                id={`range-${key}`}
                onChange={() => handlePackListChange(key)}
                checked={packList[key]}
              />
              <span className={styles.slider}></span>
            </label>
            <legend style={{ marginLeft: "10px", color: "white" }}>{key}</legend>
          </fieldset>
        ))}

      <button
        type="button"
        className={styles.backBtnSelectLanguage}
        onClick={() => dispatch(setIsSelectPackList())}
      >
        {language.back}
      </button>
    </form>
  );
}

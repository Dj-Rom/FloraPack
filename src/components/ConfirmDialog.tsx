import styles from './../styles/confirmDialog.module.scss';

type ConfirmDialogProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmDialog = ({ message, onConfirm, onCancel }: ConfirmDialogProps) => (
    <div className={styles.overlay}>
        <div className={styles.dialog}>
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    </div>
);

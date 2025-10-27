import styles from "../../styles/components/forms/form-layout/form-list-tile/base.module.scss";

interface FormListTileInterface {
    icon: string;
    text: String;
    color?: string;
    onClick?: () => void;
}

const FormListTile: React.FC<FormListTileInterface> = ({
    icon, text, color, onClick }) => {

    const iconStyle = {
        backgroundColor: color || '#CBE3FE',
    };

    return (
        <div className={styles.container} onClick={onClick}>
            <div
                className={styles.icon}
                style={iconStyle}
            >
                <img src={icon} alt="icon" />
            </div>
            <div className={styles.text}>{text}</div>
        </div>
    );
};

export default FormListTile;
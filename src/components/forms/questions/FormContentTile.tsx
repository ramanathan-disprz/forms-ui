import styles from '@/styles/components/forms/form-layout/form-content-tile/base.module.scss';
import FormInputItem from '../../FormInputItem';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

import Clone from "@/assets/form-footer-icons/clone.svg";
import Trash from "@/assets/form-footer-icons/trash.svg";
import { useState } from 'react';

interface FormContentTileProps {
    bodyContent?: React.ReactNode;
    isMovable?: boolean;

    hasDescription?: boolean;
    description?: string;
    onDescriptionChange?: (enabled: boolean) => void;

    required?: boolean;
    onRequiredChange?: (enabled: boolean) => void;

    onClone?: () => void;
    onDelete?: () => void;
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    margin: "2px 12px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#FFFFFF',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#5D38DF',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16,
        height: 16,
        borderRadius: 8,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 10,
        opacity: 1,
        margin: "2px",
        backgroundColor: '#F3F2F3',
        boxSizing: 'border-box',
    },
}));

const FormContentTile: React.FC<FormContentTileProps> = ({
    bodyContent,
    isMovable = false,

    hasDescription = false,
    description = "",
    onDescriptionChange,

    required = false,
    onRequiredChange,

    onClone = () => { },
    onDelete = () => { },
}) => {

    const handleClone = () => {
        onClone?.();
    };

    const handleDelete = () => {
        onDelete?.();
    };

    const [descriptionEnabled, setDescriptionEnabled] = useState(hasDescription);
    const [requiredEnabled, setRequiredEnabled] = useState(required);

    const handleDescriptionChange = (checked: boolean) => {
        setDescriptionEnabled(checked);
        onDescriptionChange?.(checked);
    };

    const handleRequiredChange = (checked: boolean) => {
        setRequiredEnabled(checked);
        onRequiredChange?.(checked);
    };

    const defaultContent = (
        <>
            <FormInputItem
                inputType="text"
                valuePlaceholder="Form Title"
                maxLength={80}
            />
            <FormInputItem
                inputType="text"
                valuePlaceholder="Form Description"
                maxLength={300}
            />
        </>
    );

    return (
        <div className={`${styles.container} ${!isMovable ? styles.noHeader : ''}`}>

            {/* Content Tile Header */}
            {isMovable && (
                <div className={styles.header}>
                    <DragIndicatorIcon className={styles.dragIcon} />
                </div>
            )}

            {/* Content Tile Body */}
            <div className={styles.body}>
                {bodyContent || defaultContent}
            </div>

            {/* Content Tile Footer */}
            {isMovable && (
                <div className={styles.footer}>

                    <div className={styles.operations}>
                        <div className={styles.icon} onClick={handleClone}>
                            <img src={Clone} alt="Clone" />
                        </div>
                        <div className={styles.icon} onClick={handleDelete}>
                            <img src={Trash} alt="Delete" />
                        </div>
                    </div>
                    <div className={styles.options}>

                        <div className={styles.option}>
                            <span className={styles.optionText}>Description</span>
                            <CustomSwitch
                                checked={descriptionEnabled}
                                onChange={(e) => handleDescriptionChange(e.target.checked)}
                                size="small"
                            />
                        </div>

                        <div className={styles.option}>
                            <span className={styles.optionText}>Required</span>
                            <CustomSwitch
                                checked={requiredEnabled}
                                onChange={(e) => handleRequiredChange(e.target.checked)}
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormContentTile; 
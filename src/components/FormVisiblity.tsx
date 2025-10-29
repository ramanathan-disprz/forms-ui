import { Margin } from "@mui/icons-material";
import "../styles/components/form-input/form-visiblity/base.scss";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

interface FormVisiblityProps {
    enabled: boolean,
    onToggle: (enabled: boolean) => void;
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

const FormVisiblity: React.FC<FormVisiblityProps> =
    ({ enabled, onToggle }) => {

        return (
            <div className="form-visiblity">
                <div className="form-visiblity-header">
                    <span className="form-visiblity-text">Form Visibility</span>
                    <CustomSwitch
                        checked={enabled}
                        onChange={(event, checked) => onToggle(checked)}
                        inputProps={{ 'aria-label': 'Form visibility toggle' }}
                    />
                </div>
                <div className="form-visiblity-description">
                    <span>
                        Turn on to allow new workflows to use this form. Turn off to hide it, but existing workflows will keep working.
                    </span>
                </div>
            </div>
        );
    };

export default FormVisiblity;
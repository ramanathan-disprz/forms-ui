import "../styles/components/navigation-bar/base.scss";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NavigationBar: React.FC = () => {
    return (
        <nav className="navigation">
            <div className="nav-logo-container">
                <HomeRoundedIcon className="home-icon" />
                <ArrowForwardIosIcon className="arrow-icon" />
                <span className="form-builder-text">Form Builder</span>
            </div>
        </nav>
    );
}

export default NavigationBar;

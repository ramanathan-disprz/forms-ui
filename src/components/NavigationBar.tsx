import "../styles/components/navigation-bar/base.scss";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
    label: string;
    path: string;
    isClickable: boolean;
}

const NavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const items: BreadcrumbItem[] = [
            { label: 'Home', path: '/', isClickable: true }
        ];

        // Build breadcrumbs dynamically from path segments
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Format the label: replace hyphens with spaces and capitalize
            const label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Last item is not clickable (current page)
            const isClickable = index < pathSegments.length - 1;

            items.push({
                label,
                path: currentPath,
                isClickable
            });
        });

        return items;
    }, [location.pathname]);

    const handleBreadcrumbClick = (path: string, isClickable: boolean) => {
        if (isClickable) {
            navigate(path);
        }
    };

    return (
        <nav className="navigation">
            <div className="nav-breadcrumb-container">
                {breadcrumbs.map((item, index) => (
                    <div key={index} className="breadcrumb-item">
                        {index === 0 ? (
                            <HomeRoundedIcon
                                className={`home-icon ${item.isClickable ? 'clickable' : ''}`}
                                onClick={() => handleBreadcrumbClick(item.path, item.isClickable)}
                            />
                        ) : (
                            <>
                                <ArrowForwardIosIcon className="arrow-icon" />
                                <span
                                    className={`breadcrumb-text ${item.isClickable ? 'clickable' : 'current'}`}
                                    onClick={() => handleBreadcrumbClick(item.path, item.isClickable)}
                                >
                                    {item.label}
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default NavigationBar;

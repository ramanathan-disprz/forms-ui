import styles from '../../styles/components/learner/form-list/base.module.scss';

import InfoIcon from '../../assets/icons/info.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import SearchIcon from '../../assets/icons/search.svg'
import FormViewCard from './FormViewCard';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useForms } from '../../api/forms/useForms';

const FormList: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useForms();
    const hasNoFormsRef = useRef(false);
    hasNoFormsRef.current = !isLoading && (!data || data.length === 0);

    // Filter forms based on search
    const filteredForms = searchTerm
        ? data.filter((form: any) =>
            form.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data;


    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Loading forms...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p>Error loading forms: {error.message}</p>
            </div>
        );

    };

    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.info}>
                    <img src={InfoIcon} alt="Info" className={styles.infoIcon} />
                    <span className={styles.infoText}>
                        These forms are optional and can be submitted multiple times if needed.
                    </span>
                </div>

                <div className={styles.operation}>
                    <div className={styles.search}>
                        <img
                            src={SearchIcon}
                            alt="Search"
                            className={styles.searchIcon}
                        />
                        <input
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div className={styles.filter}>
                        <img
                            src={FilterIcon}
                            alt="Filter"
                            className={styles.filterIcon}
                        />
                        <span className={styles.filterText}>Filter</span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className={styles.content}>
                {filteredForms.map((card: any, index: number) => (
                    <FormViewCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        dueDate={card.publishedDate}
                        formType={'External Form'}
                        buttonText={'Start Requesting'}
                    />
                ))}
            </div>
        </div>
    )
};

export default FormList;
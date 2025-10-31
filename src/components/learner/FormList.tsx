import styles from '../../styles/components/learner/form-list/base.module.scss';

import InfoIcon from '../../assets/icons/info.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import SearchIcon from '../../assets/icons/search.svg'
import FormViewCard from './FormViewCard';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useForms } from '../../api/forms/useForms';
import { FormStatus, FormViewStatus } from '../../features/forms/Form';

const FormList: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useForms();
    const hasNoFormsRef = useRef(false);
    hasNoFormsRef.current = !isLoading && (!data || data.length === 0);

    let filteredForms = data?.filter((form: any) => {
        return form?.formStatus === FormStatus.PUBLISHED && form?.formViewStatus === FormViewStatus.ENABLED
    }) || [];

    filteredForms = searchTerm
        ? filteredForms.filter((form: any) =>
            form.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredForms;

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

    const handleSubmit = (formId: string | number) => {
        console.log('Starting form with ID:', formId);
        navigate(`/forms/submit/${formId}`)
    }

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                        formId={card.id}
                        title={card.title}
                        description={card.description}
                        dueDate={card.publishedDate}
                        formType={'External Form'}
                        onClick={handleSubmit}
                        buttonText={'Start'}
                    />
                ))}
            </div>
        </div>
    )
};

export default FormList;
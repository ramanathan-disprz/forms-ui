import styles from '../../styles/components/learner/form-list/base.module.scss';

import InfoIcon from '../../assets/icons/info.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import SearchIcon from '../../assets/icons/search.svg'
import FormViewCard from './FormViewCard';

const FormList: React.FC = () => {

    let forms = [
        {
            title: 'Professional Certificate Training',
            description: 'Request approval for external professional training development courses and certifications.',
            dueDate: 'Aug 25, 2025',
            formType: 'Training Needs Form',
            buttonText: 'Start Requesting'
        },
    ];

    const count = 6;
    forms = Array(count).fill(forms[0]);

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
                {forms.map((card, index) => (
                    <FormViewCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        dueDate={card.dueDate}
                        formType={card.formType}
                        buttonText={card.buttonText}
                    />
                ))}
            </div>


        </div>
    )
};

export default FormList;
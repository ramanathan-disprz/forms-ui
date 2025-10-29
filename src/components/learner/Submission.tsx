import styles from '../../styles/components/learner/submission/base.module.scss';
import FilterIcon from '../../assets/icons/filter.svg';
import SearchIcon from '../../assets/icons/search.svg';

const Submission: React.FC = () => {

    return (
        <div className={styles.container}>

            {/* Submission Header */}
            <div className={styles.header}>
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

            {/* Submission Body */}
            <div className={styles.content}>
            </div>


        </div>
    );

};

export default Submission;
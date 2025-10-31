import styles from '../../styles/components/learner/submission/base.module.scss';
import FilterIcon from '@/assets/icons/filter.svg';
import SortIcon from '@/assets/icons/sort.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow.svg';
import RightArrowIcon from '@/assets/icons/right-arrow.svg';
import SearchIcon from '../../assets/icons/search.svg';
import { useMemo, useState } from 'react';
import OutlineSolidButton from '../buttons/OutlineSolidButton';
import { useUserSubmissions } from '../../api/submissions/useSubmissions';
import { useGetAllFormsState, useSetFormState } from '../../features/forms/useFormStates';
import { useNavigate } from 'react-router-dom';
import { useForms } from '../../api/forms/useForms';

const Submission: React.FC = () => {

    const userId = 1760086631211;
    const { data: submissions, isLoading, error } = useUserSubmissions(userId);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(Number(e.target.value));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const allForms = useGetAllFormsState();

    const formIdToNameMap = useMemo(() => {
        const map = new Map<string, string>();
        if (allForms && Array.isArray(allForms)) {
            allForms.forEach(form => {
                map.set(form.id || "1", form.title || "Untitled Form");
            });
        }
        return map;
    }, [allForms]);

    const getFormName = (formId: string): string => {
        return formIdToNameMap.get(formId) || `Unknown Form (${formId})`;
    };

    const filteredSubmissions = useMemo(() => {
        if (!submissions) return [];
        if (!searchTerm) return submissions;
        
        return submissions.filter((submission: any) => {
            const formName = getFormName(submission.formId).toLowerCase();
            const submittedDate = formatDate(submission.submittedAt).toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            return formName.includes(searchLower) || 
                   submittedDate.includes(searchLower);
        });
    }, [submissions, searchTerm, formIdToNameMap]);

    const totalItems = filteredSubmissions?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const viewSubmission = (submissionId: string, formId: string) => {

    }

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
                            value={searchTerm}
                            onChange={handleSearchChange}
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
                <table className={styles.list}>
                    {/* Table Headers */}
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.headerContent}>

                                    <span>Form Id</span>
                                    <img
                                        src={SortIcon}
                                        alt="Sort"
                                        className={styles.sortIcon}
                                    />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent}>

                                    <span>Submitted On</span>
                                    <img
                                        src={SortIcon}
                                        alt="Sort"
                                        className={styles.sortIcon}
                                    />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent}>

                                    <span>Response</span>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Data */}
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Error loading submissions</td>
                            </tr>
                        ) : !filteredSubmissions || filteredSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                    {searchTerm ? 'No matching submissions found' : 'No submissions yet'}
                                </td>
                            </tr>
                        ) : (
                            filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((submission: any) => (
                                <tr key={submission.id}>
                                    <td>{getFormName(submission.formId)}</td>
                                    <td>{formatDate(submission.submittedAt)}</td>
                                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                                        <OutlineSolidButton
                                            text="View"
                                            onClick={() => viewSubmission(submission.id, submission.formId)}
                                            disabled={true}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    <div className={styles.pageDetails}>

                        <div className={styles.pageSize}>
                            <span className={styles.pageSizeText}>Items per page</span>
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className={styles.pageSizeDropdown}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>

                        </div>

                        <span className={styles.itemsCount}>{startItem}-{endItem} of {totalItems} items</span>

                    </div>

                    <div className={styles.pageControl}>
                        <div className={styles.pageNumber}>
                            <select
                                value={currentPage}
                                onChange={handlePageChange}
                                className={styles.pageDropdown}
                            >
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <option key={page} value={page}>{page}</option>
                                ))}
                            </select>
                            <span className={styles.pageText}>of {totalPages} pages</span>
                        </div>
                        <button
                            className={`${styles.pageLeft} ${currentPage === 1 ? styles.disabled : ''}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <img src={LeftArrowIcon} alt='left arrow icon' />
                        </button>
                        <button
                            className={`${styles.pageRight} ${currentPage === totalPages ? styles.disabled : ''}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <img src={RightArrowIcon} alt='right arrow icon' />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Submission;

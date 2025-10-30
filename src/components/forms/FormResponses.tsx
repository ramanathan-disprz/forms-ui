import { useMemo, useState } from 'react';
import styles from '../../styles/components/forms/form-responses/base.module.scss';

import SearchIcon from '@/assets/icons/search.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import SortIcon from '@/assets/icons/sort.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow.svg';
import RightArrowIcon from '@/assets/icons/right-arrow.svg';

import Button from '../buttons/PrimaryButton';
import OutlineSolidButton from '../buttons/OutlineSolidButton';
import { useFormSubmissions } from '../../api/submissions/useSubmissions';
import { useSetFormState } from '../../features/forms/useFormStates';
import { useNavigate } from 'react-router-dom';

interface FormResponseProps {
    formId?: string;
    formData?: any;
}

type SortField = 'submittedBy' | 'userId' | 'submittedAt' | 'email';
type SortOrder = 'asc' | 'desc';

const FormResponses: React.FC<FormResponseProps> = ({ formId, formData }) => {
    const [activeTab, setActiveTab] = useState<'summary' | 'individual'>('summary');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('submittedAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const { data: submissions, isLoading, error } = useFormSubmissions(formId || "");

    const setFormState = useSetFormState();
    const navigate = useNavigate();

    const filteredSubmissions = useMemo(() => {
        if (!submissions) return [];

        if (!searchTerm) return submissions;

        const lowerSearchTerm = searchTerm.toLowerCase();
        return submissions.filter((submission: any) => {
            const userId = submission.userId?.toString().toLowerCase() || '';
            const userName = `User ${submission.userId}`.toLowerCase();
            return userId.includes(lowerSearchTerm) || userName.includes(lowerSearchTerm);
        });
    }, [submissions, searchTerm]);

    const sortedSubmissions = useMemo(() => {
        if (!filteredSubmissions) return [];

        const sorted = [...filteredSubmissions].sort((a: any, b: any) => {
            let aValue, bValue;

            switch (sortField) {
                case 'submittedBy':
                    aValue = `User ${a.userId}`;
                    bValue = `User ${b.userId}`;
                    break;
                case 'userId':
                    aValue = a.userId || 0;
                    bValue = b.userId || 0;
                    break;
                case 'submittedAt':
                    aValue = new Date(a.submittedAt).getTime();
                    bValue = new Date(b.submittedAt).getTime();
                    break;
                case 'email':
                    aValue = `user${a.userId}@example.com`;
                    bValue = `user${b.userId}@example.com`;
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return sorted;
    }, [filteredSubmissions, sortField, sortOrder]);

    const paginatedSubmissions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return sortedSubmissions.slice(start, end);
    }, [sortedSubmissions, currentPage, itemsPerPage]);

    // Handle loading state
    if (isLoading) {
        return <div>Loading submissions...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error loading submissions: {error.message}</div>;
    }

    // Handle empty state
    if (!submissions || submissions.length === 0) {
        return <div>No submissions yet for this form.</div>;
    }

    // Mock data - replace with actual data
    const totalItems = submissions?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            // Toggle sort order if clicking the same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new field and default to descending
            setSortField(field);
            setSortOrder('desc');
        }
        setCurrentPage(1); // Reset to first page when sorting
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
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

    const viewSubmission = (submissionId: string) => {
        setFormState(formData);
        navigate(`/forms/view/${submissionId}`);
    }

    return (
        <div className={styles.container}>

            {/* Response Header */}
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <span
                        className={activeTab === 'summary' ? styles.active : ''}
                        onClick={() => setActiveTab('summary')}
                    >
                        Response Summary
                    </span>
                    <span
                        className={activeTab === 'individual' ? styles.active : ''}
                        onClick={() => setActiveTab('individual')}
                    >
                        Individual Response
                    </span>
                </div>
            </div>

            {/* Response Body */}
            <div className={styles.body}>

                <div className={styles.operations}>
                    <div className={styles.search}>
                        <img
                            src={SearchIcon}
                            alt="Search"
                            className={styles.searchIcon}
                        />
                        <input
                            type="text"
                            placeholder="Search by Name/User ID"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className={styles.operation}>
                        <div className={styles.filter}>
                            <img
                                src={FilterIcon}
                                alt="Filter"
                                className={styles.filterIcon}
                            />
                            <span className={styles.filterText}>Filter</span>
                        </div>

                        <Button
                            text='Export to Excel'
                            onClick={() => { }} />

                    </div>

                </div>

                <table className={styles.list}>
                    {/* Table Headers */}
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.headerContent}>

                                    <span>Submitted By</span>
                                    <img
                                        src={SortIcon}
                                        alt="Sort"
                                        className={styles.sortIcon}
                                    />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent}>

                                    <span>User Id</span>
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

                                    <span>Email</span>
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
                        ) : !submissions || submissions.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>No submissions yet</td>
                            </tr>
                        ) : (
                            submissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((submission: any) => (
                                <tr key={submission.id}>
                                    <td>User {submission.userId}</td>
                                    <td>{submission.userId}</td>
                                    <td>{formatDate(submission.submittedAt)}</td>
                                    <td>user{submission.userId}@example.com</td>
                                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                                        <OutlineSolidButton
                                            text="View"
                                            onClick={() => viewSubmission(submission.id)}
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
}

export default FormResponses;
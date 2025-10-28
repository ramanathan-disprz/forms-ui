import { useState } from 'react';
import styles from '../../styles/components/forms/form-responses/base.module.scss';

import SearchIcon from '@/assets/icons/search.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import SortIcon from '@/assets/icons/sort.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow.svg';
import RightArrowIcon from '@/assets/icons/right-arrow.svg';

import Button from '../buttons/PrimaryButton';
import OutlineSolidButton from '../buttons/OutlineSolidButton';

const FormResponses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'summary' | 'individual'>('summary');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data - replace with actual data
    const totalItems = 128;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
                        <tr>
                            <td>Jacob Jones</td>
                            <td>447</td>
                            <td>Mar 28, 2025 at 2:47 PM</td>
                            <td>georgia@example.com</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <OutlineSolidButton
                                    text="View"
                                    onClick={() => { }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Jacob Jones</td>
                            <td>447</td>
                            <td>Mar 28, 2025 at 2:47 PM</td>
                            <td>georgia@example.com</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <OutlineSolidButton
                                    text="View"
                                    onClick={() => { }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Jacob Jones</td>
                            <td>447</td>
                            <td>Mar 28, 2025 at 2:47 PM</td>
                            <td>georgia@example.com</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <OutlineSolidButton
                                    text="View"
                                    onClick={() => { }}
                                />
                            </td>
                        </tr>
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
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import styles from '../styles/pages/learner-form-list/base.module.scss';
import FormList from '../components/learner/FormList';
import Submission from '../components/learner/Submission';

const LearnerFormListView: React.FC = () => {
  const [selectedTab, setSelectedTab] =
    useState<'forms' | 'submissions'>('forms');
  return (
    <div className={styles.container}>
      <NavigationBar />

      {/* Form Header */}
      <div className={styles.header}>
        <span
          className={`${styles.tabText} ${selectedTab === 'forms' ? styles.active : ''}`}
          onClick={() => setSelectedTab('forms')}
        >
          Self-Service Forms
        </span>
        <span
          className={`${styles.tabText} ${selectedTab === 'submissions' ? styles.active : ''}`}
          onClick={() => setSelectedTab('submissions')}
        >
          My Submissions
        </span>
      </div>

      {/* Form Body */}
      {selectedTab === 'forms' ? (
        <FormList />
      ) :
        (<Submission />)
      }
    </div>
  )
};


export default LearnerFormListView;

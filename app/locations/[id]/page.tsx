import LeaveReviewSection from '@/components/LeaveReviewSection/LeaveReviewSection';
import styles from './LocationDetailsPage.module.css';

interface LocationDetailsPageProps {
  params: Promise<{ id: string }>;
}

const LocationDetailsPage = async ({ params }: LocationDetailsPageProps) => {
  const { id } = await params;

  return (
    <main className={styles.main}>
      <div className="container">
        <h1>Location Details page</h1>
        <LeaveReviewSection id={id} feedbacks={[]} />
      </div>
    </main>
  );
};

export default LocationDetailsPage;

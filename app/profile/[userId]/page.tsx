import { ProfilePageClient } from '@/components/Profile/ProfilePageClient';
import styles from './ProfileByIdPage.module.css';

type ProfileByIdPageProps = {
  params: Promise<{ userId: string }>;
};

const ProfileByIdPage = async ({ params }: ProfileByIdPageProps) => {
  const { userId } = await params;
  return (
    <main className={styles.main}>
      <ProfilePageClient userId={userId} />
    </main>
  );
};

export default ProfileByIdPage;
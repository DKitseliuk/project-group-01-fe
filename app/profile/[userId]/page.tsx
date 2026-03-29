import { ProfilePageClient } from '@/components/Profile/ProfilePageClient';
import styles from './ProfilePage.module.css';

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;
  return (
    <main className={styles.main}>
      <ProfilePageClient userId={userId} />
    </main>
  );
};

export default ProfilePage;
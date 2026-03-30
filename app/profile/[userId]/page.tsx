import styles from './ProfileByIdPage.module.css';

type ProfileByIdPageProps = {
  params: { userId: string };
};

const ProfileByIdPage = ({ params }: ProfileByIdPageProps) => {
  return (
    <main className={styles.main}>
      <h1>Profile: {params.userId}</h1>
    </main>
  );
};

export default ProfileByIdPage;


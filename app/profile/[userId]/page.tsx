type ProfileByIdPageProps = {
  params: { userId: string };
};

const ProfileByIdPage = ({ params }: ProfileByIdPageProps) => {
  const { userId } = params;

  return (
    <main>
      <h1>Профіль користувача: {userId}</h1>
    </main>
  );
};

export default ProfileByIdPage;

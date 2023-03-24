import type { GetServerSideProps, NextPage } from "next";
import UserProfile from "~/components/profile/UserProfile";
import UserProfileNotFound from "~/components/profile/UserProfileNotFound";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";
import { userIdInputSchema } from "~/validations/userInputs";

interface ProfileProps {
  id: string;
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  const params = await userIdInputSchema.parseAsync(context.params);
  return {
    props: { id: params.id },
  };
};

const Profile: NextPage<ProfileProps> = ({ id }) => {
  const { data: getUserQuery } = api.userRouter.getUserById.useQuery({ id });

  if (!getUserQuery) {
    return (
      <div className="fixed top-0 flex h-screen w-full items-center justify-center">
        <Spinner size="x3l" />
      </div>
    );
  }

  if (!getUserQuery.user) {
    return <UserProfileNotFound />;
  }
  return (
    <>
      <UserProfile user={getUserQuery.user} />
    </>
  );
};

export default Profile;

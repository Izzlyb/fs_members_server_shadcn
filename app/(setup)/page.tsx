import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members:{
        some: {
          profileId: profile.id
        }
      }
    }
  });

  console.log(server);

  if( server ) {
    console.log( "Server found");
    return redirect(`/server/${server.id}`);
  }

  return (
    <div>
      Create a Server = server has been created and databases have been created.
      <br />
      <InitialModal />
    </div>
  );
};

export default SetupPage;

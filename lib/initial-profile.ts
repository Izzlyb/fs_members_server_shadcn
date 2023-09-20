import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if( !user ) {
    console.log('NO user found');
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
       userId: user.id
    }
  });

  if (profile ) {
    console.log(`AN EXISTING PROFILE IS:`);
    console.log(profile);
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  console.log("there is a NEW PROFILE:");
  console.log(newProfile);
  return newProfile;

};


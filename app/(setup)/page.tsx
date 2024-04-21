
// root file


import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitailModal } from "@/components/modals/initial-modal";


interface UserProfile {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
const SetupPage = async () => {

    const profile = await initialProfile() as UserProfile;

    console.log(profile)

    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id               }
            }
        }
    });



    if(server)
    return redirect(`/server/${server.id}`)
    

    return (<div>
        <InitailModal />
    </div>);
}
 
export default SetupPage;
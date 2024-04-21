
// root file


import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitailModal } from "@/components/modals/initial-modal";



const SetupPage = async () => {

    const profile:any = await initialProfile() 

    const id:any = profile.id;

    const server = await db.server.findFirst({
        where:{
            members:{   
                some:{
                    profileId:id}
            }
        }
    });

    console.log(profile.id)


    if(server)
    return redirect(`/server/${server.id}`)
    

    return (<div>
        <InitailModal />
    </div>);
}
 
export default SetupPage;
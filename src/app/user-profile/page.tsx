
import GetUserDetails from "@/components/GetUserDetails";

export default function UserProfile() {

  return (
    <div className="flex flex-col items-center">
    <h1>Profile page</h1>
    <GetUserDetails />
    {/* </userInfoLayout.Provider> */}
    </div>
  )
}
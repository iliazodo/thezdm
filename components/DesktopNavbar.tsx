import { currentUser } from "@clerk/nextjs/server"

const DesktopNavbar = async () => {

  const user = await currentUser();

  return (
    <div>
      
    </div>
  )
}

export default DesktopNavbar
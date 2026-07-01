"use client"
import { logoutAction } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"
import Btn1 from "../ui/Btn1"
export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await logoutAction()
    if (res.success) router.push("/auth/signin")
  }

  return <Btn1 onClick={handleLogout} title={"logout"} size="text-xs font-semibold leading-4 p-xs" />
}
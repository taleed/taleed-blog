import { useEffect } from "react"
import { supabase } from "@/utils/supabaseClient";

export default function LocationProvider({children}: any) {
  useEffect(() => {
    if (canRequestLocation()) {
      new Promise( async () => {
        let location: {ip: string, country: string, last_update: number} | undefined = JSON.parse(localStorage.getItem("location") ?? "{}")
        await fetch('https://geolocation-db.com/json/').then((response: any) => response.json())
        .then(async (data) => {
          location = {
            ip: data.IPv4,
            country: data.country_name,
            last_update: Date.now()
          }

          if (location) {
            await addVisitor(location)
          }

          localStorage.setItem("location", JSON.stringify(location))
       })
      })
    }
  }, [])

  const addVisitor = async (location: any) => {
    let {data} = await supabase.auth.getUser()
    await supabase.from("visitors").insert({
      ip: location.ip,
      country: location.country,
      email: data.user?.email
    })
  }

  const canRequestLocation = () => {
    const location =  JSON.parse(localStorage.getItem("location") ?? "{}")
    const last_update = location.last_update || undefined
    return last_update ? last_update - Date.now() >= (24*60*60) : true
  }
  return (
    <>
      {children}
    </>
  )
}
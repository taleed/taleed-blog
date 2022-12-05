import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { createServerSupabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Server } from 'Socket.IO'

const handler =  async (req: any, res:any) => {

  if (res?.socket?.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    const supabase = createServerSupabaseClient({ req, res });

    const profile = await getCurrentUser(supabase)
    const id = profile?.id

    io.on('connection', async (socket:any) => {
      emitData(socket, id)
      socket.on('subscribe', async () => {
        supabaseAdmin.channel('*')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notification', filter: 'to=eq.'+id },
         async () => {
          emitData(socket, id)
        })
        .subscribe()
      })
    })


  }
  res.end()
}

const getCurrentUser  = async (supabase: SupabaseClient<any, "public", any>) => {
  const { data:user } = await supabase.auth.getUser()
  const { data:profile } = await supabaseAdmin.from('profiles').select("id").eq("id", user.user?.id)
  const _profile = profile?.[0]
  return _profile
}

const emitData = async (socket: any, id: string) => {
    const { count } = await supabaseAdmin.from("notification")
                                        .select("id", { count: "exact" })
                                        .order("created_at", { ascending: true })
                                        .eq('to', id)
                                        .eq('read', false)
    socket.emit("notify", count)
}

export default handler
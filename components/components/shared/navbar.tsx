"use client"
import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { removeToken } from '@/services/get-token'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PayoutHistoryModal } from '../modals/payout-history-modal'

const Navbar = () => {
const [showPayout, setShowPayout] = useState(false)
const router = useRouter()
const handleLogout = () => {
  removeToken()
  toast.success('Logout successful')
  router.replace('/login')
}
  return (
   <nav className='flex  p-4 border-b-[2px] border-[#EEEBFC]'>
   <section className='flex justify-center sm:justify-between dashboard-container '>
   <div className='flex gap-3 items-center'>
        <Icons.logo />
        <p className='tex-[16px] md:text-[26px] font-semibold'>Partner Dashboard</p>
    </div>
    <div className='hidden sm:flex items-center  gap-3 '>
        <button className='cursor-pointer' onClick={() => setShowPayout(true)}>Payout history</button>
        <Button
        onClick={handleLogout}
        className='bg-white border-black border text-[#000000]'>
<Icons.logout />
            <span>Logout</span>
        </Button>
    </div>
   </section>
   <PayoutHistoryModal
   isOpen={showPayout}
   setIsOpen={setShowPayout}
   />
   </nav>
  )
}

export default Navbar
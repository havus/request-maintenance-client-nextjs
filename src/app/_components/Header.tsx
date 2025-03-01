'use client'

import { RxArrowLeft, RxDotsHorizontal } from "react-icons/rx";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-[375px] p-4 flex items-center justify-between">
      <button onClick={handleBack} className="invisible hover:pointer-cursor">
        <RxArrowLeft className="w-[24px] h-[24px]" />
      </button>

      <h1 className="font-bold text-[20px] tracking-[-0.25px] text-start">
        Maintenance Request
      </h1>

      <RxDotsHorizontal className="w-[24px] h-[24px] invisible" />
    </div>
  )
}

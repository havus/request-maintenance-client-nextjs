'use client'

import { useEffect, useState } from "react";
import { RxArrowLeft, RxDotsHorizontal } from "react-icons/rx";
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [showBack, setShowBack] = useState(false);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const whitelistedPaths = ['/requests/create', '/requests/edit'];
    setShowBack(whitelistedPaths.includes(pathname));
  }, [pathname])

  return (
    <div className="w-[375px] p-4 flex items-center justify-between">
      <button onClick={handleBack} className={"hover:pointer-cursor" + (!showBack && ' invisible')}>
        <RxArrowLeft className="w-[24px] h-[24px]" />
      </button>

      <h1 className="font-bold text-[20px] tracking-[-0.25px] text-start">
        Maintenance Request
      </h1>

      <RxDotsHorizontal className="w-[24px] h-[24px] invisible" />
    </div>
  )
}

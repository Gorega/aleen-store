'use client';

import { useContext, useEffect } from 'react';
import NProgress from 'nprogress';
import { ContextApi } from './GlobalContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NProgressProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {setModal} = useContext(ContextApi);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => {
      NProgress.done()
      setModal({status:false,type:null})
    };

    handleStart(); // Start progress bar on route change
    handleStop();  // Stop progress bar after rendering

    return () => {
      handleStop();
    };
  }, [pathname,searchParams]);

  return null; // This component doesn't render anything
};

export default NProgressProvider;

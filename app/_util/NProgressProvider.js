'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useContext, useEffect, useState } from 'react';
import { ContextApi } from './GlobalContext';
import { usePathname } from 'next/navigation';

const NProgressProvider = ({ children }) => {
  const pathName = usePathname();
  const [currentPath,setCurrentPath] = useState("");
  const {setModal} = useContext(ContextApi);

  useEffect(()=>{
    if(currentPath !== pathName){
      setCurrentPath(pathName)
      setModal({type:null,status:false})
      document.body.style.overflow = "auto"
    }
  },[pathName])

  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#57CDBF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressProvider;
import { redirect } from 'next/navigation';
import EditorProvider from "@/providers/EditorProvider";
import AnimationLib from '@/model/AnimationLib';
import { data } from '@/data/animationData';
import React from 'react';

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: {
    id: string
  }
}>) {
  const lib = React.useMemo(() => {
    const id = params.id;
    if (id === 'custom') {
      return 0;
    } else {
      const idValue = parseInt(id);
  
      if (Number.isNaN(idValue) || idValue == -1) {
        redirect('/editor/custom');
      }
  
      return idValue - 1;
    }
  }, [params]);

  return (
    <EditorProvider animationLib={lib}>
      {children}
    </EditorProvider>
  );
}

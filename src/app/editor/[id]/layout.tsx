import { redirect } from 'next/navigation';
import EditorProvider from "@/providers/EditorProvider";
import AnimationLib, { buildFromDefaultLib } from '@/model/AnimationLib';
import data from '@/data/animationData';
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
  const lib: AnimationLib = React.useMemo(() => {
    const id = params.id;
    if (id === 'custom') {
      return buildFromDefaultLib();
    } else {
      const idValue = parseInt(id);
  
      if (Number.isNaN(idValue) || idValue == -1) {
        redirect('/editor/custom');
      }
  
      return buildFromDefaultLib(data[idValue - 1]);
    }
  }, [params]);

  return (
    <EditorProvider animationLib={lib}>
      {children}
    </EditorProvider>
  );
}
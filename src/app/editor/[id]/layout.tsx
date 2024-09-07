import { redirect } from 'next/navigation';
import EditorProvider from '@/providers/EditorProvider';
import AnimationLib, { buildFromDefaultLib } from '@/model/AnimationLib';
import data from '@/data/animationData';
import React from 'react';

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  const lib: AnimationLib = React.useMemo(() => {
    const id = params.id;

    if (id === 'custom') {
      let lib = buildFromDefaultLib();
      return lib;
    }

    let idValue = -1;
    if (id.indexOf('v') > -1) {
      let ids = id.split('v');
      idValue = parseInt(ids[0]);
    } else {
      idValue = parseInt(id);
    }

    if (Number.isNaN(idValue) || idValue == -1) {
      redirect('/editor/custom');
    }

    let libById = data.find((e) => e.id === idValue);
    return buildFromDefaultLib(libById);
  }, [params]);

  const variant: number = React.useMemo(() => {
    const id = params.id;

    if (id.indexOf('v') > -1) {
      let ids = id.split('v');
      const variantValue = parseInt(ids[1]);

      if (!Number.isNaN(variantValue)) {
        return variantValue;
      }
    }

    return -1;
  }, [params]);

  return (
    <EditorProvider animationLib={lib} variant={variant}>
      {children}
    </EditorProvider>
  );
}

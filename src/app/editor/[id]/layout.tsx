import { redirect } from 'next/navigation';
import EditorProvider from '@/providers/EditorProvider';
import AnimationLib, { buildFromDefaultLib } from '@/model/AnimationLib';
import data from '@/data/animationData';
import React from 'react';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = await params;

  const lib: AnimationLib = React.useMemo(() => {
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
  }, [id]);

  const variant: number = React.useMemo(() => {
    if (id.indexOf('v') > -1) {
      let ids = id.split('v');
      const variantValue = parseInt(ids[1]);

      if (!Number.isNaN(variantValue)) {
        return variantValue;
      }
    }

    return -1;
  }, [id]);

  return (
    <EditorProvider animationLib={lib} variant={variant}>
      {children}
    </EditorProvider>
  );
}

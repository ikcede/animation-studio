import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import EditorProvider from '@/providers/EditorProvider';
import AnimationLib, { buildFromDefaultLib } from '@/model/AnimationLib';
import data from '@/data/animationData';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = await params;

  const getLib = (): AnimationLib => {
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
  };

  const getVariant = (): number => {
    if (id.indexOf('v') > -1) {
      let ids = id.split('v');
      const variantValue = parseInt(ids[1]);

      if (!Number.isNaN(variantValue)) {
        return variantValue;
      }
    }

    return -1;
  };

  return (
    <EditorProvider animationLib={getLib()} variant={getVariant()}>
      {children}
    </EditorProvider>
  );
}

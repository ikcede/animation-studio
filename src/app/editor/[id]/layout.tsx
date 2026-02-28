import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import EditorProvider from '@/providers/EditorProvider';
import AnimationDto, { buildFromDefaultLib } from '@/model/AnimationDto';
import data from '@/data/animationData';
import { EditorContextProvider } from '@/context/EditorContext/EditorContext';
import { TimelineContextProvider } from '@/context/TimelineContext/TimelineContext';

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

  const getLib = (): AnimationDto | undefined => {
    if (id === 'custom') {
      return undefined;
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
    <EditorContextProvider>
      <TimelineContextProvider>
        <EditorProvider animationLib={getLib()} variant={getVariant()}>
          {children}
        </EditorProvider>
      </TimelineContextProvider>
    </EditorContextProvider>
  );
}

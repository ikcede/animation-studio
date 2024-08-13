'use client'

import EditorProvider from "@/providers/EditorProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EditorProvider>
      {children}
    </EditorProvider>
  );
}

import EditorProvider from "@/providers/EditorProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='animation-editor'>
      <EditorProvider>
        {children}
      </EditorProvider>
    </div>
  );
}

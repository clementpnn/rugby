// eslint-disable-next-line check-file/folder-naming-convention
export const metadata = {
  title: 'Rugby Admin',
  description: 'End of school year project'
}

export default function AdminMatchIdLayout( { children }: { children: React.ReactNode } ) {
  return (
    <div>
      {children}
    </div>
  )
}
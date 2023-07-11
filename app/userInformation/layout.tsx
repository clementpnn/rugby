export const metadata = {
  title: 'Rugby User',
  description: 'End of school year project'
}

export default function UserInformationLayout( { children }: { children: React.ReactNode } ) {
  return (
    <div>
      {children}
    </div>
  )
}

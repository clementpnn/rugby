export const metadata = {
  title: 'Rugby Admin',
  description: 'End of school year project'
}

export default function AdminCreateLayout( { children }: { children: React.ReactNode } ) {
  return (
    <div>
      {children}
    </div>
  )
}
export const metadata = {
  title: 'SandBox',
  description: 'SandBox'
}

export default function SandBoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
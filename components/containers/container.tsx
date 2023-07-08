interface ContainerProperties {
    children: React.ReactNode
}

const Container: React.FC<ContainerProperties> = ( { children } ) => {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
}

export default Container
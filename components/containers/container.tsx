interface ContainerProperties {
    children: React.ReactNode
}

const Container: React.FC<ContainerProperties> = ( { children } ) => {
  return <div className='px-5 sm:px-10 lg:px-20'>{children}</div>
}

export default Container
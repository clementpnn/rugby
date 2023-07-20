import Button from '@/components/buttons/button'

const StatusButton = async () => {
  return (
    <>
      <div className="flex flex-row justify-end ml-auto">
        <Button className="bg-red-600 hover:bg-blue5 mr-4" size='md' onClick={() => {
          /*          setIsPoulePhase( true )
          setValue( 'phase', pouleOptions[0].value )*/
        } }>refused</Button>
        <Button className="bg-yellow-600 hover:bg-blue5 mr-4" size='md' onClick={() => {
          /*          setIsPoulePhase( true )
          setValue( 'phase', pouleOptions[0].value )*/
        } }>wait</Button>
        <Button className="bg-green-600 hover:bg-blue5 " size='md' onClick={() => {
          /*          setIsPoulePhase( true )
          setValue( 'phase', pouleOptions[0].value )*/
        } }>validate</Button>
      </div>
    </>
  )
}

export default StatusButton
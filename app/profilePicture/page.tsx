import PictureForm from "@/components/forms/pictureForm"

interface IParameters {
  resetId: string
}

const page = async ( { params }: {params: IParameters} ) => {
    return (
        <PictureForm />
      )
    }
    
    export default page 
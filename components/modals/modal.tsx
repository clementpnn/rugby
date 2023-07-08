// 'use client'

// import { useCallback, useEffect, useState } from 'react'

// import Button from '../buttons/button'
// ! problème partout doit être résolu
// interface ModalProperties {
//   isOpen?: boolean
//   onClose: () => void
//   onSubmit: () => void
//   title?: string
//   body?: React.ReactElement
//   footer?: React.ReactElement
//   actionLabel: string
//   disabled?: boolean
//   secondaryAction?: () => void
//   secondaryActionLabel?: string
// }

// const Modal: React.FC<ModalProperties> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled, secondaryAction, secondaryActionLabel }) => {
//   const [showModal, setShowModal] = useState(isOpen)

//   useEffect(() => {
//     setShowModal(isOpen)
//   }, [isOpen])

//   const handleClose = useCallback(() => {
//     if (disabled) {
//       return
//     }

//     setShowModal(false)
//     setTimeout(() => {
//       onClose()
//     }, 300)
//   }, [onClose, disabled])

//   const handleSubmit = useCallback(() => {
//     if (disabled) {
//       return
//     }

//     onSubmit()
//   }, [onSubmit, disabled])

//   const handleSecondaryAction = useCallback(() => {
//     if (disabled || !secondaryAction) {
//       return
//     }

//     secondaryAction()
//   }, [secondaryAction, disabled])

//   if (!isOpen) {
//     return
//   }

//   return (
//     <>
//       <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
//         <div className='relative w-fullmd:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
//           {/*content*/}
//           <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
//             <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
//               {/*header*/}
//               <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
//                 <button className='p-1 border-0 hover:opacity-70 transition absolute left-9' onClick={handleClose}>
//                   X
//                 </button>
//                 <div className='text-lg font-semibold'>
//                   {title}
//                 </div>
//               </div>
//               {/*body*/}
//               <div className='relative p-6 flex-auto'>
//                 {body}
//               </div>
//               {/* footer
//               <div className='flex flex-col gap-2 p-6'>
//                 <div
//                   className='flex flex-row items-center gap-4 w-full'>
//                   {secondaryAction && secondaryActionLabel && <Button disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} outline />}
//                   <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
//                 </div>
//                 {footer}
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// ! problème partout doit être résolu
// export default Modal
// eslint-disable-next-line unicorn/no-empty-file

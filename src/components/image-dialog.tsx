
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"


const ImageDialog = ({ children, el }: { children: React.ReactNode, el: string }) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="p-5 max-w-[90vw]">
                <div className="relative w-full h-[90vh]"> {/**/}
                    <Image
                        src={el}
                        alt="Failed to Load..."
                        layout='fill'
                        fill
                        sizes="90vw"
                        objectFit="contain"
                        className="rounded-md"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UserMinus from "@/resources/Icons/UserMinus";
import { Cross1Icon } from "@radix-ui/react-icons";

const FriendCard = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="ring-red-600 ring-2 hover:bg-red-600 hover:text-white" variant='ghost' size='icon'>
                    <UserMinus className="" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-mono max-h-[95vw]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to remove this person from friends?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {'NAME'} from your friend list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <Cross1Icon className="mr-2" />
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-600 hover:text-white">
                        <UserMinus className="mr-2" />
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FriendCard
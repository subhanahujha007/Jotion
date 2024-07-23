"use client"

import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import { useCoverimageStore } from "../../../../../hooks/use-cover-image"
import { DialogHeader } from "@/components/ui/dialog"

export const Coverimagemode=()=>{
    const coverimage=useCoverimageStore()

    return(
        <Dialog open={coverimage.isopen} onOpenChange={coverimage.onclose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="test-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <div>
                    TODO:UPLOAD IMAGE
                </div>
            </DialogContent>

        </Dialog>
    );
};
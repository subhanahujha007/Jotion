"use client";

import { Doc } from "../../../../convex/_generated/dataModel";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { useorigin } from "../../../../hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialdata: Doc<"Documents">;
    preview?: boolean;
}

export const Publish = ({ initialdata, preview }: PublishProps) => {
    const origin = useorigin();
    const update = useMutation(api.Documents.update);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialdata._id}`;

    const onPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialdata._id,
            isPublished: true
        }).finally(() => setIsSubmitting(false));
        toast.promise(promise, {
            loading: "Publishing ...",
            success: "Published successfully",
            error: "Failed to publish"
        });
    };

    const unPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialdata._id,
            isPublished: false
        }).finally(() => setIsSubmitting(false));
        toast.promise(promise, {
            loading: "UnPublishing ...",
            success: "UnPublished successfully",
            error: "Failed to Unpublish"
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    if (preview) {
        return null;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    Publish
                    {initialdata.isPublished && <Globe className="text-sky-500 w-4 h-4 ml-2" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-99999999999999 w-72" align="end" alignOffset={8} forceMount>
                {initialdata.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-sky-500">This note is live on web</p>
                        </div>
                        <div className="flex items-center">
                            <input className="truncated" value={url} disabled />
                            <Button onClick={onCopy} disabled={copied} className="h-8 rounded-sm">
                                {copied ? (
                                    <CheckCircle className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            onClick={unPublish}
                            disabled={isSubmitting}
                        >
                            UnPublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="text-white w-4 h-4 text-muted mb-3" />
                        <p className="text-sm font-medium mb-2">Publish this note</p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

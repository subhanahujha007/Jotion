'use client';

import React, { useRef, useState } from 'react';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { Button } from '@/components/ui/button';
import { api } from '../../../../convex/_generated/api';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface TitleProps {
  initialdata: Doc<"Documents">;
}

const Title = ({ initialdata }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialdata.title || "Untitled");
  const update = useMutation(api.Documents.update);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setTitle(initialdata.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialdata._id,
      title: event.target.value || "Untitled",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableEditing();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialdata.icon && <p>{initialdata.icon}</p>}
      {isEditing  ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={enableEditing}
          onBlur={disableEditing}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={title}
        />
      ) : (
        <Button
        variant="ghost"
          onClick={enableEditing}
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialdata.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;
Title.Skeelton=function TitleSkeleton(){
    return(
        <Skeleton className="rounded-md h-9 w-16" />
    )
}
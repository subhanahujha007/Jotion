"use client";
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useSearch } from '../../../../hooks/use-search';
import { File } from 'lucide-react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';

const SearchCommands = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.Documents.getsearch);
  const [isMounted, setMounted] = useState(false);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isopen);
  const close = useSearch((store) => store.onclose);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) return null;

  const onSelect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
    close();
  };

  return (
    <CommandDialog  open={isOpen} onOpenChange={close}>
      <CommandInput  placeholder={`Search ${user?.fullName}'s Jotion...`} />
      <CommandList >
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup  heading="Documents">
          {documents?.map((item) => (
            <CommandItem
              key={item._id}
              value={`${item._id}-${item.title}`}
              onSelect={() => onSelect(item._id)}
            >
              {item.title ? (
                <p className="mr-2 text-[18px]">{item.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommands;

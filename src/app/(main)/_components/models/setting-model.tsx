"use client";
import React, { useEffect, useState } from 'react';
import { Label } from '../../../../components/ui/label';
import { ModeToggle } from '@/components/ui/mode-change';
import { Usersetting } from '../../../../../hooks/use-settings';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
export const Settingcomponent=()=>{
    const settings=Usersetting()
    return(
        <Dialog open={settings.onopen} onOpenChange={settings.isopen}>
            <DialogContent>
                <DialogHeader className="border-b p-3">
<h2 className="text-lg font-medium"> My Settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
<div className="flex flex-col gap-y-1">
<Label>
    Appearance
</Label>
<span>
    customize how jotion look
</span>
</div>
<ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
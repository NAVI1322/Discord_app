"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
}
from "@/components/ui/tooltip"



interface ActionToolTipProps {
    label: string,
    children : React.ReactNode,
    side?:"top" | "right" | "left" |"bottom",
    align?: "start" | "center" | "end"
}

export const ActionToolTip  = (
{
    label,
    children,
    side,
    align

}:ActionToolTipProps) => {
    return ( 
    <TooltipProvider >
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {/* // this get automatically passed by react */}
                {children}  
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">
                        {label.toLowerCase()}
                    </p>
            </TooltipContent>
        </Tooltip>

    </TooltipProvider>  );
}
 

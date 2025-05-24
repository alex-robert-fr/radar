"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-1 items-center justify-center bg-[#23242b] opacity-40 hover:opacity-80 transition-opacity duration-200 cursor-col-resize data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex justify-center items-center bg-[#282a32] opacity-0 group-focus:opacity-100 group-hover:opacity-100 border border-[#23242b] rounded-sm w-3 h-4 transition-opacity duration-200">
        <GripVertical className="w-2.5 h-2.5 text-[#444]" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

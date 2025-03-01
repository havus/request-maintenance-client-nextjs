"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { RxCheck, RxChevronDown, RxChevronUp } from "react-icons/rx";

// import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  const triggerClassNames = [
    'w-full hover:cursor-pointer flex items-center justify-between rounded-[12px] px-[16px] py-[14px] text-[13px]',
    'bg-white text-[#404040]',
    'drop-shadow-[0_0_32px_rgba(110,113,145,0.12)]',
    className,
  ].join(' ');

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={triggerClassNames}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <RxChevronDown className="w-[24px] h-[24px] text-[#A1AFC3]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const contentClassNames = [
    'overflow-hidden bg-white rounded-[12px]',
    'shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)]',
    className,
  ].join(' ');

  const viewportClasses = [
    'p-[5px]',
    position === "popper" &&
      "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
  ].join(' ');

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={contentClassNames}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={viewportClasses}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const labelClassNames = [
    'px-[25px] text-[13px] font-bold leading-[25px]',
    className,
  ].join(' ');

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={labelClassNames}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const itemClassNames = [
    'text-[13px] leading-[1] rounded-[3px] flex items-center py-[10px] pl-[25px] pr-[35px]',
    'relative select-none hover:bg-slate-100 hover:border-0 hover:cursor-pointer',
    className,
  ].join(' ');

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={itemClassNames}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <RxCheck />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const separatorClassNames = [
    'h-[1px] m-[5px]',
    className,
  ].join(' ');

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={separatorClassNames}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  const selectScrollButtonClasses = [
    'flex items-center justify-center h-[25px] bg-white cursor-default',
    className,
  ].join(' ');
  
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={selectScrollButtonClasses}
      {...props}
    >
      <RxChevronUp />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  const selectScrollButtonClasses = [
    'flex items-center justify-center h-[25px] bg-white cursor-default',
    className,
  ].join(' ');
  
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={selectScrollButtonClasses}
      {...props}
    >
      <RxChevronDown />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

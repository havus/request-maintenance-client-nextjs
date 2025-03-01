import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const labelClassNames = [
    'text-[14px] text-[#A1AFC3] leading-[14px] mb-[8px]',
    className,
  ].join(' ');

  return <LabelPrimitive.Root data-slot="select" className={labelClassNames} {...props} />
};

export { Label }

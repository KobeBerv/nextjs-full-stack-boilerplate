'use client';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      className,
      loading = false,
      children,
      disabled,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-1 h-5 w-5 animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  }
);
LoadingButton.displayName = 'LoadingButton';

export { LoadingButton };

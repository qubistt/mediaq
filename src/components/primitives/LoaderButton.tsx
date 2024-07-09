'use client';

import Spinner, { SpinnerColor } from '@/components/Spinner';
import { clsx } from 'clsx/lite';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export default function LoaderButton(props: {
  isLoading?: boolean
  icon?: ReactNode
  spinnerColor?: SpinnerColor
  styleAs?: 'button' | 'link' | 'link-without-hover'
  hideTextOnMobile?: boolean
  shouldPreventDefault?: boolean
  primary?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    children,
    isLoading,
    icon,
    spinnerColor,
    styleAs = 'button',
    hideTextOnMobile = true,
    shouldPreventDefault,
    primary,
    type = 'button',
    onClick,
    disabled,
    className,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      onClick={e => {
        if (shouldPreventDefault) { e.preventDefault(); }
        onClick?.(e);
      }}
      className={clsx(
        ...(styleAs !== 'button'
          ? [
            'link h-4 active:text-medium',
            'disabled:!bg-transparent',
          ]
          : ['h-9']
        ),
        styleAs === 'link' && 'hover:text-dim',
        styleAs === 'link-without-hover' && 'hover:text-main',
        'inline-flex items-center gap-2 self-start whitespace-nowrap',
        primary && 'primary',
        className,
      )}
      disabled={isLoading || disabled}
    >
      {(icon || isLoading) &&
        <span className={clsx(
          'min-w-[1.25rem] h-4',
          styleAs === 'button' ? 'translate-y-[-0.5px]' : 'translate-y-[0.5px]',
          'inline-flex justify-center shrink-0',
        )}>
          {isLoading
            ? <Spinner
              size={14}
              color={spinnerColor}
              className={styleAs === 'button'
                ? 'translate-y-[2px]'
                : 'translate-y-[0.5px]'}
            />
            : icon}
        </span>}
      {children && <span className={clsx(
        styleAs !== 'button' && isLoading && 'text-dim',
        hideTextOnMobile && icon !== undefined && 'hidden sm:inline-block',
      )}>
        {children}
      </span>}
    </button>
  );
}

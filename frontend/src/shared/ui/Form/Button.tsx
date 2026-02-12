import { ReactNode } from 'react'

interface ButtonProps {
  size: 'sm' | 'base'
  type: 'button' | 'submit'
  disabled: boolean
  onClick?: () => void
  children: ReactNode
}

export const Button = ({
  size,
  type,
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${size === 'sm' ? 'px-2' : size === 'base' ? 'p-3' : ''} border border-black cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

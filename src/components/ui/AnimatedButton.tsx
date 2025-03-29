
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  icon,
  iconPosition = 'left',
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 ease-in-out rounded-md inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-cafe-brown text-white hover:bg-cafe-darkBrown focus:ring-2 focus:ring-cafe-brown focus:ring-opacity-50",
    secondary: "bg-cafe-cream text-cafe-charcoal hover:bg-secondary focus:ring-2 focus:ring-cafe-cream focus:ring-opacity-50",
    outline: "bg-transparent border border-cafe-brown text-cafe-brown hover:bg-cafe-brown hover:text-white focus:ring-2 focus:ring-cafe-brown focus:ring-opacity-50",
    ghost: "bg-transparent text-cafe-charcoal hover:bg-muted focus:ring-2 focus:ring-cafe-brown focus:ring-opacity-25",
  };
  
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        "group",
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
      
      <div className="absolute inset-0 w-0 bg-black bg-opacity-10 transition-all duration-300 ease-out group-hover:w-full"></div>
    </button>
  );
};

export default AnimatedButton;

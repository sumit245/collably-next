// components/ui/button.js
export function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all";
    const sizeStyles = size === "icon" ? "p-2" : "px-4 py-2";
    const variantStyles = variant === "ghost" ? "bg-transparent border-none" : "bg-blue-600 text-white hover:bg-blue-700";
    return (
      <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  
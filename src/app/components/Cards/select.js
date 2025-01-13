// components/ui/select.js
export function Select({ children, defaultValue, className }) {
    return <select defaultValue={defaultValue} className={className}>{children}</select>;
  }
  
  export function SelectTrigger({ children, className }) {
    return <div className={`cursor-pointer ${className}`}>{children}</div>;
  }
  
  export function SelectContent({ children, className }) {
    return <div className={`absolute bg-white border p-2 rounded-md ${className}`}>{children}</div>;
  }
  
  export function SelectItem({ children, value, className }) {
    return <option value={value} className={className}>{children}</option>;
  }
  
  export function SelectValue({ children, className }) {
    return <span className={className}>{children}</span>;
  }
  
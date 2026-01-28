const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  onClick,
  disabled = false 
}) => {
  const baseStyles = 'py-3 px-6 rounded-3xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary disabled:bg-primary/50',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80 focus:ring-secondary disabled:bg-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:opacity-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};

export default Button;

interface ButtonProps {
  title: string;
  style: 'dark' | 'accent';
  onClick: () => void;
  className?: string;
}

const Button = ({ title, style, onClick, className }: ButtonProps) => {
  return (
    <button 
      className={`relative w-full px-4 py-2 text-center rounded-lg text-base leading-tight ${style === 'dark' && 'bg-card-primary text-gray-secondary'} ${style === 'accent' && 'bg-accent text-bg'} ${className}`}
      onClick={onClick}
    >
      {style === 'dark' && <div className="absolute inset-0 bg-gray-secondary opacity-10 rounded-lg"></div>}
      {title}
    </button>
  )
}

export default Button
import { Button } from './button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

const PrimaryButton = ({
  text,
  className,
  children,
  asChild,
  onClick,
  type,
  disabled
}: PrimaryButtonProps) => {
  return (
    <Button
      className={cn(
        'bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all',
        className,
        asChild
      )}
      onClick={onClick}
      asChild={asChild}
      type={type}
      disabled={disabled}>
      {children || text}
    </Button>
  );
};

export default PrimaryButton;

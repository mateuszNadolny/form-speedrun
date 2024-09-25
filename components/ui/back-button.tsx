import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  className?: string;
  text: string;
  href: string;
}

const BackButton = ({ className, text, href }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={`${className} absolute top-12 left-12 flex items-center justify-center gap-2 text-muted-foreground text-xs`}>
      <ArrowLeft className="w-4 h-4" />
      {text}
    </Link>
  );
};

export default BackButton;

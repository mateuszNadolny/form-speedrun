import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Trophy, Zap } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

const LandingPageCard = ({ title, description, icon }: CardProps) => {
  return (
    <Card className="rounded-lg pt-4 pb-6 border-none bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 cursor-default transition-colors w-[18rem]">
      <CardHeader>
        <CardTitle className="flex items-center gap-5">
          {icon === 'timer' && <Timer className="w-10 h-10 text-color-light text-color-teritary" />}
          {icon === 'trophy' && (
            <Trophy className="w-10 h-10 text-color-light text-color-teritary" />
          )}
          {icon === 'zap' && <Zap className="w-10 h-10 text-color-light text-color-teritary" />}
          <p className="text-lg font-extrabold text-color-light">{title}</p>
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm mt-2">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default LandingPageCard;

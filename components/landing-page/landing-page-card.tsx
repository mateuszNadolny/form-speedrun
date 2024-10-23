import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Trophy, Zap } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

const LandingPageCard = ({ title, description, icon }: CardProps) => {
  return (
    <Card className="rounded-lg border-none bg-color-teritary w-[18rem]">
      <CardHeader>
        <CardTitle className="flex items-center gap-5">
          {icon === 'timer' && <Timer className="w-10 h-10 text-color-light" />}
          {icon === 'trophy' && <Trophy className="w-10 h-10 text-color-light" />}
          {icon === 'zap' && <Zap className="w-10 h-10 text-color-light" />}
          <p className="text-lg font-extrabold text-color-light">{title}</p>
        </CardTitle>
        <CardDescription className="text-color-primary text-sm mt-2">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default LandingPageCard;

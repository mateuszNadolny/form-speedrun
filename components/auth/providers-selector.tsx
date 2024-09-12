import { Button } from '../ui/button';

import { FaGithub, FaGoogle } from 'react-icons/fa';

const ProvidersSelector = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-around gap-4 bg-color-secondary p-3 rounded-md">
        <Button className="w-full bg-color-teritary text-color-light hover:bg-color-primary">
          <FaGithub className="text-color-light h-5 w-5" />
        </Button>
        <Button className="w-full bg-color-teritary text-color-light hover:bg-color-primary">
          <FaGoogle className="text-color-light h-5 w-5" />
        </Button>
      </div>
      <div className="w-full flex items-center gap-4 justify-center mt-2">
        <div className="h-[2px] bg-color-teritary w-full" />
        <p className="text-color-teritary">or</p>
        <div className="h-[2px] bg-color-teritary w-full" />
      </div>
    </div>
  );
};

export default ProvidersSelector;

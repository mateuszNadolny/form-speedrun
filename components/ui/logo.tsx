import Link from 'next/link';

const Logo = () => {
  return (
    <h1 className="text-color-light font-extrabold text-sm lg:text-md tracking-tight cursor-pointer">
      <Link href={'/'}>
        Form <span className="text-color-teritary">Speedrunner</span> 🏃‍➡️
      </Link>
    </h1>
  );
};

export default Logo;

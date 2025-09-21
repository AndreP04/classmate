import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/auth/register">Sign Up</Link>
      <Link href="/auth/login">Log In</Link>
    </nav>
  );
};

export default NavBar;

import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'ClassMate',
  description: 'Manage student information easily with ClassMate.'
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
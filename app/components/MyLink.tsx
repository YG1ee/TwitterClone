import Link from 'next/link';
import type { ReactNode } from 'react';

export const MyLink = ({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) => (
  <Link href={href} scroll={false} className={className}>
    {children}
  </Link>
);

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function LocationLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

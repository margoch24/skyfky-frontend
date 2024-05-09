import { FC, ReactNode, memo } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = memo(({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
));

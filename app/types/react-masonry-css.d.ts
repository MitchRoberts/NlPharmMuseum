declare module "react-masonry-css" {
  import { ComponentType, ReactNode } from "react";

  type MasonryProps = {
    breakpointCols?: number | Record<string, number>;
    className?: string;
    columnClassName?: string;
    children?: ReactNode;
  };

  const Masonry: ComponentType<MasonryProps>;
  export default Masonry;
}

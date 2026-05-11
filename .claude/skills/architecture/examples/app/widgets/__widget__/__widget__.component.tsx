// Widgets use `*.component.tsx` (not `*.widget.tsx`).
// They compose features and shared components, and are reused across pages.

import { type FC } from "react";

// interface
interface IProps {
  // declare props
}

// component
const __Widget__Component: FC<Readonly<IProps>> = (props) => {
  const {} = props;

  // render
  return (
    <header>
      {/* compose features + shared components */}
    </header>
  );
};

export default __Widget__Component;

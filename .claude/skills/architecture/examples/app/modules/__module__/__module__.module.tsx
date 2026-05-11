// Server Component by default.
// Add "use client" only when hooks / browser APIs / event handlers are required.

import { type FC } from "react";

import { __ITEMS_PER_PAGE__ } from "./__module__.constant";
import { __Element__Component } from "./elements/__element__";
import { getPageItems } from "./services";

// interface
interface IProps {
  // declare props
}

// component
const __Module__Module: FC<Readonly<IProps>> = (props) => {
  const {} = props;

  const items = getPageItems(1, __ITEMS_PER_PAGE__);

  // render
  return (
    <section>
      {items.map((item) => (
        <__Element__Component key={item} value={item} />
      ))}
    </section>
  );
};

export default __Module__Module;

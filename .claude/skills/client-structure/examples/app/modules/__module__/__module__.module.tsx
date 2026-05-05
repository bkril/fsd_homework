// Server Component by default.
// Add "use client" only when hooks / browser APIs / event handlers are required.

import { type FC } from "react";
import { useTranslations } from "next-intl";

// interface
interface IProps {
  // declare props
}

// component
const __Module__Module: FC<Readonly<IProps>> = (props) => {
  const {} = props;
  const t = useTranslations("__module__");

  // render
  return (
    <section>
      <h1>{t("page_title")}</h1>
      {/* module content */}
    </section>
  );
};

export default __Module__Module;

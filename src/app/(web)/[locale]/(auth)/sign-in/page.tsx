import { type NextPage } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SignComponent } from "@/app/modules/sign";

// interface
interface IProps {
  params: Promise<{ locale: string }>;
}

// metadata
export const generateMetadata = async (props: IProps) => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "page_titles" });
  return { title: t("sign_in") };
};

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props;

  const { locale } = await params;
  setRequestLocale(locale);

  // render
  return <SignComponent variant="login" />;
};

export default Page;

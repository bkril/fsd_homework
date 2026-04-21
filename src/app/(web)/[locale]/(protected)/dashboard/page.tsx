import { type NextPage } from "next";
import { setRequestLocale } from "next-intl/server";

import { DashboardComponent } from "@/app/modules/dashboard";
import { authServer } from "@/pkg/auth/server/auth.server";

// metadata
export const metadata = {
  title: "Dashboard",
};

// interface
interface IProps {
  params: Promise<{ locale: string }>;
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props;

  const { locale } = await params;
  setRequestLocale(locale);

  const data = await authServer.getSession();

  // render
  return <DashboardComponent userName={data?.user?.name} />;
};

export default Page;

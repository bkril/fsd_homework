import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type FC, type ReactNode } from "react";

import { EAssetImage } from "@/app/shared/interfaces";
import { envClient } from "@/config/env";
import { routing } from "@/pkg/locale";
import { RestApiProvider } from "@/pkg/rest-api";

// interface
interface IProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// static params
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const favicon = EAssetImage.FAVICON;
  const title = t("title");
  const description = t("description");
  const ogImage = EAssetImage.OG_IMAGE;

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),
    icons: { icon: favicon },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: description,
      siteName: title,
      type: "website",
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};


// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props;

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // return
  return (
    <NextIntlClientProvider>
      <RestApiProvider>{children}</RestApiProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;

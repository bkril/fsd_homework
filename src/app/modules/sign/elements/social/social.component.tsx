"use client";

import Image from "next/image";
import { type FC } from "react";

import { Button } from "@/pkg/theme/ui/button";

// interface
interface IProps {}

// component
const SocialComponent: FC<Readonly<IProps>> = () => {
  // render
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="grow border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
      >
        <Image
          src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png"
          alt="google"
          width={18}
          height={18}
        />
        <span className="ml-2 text-sm font-medium">Google</span>
      </Button>
    </div>
  );
};

export default SocialComponent;

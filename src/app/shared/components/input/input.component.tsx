import { type FC } from "react";

import { cn } from "@/pkg/theme/lib/utils";
import { Input } from "@/pkg/theme/ui/input";
import { Label } from "@/pkg/theme/ui/label";

// interface
interface IProps extends React.ComponentProps<"input"> {
  label?: string;
  invalid?: boolean;
  message?: string;
}

// component
const InputComponent: FC<Readonly<IProps>> = (props) => {
  const { label, invalid, message, className, id, ...rest } = props;

  // render
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id} className={cn(invalid && "text-destructive")}>
          {label}
        </Label>
      )}

      <Input
        id={id}
        aria-invalid={invalid}
        className={className}
        {...rest}
      />

      {message && (
        <p className={cn("text-sm", invalid ? "text-destructive" : "text-muted-foreground")}>
          {message}
        </p>
      )}
    </div>
  );
};

export default InputComponent;

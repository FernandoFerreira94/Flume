import { cn } from "@/lib/utils";
import { color } from "@/src/styles/color";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#374151] animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };

"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar22Props {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  title: string;
}

export function Calendar22({ value, onChange, title }: Calendar22Props) {
  const [open, setOpen] = React.useState(false);

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="date" className="px-1">
        {title}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`justify-between font-normal border-gray-400/80 w-full ${
              value ? "" : "text-gray-500/80"
            } `}
          >
            {value ? formatDate(value) : "dd/mm/aaa"}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

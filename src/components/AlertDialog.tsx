import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AlertDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="font-bold tracking-wide"
        >
          Note!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            This is a Free Tier version
          </DialogTitle>
          <DialogDescription>
            The API key associated with this project has the following
            limitations:
          </DialogDescription>
        </DialogHeader>
        <ul>
          <li>
            • <strong>500</strong> requests per day
          </li>
          <li>
            • <strong>2</strong> max concurrent requests
          </li>
        </ul>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

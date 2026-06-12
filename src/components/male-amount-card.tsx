import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mars } from 'lucide-react'

export function MaleAmountCard() {
    return <Card className="gap-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Homens</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Mars className="size-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="text-2xl font-bold tracking-tight">20</span>
            <p className="text-xs text-muted-foreground">Reservations scheduled for the current day.</p>

          </CardContent>
        </Card>
}
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Venus } from 'lucide-react'

export function FemaleAmountCard() {
    return <Card className="gap-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Mulheres</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Venus className="size-4 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="text-2xl font-bold tracking-tight">10</span>
            <p className="text-xs text-muted-foreground">Reservations scheduled for the current day.</p>

          </CardContent>
        </Card>
}
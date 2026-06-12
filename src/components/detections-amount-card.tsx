import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScanFace } from 'lucide-react'

export function DetectionsAmountCard() {
    return <Card className="gap-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Total de Detecções</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <ScanFace className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="text-2xl font-bold tracking-tight">30</span>
            <p className="text-xs text-muted-foreground">Reservations scheduled for the current day.</p>

          </CardContent>
        </Card>
}
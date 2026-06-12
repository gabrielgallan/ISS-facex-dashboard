import { FemaleAmountCard } from "@/components/female-amout-card";
import { ChartAreaGradient } from "@/components/chart";
import { MaleAmountCard } from "@/components/male-amount-card";
import { DetectionsAmountCard } from "@/components/detections-amount-card";

export function HomePage() {
    return <div className="flex flex-col p-6 gap-4 h-screen">
      <div className="grid grid-cols-4 gap-4">
        <FemaleAmountCard />
        <MaleAmountCard />
        <DetectionsAmountCard />
      </div>

      <div className="h-120">
        <ChartAreaGradient />
      </div>
    </div>
}
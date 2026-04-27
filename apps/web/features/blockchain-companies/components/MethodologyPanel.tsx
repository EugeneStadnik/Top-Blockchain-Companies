import { Card } from "@/components/Card"
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon"

type TMethodologyPanelProps = {
  title: string
  description: string
  items: {
    title: string
    description: string
  }[]
}

export const MethodologyPanel = ({
  title,
  description,
  items,
}: TMethodologyPanelProps): React.JSX.Element => (
  <Card className="flex flex-col gap-4">
    <div className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-base-4 text-main-1">
        <ShieldCheckIcon className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="font-f5 text-main-4">{title}</h2>
        <p className="font-f13 text-main-5">{description}</p>
      </div>
    </div>

    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-sm border border-base-4 bg-base-1 px-3 py-3"
        >
          <h3 className="font-f12 text-main-4">{item.title}</h3>
          <p className="font-f14 text-main-6">{item.description}</p>
        </div>
      ))}
    </div>
  </Card>
)

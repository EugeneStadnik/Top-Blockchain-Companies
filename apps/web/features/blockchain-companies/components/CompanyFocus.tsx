import type { TBlockchainServiceFocus } from "@/api/rest/blockchain-companies/types"

type TCompanyFocusProps = {
  items: TBlockchainServiceFocus[]
}

export const CompanyFocus = ({ items }: TCompanyFocusProps): React.JSX.Element => (
  <div className="flex flex-col gap-2">
    {items.map((item) => (
      <div key={item.label} className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3 font-f14 text-main-5">
          <span>{item.label}</span>
          <span>{item.value}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-base-4">
          <div
            className="h-full rounded-full bg-main-1"
            style={{ width: `${item.value}%` }}
          />
        </div>
      </div>
    ))}
  </div>
)

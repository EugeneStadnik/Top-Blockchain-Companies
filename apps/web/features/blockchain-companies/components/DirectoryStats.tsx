import type { TBlockchainCompaniesStats } from "@/api/rest/blockchain-companies/types"

type TDirectoryStatsProps = {
  stats: TBlockchainCompaniesStats | null
  labels: {
    companies: string
    topRating: string
    rateRange: string
    blockchainFocus: string
  }
}

const getValue = (value: string | number | null | undefined): string | number =>
  value ?? "..."

export const DirectoryStats = ({
  stats,
  labels,
}: TDirectoryStatsProps): React.JSX.Element => (
  <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
    <div className="rounded-lg border border-base-4 bg-base-2 px-4 py-3">
      <p className="font-f14 text-main-6">{labels.companies}</p>
      <p className="whitespace-nowrap font-f6 text-main-4">
        {getValue(stats?.companies)}
      </p>
    </div>
    <div className="rounded-lg border border-base-4 bg-base-2 px-4 py-3">
      <p className="font-f14 text-main-6">{labels.topRating}</p>
      <p className="whitespace-nowrap font-f6 text-main-4">
        {getValue(stats?.topRating)}
      </p>
    </div>
    <div className="rounded-lg border border-base-4 bg-base-2 px-4 py-3">
      <p className="font-f14 text-main-6">{labels.rateRange}</p>
      <p className="whitespace-nowrap font-f6 text-main-4">
        {getValue(stats?.rateRange)}
      </p>
    </div>
    <div className="rounded-lg border border-base-4 bg-base-2 px-4 py-3">
      <p className="font-f14 text-main-6">{labels.blockchainFocus}</p>
      <p className="whitespace-nowrap font-f6 text-main-4">
        {getValue(stats?.blockchainFocus)}
      </p>
    </div>
  </div>
)

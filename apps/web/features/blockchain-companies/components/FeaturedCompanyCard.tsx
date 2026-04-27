import type { TBlockchainCompany } from "@/api/rest/blockchain-companies/types"

import { ButtonFilled } from "@/components/Button/ButtonFilled"
import { ButtonOutlined } from "@/components/Button/ButtonOutlined"
import { StarIcon } from "@/components/icons/StarIcon"

import { CompanyFocus } from "./CompanyFocus"

type TFeaturedCompanyCardProps = {
  company: TBlockchainCompany
  labels: {
    eyebrow: string
    rating: string
    reviews: string
    score: string
    rate: string
    project: string
    team: string
    location: string
    primaryAction: string
    secondaryAction: string
  }
  loading?: boolean
  onRequest: (companyId: string) => void
  onExplore: () => void
}

export const FeaturedCompanyCard = ({
  company,
  labels,
  loading = false,
  onRequest,
  onExplore,
}: TFeaturedCompanyCardProps): React.JSX.Element => (
  <aside className="flex h-full flex-col gap-5 rounded-lg border border-base-4 bg-base-2 p-4 sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-2">
        <span className="w-fit rounded-xs bg-main-1 px-2.5 py-1 font-f14 text-main-4">
          {labels.eyebrow}
        </span>
        <div>
          <h2 className="font-f2 text-main-4">{company.name}</h2>
          <p className="font-f12 text-main-5">{company.tagline}</p>
        </div>
      </div>

      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-main-1/15 text-main-1">
        <StarIcon className="size-6" />
      </span>
    </div>

    <p className="font-f13 text-main-5">{company.description}</p>

    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-md border border-base-4 bg-base-1 px-3 py-3">
        <p className="font-f14 text-main-6">{labels.rating}</p>
        <p className="font-f7 text-main-4">
          {company.rating} · {company.reviews} {labels.reviews}
        </p>
      </div>
      <div className="rounded-md border border-base-4 bg-base-1 px-3 py-3">
        <p className="font-f14 text-main-6">{labels.score}</p>
        <p className="font-f7 text-main-4">{company.profileScore}</p>
      </div>
      <div className="rounded-md border border-base-4 bg-base-1 px-3 py-3">
        <p className="font-f14 text-main-6">{labels.rate}</p>
        <p className="font-f7 text-main-4">{company.hourlyRate}</p>
      </div>
      <div className="rounded-md border border-base-4 bg-base-1 px-3 py-3">
        <p className="font-f14 text-main-6">{labels.project}</p>
        <p className="font-f7 text-main-4">{company.minProject}</p>
      </div>
    </div>

    <div className="grid gap-3 rounded-md border border-base-4 bg-base-1 p-4 sm:grid-cols-[1fr_1fr]">
      <div>
        <p className="font-f14 text-main-6">{labels.team}</p>
        <p className="font-f12 text-main-4">{company.employees}</p>
      </div>
      <div>
        <p className="font-f14 text-main-6">{labels.location}</p>
        <p className="font-f12 text-main-4">{company.location}</p>
      </div>
      <div className="sm:col-span-2">
        <CompanyFocus items={company.serviceFocus} />
      </div>
    </div>

    <div className="mt-auto grid gap-3 sm:grid-cols-2">
      <ButtonFilled
        type="button"
        size="big"
        loading={loading}
        onClick={() => onRequest(company.id)}
      >
        {labels.primaryAction}
      </ButtonFilled>
      <ButtonOutlined type="button" size="big" onClick={onExplore}>
        {labels.secondaryAction}
      </ButtonOutlined>
    </div>
  </aside>
)

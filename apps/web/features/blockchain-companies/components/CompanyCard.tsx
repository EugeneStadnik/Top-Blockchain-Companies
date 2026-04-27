import type { TBlockchainCompany } from "@/api/rest/blockchain-companies/types"

import { ButtonOutlined } from "@/components/Button/ButtonOutlined"
import { StarIcon } from "@/components/icons/StarIcon"

import { CompanyFocus } from "./CompanyFocus"

type TCompanyCardProps = {
  company: TBlockchainCompany
  labels: {
    reviews: string
    score: string
    rate: string
    project: string
    team: string
    location: string
    action: string
  }
  loading?: boolean
  onRequest: (companyId: string) => void
}

export const CompanyCard = ({
  company,
  labels,
  loading = false,
  onRequest,
}: TCompanyCardProps): React.JSX.Element => (
  <article className="grid gap-5 rounded-lg border border-base-4 bg-base-2 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-xs bg-main-1 px-2.5 py-1 font-f14 text-main-4">
          #{company.rank}
        </span>
        {company.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-xs bg-base-4 px-2.5 py-1 font-f14 text-main-5"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-f4 text-main-4">{company.name}</h3>
          <span className="inline-flex items-center gap-1 font-f13 text-main-1">
            <StarIcon className="size-4" />
            {company.rating} · {company.reviews} {labels.reviews}
          </span>
        </div>
        <p className="font-f8 text-main-4">{company.tagline}</p>
        <p className="max-w-[760px] font-f13 text-main-5">{company.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {company.industries.map((industry) => (
          <span
            key={industry}
            className="rounded-xs border border-base-4 px-2.5 py-1 font-f14 text-main-5"
          >
            {industry}
          </span>
        ))}
      </div>
    </div>

    <div className="flex min-w-0 flex-col gap-4 rounded-md border border-base-4 bg-base-1 p-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-f14 text-main-6">{labels.score}</p>
          <p className="font-f12 text-main-4">{company.profileScore}</p>
        </div>
        <div>
          <p className="font-f14 text-main-6">{labels.rate}</p>
          <p className="font-f12 text-main-4">{company.hourlyRate}</p>
        </div>
        <div>
          <p className="font-f14 text-main-6">{labels.project}</p>
          <p className="font-f12 text-main-4">{company.minProject}</p>
        </div>
        <div>
          <p className="font-f14 text-main-6">{labels.team}</p>
          <p className="font-f12 text-main-4">{company.employees}</p>
        </div>
      </div>

      <div>
        <p className="font-f14 text-main-6">{labels.location}</p>
        <p className="font-f12 text-main-4">{company.location}</p>
      </div>

      <CompanyFocus items={company.serviceFocus} />

      <ButtonOutlined
        type="button"
        size="big"
        className="w-full"
        loading={loading}
        onClick={() => onRequest(company.id)}
      >
        {labels.action}
      </ButtonOutlined>
    </div>
  </article>
)

import * as React from "react"
import {
  EBlockchainCompanyAlias,
  EBlockchainCompanyRegion,
} from "@/api/rest/blockchain-companies/types"
import { useTranslations } from "next-intl"

import type { TFilters } from "@/components/filters"
import { isValid, type TSelectConfig } from "@/components/filters/Select"

type TProps = {
  urlFilters: TFilters
}

type TReturn = {
  config: TSelectConfig
  value: string | undefined
}

export const useRegion = ({ urlFilters }: TProps): TReturn => {
  const t = useTranslations("blockchainCompanies.filters.region")

  const config = React.useMemo<TSelectConfig>(
    () => ({
      id: 3,
      alias: EBlockchainCompanyAlias.region,
      title: t("title"),
      items: [
        { value: EBlockchainCompanyRegion.ALL, name: t("all") },
        { value: EBlockchainCompanyRegion.NORTH_AMERICA, name: t("northAmerica") },
        { value: EBlockchainCompanyRegion.EUROPE, name: t("europe") },
        { value: EBlockchainCompanyRegion.ASIA, name: t("asia") },
      ],
    }),
    [t],
  )

  const hasValidFilter = isValid({ config, filter: urlFilters[config.alias] })
  const value = hasValidFilter ? urlFilters[config.alias] : EBlockchainCompanyRegion.ALL

  return { config, value }
}

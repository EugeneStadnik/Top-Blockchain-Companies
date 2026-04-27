import * as React from "react"
import {
  EBlockchainCompanyAlias,
  EBlockchainCompanyBudget,
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

export const useBudget = ({ urlFilters }: TProps): TReturn => {
  const t = useTranslations("blockchainCompanies.filters.budget")

  const config = React.useMemo<TSelectConfig>(
    () => ({
      id: 4,
      alias: EBlockchainCompanyAlias.budget,
      title: t("title"),
      items: [
        { value: EBlockchainCompanyBudget.ALL, name: t("all") },
        { value: EBlockchainCompanyBudget.UNDER_10K, name: t("under10k") },
        { value: EBlockchainCompanyBudget.FROM_10K, name: t("from10k") },
        { value: EBlockchainCompanyBudget.FROM_25K, name: t("from25k") },
      ],
    }),
    [t],
  )

  const hasValidFilter = isValid({ config, filter: urlFilters[config.alias] })
  const value = hasValidFilter ? urlFilters[config.alias] : EBlockchainCompanyBudget.ALL

  return { config, value }
}

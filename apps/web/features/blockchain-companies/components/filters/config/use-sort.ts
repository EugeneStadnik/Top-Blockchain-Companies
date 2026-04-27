import * as React from "react"
import {
  EBlockchainCompanyAlias,
  EBlockchainCompanySort,
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

export const useSort = ({ urlFilters }: TProps): TReturn => {
  const t = useTranslations("blockchainCompanies.filters.sort")

  const config = React.useMemo<TSelectConfig>(
    () => ({
      id: 5,
      alias: EBlockchainCompanyAlias.sort,
      title: t("title"),
      items: [
        { value: EBlockchainCompanySort.RECOMMENDED, name: t("recommended") },
        { value: EBlockchainCompanySort.SCORE_DESC, name: t("score") },
        { value: EBlockchainCompanySort.FOCUS_DESC, name: t("focus") },
        { value: EBlockchainCompanySort.BUDGET_ASC, name: t("budget") },
      ],
    }),
    [t],
  )

  const hasValidFilter = isValid({ config, filter: urlFilters[config.alias] })
  const value = hasValidFilter
    ? urlFilters[config.alias]
    : EBlockchainCompanySort.RECOMMENDED

  return { config, value }
}

import { EBlockchainCompanyAlias } from "@/api/rest/blockchain-companies/types"
import { useTranslations } from "next-intl"

import type { TFilters } from "@/components/filters"
import type { TInputConfig } from "@/components/filters/Search"

type TProps = {
  urlFilters: TFilters
}

type TReturn = {
  config: TInputConfig
  value: string | undefined
}

export const useSearch = ({ urlFilters }: TProps): TReturn => {
  const t = useTranslations("blockchainCompanies.filters.search")

  const config: TInputConfig = {
    id: 1,
    alias: EBlockchainCompanyAlias.search,
    title: t("title"),
    placeholder: t("placeholder"),
    debounceMs: 400,
  }

  return {
    config,
    value: urlFilters[config.alias],
  }
}

import * as React from "react"
import {
  EBlockchainCompanyAlias,
  EBlockchainCompanyService,
} from "@/api/rest/blockchain-companies/types"
import { useTranslations } from "next-intl"

import type { TFilters } from "@/components/filters"
import { isValid, type TSelectConfig } from "@/components/filters/Select"

export const SERVICE_ALL_VALUE = "all"

type TProps = {
  urlFilters: TFilters
}

type TReturn = {
  config: TSelectConfig
  value: string | undefined
}

export const useService = ({ urlFilters }: TProps): TReturn => {
  const t = useTranslations("blockchainCompanies.filters.service")

  const config = React.useMemo<TSelectConfig>(
    () => ({
      id: 2,
      alias: EBlockchainCompanyAlias.service,
      title: t("title"),
      items: [
        { value: SERVICE_ALL_VALUE, name: t("all") },
        { value: EBlockchainCompanyService.BLOCKCHAIN, name: t("blockchain") },
        {
          value: EBlockchainCompanyService.SMART_CONTRACTS,
          name: t("smartContracts"),
        },
        { value: EBlockchainCompanyService.DEFI, name: t("defi") },
        { value: EBlockchainCompanyService.WEB3, name: t("web3") },
        { value: EBlockchainCompanyService.WALLET, name: t("wallet") },
        { value: EBlockchainCompanyService.TOKENIZATION, name: t("tokenization") },
      ],
    }),
    [t],
  )

  const hasValidFilter = isValid({ config, filter: urlFilters[config.alias] })
  const value = hasValidFilter ? urlFilters[config.alias] : SERVICE_ALL_VALUE

  return { config, value }
}

import * as React from "react"
import {
  EBlockchainCompanyAlias,
  EBlockchainCompanyBudget,
  EBlockchainCompanyRegion,
  EBlockchainCompanyService,
  EBlockchainCompanySort,
  type TBlockchainCompaniesFilters,
} from "@/api/rest/blockchain-companies/types"

import type { TFilters } from "@/components/filters"
import type { TInputConfig } from "@/components/filters/Search"
import type { TSelectConfig } from "@/components/filters/Select"

import { useBudget } from "./config/use-budget"
import { useRegion } from "./config/use-region"
import { useSearch } from "./config/use-search"
import { SERVICE_ALL_VALUE, useService } from "./config/use-service"
import { useSort } from "./config/use-sort"

type TProps = {
  urlFilters: TFilters
}

export type TBlockchainCompanyFilterConfig = {
  search: {
    config: TInputConfig
    value: string | undefined
  }
  service: {
    config: TSelectConfig
    value: string | undefined
  }
  region: {
    config: TSelectConfig
    value: string | undefined
  }
  budget: {
    config: TSelectConfig
    value: string | undefined
  }
  sort: {
    config: TSelectConfig
    value: string | undefined
  }
}

type TReturn = {
  filterConfig: TBlockchainCompanyFilterConfig
  normalizedUrlFilters: (nextUrlFilters: TFilters) => TBlockchainCompaniesFilters
}

const isService = (value?: string): value is EBlockchainCompanyService =>
  Boolean(
    value &&
    Object.values(EBlockchainCompanyService).includes(value as EBlockchainCompanyService),
  )

const isRegion = (value?: string): value is EBlockchainCompanyRegion =>
  Boolean(
    value &&
    Object.values(EBlockchainCompanyRegion).includes(value as EBlockchainCompanyRegion),
  )

const isBudget = (value?: string): value is EBlockchainCompanyBudget =>
  Boolean(
    value &&
    Object.values(EBlockchainCompanyBudget).includes(value as EBlockchainCompanyBudget),
  )

const isSort = (value?: string): value is EBlockchainCompanySort =>
  Boolean(
    value &&
    Object.values(EBlockchainCompanySort).includes(value as EBlockchainCompanySort),
  )

export const useFilters = ({ urlFilters }: TProps): TReturn => {
  const search = useSearch({ urlFilters })
  const service = useService({ urlFilters })
  const region = useRegion({ urlFilters })
  const budget = useBudget({ urlFilters })
  const sort = useSort({ urlFilters })

  const normalizedUrlFilters = React.useCallback(
    (nextUrlFilters: TFilters): TBlockchainCompaniesFilters => {
      const rawService = nextUrlFilters[EBlockchainCompanyAlias.service]
      const rawRegion = nextUrlFilters[EBlockchainCompanyAlias.region]
      const rawBudget = nextUrlFilters[EBlockchainCompanyAlias.budget]
      const rawSort = nextUrlFilters[EBlockchainCompanyAlias.sort]

      return {
        [EBlockchainCompanyAlias.search]:
          nextUrlFilters[EBlockchainCompanyAlias.search]?.trim() || undefined,
        [EBlockchainCompanyAlias.service]:
          rawService && rawService !== SERVICE_ALL_VALUE && isService(rawService)
            ? rawService
            : undefined,
        [EBlockchainCompanyAlias.region]:
          rawRegion && isRegion(rawRegion) ? rawRegion : undefined,
        [EBlockchainCompanyAlias.budget]:
          rawBudget && isBudget(rawBudget) ? rawBudget : undefined,
        [EBlockchainCompanyAlias.sort]: isSort(rawSort)
          ? rawSort
          : EBlockchainCompanySort.RECOMMENDED,
      }
    },
    [],
  )

  return {
    filterConfig: {
      search,
      service,
      region,
      budget,
      sort,
    },
    normalizedUrlFilters,
  }
}

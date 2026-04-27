import { usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

import { cn } from "@library/ui/lib/utils/cn"

import { ButtonText } from "@/components/Button/ButtonText"
import { Card } from "@/components/Card"
import { EPageAlias, pushUrlQuery, updateUrl, type TFilters } from "@/components/filters"
import { Search as FilterSearch } from "@/components/filters/Search"
import { Select as FilterSelect } from "@/components/filters/Select"

import type { TBlockchainCompanyFilterConfig } from "./use-filters"

type TCompanyFiltersProps = {
  urlFilters: TFilters
  filterConfig: TBlockchainCompanyFilterConfig
  resultCount: number
}

export const CompanyFilters = ({
  urlFilters,
  filterConfig,
  resultCount,
}: TCompanyFiltersProps): React.JSX.Element => {
  const pathname = usePathname()
  const t = useTranslations("blockchainCompanies.filters")

  const onChangeFilters = (filters: TFilters): void => {
    const query = updateUrl({
      current: urlFilters,
      newFilters: { ...filters, [EPageAlias.page]: "" },
    })

    pushUrlQuery({ pathname, query })
  }

  const onClearAllFilters = (): void => {
    onChangeFilters({
      [filterConfig.search.config.alias]: "",
      [filterConfig.service.config.alias]: "",
      [filterConfig.region.config.alias]: "",
      [filterConfig.budget.config.alias]: "",
      [filterConfig.sort.config.alias]: "",
    })
  }

  return (
    <Card className="grid w-full gap-3 p-4 lg:grid-cols-[minmax(220px,1fr)_repeat(4,minmax(160px,auto))_auto] lg:items-end">
      <div className="min-w-0">
        <FilterSearch
          config={filterConfig.search.config}
          filter={filterConfig.search.value}
          onChange={({ filter }) => onChangeFilters(filter)}
        />
      </div>

      <FilterSelect
        config={filterConfig.service.config}
        filter={filterConfig.service.value}
        onChange={({ filter }) => onChangeFilters(filter)}
        blurOnClose
        slotClasses={{
          trigger: cn("w-full lg:w-[210px]"),
        }}
      />

      <FilterSelect
        config={filterConfig.region.config}
        filter={filterConfig.region.value}
        onChange={({ filter }) => onChangeFilters(filter)}
        blurOnClose
        slotClasses={{
          trigger: cn("w-full lg:w-[180px]"),
        }}
      />

      <FilterSelect
        config={filterConfig.budget.config}
        filter={filterConfig.budget.value}
        onChange={({ filter }) => onChangeFilters(filter)}
        blurOnClose
        slotClasses={{
          trigger: cn("w-full lg:w-[170px]"),
        }}
      />

      <FilterSelect
        config={filterConfig.sort.config}
        filter={filterConfig.sort.value}
        onChange={({ filter }) => onChangeFilters(filter)}
        blurOnClose
        slotClasses={{
          trigger: cn("w-full lg:w-[190px]"),
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-col lg:items-end">
        <span className="font-f13 text-main-5">
          {t("resultCount", { count: resultCount })}
        </span>
        <ButtonText
          type="button"
          variant="secondary"
          className="h-auto w-auto p-0 text-main-5"
          onClick={onClearAllFilters}
        >
          {t("clearAll")}
        </ButtonText>
      </div>
    </Card>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { apiBlockchainCompanies } from "@/api/rest/blockchain-companies"
import type { TBlockchainCompaniesRes } from "@/api/rest/blockchain-companies/types"
import { handleRestErrors } from "@/features/errors"
import { useTranslations } from "next-intl"

import { toast } from "@library/ui/components/Toast"

import { ButtonFilled } from "@/components/Button/ButtonFilled"
import { ButtonOutlined } from "@/components/Button/ButtonOutlined"
import { Card } from "@/components/Card"
import type { TFilters } from "@/components/filters"
import { SpinnerIcon } from "@/components/icons/SpinnerIcon"

import { CompanyCard } from "./components/CompanyCard"
import { DirectoryStats } from "./components/DirectoryStats"
import { FeaturedCompanyCard } from "./components/FeaturedCompanyCard"
import { CompanyFilters } from "./components/filters/CompanyFilters"
import { useFilters } from "./components/filters/use-filters"
import { MethodologyPanel } from "./components/MethodologyPanel"

const LoadingState = (): React.JSX.Element => (
  <div className="flex h-full min-h-[520px] items-center justify-center rounded-lg border border-base-4 bg-base-2">
    <SpinnerIcon className="size-8 animate-spin text-main-1" />
  </div>
)

export const BlockchainCompanies = (): React.JSX.Element => {
  const t = useTranslations("blockchainCompanies")
  const searchParams = useSearchParams()
  const [data, setData] = useState<TBlockchainCompaniesRes | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [requestingCompanyId, setRequestingCompanyId] = useState<string | null>(null)

  const urlFilters = useMemo(
    () => Object.fromEntries(searchParams.entries()) as TFilters,
    [searchParams],
  )

  const { filterConfig, normalizedUrlFilters } = useFilters({ urlFilters })

  useEffect(() => {
    let isActive = true

    const loadCompanies = async (): Promise<void> => {
      setLoading(true)

      try {
        const { data: companiesData } = await apiBlockchainCompanies.getCompanies(
          normalizedUrlFilters(urlFilters),
        )

        if (!isActive) return

        setData(companiesData)
      } catch (e) {
        if (!isActive) return
        handleRestErrors({ e })
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadCompanies()

    return () => {
      isActive = false
    }
  }, [normalizedUrlFilters, urlFilters])

  const requestShortlist = async (companyId: string): Promise<void> => {
    setRequestingCompanyId(companyId)

    try {
      await apiBlockchainCompanies.createInquiry({ sourceCompanyId: companyId })
      toast.success(t("toast.inquiry"), { id: "blockchain-companies-inquiry" })
    } catch (e) {
      handleRestErrors({ e })
    } finally {
      setRequestingCompanyId(null)
    }
  }

  const scrollToList = (): void => {
    document
      .getElementById("blockchain-company-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const visibleCompanies = data?.companies ?? []

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12 lg:px-14">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(520px,1fr)] xl:items-stretch">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-sm border border-base-4 bg-base-2 px-3 py-2 font-f12 text-main-5">
              {t("hero.exampleBadge")}
            </span>
            <span className="rounded-sm border border-base-4 bg-base-2 px-3 py-2 font-f12 text-main-5">
              {t("hero.sourceBadge")}
            </span>
          </div>

          <div className="flex max-w-[780px] flex-col gap-3">
            <h1 className="font-f1 text-main-4">{t("hero.title")}</h1>
            <p className="font-f11 text-main-5">{t("hero.description")}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonFilled
              type="button"
              size="big"
              loading={requestingCompanyId === "peiko"}
              onClick={() => void requestShortlist("peiko")}
            >
              {t("hero.primaryCta")}
            </ButtonFilled>
            <ButtonOutlined type="button" size="big" onClick={scrollToList}>
              {t("hero.secondaryCta")}
            </ButtonOutlined>
          </div>

          <DirectoryStats
            stats={data?.stats ?? null}
            labels={{
              companies: t("stats.companies"),
              topRating: t("stats.topRating"),
              rateRange: t("stats.rateRange"),
              blockchainFocus: t("stats.blockchainFocus"),
            }}
          />

          <MethodologyPanel
            title={t("methodology.title")}
            description={t("methodology.description")}
            items={[
              {
                title: t("methodology.items.profile.title"),
                description: t("methodology.items.profile.description"),
              },
              {
                title: t("methodology.items.fit.title"),
                description: t("methodology.items.fit.description"),
              },
              {
                title: t("methodology.items.conversion.title"),
                description: t("methodology.items.conversion.description"),
              },
            ]}
          />
        </div>

        <div className="xl:sticky xl:top-[104px] xl:h-full">
          {data ? (
            <FeaturedCompanyCard
              company={data.featuredCompany}
              loading={requestingCompanyId === data.featuredCompany.id}
              labels={{
                eyebrow: t("featured.eyebrow"),
                rating: t("card.rating"),
                reviews: t("card.reviews"),
                score: t("card.score"),
                rate: t("card.rate"),
                project: t("card.project"),
                team: t("card.team"),
                location: t("card.location"),
                primaryAction: t("featured.primaryAction"),
                secondaryAction: t("featured.secondaryAction"),
              }}
              onRequest={(companyId) => void requestShortlist(companyId)}
              onExplore={scrollToList}
            />
          ) : (
            <LoadingState />
          )}
        </div>
      </section>

      <section id="blockchain-company-list" className="scroll-mt-28">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-f2 text-main-4">{t("list.title")}</h2>
            <p className="font-f11 text-main-5">{t("list.description")}</p>
          </div>

          <CompanyFilters
            urlFilters={urlFilters}
            filterConfig={filterConfig}
            resultCount={data?.total ?? 0}
          />

          {isLoading ? (
            <LoadingState />
          ) : visibleCompanies.length === 0 ? (
            <Card className="py-12 text-center font-f13 text-main-5">
              {t("list.empty")}
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {visibleCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  loading={requestingCompanyId === company.id}
                  labels={{
                    reviews: t("card.reviews"),
                    score: t("card.score"),
                    rate: t("card.rate"),
                    project: t("card.project"),
                    team: t("card.team"),
                    location: t("card.location"),
                    action: t("card.action"),
                  }}
                  onRequest={(companyId) => void requestShortlist(companyId)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import { Suspense } from "react"
import { BlockchainCompanies } from "@/features/blockchain-companies/BlockchainCompanies"
import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<React.JSX.Element> => {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <Suspense fallback={null}>
      <BlockchainCompanies />
    </Suspense>
  )
}

export default Page

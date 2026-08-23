import LegalDocPage from '../components/LegalDocPage'
import { cookiePolicyTitle, cookiePolicyBlocks } from '../data/cookiePolicy'

function CookiePolicyPage() {
  return (
    <LegalDocPage
      heading="Политика в отношении файлов cookie"
      docTitle={cookiePolicyTitle}
      blocks={cookiePolicyBlocks}
    />
  )
}

export default CookiePolicyPage

import { Link } from 'react-router-dom'
import SiteShell from '../components/SiteShell'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { privacyPolicyTitle, privacyPolicyBlocks } from '../data/privacyPolicy'

function PolicyBlock({ block }) {
  if (block.type === 'title') return null

  if (block.type === 'section') {
    return <h2 className="fh-policy-section">{block.text}</h2>
  }

  if (block.type === 'subsection') {
    return <h3 className="fh-policy-subsection">{block.text}</h3>
  }

  if (block.type === 'subtitle') {
    return <h4 className="fh-policy-subtitle">{block.text}</h4>
  }

  if (block.type === 'note') {
    return <p className="fh-policy-note">{block.text}</p>
  }

  if (block.type === 'li') {
    return (
      <p className="fh-policy-li">
        <span aria-hidden="true">•</span>
        {block.text}
      </p>
    )
  }

  return <p className="fh-policy-p">{block.text}</p>
}

function PrivacyPolicyContent() {
  useScrollReveal()

  return (
    <>
      <section className="fh-policy-hero fh-section-pad">
        <div className="fh-policy-hero__inner">
          <Link to="/" className="fh-policy-back">
            ← на главную
          </Link>
          <h1 className="fh-policy-hero__title fh-oswald">Политика обработки данных</h1>
          <p className="fh-policy-hero__doc">{privacyPolicyTitle}</p>
        </div>
      </section>

      <section className="fh-policy-body fh-section-pad">
        <article className="fh-policy-article">
          {privacyPolicyBlocks.map((block, i) => (
            <PolicyBlock key={`${block.type}-${i}`} block={block} />
          ))}
        </article>
      </section>
    </>
  )
}

function PrivacyPolicyPage() {
  return (
    <SiteShell activeId="">
      <PrivacyPolicyContent />
    </SiteShell>
  )
}

export default PrivacyPolicyPage

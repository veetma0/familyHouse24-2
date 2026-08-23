import { Link } from 'react-router-dom'
import SiteShell from './SiteShell'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ============================================================
   Универсальная страница юридического документа.
   Рендерит массив блоков вида { type, text }:
   title | section | subsection | subtitle | p | li | note
   ============================================================ */

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

function LegalDocContent({ heading, docTitle, blocks }) {
  useScrollReveal()

  return (
    <>
      <section className="fh-policy-hero fh-section-pad">
        <div className="fh-policy-hero__inner">
          <Link to="/" className="fh-policy-back">
            ← на главную
          </Link>
          <h1 className="fh-policy-hero__title fh-oswald">{heading}</h1>
          <p className="fh-policy-hero__doc">{docTitle}</p>
        </div>
      </section>

      <section className="fh-policy-body fh-section-pad">
        <article className="fh-policy-article">
          {blocks.map((block, i) => (
            <PolicyBlock key={`${block.type}-${i}`} block={block} />
          ))}
        </article>

        <nav className="fh-policy-related" aria-label="Другие документы">
          <span className="fh-policy-related__label fh-oswald">Другие документы</span>
          <Link to="/privacy">Политика обработки персональных данных</Link>
          <Link to="/cookies">Политика в отношении файлов cookie</Link>
          <Link to="/consent">Согласие на обработку персональных данных</Link>
          <Link to="/offer">Публичная оферта (условия бронирования)</Link>
          <Link to="/terms">Пользовательское соглашение</Link>
        </nav>
      </section>
    </>
  )
}

function LegalDocPage({ heading, docTitle, blocks, activeId = '' }) {
  return (
    <SiteShell activeId={activeId}>
      <LegalDocContent heading={heading} docTitle={docTitle} blocks={blocks} />
    </SiteShell>
  )
}

export default LegalDocPage

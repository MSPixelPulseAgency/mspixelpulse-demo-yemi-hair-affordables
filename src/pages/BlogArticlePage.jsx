import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import LoopingVideo from "../components/LoopingVideo";
import Seo from "../components/Seo";
import { blogPosts, getBlogPost } from "../data/blogPosts";
import { businessConfig } from "../config/business";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const careArticle = post.slug.includes("care");
  const textureArticle = post.slug.includes("texture");
  const articleVideo = careArticle
    ? ["/videos/natural-curl-care.mp4", "/images/video-posters/natural-curl-care.webp", "Black woman gently refreshing and shaping her curls"]
    : textureArticle
      ? ["/videos/afro-outdoors.mp4", "/images/video-posters/afro-outdoors.webp", "Black woman wearing a rounded afro outdoors"]
      : ["/videos/wig-styling.mp4", "/images/video-posters/wig-styling.webp", "Black woman fitting and styling a smooth wig"];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: `${businessConfig.siteUrl}${post.image}`,
    mainEntityOfPage: `${businessConfig.siteUrl}/blog/${post.slug}`,
    publisher: { "@type": "Organization", name: businessConfig.name }
  };

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} image={post.image} schema={schema} />
      <article className="article-page">
        <header className="article-hero">
          <div className="container article-hero__copy">
            <Link className="article-back" to="/blog"><ArrowLeft size={17} /> The Hair Edit</Link>
            <div className="blog-meta"><span>{post.category}</span><time dateTime={post.date}>{post.displayDate}</time><span>{post.readTime}</span></div>
            <h1>{post.title}</h1>
            <p>{post.dek}</p>
          </div>
          <div className="container article-hero__media">
            <LoopingVideo src={articleVideo[0]} poster={articleVideo[1]} label={articleVideo[2]} />
            <p className="media-note">Inspiration footage from Pexels; it does not depict a customer order or a specific product.</p>
          </div>
        </header>

        <div className="container article-layout">
          <div className="article-body">
            <p className="article-lede">{post.excerpt}</p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                {section.callout ? <aside className="article-callout"><strong>Keep in mind</strong><p>{section.callout}</p></aside> : null}
              </section>
            ))}
            <section className="article-sources" aria-labelledby="article-sources-title">
              <h2 id="article-sources-title">Sources and further reading</h2>
              <p>Our editorial guides are independently written and use current reporting or expert resources as research. Product choices should still be based on your own fit and routine.</p>
              <ul>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={15} /></a></li>)}</ul>
            </section>
          </div>
          <aside className="article-aside">
            <p className="eyebrow">Make it yours</p>
            <h2>Found the shape you want?</h2>
            <p>Browse the closest collection or send a reference through the guided custom-order form.</p>
            <Link className="button button--primary button--full" to="/shop">Shop hair <ArrowRight size={16} /></Link>
            <Link className="button button--ghost button--full" to="/custom-order">Custom order</Link>
          </aside>
        </div>

        <section className="section section--surface">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">Keep reading</p><h2>More from The Hair Edit</h2></div><Link className="text-link" to="/blog">All articles <ArrowRight size={16} /></Link></div>
            <div className="article-related">
              {related.map((item) => (
                <Link to={`/blog/${item.slug}`} key={item.slug}>
                  <img src={item.image} alt="" loading="lazy" width="480" height="360" />
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

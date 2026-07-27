import { ArrowRight, BookOpen, Globe2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoFeature } from "../components/LoopingVideo";
import Seo from "../components/Seo";
import { Reveal } from "../components/common";
import { blogPosts } from "../data/blogPosts";

function BlogCard({ post }) {
  return (
    <Reveal>
      <article className="blog-card">
        <Link className="blog-card__image" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
          <img src={post.image} alt={post.imageAlt} loading="lazy" width="720" height="820" />
        </Link>
        <div className="blog-card__content">
          <div className="blog-meta"><span>{post.category}</span><time dateTime={post.date}>{post.displayDate}</time><span>{post.readTime}</span></div>
          <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
          <p>{post.excerpt}</p>
          <Link className="text-link" to={`/blog/${post.slug}`}>Read the guide <ArrowRight size={16} /></Link>
        </div>
      </article>
    </Reveal>
  );
}

export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const latest = blogPosts.filter((post) => post.slug !== featured.slug);
  return (
    <>
      <Seo
        title="The Hair Edit | Yemi Hair Affordables Blog"
        description="Read current wig trends, practical human-hair care and styling guides created for customers in Nigeria and Canada."
        path="/blog"
      />
      <header className="blog-hero">
        <div className="container blog-hero__grid">
          <div>
            <p className="eyebrow">The Hair Edit</p>
            <h1>Current hair conversations, made genuinely useful.</h1>
            <p>Trend notes from Nigeria, climate-aware care for Canada and clear guides for choosing a style that fits your real routine.</p>
          </div>
          <div className="blog-hero__topics" aria-label="Topics covered">
            <span><Sparkles size={18} /> 2026 trend reports</span>
            <span><Globe2 size={18} /> Nigeria + Canada context</span>
            <span><BookOpen size={18} /> Practical care guides</span>
          </div>
        </div>
      </header>

      <div>
        <VideoFeature
          compact
          dark
          src="/videos/afro-outdoors.mp4"
          poster="/images/video-posters/afro-outdoors.webp"
          label="Black woman wearing a rounded afro outdoors"
          eyebrow="The Hair Edit in motion"
          title="Texture is part of the story."
          text="Watch shape and volume move, then read practical guides for choosing, styling and caring for your look."
          href="/blog/texture-first-hair-trends-2026"
          cta="Read the texture report"
        />
        <section className="section section--tight">
          <div className="container">
            <article className="blog-feature">
              <Link className="blog-feature__image" to={`/blog/${featured.slug}`}>
                <img src={featured.image} alt={featured.imageAlt} width="1040" height="780" />
              </Link>
              <div className="blog-feature__content">
                <p className="eyebrow">Featured read</p>
                <div className="blog-meta"><span>{featured.category}</span><time dateTime={featured.date}>{featured.displayDate}</time><span>{featured.readTime}</span></div>
                <h2>{featured.title}</h2>
                <p>{featured.dek}</p>
                <Link className="button button--primary" to={`/blog/${featured.slug}`}>Read article <ArrowRight size={17} /></Link>
              </div>
            </article>
          </div>
        </section>

        <section className="section blog-latest">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">Latest stories</p><h2>Guidance for the look—and the life around it</h2></div>
            </div>
            <div className="blog-grid">{latest.map((post) => <BlogCard post={post} key={post.slug} />)}</div>
          </div>
        </section>

        <section className="section section--blush">
          <div className="container blog-cta">
            <div><p className="eyebrow">Need a personal recommendation?</p><h2>Turn the inspiration into your own request.</h2><p>Share your reference, preferred texture, length, cap size, budget and location with Rosaline.</p></div>
            <Link className="button button--dark" to="/custom-order">Start a custom order <ArrowRight size={17} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}

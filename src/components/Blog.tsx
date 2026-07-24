import { ArrowRight, Calendar } from "lucide-react";
import { Section, SectionHeading, Badge } from "./ui";
import { blogPosts } from "../data";

export function Blog() {
  return (
    <Section id="blog">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Blog"
          title="Últimos artículos"
          subtitle="Consejos, tendencias y guías para seguir aprendiendo."
        />
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Ver todos <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {blogPosts.map(post => (
          <article key={post.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <Badge variant="warm">{post.category}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

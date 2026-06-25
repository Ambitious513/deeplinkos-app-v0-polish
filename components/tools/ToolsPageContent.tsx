"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  aiTools,
  featuredTools,
  toolCategories,
  toolCategoryGroups,
  type AiTool,
  type ToolCategory,
} from "@/content/tools";

export function ToolsPageContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategoryLabel = toolCategories.find((category) => category.id === activeCategory)?.label ?? "All";
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const categoryMatches = activeCategory === "all" || tool.category === activeCategory;
      const text = [
        tool.name,
        tool.tagline,
        tool.description,
        tool.categoryLabel,
        tool.bestFor,
        ...tool.tags,
        ...tool.alternatives.map((alternative) => alternative.name),
        ...tool.searchTerms,
      ]
        .join(" ")
        .toLowerCase();
      const searchMatches = !normalizedQuery || text.includes(normalizedQuery);

      return categoryMatches && searchMatches;
    });
  }, [activeCategory, normalizedQuery]);

  const visibleGroups = useMemo(() => {
    return toolCategoryGroups
      .map((group) => ({
        ...group,
        tools: group.tools.filter((tool) => filteredTools.some((filteredTool) => filteredTool.id === tool.id)),
      }))
      .filter((group) => group.tools.length > 0);
  }, [filteredTools]);

  function chooseCategory(category: ToolCategory) {
    setActiveCategory(category);
    setFiltersOpen(false);
  }

  return (
    <div className="tools-shell">
      <section className="tools-hero" aria-labelledby="tools-page-title">
        <span className="tools-eyebrow">AI directory for growth</span>
        <h1 id="tools-page-title">
          AI Tools for <span className="grad-text">Growth</span>
        </h1>
        <p>
          Curated AI tools that help creators, stores, marketers, and agencies turn attention into clicks, leads,
          content, campaigns, and conversions.
        </p>

        <div className="tools-hero-proof" aria-label="Directory highlights">
          <span>
            <strong>60+</strong> vetted use cases
          </span>
          <span>
            <strong>Free</strong> starter options
          </span>
          <span>
            <strong>Alt</strong> comparisons
          </span>
        </div>
      </section>

      <section className="tools-utility" aria-label="Find AI tools">
        <label className="tools-search">
          <span className="sr-only">Search the AI tools directory</span>
          <SearchIcon />
          <input
            type="search"
            autoComplete="off"
            placeholder="Search AI tools, alternatives, SEO, ecommerce, automation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="tools-filter-panel" data-open={filtersOpen}>
          <button className="tools-filter-summary" type="button" onClick={() => setFiltersOpen((open) => !open)}>
            <span>Categories</span>
            <span className="tools-filter-summary-meta">
              {activeCategoryLabel}
              <ChevronIcon />
            </span>
          </button>

          <div className="tools-filter-list" role="group" aria-label="Filter tools by category">
            {toolCategories.map((category) => (
              <button
                className="tools-filter-btn"
                type="button"
                key={category.id}
                aria-pressed={activeCategory === category.id}
                onClick={() => chooseCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-featured-section" aria-labelledby="featured-tools-title">
        <ToolsSectionHeading
          eyebrow="Featured stack"
          title="Start with these growth tools"
          description="A focused set of AI tools for research, content, automation, and conversion."
          titleId="featured-tools-title"
        />

        <div className="tools-featured-grid">
          {featuredTools.map((tool) => (
            <FeaturedToolCard tool={tool} key={tool.id} />
          ))}
        </div>
      </section>

      <section className="tools-directory" aria-labelledby="directory-title">
        <ToolsSectionHeading
          eyebrow="Directory"
          title="Browse by growth workflow"
          description="Compare tools and nearby alternatives without digging through a generic directory."
          titleId="directory-title"
        />

        <p className="tools-disclosure">
          Some entries may later include partner links. Pricing, plans, and availability can change, so verify details
          on the official tool website before buying.
        </p>

        {visibleGroups.length > 0 ? (
          <div className="tools-group-list">
            {visibleGroups.map((group) => (
              <section className="tools-group" aria-labelledby={`tools-group-${group.id}`} key={group.id}>
                <div className="tools-group-heading">
                  <h3 id={`tools-group-${group.id}`}>{group.label}</h3>
                  <span>{group.tools.length} tools</span>
                </div>
                <div className="tools-card-grid">
                  {group.tools.map((tool) => (
                    <ToolCard tool={tool} key={tool.id} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="tools-empty-state">No tools match that search yet.</p>
        )}
      </section>
    </div>
  );
}

function FeaturedToolCard({ tool }: { tool: AiTool }) {
  return (
    <Link className="tools-featured-card" href={`/tools/${tool.slug}`}>
      <ToolHeader tool={tool} />
      <p>{tool.description}</p>
      <AlternativeRow tool={tool} />
      <span className="tools-card-cta">{tool.ctaLabel}</span>
    </Link>
  );
}

function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <Link className="tools-card" href={`/tools/${tool.slug}`}>
      <ToolHeader tool={tool} />
      <p>{tool.description}</p>
      <div className="tools-tag-row">
        {tool.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <AlternativeRow tool={tool} />
      <div className="tools-card-footer">
        <span>{tool.pricingCue}</span>
        <span className="tools-card-cta">{tool.ctaLabel}</span>
      </div>
    </Link>
  );
}

function ToolHeader({ tool }: { tool: AiTool }) {
  return (
    <div className="tools-card-header">
      <span className={`tools-tool-mark tools-tool-mark--${tool.category}`}>{tool.initials}</span>
      <span>
        <span className="tools-tool-name">
          {tool.name}
          {tool.verified ? <VerifiedIcon /> : null}
        </span>
        <span className="tools-tool-tagline">{tool.tagline}</span>
      </span>
    </div>
  );
}

function AlternativeRow({ tool }: { tool: AiTool }) {
  return (
    <div className="tools-alternatives">
      <span className="tools-alt-label">Alternatives</span>
      <div className="tools-alt-row">
        {tool.alternatives.map((alternative) => (
          <span className="tools-alt-chip" title={alternative.cue} key={alternative.name}>
            {alternative.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolsSectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
}) {
  return (
    <div className="tools-section-heading">
      <span className="tools-eyebrow">{eyebrow}</span>
      <h2 id={titleId}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg className="tools-verified" aria-label="Verified listing" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        fill="currentColor"
        d="m12 2 2.27 1.73 2.85-.16 1.05 2.66 2.37 1.59-.73 2.76.73 2.76-2.37 1.59-1.05 2.66-2.85-.16L12 22l-2.27-1.73-2.85.16-1.05-2.66-2.37-1.59.73-2.76-.73-2.76 2.37-1.59 1.05-2.66 2.85.16L12 2Z"
      />
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="m8.5 12.1 2.2 2.2 4.8-5" />
    </svg>
  );
}

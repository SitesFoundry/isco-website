/*
 * Breadcrumb trail for catalogue pages.
 *
 * Two jobs: give a visitor a way back up the hierarchy, and give the page a
 * visible trail that matches the BreadcrumbList structured data in its head.
 * Product pages previously offered only "back to category", which made them
 * reachable from exactly one page and left the homepage out of their links.
 */
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  /** Omit on the last crumb: the current page is not a link. */
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container pt-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-forest transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-foreground/80">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

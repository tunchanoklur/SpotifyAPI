---
id: client-side
title: Client-Side Fetching
---

Just like server-side fetching, you have to communicate with the service layer. But for client-side, you do not have to touch ```getInitialProps()``` of a page-level component.

## Fetch Component

**NextWeb.js** comes with a ```Fetch``` render prop to make client-side data fetching super easy. It makes you focus on the data instead of handling loading and error status.

Here are available props of the ```Fetch``` render prop:

Name | Description
- | -
service | A service function that returns a promise
onError | A callback function to handle an error
preloader | React Component / Element to render while loading

## Page Component

```javascript
import { Fetch } from '@lib/api'

import * as ArticleService from '@features/article/data/services'

function ArticleDetailPage({ articleDetail }) {
  return (
    <div>
      <Fetch service={() => ArticleService.getArticles({ limit: 10 }))}>
        {({ data }) => <ArticleLatest data={data} />}
      </Fetch>
    </div>
  )
}
```

## UI Component

```javascript
function ArticleLatest({ data }) {
  return (
    <section>
      <h2>Latest Articles</h2>
      <div>
        {data.map(article => (
          <article key={article.id}>
            <h3>
              <Link to="articleDetail" params={{ id: data.id }}>
                <a>{data.title}</a>
              </Link>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: data.excerpt }} />
          </article>
        ))}
      </div>
    </section>
  )
}
```

---
id: custom-error
title: Custom Error
---

Sometimes there is no error but you want to create an error for some reason. For example, an article page has been closed after published for a while. Unfortunately, that page has been indexed by search engines. So there are some users entering that page directly. 

The solution is to make this article page returns error 404 using ```throwError()``` helper.

```javascript
import { throwError } from '@lib/api'

ArticleDetailPage.getInitialProps = async ({ query }) => {
  const articleDetail = await getArticleDetail({ id: query.id })

  // Found the article, but it is not published yet or it is now closed.
  if (articleDetail.status === 'closed') {
    throwError(404)
  }

  return {
    articleDetail,
  }
}
```




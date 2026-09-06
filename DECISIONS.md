# Decisions

## Three I'd defend

### 1. Use `useInfiniteQuery` keyed by `{status, q}`, with `keepPreviousData`.

I decided not to maintain the page array ourselves.
When the status or search query changes, the existing cursor chain should be reset rather than reused. Using the filters as part of the query key gives us that behavior automatically.
keepPreviousData also keeps the current results visible while the new query is loading, so the UI doesn’t flash a skeleton on every search change.

### 2. Use a custom `refreshFirstPage()` for pull-to-refresh instead of `refetch()`.

`refetch()` re-fetches all the pages that have already been loaded.
For example, if the user has scrolled through five pages, a single pull-to-refresh could trigger five requests.
In useWorkOrders.ts, I trim the cached data back to the first page before refreshing, which keeps the refresh to a single request.

### 3. Keep a single `apiFetch` wrapper and hide Axios from the screens.

The screens shouldn’t need to know how Axios handles different error cases.
`toApiError` converts those different error shapes into a consistent { message, status, data } structure at the API boundary.

### 4. Created APIs class

I have created APIs class to keep all the endpoints API calling methods at one place and can be used in all separate react query hook functions from one place only.

## NativeWind across the package boundary

I have faced 2 issues with Nativewind while using it in library and compiling in actual app. But was not getting any build error, but the library components would render as plain, unstyled.

**Compilation:** NativeWind needs to transform the JSX import during the Babel step. The problem was that builder-bob had already compiled the library's JSX in lib/module/\*.js to react/jsx-runtime, so NativeWind had nothing left to transform. As a result, the className props coming from the library were simply ignored.

I fix this by adding `"react-native": "./src/index.tsx"` in libraries export section. Metro already understands this condition, so the app can continue using the standard metro.config.js without any extra configuration.

**Purging:** Tailwind only generates classes which it can find in the `tailwind.config.js` config file's content. Since the library's className values are inside the package, the app's Tailwind config also needs to scan the library source.

I added the library's Tailwind preset and included its files in the `tailwind.config.js` config file's content.

This approach means the app now compiles the library's source, so that source needs to be compatible with the app's Babel and TypeScript setup.

One more thing that, preset replaces the spacing and radius scales instead of extending them. That means utilities such as p-5 and rounded-lg aren't available. That's why Fab.tsx currently uses arbitrary values as a fallback.

## The 409 conflict

Not implemented

## What I cut

**Create and edit screens**
This is the biggest cut, and it also meant dropping the 409-conflict section.
Rather than having create and edit screens that only worked through the happy path, I chose to fully finish the listing screen with cursor pagination, server-side search, filters, pull-to-refresh, loading skeletons, empty and error states, and a separate retry for failures when loading later pages.

I can have created them too but, I think one complete flow is more useful than two partially implemented CRUD screens.
I followed smaller, finished, well-argued submission.

**Input and Badge from the library**
Input was only needed by the create/edit form and also in home screen's search field. Since that form was cut, I removed Input as well.
Instead Badge component adding in library because initially I have spent more time on library setup which cause me some issues so I dropped the these 2 components and only added 2 main whichis actually usefull in app side (Textm, Button).

## AI tools

Claude / ChatGPT AI, in some places:

- Diagnosing some nativewind issue in library side and how to compile it's preset and used classNames at app side after researching on documentation, stackoverflow and goole. The fix-it-in-the-library call was mine.
- Reaserching on how i can add the variant configuration in libraries components like we do in normal components, so it would be easy to directly pass the button varient type and Text type rather passing the className styles manually.
- Reaserching on how I can merge the tailwind classNames properly so it can not drop an other applied className in library components also. I searched on google and AI both too get proper details.
- Used AI to write the both library and app projests READEME.md file to save my time.
- Also used in creating the boiler plate screen UI, because components I have created but then I know how to design screen so I did this by AI by given actually what to do.

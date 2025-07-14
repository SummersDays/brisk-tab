import Head from "next/head";
import { ReactElement, useMemo } from "react";

import BookmarkGroupView from "@/components/bookmark-group-view";
import EmptyPlaceholder from "@/components/empty-placeholder";
import GlobalSearch from "@/components/global-search";
import useBookmarkGroups from "@/hooks/use-bookmark-groups";
import useBookmarks from "@/hooks/use-bookmarks";
import DefaultLayout from "@/layouts/default";

import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { bookmarks } = useBookmarks();
  const { groups } = useBookmarkGroups();

  const contentfulGroups = useMemo(() => {
    return groups.filter((group) => group.bookmarks.length > 0);
  }, [groups]);

  return (
    <section className="px-8 flex flex-col h-full overflow-x-auto">
      {bookmarks.length === 0 ? (
        <EmptyPlaceholder
          title="No bookmarks"
          desc="You can import bookmarks from browser or create a new one."
        />
      ) : (
        contentfulGroups.map((group) => (
          <BookmarkGroupView key={group.name} group={group} />
        ))
      )}
      <GlobalSearch />
    </section>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Brisk Tab</title>
        <meta name="description" content="An alt blank page for your browser" />
      </Head>
      <DefaultLayout>{page}</DefaultLayout>
    </>
  );
};

export default HomePage;

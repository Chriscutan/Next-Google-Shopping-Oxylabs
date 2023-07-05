import ResultsList from "@/components/ResultsList";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResults, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

export const revalidate = 300;

async function page({ searchParams, params: { term } }: Props) {
  if (!term) redirect("/");

  //   fetch from API....

  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await response.json()) as PageResults[];

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default page;

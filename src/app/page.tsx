import Intro from "../components/intro";

interface HomeProps {
  searchParams: {
    collection?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <main className="flex flex-col items-center justify-between">
      <Intro collectionId={searchParams.collection} />
    </main>
  );
}


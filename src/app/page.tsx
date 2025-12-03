import Intro from "../components/intro";

interface HomeProps {
  searchParams: Promise<{
    collection?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <main className="flex flex-col items-center justify-between">
      <Intro collectionId={params.collection} />
    </main>
  );
}


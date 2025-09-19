import Intro from "../components/intro";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Intro />
    </main>
  );
}

